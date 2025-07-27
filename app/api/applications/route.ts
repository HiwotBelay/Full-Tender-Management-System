import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock database
const applications = []

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "ማረጋገጫ ያስፈልጋል" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as any

    // Get user's applications
    const userApplications = applications.filter((app) => app.applicantId === decoded.userId)

    const applicationsWithStatus = userApplications.map((app) => ({
      id: app.id,
      tenderId: app.tenderId,
      tenderTitle: app.tenderTitle,
      proposedBudget: `${app.proposedBudget.toLocaleString()} ብር`,
      status: app.status,
      submittedAt: app.submittedAt,
      evaluationScore: app.evaluationScore,
      rank: app.rank,
      statusText: getStatusText(app.status),
    }))

    return NextResponse.json({
      success: true,
      applications: applicationsWithStatus,
      total: applicationsWithStatus.length,
    })
  } catch (error) {
    console.error("Get applications error:", error)
    return NextResponse.json({ error: "የአገልግሎት ስህተት" }, { status: 500 })
  }
}

function getStatusText(status: string): string {
  const statusMap = {
    submitted: "ተልኳል",
    under_review: "በግምገማ ላይ",
    evaluated: "ተገምግሟል",
    winner: "አሸናፊ",
    rejected: "ውድቅ ተደርጓል",
  }
  return statusMap[status] || status
}
