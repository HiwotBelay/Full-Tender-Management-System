"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { getMyApplications, getUserInfo } from "@/lib/api"
import { FileText, Clock, Building, DollarSign, CheckCircle, XCircle, Hourglass } from "lucide-react"

interface User {
  _id: string
  username: string
  email: string
  role: string
}

interface Application {
  _id: string
  tender: {
    _id: string
    title: string
    organization: string
    budget: number
    deadline: string
  }
  proposal: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    const fetchUserData = async () => {
      try {
        const userInfo = getUserInfo()
        if (userInfo) {
          setUser(userInfo)
          if (userInfo.role === "applicant") {
            const userApplications = await getMyApplications(token)
            setApplications(userApplications)
          } else if (userInfo.role === "admin") {
            // Admins might see a different dashboard or a link to the admin panel
            router.push("/admin/dashboard") // Redirect admin to their specific dashboard
          }
        } else {
          router.push("/login")
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch dashboard data.")
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-yellow-600 to-red-700">
        <div className="ethiopian-spinner"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-900 via-yellow-600 to-red-700 text-white p-4">
        <p className="text-xl amharic-text">{error}</p>
        <Button onClick={() => router.push("/login")} className="mt-4 ethiopian-gradient">
          ወደ መግቢያ ገጽ ይሂዱ
        </Button>
      </div>
    )
  }

  if (!user) {
    return null // Should not happen due to redirect, but for safety
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
                href="/tenders"
                className="text-gray-700 hover:text-green-600 font-medium transition-all duration-300 hover:scale-105"
              >
                ጨረታዎች
              </Link>
              {user.role === "admin" && (
                <Link
                  href="/admin/dashboard"
                  className="text-gray-700 hover:text-green-600 font-medium transition-all duration-300 hover:scale-105"
                >
                  አስተዳዳሪ ፓነል
                </Link>
              )}
            </nav>
            <div className="flex items-center space-x-3">
              <span className="text-gray-700 font-semibold amharic-text hidden md:block">
                እንኳን ደህና መጡ, {user.username}!
              </span>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-2 border-red-600 text-red-600 hover:bg-red-50 font-semibold transition-all duration-300 hover:scale-105 bg-transparent"
              >
                🚪 ውጣ
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center amharic-text">
          👋 እንኳን ደህና መጡ, {user.username}!
        </h1>

        {user.role === "applicant" && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white amharic-text">📋 የእኔ ማመልከቻዎች</h2>
              <Link href="/tenders">
                <Button className="ethiopian-gradient hover:opacity-90 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105">
                  ተጨማሪ ጨረታዎችን ይመልከቱ →
                </Button>
              </Link>
            </div>

            {applications.length === 0 ? (
              <Card className="bg-white/90 backdrop-blur-md shadow-xl border-yellow-200">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-700 text-lg amharic-text">እስካሁን ምንም ማመልከቻ አላስገቡም።</p>
                  <Link href="/tenders">
                    <Button className="mt-6 ethiopian-gradient">ጨረታዎችን ያስሱ</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {applications.map((app) => (
                  <Card
                    key={app._id}
                    className="bg-white/90 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 border-yellow-200"
                  >
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-gray-800 amharic-text">{app.tender.title}</CardTitle>
                      <CardDescription className="text-gray-600 flex items-center amharic-text">
                        <Building className="w-4 h-4 mr-2" />
                        {app.tender.organization}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-gray-700">
                        <span className="flex items-center amharic-text">
                          <DollarSign className="w-4 h-4 mr-2" />
                          በጀት:{" "}
                          <span className="font-semibold text-green-600 ml-1">
                            {app.tender.budget.toLocaleString()} ብር
                          </span>
                        </span>
                        <span className="flex items-center amharic-text">
                          <Clock className="w-4 h-4 mr-2" />
                          የመጨረሻ ቀን: {new Date(app.tender.deadline).toLocaleDateString("am-ET")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge
                          className={`font-semibold text-white ${
                            app.status === "approved"
                              ? "bg-green-500"
                              : app.status === "rejected"
                                ? "bg-red-500"
                                : "bg-yellow-500"
                          }`}
                        >
                          {app.status === "approved" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {app.status === "rejected" && <XCircle className="w-3 h-3 mr-1" />}
                          {app.status === "pending" && <Hourglass className="w-3 h-3 mr-1" />}
                          {app.status === "pending" ? "በሂደት ላይ" : app.status === "approved" ? "ጸድቋል" : "ውድቅ ተደርጓል"}
                        </Badge>
                        <Link href={`/tenders/${app.tender._id}`}>
                          <Button
                            variant="outline"
                            className="border-green-600 text-green-600 hover:bg-green-50 amharic-text bg-transparent"
                          >
                            ዝርዝር ይመልከቱ
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        )}

        {user.role === "admin" && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 amharic-text">📊 የአስተዳዳሪ አጠቃላይ እይታ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur-md shadow-xl border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800 amharic-text">የጨረታ አስተዳደር</CardTitle>
                  <CardDescription className="text-gray-600 amharic-text">
                    ሁሉንም ጨረታዎች ይመልከቱ፣ ይፍጠሩ፣ ያርትዑ እና ይሰርዙ።
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/tenders">
                    <Button className="ethiopian-gradient w-full">ጨረታዎችን ያስተዳድሩ</Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur-md shadow-xl border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800 amharic-text">የማመልከቻ ግምገማ</CardTitle>
                  <CardDescription className="text-gray-600 amharic-text">
                    የቀረቡ ማመልከቻዎችን ይገምግሙ እና ሁኔታቸውን ያዘምኑ።
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/applications">
                    <Button className="ethiopian-gradient w-full">ማመልከቻዎችን ይገምግሙ</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>
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
