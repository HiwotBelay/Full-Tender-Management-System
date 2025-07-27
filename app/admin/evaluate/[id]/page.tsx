"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Users, DollarSign, Trophy, Star } from "lucide-react"

export default function EvaluateTenderPage({ params }: { params: { id: string } }) {
  const [applications, setApplications] = useState([])
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [evaluationResults, setEvaluationResults] = useState(null)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await fetch(`/api/tenders/${params.id}/apply`)
      const data = await response.json()
      if (data.success) {
        setApplications(data.applications)
      }
    } catch (error) {
      console.error("Fetch applications error:", error)
    }
  }

  const handleEvaluate = async () => {
    setIsEvaluating(true)
    try {
      const response = await fetch(`/api/tenders/${params.id}/evaluate`, {
        method: "POST",
      })
      const data = await response.json()
      if (data.success) {
        setEvaluationResults(data.results)
      }
    } catch (error) {
      console.error("Evaluation error:", error)
    } finally {
      setIsEvaluating(false)
    }
  }

  if (evaluationResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
        <header className="bg-white/95 backdrop-blur-md border-b border-green-200 sticky top-0 z-40 shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"></div>
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 via-yellow-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-green-700 to-red-700 bg-clip-text text-transparent">
                  የጨረታ አስተዳደር - አድሚን
                </span>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Results Header */}
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-red-700 bg-clip-text text-transparent mb-4">
                🏆 የጨረታ ውጤት ማሳወቂያ
              </h1>
              <p className="text-xl text-gray-600">ጨረታ ቁጥር: {params.id}</p>
            </div>

            {/* Winner Announcement */}
            <Card className="mb-8 border-0 shadow-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-600 text-white text-center py-8">
                <div className="text-6xl mb-4">🎉</div>
                <CardTitle className="text-3xl font-bold mb-2">አሸናፊ ተወስኗል!</CardTitle>
                <CardDescription className="text-yellow-100 text-lg">በጨረታ ግምገማ መሰረት የሚከተለው ድርጅት አሸንፏል</CardDescription>
              </CardHeader>
              <CardContent className="p-8 bg-gradient-to-br from-yellow-50 to-orange-50">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Trophy className="w-12 h-12 text-yellow-600 mr-3" />
                    <h2 className="text-3xl font-bold text-gray-900">{evaluationResults.winner.applicantName}</h2>
                  </div>
                  <p className="text-xl text-gray-700 mb-4">{evaluationResults.winner.organizationName}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="text-center">
                      <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">የተሰጠ በጀት</p>
                      <p className="text-2xl font-bold text-green-600">
                        {evaluationResults.winner.proposedBudget.toLocaleString()} ብር
                      </p>
                    </div>
                    <div className="text-center">
                      <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">የግምገማ ነጥብ</p>
                      <p className="text-2xl font-bold text-blue-600">{evaluationResults.winner.evaluationScore}/100</p>
                    </div>
                    <div className="text-center">
                      <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">ደረጃ</p>
                      <p className="text-2xl font-bold text-yellow-600">1ኛ</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* All Results */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardTitle className="text-2xl">📊 ሙሉ የግምገማ ውጤት</CardTitle>
                <CardDescription className="text-blue-100">
                  ጠቅላላ አመልካቾች: {evaluationResults.totalApplications}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ደረጃ</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">የድርጅት ስም</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">የተሰጠ በጀት</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">የግምገማ ነጥብ</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ሁኔታ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {evaluationResults.allResults.map((result, index) => (
                        <tr key={result.id} className={index === 0 ? "bg-yellow-50" : "hover:bg-gray-50"}>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {index === 0 && <Trophy className="w-5 h-5 text-yellow-600 mr-2" />}
                              <span
                                className={`text-lg font-bold ${index === 0 ? "text-yellow-600" : "text-gray-900"}`}
                              >
                                {result.rank}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-semibold text-gray-900">{result.applicantName}</p>
                              <p className="text-sm text-gray-600">{result.organizationName}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-semibold text-green-600">{result.proposedBudget}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-bold text-blue-600">{result.evaluationScore}/100</span>
                          </td>
                          <td className="px-6 py-4">
                            <Badge
                              className={
                                result.status === "winner"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }
                            >
                              {result.status === "winner" ? "🏆 አሸናፊ" : "📋 ተገምግሟል"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-center space-x-4">
              <Link href="/admin/dashboard">
                <Button className="bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-white px-8">
                  ወደ አድሚን ዳሽቦርድ
                </Button>
              </Link>
              <Link href={`/tenders/${params.id}/results`}>
                <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8">
                  ውጤት ለሕዝብ አሳይ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <header className="bg-white/95 backdrop-blur-md border-b border-green-200 sticky top-0 z-40 shadow-lg">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"></div>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 via-yellow-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-green-700 to-red-700 bg-clip-text text-transparent">
                የጨረታ አስተዳደር - አድሚን
              </span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-red-700 bg-clip-text text-transparent mb-4">
              📊 የጨረታ ግምገማ
            </h1>
            <p className="text-gray-600 text-lg">ጨረታ ቁጥር: {params.id}</p>
          </div>

          {applications.length === 0 ? (
            <Card className="border-0 shadow-xl">
              <CardContent className="p-12 text-center">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">ምንም ማመልከቻ አልተገኘም</h3>
                <p className="text-gray-600">ለዚህ ጨረታ ገና ማንም አላመለከተም።</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="mb-8 border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <CardTitle className="text-xl">📋 የተቀበሉ ማመልከቻዎች</CardTitle>
                  <CardDescription className="text-blue-100">ጠቅላላ: {applications.length} ማመልከቻዎች</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {applications.map((app, index) => (
                      <div key={app.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{app.applicantName}</h3>
                            <p className="text-gray-600">{app.organizationName}</p>
                            <p className="text-sm text-gray-500">
                              የተላከበት ጊዜ: {new Date(app.submittedAt).toLocaleDateString("am-ET")}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">
                              {app.proposedBudget?.toLocaleString()} ብር
                            </p>
                            <Badge className="bg-blue-100 text-blue-800">
                              {app.status === "submitted" ? "ተልኳል" : app.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">🔍 ጨረታ ግምገማ ጀምር</h3>
                  <p className="text-gray-600 mb-6">ስርዓቱ በአውቶማቲክ ሁሉንም ማመልከቻዎች ይገመግማል እና አሸናፊውን ይወስናል</p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-yellow-800 mb-2">የግምገማ መስፈርቶች:</h4>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• የዋጋ ግምገማ (40% ክብደት) - ዝቅተኛ ዋጋ ያቀረበ</li>
                      <li>• የልምድ ግምገማ (25% ክብደት) - የስራ ልምድ</li>
                      <li>• የቴክኒክ አቅም (20% ክብደት) - ቴክኒካል ችሎታ</li>
                      <li>• የፋይናንስ አቅም (15% ክብደት) - የገንዘብ አቅም</li>
                    </ul>
                  </div>
                  <Button
                    onClick={handleEvaluate}
                    disabled={isEvaluating}
                    className="bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-white px-12 py-3 text-lg"
                  >
                    {isEvaluating ? "⏳ በግምገማ ላይ..." : "🚀 ግምገማ ጀምር"}
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
