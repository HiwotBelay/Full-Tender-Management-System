import { type NextRequest, NextResponse } from "next/server"

// Mock database
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
    timeline: [
      { date: "2024-01-15", event: "ጨረታ ታትሟል", status: "completed" },
      { date: "2024-01-20", event: "የቅድመ ጨረታ ስብሰባ", status: "completed" },
      { date: "2024-02-01", event: "ጥያቄዎች የመጨረሻ ቀን", status: "upcoming" },
      { date: "2024-02-15", event: "የማመልከቻ የመጨረሻ ቀን", status: "upcoming" },
      { date: "2024-02-20", event: "ጨረታ መክፈት", status: "upcoming" },
    ],
    contact: {
      name: "አቶ ተስፋዬ መንግስቱ",
      position: "የጨረታ አስተባባሪ",
      phone: "+251-11-123-4567",
      email: "tesfaye.mengistu@addisababa.gov.et",
    },
    createdAt: "2024-01-15T08:00:00Z",
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const tender = tenders.find((t) => t.id === params.id)

    if (!tender) {
      return NextResponse.json({ error: "ጨረታ አልተገኘም" }, { status: 404 })
    }

    // Add computed fields
    const tenderWithStats = {
      ...tender,
      applicants: tender.applications.length,
      budget: `${tender.budget.toLocaleString()} ብር`,
    }

    return NextResponse.json({
      success: true,
      tender: tenderWithStats,
    })
  } catch (error) {
    console.error("Fetch tender error:", error)
    return NextResponse.json({ error: "የአገልግሎት ስህተት" }, { status: 500 })
  }
}
