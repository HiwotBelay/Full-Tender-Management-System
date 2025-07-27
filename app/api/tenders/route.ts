import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock database for tenders
const tenders = [
  {
    id: "T001",
    title: "🛣️ የመንገድ ግንባታ እና ማሻሻያ ፕሮጀክት",
    description: "የከተማው ዋና መንገዶች ግንባታ እና ማሻሻያ ስራ ለማከናወን የሚችል ተቋራጭ ድርጅት ይፈለጋል።",
    organization: "የአዲስ አበባ ከተማ አስተዳደር",
    organizationId: 1,
    category: "ግንባታ",
    status: "active",
    publishDate: "2024-01-15",
    deadline: "2024-02-15",
    budget: 50000000,
    location: "አዲስ አበባ",
    requirements: [
      "ቢያንስ 10 ዓመት የስራ ልምድ",
      "የግንባታ ፈቃድ ደረጃ 1",
      "የተሟላ የቴክኒክ ሰራተኞች",
      "የተሟላ የግንባታ መሳሪያዎች",
      "የፋይናንስ አቅም ማረጋገጫ",
    ],
    documents: [
      { name: "የጨረታ ሰነድ", size: "2.5 MB", type: "PDF", url: "/documents/tender-doc-1.pdf" },
      { name: "የቴክኒክ መግለጫ", size: "1.8 MB", type: "PDF", url: "/documents/tech-spec-1.pdf" },
    ],
    applications: [],
    createdAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "T002",
    title: "💻 የኮምፒውተር እና ቴክኖሎጂ እቃዎች ግዢ",
    description: "ለትምህርት ቤቶች የኮምፒውተር እና ቴክኖሎጂ እቃዎች ግዢ",
    organization: "የትምህርት ሚኒስቴር",
    organizationId: 1,
    category: "ቴክኖሎጂ",
    status: "active",
    publishDate: "2024-01-20",
    deadline: "2024-02-20",
    budget: 25000000,
    location: "አዲስ አበባ",
    requirements: ["የቴክኖሎጂ እቃዎች አቅራቢ ፈቃድ", "ቢያንስ 5 ዓመት የስራ ልምድ", "የጥራት ማረጋገጫ ሰርተፊኬት"],
    documents: [{ name: "የጨረታ ሰነድ", size: "1.5 MB", type: "PDF", url: "/documents/tender-doc-2.pdf" }],
    applications: [],
    createdAt: "2024-01-20T08:00:00Z",
  },
]

// GET - Fetch all tenders with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    let filteredTenders = [...tenders]

    // Apply filters
    if (category && category !== "all") {
      filteredTenders = filteredTenders.filter((t) => t.category === category)
    }

    if (status && status !== "all") {
      filteredTenders = filteredTenders.filter((t) => t.status === status)
    }

    if (search) {
      filteredTenders = filteredTenders.filter(
        (t) =>
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.organization.toLowerCase().includes(search.toLowerCase()),
      )
    }

    // Add application count
    const tendersWithStats = filteredTenders.map((tender) => ({
      ...tender,
      applicants: tender.applications.length,
      budget: `${tender.budget.toLocaleString()} ብር`,
    }))

    return NextResponse.json({
      success: true,
      tenders: tendersWithStats,
      total: tendersWithStats.length,
    })
  } catch (error) {
    console.error("Fetch tenders error:", error)
    return NextResponse.json({ error: "የአገልግሎት ስህተት" }, { status: 500 })
  }
}

// POST - Create new tender (Admin/Government only)
export async function POST(request: NextRequest) {
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

    const tenderData = await request.json()

    const newTender = {
      id: `T${String(tenders.length + 1).padStart(3, "0")}`,
      ...tenderData,
      organizationId: decoded.userId,
      status: "active",
      publishDate: new Date().toISOString().split("T")[0],
      applications: [],
      createdAt: new Date().toISOString(),
    }

    tenders.push(newTender)

    return NextResponse.json({
      success: true,
      message: "ጨረታ በተሳካ ሁኔታ ተፈጥሯል",
      tender: newTender,
    })
  } catch (error) {
    console.error("Create tender error:", error)
    return NextResponse.json({ error: "የአገልግሎት ስህተት" }, { status: 500 })
  }
}
