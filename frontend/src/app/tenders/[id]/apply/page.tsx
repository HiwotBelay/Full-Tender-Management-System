"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { getTenderById, applyForTender, getUserInfo } from "@/lib/api"
import { FileText, Building, DollarSign, Clock, MapPin } from "lucide-react"

interface Tender {
  _id: string
  title: string
  organization: string
  budget: number
  deadline: string
  location: string
}

export default function ApplyPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [tender, setTender] = useState<Tender | null>(null)
  const [proposal, setProposal] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()
  const user = getUserInfo()

  useEffect(() => {
    if (!user || user.role !== "applicant") {
      router.push("/login") // Redirect if not logged in or not an applicant
      return
    }

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
  }, [id, router, user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setSubmitting(true)
    const token = localStorage.getItem("token")

    if (!token) {
      setError("You must be logged in to apply.")
      setSubmitting(false)
      router.push("/login")
      return
    }

    try {
      await applyForTender(id, proposal, token)
      setSuccess("ማመልከቻዎ በተሳካ ሁኔታ ገብቷል!")
      setProposal("")
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (err: any) {
      setError(err.message || "ማመልከቻ ማስገባት አልተቻለም። እባክዎ እንደገና ይሞክሩ።")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-yellow-600 to-red-700">
        <div className="ethiopian-spinner"></div>
      </div>
    )
  }

  if (error && !tender) {
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
        <Card className="w-full max-w-2xl mx-auto bg-white/95 backdrop-blur-md shadow-2xl border-yellow-200">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl font-bold text-gray-800 amharic-text">ለጨረታ ያመልክቱ: {tender.title}</CardTitle>
            <CardDescription className="text-gray-600 amharic-text">
              የጨረታውን ዝርዝር መረጃ ይገምግሙ እና ማመልከቻዎን ያስገቡ።
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 border-b pb-4 mb-4">
              <div className="flex items-center">
                <Building className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-semibold amharic-text">ድርጅት:</span>{" "}
                <span className="ml-1 amharic-text">{tender.organization}</span>
              </div>
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
                <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                <span className="font-semibold amharic-text">አካባቢ:</span>{" "}
                <span className="ml-1 amharic-text">{tender.location}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="proposal" className="text-gray-700 amharic-text">
                  የእርስዎ ሀሳብ/ፕሮፖዛል
                </Label>
                <Textarea
                  id="proposal"
                  placeholder="እባክዎ ለዚህ ጨረታ ያለዎትን ብቃት እና ሀሳብ በዝርዝር ያስገቡ..."
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                  required
                  rows={8}
                  className="mt-1"
                />
              </div>
              {error && <p className="text-red-500 text-sm text-center amharic-text">{error}</p>}
              {success && <p className="text-green-500 text-sm text-center amharic-text">{success}</p>}
              <div className="flex justify-end gap-4">
                <Button
                  type="submit"
                  className="ethiopian-gradient hover:opacity-90 text-white font-semibold py-2 shadow-lg transition-all duration-300"
                  disabled={submitting}
                >
                  {submitting ? "በማስገባት ላይ..." : "ማመልከቻ አስገባ"}
                </Button>
                <Button
                  type="button"
                  onClick={() => router.back()}
                  variant="outline"
                  className="border-2 border-gray-600 text-gray-600 hover:bg-gray-50 font-semibold transition-all duration-300 bg-transparent"
                >
                  ተመለስ
                </Button>
              </div>
            </form>
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
