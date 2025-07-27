"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getTenderById, getUserInfo } from "@/lib/api"
import { FileText, Clock, DollarSign, MapPin, Building, CalendarDays, Info } from "lucide-react"

interface Tender {
  _id: string
  title: string
  description: string
  organization: string
  budget: number
  deadline: string
  category: string
  location: string
  status: "open" | "closed" | "awarded"
  createdAt: string
}

export default function TenderDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [tender, setTender] = useState<Tender | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const user = getUserInfo()

  useEffect(() => {
    const fetchTender = async () => {
      try {
        const data = await getTenderById(id)
        setTender(data)
      } catch (err: any) {
        setError(err.message || "Failed to fetch tender details.")
      } finally {
        setLoading(false)
      }
    }
    if (id) {
      fetchTender()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-yellow-600 to-red-700">
        <div className="ethiopian-spinner"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-yellow-600 to-red-700 text-white p-4">
        <p className="text-xl amharic-text">{error}</p>
        <Button onClick={() => router.back()} className="mt-4 ethiopian-gradient">
          ተመለስ
        </Button>
      </div>
    )
  }

  if (!tender) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-yellow-600 to-red-700 text-white p-4">
        <p className="text-xl amharic-text">ጨረታ አልተገኘም።</p>
        <Button onClick={() => router.back()} className="mt-4 ethiopian-gradient">
          ተመለስ
        </Button>
      </div>
    )
  }

  const isTenderOpen = tender.status === "open" && new Date(tender.deadline) > new Date()
  const isApplicant = user && user.role === "applicant"
  const isAdmin = user && user.role === "admin"

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
                href="/tenders"
                className="text-gray-700 hover:text-green-600 font-medium transition-all duration-300 hover:scale-105"
              >
                ጨረታዎች
              </Link>
              {isAdmin && (
                <Link
                  href="/admin/dashboard"
                  className="text-gray-700 hover:text-green-600 font-medium transition-all duration-300 hover:scale-105"
                >
                  አስተዳዳሪ ፓነል
                </Link>
              )}
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
        <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-yellow-200">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-3xl font-bold text-gray-800 amharic-text">{tender.title}</CardTitle>
              <Badge
                className={`font-semibold text-white text-base px-4 py-2 ${
                  tender.status === "open"
                    ? "bg-green-500"
                    : tender.status === "closed"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                }`}
              >
                {tender.status === "open" ? "ክፍት" : tender.status === "closed" ? "ተዘግቷል" : "ተሸልሟል"}
              </Badge>
            </div>
            <CardDescription className="text-gray-600 flex items-center text-lg amharic-text">
              <Building className="w-5 h-5 mr-2" />
              {tender.organization}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                <span className="font-semibold amharic-text">በጀት:</span>{" "}
                <span className="ml-1">{tender.budget.toLocaleString()} ብር</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-red-600" />
                <span className="font-semibold amharic-text">የመጨረሻ ቀን:</span>{" "}
                <span className="ml-1">{new Date(tender.deadline).toLocaleDateString("am-ET")}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-semibold amharic-text">አካባቢ:</span>{" "}
                <span className="ml-1 amharic-text">{tender.location}</span>
              </div>
              <div className="flex items-center">
                <Info className="w-5 h-5 mr-2 text-purple-600" />
                <span className="font-semibold amharic-text">ምድብ:</span>{" "}
                <span className="ml-1 amharic-text">{tender.category}</span>
              </div>
              <div className="flex items-center">
                <CalendarDays className="w-5 h-5 mr-2 text-yellow-600" />
                <span className="font-semibold amharic-text">የተለጠፈበት ቀን:</span>{" "}
                <span className="ml-1">{new Date(tender.createdAt).toLocaleDateString("am-ET")}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3 amharic-text">ዝርዝር መግለጫ</h3>
              <p className="text-gray-700 leading-relaxed amharic-text">{tender.description}</p>
            </div>

            <div className="flex justify-end gap-4 border-t border-gray-200 pt-6">
              {isApplicant && isTenderOpen && (
                <Link href={`/tenders/${tender._id}/apply`}>
                  <Button className="ethiopian-gradient hover:opacity-90 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105">
                    ማመልከት
                  </Button>
                </Link>
              )}
              {isAdmin && (
                <Link href={`/admin/evaluate/${tender._id}`}>
                  <Button
                    variant="secondary"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    ማመልከቻዎችን ገምግም
                  </Button>
                </Link>
              )}
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="border-2 border-gray-600 text-gray-600 hover:bg-gray-50 font-semibold transition-all duration-300 hover:scale-105 bg-transparent"
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
