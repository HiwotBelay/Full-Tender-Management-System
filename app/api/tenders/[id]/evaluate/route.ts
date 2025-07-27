import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock database
const applications = []
const tenders = []

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication (Admin only)
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "ማረጋገጫ ያስፈልጋል" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as any
    if (decoded.role !== "admin" && decoded.role !== "government") {
      return NextResponse.json({ error: "ፈቃድ የለዎትም" }, { status: 403 })
    }

    // Get tender applications
    const tenderApplications = applications.filter((app) => app.tenderId === params.id)

    if (tenderApplications.length === 0) {
      return NextResponse.json({ error: "ምንም ማመልከቻ አልተገኘም" }, { status: 400 })
    }

    // Evaluation Algorithm
    const evaluatedApplications = tenderApplications.map((app) => {
      let score = 0
      const details = []

      // 1. Price Evaluation (40% weight) - Lower price gets higher score
      const priceScore = calculatePriceScore(app.proposedBudget, tenderApplications)
      score += priceScore * 0.4
      details.push(`የዋጋ ነጥብ: ${priceScore.toFixed(1)}/100`)

      // 2. Experience Evaluation (25% weight)
      const experienceScore = calculateExperienceScore(app.experience)
      score += experienceScore * 0.25
      details.push(`የልምድ ነጥብ: ${experienceScore.toFixed(1)}/100`)

      // 3. Technical Capability (20% weight)
      const technicalScore = calculateTechnicalScore(app.technicalCapability)
      score += technicalScore * 0.2
      details.push(`የቴክኒክ ነጥብ: ${technicalScore.toFixed(1)}/100`)

      // 4. Financial Capacity (15% weight)
      const financialScore = calculateFinancialScore(app.financialCapacity)
      score += financialScore * 0.15
      details.push(`የፋይናንስ ነጥብ: ${financialScore.toFixed(1)}/100`)

      return {
        ...app,
        evaluationScore: Math.round(score * 100) / 100,
        evaluationDetails: details,
        evaluatedAt: new Date().toISOString(),
        evaluatedBy: decoded.userId,
      }
    })

    // Sort by score (highest first) and assign ranks
    evaluatedApplications.sort((a, b) => b.evaluationScore - a.evaluationScore)
    evaluatedApplications.forEach((app, index) => {
      app.rank = index + 1
      app.status = index === 0 ? "winner" : "evaluated"
    })

    // Update applications in database
    evaluatedApplications.forEach((evalApp) => {
      const appIndex = applications.findIndex((app) => app.id === evalApp.id)
      if (appIndex !== -1) {
        applications[appIndex] = evalApp
      }
    })

    // Update tender status
    const tenderIndex = tenders.findIndex((t) => t.id === params.id)
    if (tenderIndex !== -1) {
      tenders[tenderIndex].status = "evaluated"
      tenders[tenderIndex].evaluatedAt = new Date().toISOString()
      tenders[tenderIndex].winner = evaluatedApplications[0]
    }

    return NextResponse.json({
      success: true,
      message: "ጨረታ ግምገማ በተሳካ ሁኔታ ተጠናቋል",
      results: {
        totalApplications: evaluatedApplications.length,
        winner: evaluatedApplications[0],
        allResults: evaluatedApplications.map((app) => ({
          id: app.id,
          applicantName: app.applicantName,
          proposedBudget: app.proposedBudget,
          evaluationScore: app.evaluationScore,
          rank: app.rank,
          status: app.status,
        })),
      },
    })
  } catch (error) {
    console.error("Evaluate tender error:", error)
    return NextResponse.json({ error: "የአገልግሎት ስህተት" }, { status: 500 })
  }
}

// Helper functions for evaluation
function calculatePriceScore(proposedBudget: number, allApplications: any[]): number {
  const prices = allApplications.map((app) => app.proposedBudget)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  if (minPrice === maxPrice) return 100

  // Lower price gets higher score
  return 100 - ((proposedBudget - minPrice) / (maxPrice - minPrice)) * 100
}

function calculateExperienceScore(experience: number): number {
  // Experience in years, max score at 20+ years
  return Math.min((experience / 20) * 100, 100)
}

function calculateTechnicalScore(technicalCapability: string): number {
  // Simple scoring based on capability level
  const scores = {
    excellent: 100,
    very_good: 85,
    good: 70,
    fair: 55,
    poor: 30,
  }
  return scores[technicalCapability] || 50
}

function calculateFinancialScore(financialCapacity: number): number {
  // Financial capacity as percentage of tender budget
  if (financialCapacity >= 100) return 100
  if (financialCapacity >= 80) return 85
  if (financialCapacity >= 60) return 70
  if (financialCapacity >= 40) return 55
  return 30
}
