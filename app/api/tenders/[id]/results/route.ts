import { type NextRequest, NextResponse } from "next/server"

// Mock database
const applications = []
const tenders = []

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Find tender
    const tender = tenders.find((t) => t.id === params.id)
    if (!tender) {
      return NextResponse.json({ error: "ጨረታ አልተገኘም" }, { status: 404 })
    }

    // Check if tender has been evaluated
    if (tender.status !== "evaluated") {
      return NextResponse.json({ error: "ጨረታ ግምገማ አልተጠናቀቀም" }, { status: 400 })
    }

    // Get evaluated applications
    const tenderApplications = applications
      .filter((app) => app.tenderId === params.id && app.evaluationScore !== null)
      .sort((a, b) => a.rank - b.rank)

    const results = {
      tenderId: params.id,
      tenderTitle: tender.title,
      evaluatedAt: tender.evaluatedAt,
      totalApplications: tenderApplications.length,
      winner: tenderApplications.find((app) => app.rank === 1),
      allResults: tenderApplications.map((app) => ({
        rank: app.rank,
        applicantName: app.applicantName,
        organizationName: app.organizationName,
        proposedBudget: `${app.proposedBudget.toLocaleString()} ብር`,
        evaluationScore: app.evaluationScore,
        status: app.status,
        evaluationDetails: app.evaluationDetails,
      })),
    }

    return NextResponse.json({
      success: true,
      results,
    })
  } catch (error) {
    console.error("Get results error:", error)
    return NextResponse.json({ error: "የአገልግሎት ስህተት" }, { status: 500 })
  }
}
