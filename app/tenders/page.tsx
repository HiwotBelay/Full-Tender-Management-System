"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Search, DollarSign, Users, MapPin, Clock, Building } from "lucide-react"

export default function TendersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const tenders = [
    {
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
      description: "የከተማው ዋና መንገዶች ግንባታ እና ማሻሻያ ስራ",
    },
    {
      id: "T002",
      title: "የኮምፒውተር እና ቴክኖሎጂ እቃዎች ግዢ",
      organization: "የትምህርት ሚኒስቴር",
      category: "ቴክኖሎጂ",
      status: "ንቁ",
      publishDate: "2024-01-20",
      deadline: "2024-02-20",
      budget: "25,000,000 ብር",
      location: "አዲስ አበባ",
      applicants: 8,
      description: "ለትምህርት ቤቶች የኮምፒውተር እና ቴክኖሎጂ እቃዎች ግዢ",
    },
    {
      id: "T003",
      title: "የጽዳት እና የአካባቢ ጥበቃ አገልግሎት",
      organization: "የጤና ሚኒስቴር",
      category: "አገልግሎት",
      status: "በመጠባበቅ ላይ",
      publishDate: "2024-01-10",
      deadline: "2024-01-30",
      budget: "5,000,000 ብር",
      location: "አዲስ አበባ",
      applicants: 15,
      description: "የጤና ተቋማት ጽዳት እና የአካባቢ ጥበቃ አገልግሎት",
    },
    {
      id: "T004",
      title: "የውሃ ቧንቧ ዝርጋታ ፕሮጀክት",
      organization: "የውሃ ሚኒስቴር",
      category: "ግንባታ",
      status: "ንቁ",
      publishDate: "2024-01-25",
      deadline: "2024-03-01",
      budget: "75,000,000 ብር",
      location: "ባህር ዳር",
      applicants: 6,
      description: "የገጠር አካባቢ የውሃ ቧንቧ ዝርጋታ እና ማሻሻያ ስራ",
    },
    {
      id: "T005",
      title: "የመድሃኒት እና የሕክምና እቃዎች ግዢ",
      organization: "የጤና ሚኒስቴር",
      category: "ጤና",
      status: "ንቁ",
      publishDate: "2024-01-18",
      deadline: "2024-02-25",
      budget: "30,000,000 ብር",
      location: "አዲስ አበባ",
      applicants: 10,
      description: "ለመንግስት ሆስፒታሎች የመድሃኒት እና የሕክምና እቃዎች ግዢ",
    },
    {
      id: "T006",
      title: "የትምህርት ቤት ግንባታ ፕሮጀክት",
      organization: "የትምህርት ሚኒስቴር",
      category: "ግንባታ",
      status: "ተዘግቷል",
      publishDate: "2023-12-01",
      deadline: "2024-01-15",
      budget: "40,000,000 ብር",
      location: "ሐዋሳ",
      applicants: 18,
      description: "የአዲስ የመጀመሪያ ደረጃ ትምህርት ቤት ግንባታ",
    },
  ]

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

  const filteredTenders = tenders.filter((tender) => {
    const matchesSearch =
      tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tender.organization.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !categoryFilter || tender.category === categoryFilter
    const matchesStatus = !statusFilter || tender.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

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
              <Link href="/tenders" className="text-green-600 font-medium">
                ጨረታዎች
              </Link>
              <Link href="/applications" className="text-gray-700 hover:text-green-600">
                ማመልከቻዎች
              </Link>
            </nav>
            <Link href="/tenders/create">
              <Button className="bg-green-600 hover:bg-green-700">አዲስ ጨረታ ፍጠር</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ጨረታዎች</h1>
          <p className="text-gray-600">ሁሉም የሚገኙ ጨረታዎች እና የግዢ እድሎች</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="ጨረታዎችን ይፈልጉ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-11"
                  />
                </div>
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="ምድብ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ሁሉም ምድቦች</SelectItem>
                  <SelectItem value="ግንባታ">ግንባታ</SelectItem>
                  <SelectItem value="ቴክኖሎጂ">ቴክኖሎጂ</SelectItem>
                  <SelectItem value="አገልግሎት">አገልግሎት</SelectItem>
                  <SelectItem value="ጤና">ጤና</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="ሁኔታ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ሁሉም ሁኔታዎች</SelectItem>
                  <SelectItem value="ንቁ">ንቁ</SelectItem>
                  <SelectItem value="በመጠባበቅ ላይ">በመጠባበቅ ላይ</SelectItem>
                  <SelectItem value="ተዘግቷል">ተዘግቷል</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">{filteredTenders.length} ጨረታዎች ተገኝተዋል</p>
        </div>

        {/* Tenders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTenders.map((tender) => (
            <Card key={tender.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Badge className={getCategoryColor(tender.category)}>{tender.category}</Badge>
                    <Badge className={getStatusColor(tender.status)}>{tender.status}</Badge>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {tender.deadline}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-xl leading-tight mb-2">{tender.title}</CardTitle>
                <CardDescription className="flex items-center text-gray-600 mb-2">
                  <Building className="w-4 h-4 mr-1" />
                  {tender.organization}
                </CardDescription>
                <p className="text-sm text-gray-600 line-clamp-2">{tender.description}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <DollarSign className="w-3 h-3 mr-1" />
                      በጀት
                    </div>
                    <p className="font-semibold text-green-600">{tender.budget}</p>
                  </div>
                  <div>
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      አካባቢ
                    </div>
                    <p className="font-semibold">{tender.location}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    {tender.applicants} አመልካቾች
                  </div>
                  <div className="flex space-x-2">
                    <Link href={`/tenders/${tender.id}`}>
                      <Button variant="outline" size="sm">
                        ዝርዝር ይመልከቱ
                      </Button>
                    </Link>
                    {tender.status === "ንቁ" && (
                      <Link href={`/tenders/${tender.id}/apply`}>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          ማመልከት
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTenders.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">ምንም ጨረታ አልተገኘም</h3>
            <p className="text-gray-600 mb-4">የፍለጋ መስፈርቶችዎን ይቀይሩ እና እንደገና ይሞክሩ</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setCategoryFilter("")
                setStatusFilter("")
              }}
            >
              ማጣሪያዎችን አጽዳ
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
