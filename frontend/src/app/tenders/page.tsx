"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { getAllTenders } from "@/lib/api"
import { FileText, Clock, DollarSign, MapPin, Building, Search } from "lucide-react"

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

export default function TendersPage() {
  const [tenders, setTenders] = useState<Tender[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const data = await getAllTenders()
        setTenders(data)
      } catch (err: any) {
        setError(err.message || "Failed to fetch tenders.")
      } finally {
        setLoading(false)
      }
    }
    fetchTenders()
  }, [])

  const filteredTenders = tenders.filter((tender) => {
    const matchesSearch =
      tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tender.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tender.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tender.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = filterCategory === "All" || tender.category === filterCategory
    const matchesStatus = filterStatus === "All" || tender.status === filterStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const categories = Array.from(new Set(tenders.map((tender) => tender.category)))
  const statuses = Array.from(new Set(tenders.map((tender) => tender.status)))

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
                href="/tenders"
                className="text-gray-700 hover:text-green-600 font-medium transition-all duration-300 hover:scale-105"
              >
                ጨረታዎች
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold transition-all duration-300 hover:scale-105 bg-transparent"
                >
                  🔐 ግባ
                </Button>
              </Link>
              <Link href="/register">
                <Button className="ethiopian-gradient hover:opacity-90 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  ✨ ተመዝገብ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center amharic-text">🔍 ሁሉንም ጨረታዎች ያስሱ</h1>

        <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 mb-8 shadow-lg border border-yellow-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="search" className="text-gray-700 amharic-text">
                ጨረታ ፈልግ
              </Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="search"
                  type="text"
                  placeholder="ርዕስ፣ ድርጅት፣ አካባቢ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="category" className="text-gray-700 amharic-text">
                ምድብ
              </Label>
              <select
                id="category"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm amharic-text"
              >
                <option value="All">ሁሉም</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="status" className="text-gray-700 amharic-text">
                ሁኔታ
              </Label>
              <select
                id="status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm amharic-text"
              >
                <option value="All">ሁሉም</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filteredTenders.length === 0 ? (
          <Card className="bg-white/90 backdrop-blur-md shadow-xl border-yellow-200">
            <CardContent className="p-8 text-center">
              <p className="text-gray-700 text-lg amharic-text">ምንም ጨረታ አልተገኘም።</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTenders.map((tender) => (
              <div key={tender._id} className="group">
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform cursor-pointer overflow-hidden h-full">
                  <CardHeader className="bg-gradient-to-br from-gray-900 to-gray-700 text-white relative overflow-hidden">
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <Badge
                        className={`${
                          tender.category === "ግንባታ"
                            ? "bg-blue-500"
                            : tender.category === "ቴክኖሎጂ"
                              ? "bg-purple-500"
                              : "bg-orange-500"
                        } text-white font-semibold`}
                      >
                        {tender.category}
                      </Badge>
                      <div
                        className={`flex items-center text-sm font-semibold px-3 py-1 rounded-full ${
                          tender.status === "open"
                            ? "bg-green-500 text-white"
                            : tender.status === "closed"
                              ? "bg-red-500 text-white"
                              : "bg-yellow-500 text-white"
                        }`}
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        {tender.status === "open" ? "ክፍት" : tender.status === "closed" ? "ተዘግቷል" : "ተሸልሟል"}
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-tight mb-2 relative z-10 amharic-text">
                      {tender.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300 relative z-10 flex items-center amharic-text">
                      <Building className="w-4 h-4 mr-2" />
                      {tender.organization}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 bg-gradient-to-br from-white to-gray-50">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500 mb-1 flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            በጀት
                          </p>
                          <p className="text-xl font-bold text-green-600">{tender.budget.toLocaleString()} ብር</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-1 flex items-center justify-end">
                            <MapPin className="w-4 h-4 mr-1" />
                            አካባቢ
                          </p>
                          <p className="font-semibold text-gray-700 amharic-text">{tender.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          የመጨረሻ ቀን: {new Date(tender.deadline).toLocaleDateString("am-ET")}
                        </div>
                        <Link href={`/tenders/${tender._id}`}>
                          <Button className="ethiopian-gradient hover:opacity-90 text-white font-semibold transition-all duration-300 hover:scale-105">
                            🔍 ዝርዝር ይመልከቱ
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="ethiopian-gradient text-white py-8 relative overflow-hidden mt-auto">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <p className="text-white/80 amharic-text">&copy; 2024 የጨረታ አስተዳደር ስርዓት። ሁሉም መብቶች የተጠበቁ ናቸው። 🇪🇹</p>
        </div>
      </footer>
    </div>
  )
}
