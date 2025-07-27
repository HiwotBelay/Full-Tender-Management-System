"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  Clock,
  Building,
  Download,
  Share,
  Bookmark,
  AlertCircle,
  CheckCircle,
  Phone,
  Mail,
} from "lucide-react"

export default function TenderDetailPage({ params }: { params: { id: string } }) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Mock data - in real app, this would be fetched based on params.id
  const tender = {
    id: "T001",
    title: "የመንገድ ግንባታ እና ማሻሻያ ፕሮጀክት",
    organization: "የአዲስ አበባ ከተማ አስተዳደር",
    category: "ግንባታ",
    status: "ንቁ",
    publishDate: "2024-01-15",
    deadline: "2024-02-15",
    budget: "50,000,000 ብር",
    location: "አዲስ አበባ",
    applicants: 12,
    description: "የከተማው ዋና መንገዶች ግንባታ እና ማሻሻያ ስራ ለማከናወን የሚችል ተቋራጭ ድርጅት ይፈለጋል።",
    requirements: [
      "ቢያንስ 10 ዓመት የስራ ልምድ",
      "የግንባታ ፈቃድ ደረጃ 1",
      "የተሟላ የቴክኒክ ሰራተኞች",
      "የተሟላ የግንባታ መሳሪያዎች",
      "የፋይናንስ አቅም ማረጋገጫ",
    ],
    documents: [
      { name: "የጨረታ ሰነድ", size: "2.5 MB", type: "PDF" },
      { name: "የቴክኒክ መግለጫ", size: "1.8 MB", type: "PDF" },
      { name: "የውል ሁኔታዎች", size: "950 KB", type: "PDF" },
      { name: "የቦታ ካርታ", size: "3.2 MB", type: "PDF" },
    ],
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
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ንቁ":
        return "bg-green-100 text-green-800"
      case "በመጠባበቅ ላይ":
        return "bg-yellow-100 text-yellow-800"
      case "ተዘግቷል":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ግንባታ":
        return "bg-blue-100 text-blue-800"
      case "ቴክኖሎጂ":
        return "bg-purple-100 text-purple-800"
      case "አገልግሎት":
        return "bg-orange-100 text-orange-800"
      case "ጤና":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTimelineStatus = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600"
      case "upcoming":
        return "text-blue-600"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-yellow-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">የጨረታ አስተዳደር</span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-700 hover:text-green-600">
                ዳሽቦርድ
              </Link>
              <Link href="/tenders" className="text-gray-700 hover:text-green-600">
                ጨረታዎች
              </Link>
              <Link href="/applications" className="text-gray-700 hover:text-green-600">
                ማመልከቻዎች
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                አጋራ
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsBookmarked(!isBookmarked)}>
                <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
                {isBookmarked ? "ተቀምጧል" : "አስቀምጥ"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">
              ዋና ገጽ
            </Link>
            <span>/</span>
            <Link href="/tenders" className="hover:text-green-600">
              ጨረታዎች
            </Link>
            <span>/</span>
            <span className="text-gray-900">{tender.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Badge className={getCategoryColor(tender.category)}>{tender.category}</Badge>
                    <Badge className={getStatusColor(tender.status)}>{tender.status}</Badge>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      የመጨረሻ ቀን: {tender.deadline}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-2xl leading-tight mb-3">{tender.title}</CardTitle>
                <CardDescription className="flex items-center text-gray-600 mb-4">
                  <Building className="w-4 h-4 mr-2" />
                  {tender.organization}
                </CardDescription>
                <p className="text-gray-700 leading-relaxed">{tender.description}</p>
              </CardHeader>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">ዝርዝር</TabsTrigger>
                <TabsTrigger value="requirements">መስፈርቶች</TabsTrigger>
                <TabsTrigger value="documents">ሰነዶች</TabsTrigger>
                <TabsTrigger value="timeline">የጊዜ ሰሌዳ</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>የፕሮጀክት ዝርዝር</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">የፕሮጀክት መረጃ</h4>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">በጀት:</span>
                            <span className="ml-2 font-semibold text-green-600">{tender.budget}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">አካባቢ:</span>
                            <span className="ml-2 font-semibold">{tender.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">የታተመበት ቀን:</span>
                            <span className="ml-2 font-semibold">{tender.publishDate}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">አመልካቾች:</span>
                            <span className="ml-2 font-semibold">{tender.applicants}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">የስራ ዝርዝር</h4>
                        <div className="text-sm text-gray-700 space-y-2">
                          <p>• የመንገድ ወለል ማሻሻያ እና እድሳት</p>
                          <p>• የመብራት ስርዓት ዝርጋታ</p>
                          <p>• የውሃ ማስተላለፊያ ቧንቧ ዝርጋታ</p>
                          <p>• የመንገድ ምልክቶች እና ሳይንቦርዶች</p>
                          <p>• የአካባቢ ማስዋብ እና የአረንጓዴ ቦታ ዝግጅት</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>የማመልከቻ መስፈርቶች</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {tender.requirements.map((requirement, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{requirement}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-yellow-900 mb-1">አስፈላጊ ማስታወሻ</h4>
                          <p className="text-sm text-yellow-800">ሁሉም መስፈርቶች መሟላት አለባቸው። ያልተሟሉ ማመልከቻዎች ውድቅ ይደረጋሉ።</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>የጨረታ ሰነዶች</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {tender.documents.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900">{doc.name}</p>
                              <p className="text-sm text-gray-500">
                                {doc.type} • {doc.size}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            አውርድ
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>የጨረታ የጊዜ ሰሌዳ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tender.timeline.map((item, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div
                            className={`w-3 h-3 rounded-full mt-2 ${
                              item.status === "completed"
                                ? "bg-green-600"
                                : item.status === "upcoming"
                                  ? "bg-blue-600"
                                  : "bg-gray-300"
                            }`}
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className={`font-medium ${getTimelineStatus(item.status)}`}>{item.event}</h4>
                              <span className="text-sm text-gray-500">{item.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>እርምጃ ይውሰዱ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tender.status === "ንቁ" && (
                  <Link href={`/tenders/${tender.id}/apply`}>
                    <Button className="w-full bg-green-600 hover:bg-green-700">አሁኑኑ ማመልከት</Button>
                  </Link>
                )}
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  ሁሉም ሰነዶች አውርድ
                </Button>
                <Button variant="outline" className="w-full">
                  ጥያቄ ላክ
                </Button>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>የመገናኛ መረጃ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{tender.contact.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{tender.contact.position}</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{tender.contact.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{tender.contact.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>የጨረታ ስታቲስቲክስ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">አመልካቾች</span>
                    <span className="font-semibold">{tender.applicants}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">እይታዎች</span>
                    <span className="font-semibold">245</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">ቀሪ ቀናት</span>
                    <span className="font-semibold text-red-600">15</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
