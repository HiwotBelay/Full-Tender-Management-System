"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getApplicationById, updateApplicationStatus, getUserInfo } from "@/lib/api"
import {
  FileText,
  Building,
  DollarSign,
  Clock,
  MapPin,
  User,
  Mail,
  CheckCircle,
  XCircle,
  Hourglass,
  CalendarDays,
} from "lucide-react"
import Link from "next/link"

interface Application {
  _id: string
  tender: {
    _id: string
    title: string
    organization: string
    budget: number
    deadline: string
    location: string
  }
  applicant: {
    _id: string
    username: string
    email: string
  }
  proposal: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

export default function EvaluateApplicationPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [application, setApplication] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()
  const user = getUserInfo()

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/login") // Redirect if not logged in or not an admin
      return
    }

    const fetchApplication = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        setError("Authentication token not found.")
        setLoading(false)
        return
      }
      try {
        const data = await getApplicationById(id, token)
        setApplication(data)
      } catch (err: any) {
        setError(err.message || "Failed to fetch application details.")
      } finally {
        setLoading(false)
      }
    }
    if (id) {
      fetchApplication()
    }
  }, [id, router, user])

  const handleStatusUpdate = async (status: "approved" | "rejected") => {
    setUpdating(true)
    setError(null)
    setSuccess(null)
    const token = localStorage.getItem("token")

    if (!token) {
      setError("Authentication token not found.")
      setUpdating(false)
      return
    }

    try {
      const updatedApp = await updateApplicationStatus(id, status, token)
      setApplication(updatedApp)
      setSuccess(`ማመልከቻው በተሳካ ሁኔታ ${status === "approved" ? "ጸድቋል" : "ውድቅ ተደርጓል"}።`)
    } catch (err: any) {
      setError(err.message || "የሁኔታ ማዘመን አልተቻለም።")
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-yellow-600 to-red-700">
        <div className="ethiopian-spinner"></div>
      </div>
    )
  }

  if (error && !application) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-yellow-600 to-red-700 text-white p-4">
        <p className="text-xl amharic-text">{error}</p>
        <Button onClick={() => router.back()} className="mt-4 ethiopian-gradient">
          ተመለስ
        </Button>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-yellow-600 to-red-700 text-white p-4">
        <p className="text-xl amharic-text">ማመልከቻ አልተገኘም።</p>
        <Button onClick={() => router.back()} className="mt-4 ethiopian-gradient">
          ተመለስ
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-yellow-600 to-red-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 ethiopian-pattern"></div>

      <header className="relative z-50 bg-white/95 backdrop-blur-md border-b border-yellow-200 sticky top-0 shadow-lg">
        <div className="absolute top-0 left-0 w-full h-1 ethiopian-gradient"></div>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 ethiopian-gradient rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs">🇪🇹</span>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-700 to-red-700 bg-clip-text text-transparent">
                  የጨረታ አስተዳደር ስርዓት
                </h1>
                <p className="text-sm text-gray-600 font-medium">🇪🇹 ለኢትዮጵያ ልዩ ስርዓት</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-green-600 font-medium transition-all duration-300 hover:scale-105"
              >
                ዳሽቦርድ
              </Link>
              <Link
                href="/admin/dashboard"
                className="text-gray-700 hover:text-green-600 font-medium transition-all duration-300 hover:scale-105"
              >
                አስተዳዳሪ ፓነል
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => router.push("/login")}
                variant="outline"
                className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold transition-all duration-300 hover:scale-105 bg-transparent"
              >
                🔐 ግባ
              </Button>
              <Button className="ethiopian-gradient hover:opacity-90 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                ✨ ተመዝገብ
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <Card className="w-full max-w-3xl mx-auto bg-white/95 backdrop-blur-md shadow-2xl border-yellow-200">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-3xl font-bold text-gray-800 amharic-text">ማመልከቻ ገምግም</CardTitle>
              <Badge
                className={`font-semibold text-white text-base px-4 py-2 ${
                  application.status === "approved"
                    ? "bg-green-500"
                    : application.status === "rejected"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                }`}
              >
                {application.status === "pending" && <Hourglass className="w-4 h-4 mr-2" />}
                {application.status === "approved" && <CheckCircle className="w-4 h-4 mr-2" />}
                {application.status === "rejected" && <XCircle className="w-4 h-4 mr-2" />}
                {application.status === "pending"
                  ? "በሂደት ላይ"
                  : application.status === "approved"
                    ? "ጸድቋል"
                    : "ውድቅ ተደርጓል"}
              </Badge>
            </div>
            <CardDescription className="text-gray-600 amharic-text">የጨረታ ማመልከቻውን ይገምግሙ እና ሁኔታውን ያዘምኑ።</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 border-b pb-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 amharic-text">የጨረታ ዝርዝሮች</h3>
                <p className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  <span className="font-semibold amharic-text">ርዕስ:</span>{" "}
                  <span className="ml-1 amharic-text">{application.tender.title}</span>
                </p>
                <p className="flex items-center">
                  <Building className="w-5 h-5 mr-2 text-blue-600" />
                  <span className="font-semibold amharic-text">ድርጅት:</span>{" "}
                  <span className="ml-1 amharic-text">{application.tender.organization}</span>
                </p>
                <p className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                  <span className="font-semibold amharic-text">በጀት:</span>{" "}
                  <span className="ml-1">{application.tender.budget.toLocaleString()} ብር</span>
                </p>
                <p className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-red-600" />
                  <span className="font-semibold amharic-text">የመጨረሻ ቀን:</span>{" "}
                  <span className="ml-1">{new Date(application.tender.deadline).toLocaleDateString("am-ET")}</span>
                </p>
                <p className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                  <span className="font-semibold amharic-text">አካባቢ:</span>{" "}
                  <span className="ml-1 amharic-text">{application.tender.location}</span>
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 amharic-text">የአመልካች ዝርዝሮች</h3>
                <p className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  <span className="font-semibold amharic-text">የተጠቃሚ ስም:</span>{" "}
                  <span className="ml-1 amharic-text">{application.applicant.username}</span>
                </p>
                <p className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-green-600" />
                  <span className="font-semibold amharic-text">ኢሜይል:</span>{" "}
                  <span className="ml-1">{application.applicant.email}</span>
                </p>
                <p className="flex items-center">
                  <CalendarDays className="w-5 h-5 mr-2 text-yellow-600" />
                  <span className="font-semibold amharic-text">የማመልከቻ ቀን:</span>{" "}
                  <span className="ml-1">{new Date(application.createdAt).toLocaleDateString("am-ET")}</span>
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3 amharic-text">የአመልካች ሀሳብ/ፕሮፖዛል</h3>
              <p className="text-gray-700 leading-relaxed amharic-text">{application.proposal}</p>
            </div>

            {error && <p className="text-red-500 text-sm text-center amharic-text">{error}</p>}
            {success && <p className="text-green-500 text-sm text-center amharic-text">{success}</p>}

            <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
              {application.status === "pending" && (
                <>
                  <Button
                    onClick={() => handleStatusUpdate("approved")}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 shadow-lg transition-all duration-300"
                    disabled={updating}
                  >
                    {updating ? "በማጽደቅ ላይ..." : "አጽድቅ"}
                  </Button>
                  <Button
                    onClick={() => handleStatusUpdate("rejected")}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 shadow-lg transition-all duration-300"
                    disabled={updating}
                  >
                    {updating ? "በመሻር ላይ..." : "ውድቅ አድርግ"}
                  </Button>
                </>
              )}
              <Button
                type="button"
                onClick={() => router.back()}
                variant="outline"
                className="border-2 border-gray-600 text-gray-600 hover:bg-gray-50 font-semibold transition-all duration-300 bg-transparent"
              >
                ተመለስ
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="ethiopian-gradient text-white py-8 relative overflow-hidden mt-auto">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <p className="text-white/80 amharic-text">&copy; 2024 የጨረታ አስተዳደር ስርዓት። ሁሉም መብቶች የተጠበቁ ናቸው። 🇪🇹</p>
        </div>
      </footer>
    </div>
  )
}
