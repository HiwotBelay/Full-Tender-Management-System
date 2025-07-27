import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock database
const tenders = [
  {
    id: "T001",
    title: "🛣️ የመንገድ ግንባታ እና ማሻሻያ ፕሮጀክት",
    applications: [],
    status: "active",
    deadline: "2024-02-15",
  },
]

const applications = []

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "ማረጋገጫ ያስፈልጋል" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as any

    // Find tender
    const tender = tenders.find((t) => t.id === params.id)
    if (!tender) {
      return NextResponse.json({ error: "ጨረታ አልተገኘም" }, { status: 404 })
    }

    // Check if tender is still active
    if (tender.status !== "active") {
      return NextResponse.json({ error: "ይህ ጨረታ ተዘግቷል" }, { status: 400 })
    }

    // Check deadline
    const now = new Date()
    const deadline = new Date(tender.deadline)
    if (now > deadline) {
      return NextResponse.json({ error: "የማመልከቻ ጊዜ አልፏል" }, { status: 400 })
    }

    // Check if user already applied
    const existingApplication = applications.find(
      (app) => app.tenderId === params.id && app.applicantId === decoded.userId,
    )
    if (existingApplication) {
      return NextResponse.json({ error: "ቀደም ሲል ለዚህ ጨረታ አመልክተዋል" }, { status: 400 })
    }

    const applicationData = await request.json()

    // Create application
    const newApplication = {
      id: `APP${String(applications.length + 1).padStart(3, "0")}`,
      tenderId: params.id,
      applicantId: decoded.userId,
      applicantName: decoded.name,
      applicantEmail: decoded.email,
      ...applicationData,
      status: "submitted",
      submittedAt: new Date().toISOString(),
      evaluationScore: null,
      rank: null,
    }

    applications.push(newApplication)

    // Add to tender applications
    const tenderIndex = tenders.findIndex((t) => t.id === params.id)
    tenders[tenderIndex].applications.push(newApplication.id)

    return NextResponse.json({
      success: true,
      message: "ማመልከቻዎ በተሳካ ሁኔታ ተልኳል",
      application: {
        id: newApplication.id,
        status: newApplication.status,
        submittedAt: newApplication.submittedAt,
      },
    })
  } catch (error) {
    console.error("Apply tender error:", error)
    return NextResponse.json({ error: "የአገልግሎት ስህተት" }, { status: 500 })
  }
}

// GET - Get applications for a tender (Admin only)
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verify authentication
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ error: "ማረጋገጫ ያስፈልጋል" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as any
    if (decoded.role !== "admin" && decoded.role !== "government") {
      return NextResponse.json({ error: "ፈቃድ የለዎትም" }, { status: 403 })
    }

    const tenderApplications = applications.filter((app) => app.tenderId === params.id)

    return NextResponse.json({
      success: true,
      applications: tenderApplications,
      total: tenderApplications.length,
    })
  } catch (error) {
    console.error("Get applications error:", error)
    return NextResponse.json({ error: "የአገልግሎት ስህተት" }, { status: 500 })
  }
}
