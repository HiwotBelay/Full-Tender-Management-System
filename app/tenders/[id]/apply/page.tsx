"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, AlertCircle, CheckCircle } from "lucide-react"

export default function ApplyTenderPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({
    organizationName: "",
    contactPerson: "",
    email: "",
    phone: "",
    experience: "",
    proposedBudget: "",
    technicalCapability: "",
    financialCapacity: "",
    projectDescription: "",
    timeline: "",
    teamSize: "",
    previousProjects: "",
    certifications: "",
    equipment: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/tenders/${params.id}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          proposedBudget: Number.parseInt(formData.proposedBudget),
          experience: Number.parseInt(formData.experience),
          financialCapacity: Number.parseInt(formData.financialCapacity),
          teamSize: Number.parseInt(formData.teamSize),
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus("success")
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Submit error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-4">🎉 ተሳክቷል!</h2>
            <p className="text-gray-700 mb-6">ማመልከቻዎ በተሳካ ሁኔታ ተልኳል። ውጤቱን በቅርቡ እናሳውቅዎታለን።</p>
            <div className="space-y-3">
              <Link href="/dashboard">
                <Button className="w-full bg-green-600 hover:bg-green-700">ወደ ዳሽቦርድ ይሂዱ</Button>
              </Link>
              <Link href="/applications">
                <Button variant="outline" className="w-full">
                  ማመልከቻዎችን ይመልከቱ
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-green-200 sticky top-0 z-40 shadow-lg">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"></div>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 via-yellow-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-green-700 to-red-700 bg-clip-text text-transparent">
                የጨረታ አስተዳደር
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-700 hover:text-green-600">
                ዳሽቦርድ
              </Link>
              <Link href="/tenders" className="text-gray-700 hover:text-green-600">
                ጨረታዎች
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-red-700 bg-clip-text text-transparent mb-4">
              📝 የጨረታ ማመልከቻ ቅጽ
            </h1>
            <p className="text-gray-600 text-lg">ሁሉም መስኮች በትክክል መሞላት አለባቸው</p>
          </div>

          {/* Warning Card */}
          <Card className="mb-8 border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2">⚠️ አስፈላጊ ማስታወሻ</h3>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• ሁሉም መረጃዎች እውነተኛ እና ትክክል መሆን አለባቸው</li>
                    <li>• የተሳሳተ መረጃ ማመልከቻዎን ውድቅ ያደርገዋል</li>
                    <li>• ማመልከቻ ከተላከ በኋላ ማስተካከል አይቻልም</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Organization Information */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardTitle className="text-xl">🏢 የድርጅት መረጃ</CardTitle>
                <CardDescription className="text-blue-100">የድርጅትዎን መሰረታዊ መረጃ ያስገቡ</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="organizationName" className="text-base font-semibold">
                      የድርጅት ስም *
                    </Label>
                    <Input
                      id="organizationName"
                      value={formData.organizationName}
                      onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                      required
                      className="mt-2 h-11"
                      placeholder="የድርጅትዎን ሙሉ ስም ያስገቡ"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPerson" className="text-base font-semibold">
                      የመገናኛ ሰው *
                    </Label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      required
                      className="mt-2 h-11"
                      placeholder="ሙሉ ስም"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-base font-semibold">
                      ኢሜይል አድራሻ *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-2 h-11"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-base font-semibold">
                      ስልክ ቁጥር *
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="mt-2 h-11"
                      placeholder="+251-9-12-34-56-78"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technical Information */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <CardTitle className="text-xl">🔧 ቴክኒካል መረጃ</CardTitle>
                <CardDescription className="text-green-100">የቴክኒክ አቅምዎን እና ልምድዎን ያስገቡ</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="experience" className="text-base font-semibold">
                      የስራ ልምድ (በዓመት) *
                    </Label>
                    <Input
                      id="experience"
                      type="number"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      required
                      className="mt-2 h-11"
                      placeholder="10"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="teamSize" className="text-base font-semibold">
                      የቡድን መጠን *
                    </Label>
                    <Input
                      id="teamSize"
                      type="number"
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      required
                      className="mt-2 h-11"
                      placeholder="25"
                      min="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="technicalCapability" className="text-base font-semibold">
                      የቴክኒክ አቅም *
                    </Label>
                    <Select
                      value={formData.technicalCapability}
                      onValueChange={(value) => setFormData({ ...formData, technicalCapability: value })}
                    >
                      <SelectTrigger className="mt-2 h-11">
                        <SelectValue placeholder="ይምረጡ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">በጣም ጥሩ</SelectItem>
                        <SelectItem value="very_good">ጥሩ</SelectItem>
                        <SelectItem value="good">መካከለኛ</SelectItem>
                        <SelectItem value="fair">ተቀባይነት ያለው</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="equipment" className="text-base font-semibold">
                    የመሳሪያ ዝርዝር
                  </Label>
                  <Textarea
                    id="equipment"
                    value={formData.equipment}
                    onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                    className="mt-2"
                    rows={3}
                    placeholder="የሚገኙ መሳሪያዎችን ዘርዝሩ..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Financial Information */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
                <CardTitle className="text-xl">💰 የፋይናንስ መረጃ</CardTitle>
                <CardDescription className="text-yellow-100">የበጀት እና የፋይናንስ አቅምዎን ያስገቡ</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="proposedBudget" className="text-base font-semibold">
                      የተሰጠ በጀት (በብር) *
                    </Label>
                    <Input
                      id="proposedBudget"
                      type="number"
                      value={formData.proposedBudget}
                      onChange={(e) => setFormData({ ...formData, proposedBudget: e.target.value })}
                      required
                      className="mt-2 h-11"
                      placeholder="45000000"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="financialCapacity" className="text-base font-semibold">
                      የፋይናንስ አቅም (%) *
                    </Label>
                    <Input
                      id="financialCapacity"
                      type="number"
                      value={formData.financialCapacity}
                      onChange={(e) => setFormData({ ...formData, financialCapacity: e.target.value })}
                      required
                      className="mt-2 h-11"
                      placeholder="80"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Details */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <CardTitle className="text-xl">📋 የፕሮጀክት ዝርዝር</CardTitle>
                <CardDescription className="text-purple-100">የፕሮጀክት አቀራረብዎን ያስገቡ</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="projectDescription" className="text-base font-semibold">
                    የፕሮጀክት መግለጫ *
                  </Label>
                  <Textarea
                    id="projectDescription"
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                    required
                    className="mt-2"
                    rows={4}
                    placeholder="ፕሮጀክቱን እንዴት እንደሚያከናውኑት ያብራሩ..."
                  />
                </div>
                <div>
                  <Label htmlFor="timeline" className="text-base font-semibold">
                    የጊዜ ሰሌዳ *
                  </Label>
                  <Textarea
                    id="timeline"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    required
                    className="mt-2"
                    rows={3}
                    placeholder="ፕሮጀክቱ የሚወስደውን ጊዜ ያብራሩ..."
                  />
                </div>
                <div>
                  <Label htmlFor="previousProjects" className="text-base font-semibold">
                    ቀደም ያከናወኗቸው ፕሮጀክቶች
                  </Label>
                  <Textarea
                    id="previousProjects"
                    value={formData.previousProjects}
                    onChange={(e) => setFormData({ ...formData, previousProjects: e.target.value })}
                    className="mt-2"
                    rows={3}
                    placeholder="ተመሳሳይ ፕሮጀክቶችን ዘርዝሩ..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <p>* የተመለከቱት መስኮች መሞላት አለባቸው</p>
                  </div>
                  <div className="flex space-x-4">
                    <Link href={`/tenders/${params.id}`}>
                      <Button variant="outline" type="button">
                        ተመለስ
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-white px-8"
                    >
                      {isSubmitting ? "⏳ በመላክ ላይ..." : "🚀 ማመልከቻ ላክ"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  )
}
