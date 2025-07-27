"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Search, Plus, Users, DollarSign, Calendar, Bell, Star } from "lucide-react"

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const stats = [
    {
      title: "🏗️ ንቁ ጨረታዎች",
      value: "12",
      change: "+2 ከዚህ ሳምንት",
      icon: "🏗️",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
    },
    {
      title: "📤 የተላኩ ጥያቄዎች",
      value: "8",
      change: "+3 ከዚህ ሳምንት",
      icon: "📤",
      color: "from-green-500 to-green-600",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
    },
    {
      title: "⏳ በመጠባበቅ ላይ",
      value: "5",
      change: "ምላሽ በመጠባበቅ ላይ",
      icon: "⏳",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
    },
    {
      title: "🏆 የተሳካ ጨረታዎች",
      value: "15",
      change: "በዚህ ወር",
      icon: "🏆",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
    },
  ]

  const recentTenders = [
    {
      id: "T001",
      title: "🛣️ የመንገድ ግንባታ ፕሮጀክት",
      organization: "የአዲስ አበባ ከተማ አስተዳደር",
      status: "ንቁ",
      deadline: "2024-02-15",
      budget: "50,000,000 ብር",
      applicants: 12,
      priority: "high",
      category: "ግንባታ",
    },
    {
      id: "T002",
      title: "💻 የኮምፒውተር እቃዎች ግዢ",
      organization: "የትምህርት ሚኒስቴር",
      status: "በመጠባበቅ ላይ",
      deadline: "2024-02-20",
      budget: "25,000,000 ብር",
      applicants: 8,
      priority: "medium",
      category: "ቴክኖሎጂ",
    },
    {
      id: "T003",
      title: "🧹 የጽዳት አገልግሎት",
      organization: "የጤና ሚኒስቴር",
      status: "ተዘግቷል",
      deadline: "2024-01-30",
      budget: "5,000,000 ብር",
      applicants: 15,
      priority: "low",
      category: "አገልግሎት",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ንቁ":
        return "bg-green-100 text-green-800 border border-green-200"
      case "በመጠባበቅ ላይ":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200"
      case "ተዘግቷል":
        return "bg-gray-100 text-gray-800 border border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-green-200 sticky top-0 z-40 shadow-lg">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"></div>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 via-yellow-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <span className="font-bold text-lg bg-gradient-to-r from-green-700 to-red-700 bg-clip-text text-transparent">
                    የጨረታ አስተዳደር
                  </span>
                  <p className="text-xs text-gray-600">🇪🇹 ዳሽቦርድ</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative hover:bg-green-50">
                <Bell className="w-4 h-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-bold">አ</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 relative">
          <div className="bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
              <Star className="w-full h-full animate-pulse" />
            </div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold mb-2">🎉 እንኳን ደህና መጡ!</h1>
              <p className="text-xl text-white/90">የጨረታ አስተዳደር ዳሽቦርድዎ - ዛሬ ምን ይሰራሉ?</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <CardContent className={`p-6 ${stat.bgColor} relative`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">{stat.title}</p>
                    <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{stat.change}</p>
                  </div>
                  <div className="text-4xl opacity-80">{stat.icon}</div>
                </div>
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color}`}></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-600 to-yellow-600 text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold flex items-center">🏗️ የቅርብ ጊዜ ጨረታዎች</CardTitle>
                  <Link href="/tenders">
                    <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0">
                      ሁሉንም ይመልከቱ
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {recentTenders.map((tender, index) => (
                    <div
                      key={tender.id}
                      className={`flex items-center justify-between p-6 hover:bg-gray-50 transition-colors ${
                        index !== recentTenders.length - 1 ? "border-b" : ""
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`w-3 h-3 rounded-full ${getPriorityColor(tender.priority)}`}></div>
                          <h3 className="font-bold text-gray-900 text-lg">{tender.title}</h3>
                          <Badge className={getStatusColor(tender.status)}>{tender.status}</Badge>
                        </div>
                        <p className="text-gray-600 mb-2 flex items-center">🏢 {tender.organization}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {tender.deadline}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {tender.budget}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {tender.applicants} አመልካቾች
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-white"
                      >
                        🔍 ዝርዝር
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Quick Actions Card */}
            <Card className="border-0 shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                <CardTitle className="text-xl font-bold flex items-center">⚡ ፈጣን እርምጃዎች</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <Link href="/tenders/create">
                  <Button className="w-full justify-start bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-white font-semibold h-12 transition-all duration-300 hover:scale-105">
                    <Plus className="w-5 h-5 mr-3" />🆕 አዲስ ጨረታ ፍጠር
                  </Button>
                </Link>
                <Link href="/tenders">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold h-12 transition-all duration-300 hover:scale-105"
                  >
                    <Search className="w-5 h-5 mr-3" />🔍 ጨረታዎችን ፈልግ
                  </Button>
                </Link>
                <Link href="/applications">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold h-12 transition-all duration-300 hover:scale-105"
                  >
                    <FileText className="w-5 h-5 mr-3" />📋 የእኔ ማመልከቻዎች
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Notifications Card */}
            <Card className="border-0 shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <CardTitle className="text-xl font-bold flex items-center">🔔 ማሳወቂያዎች</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <div className="text-2xl">🆕</div>
                    <div>
                      <p className="text-sm font-bold text-blue-900">አዲስ ጨረታ ታትሟል</p>
                      <p className="text-xs text-blue-700">የመንገድ ግንባታ ፕሮጀክት</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                    <div className="text-2xl">⏰</div>
                    <div>
                      <p className="text-sm font-bold text-yellow-900">የማመልከቻ ጊዜ ገደብ</p>
                      <p className="text-xs text-yellow-700">3 ቀናት ቀርተዋል</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                    <div className="text-2xl">✅</div>
                    <div>
                      <p className="text-sm font-bold text-green-900">ማመልከቻ ተቀባይነት አግኝቷል</p>
                      <p className="text-xs text-green-700">የጽዳት አገልግሎት</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievement Card */}
            <Card className="border-0 shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                <CardTitle className="text-xl font-bold flex items-center">🏆 የእርስዎ ስኬቶች</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">🎯 የተሳካ ጨረታዎች</span>
                    <span className="font-bold text-green-600">15</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">⭐ አማካይ ደረጃ</span>
                    <span className="font-bold text-yellow-600">4.8/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">📈 የዚህ ወር እድገት</span>
                    <span className="font-bold text-blue-600">+25%</span>
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
