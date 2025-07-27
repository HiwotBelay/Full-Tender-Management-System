import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, Star } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-yellow-600 to-red-700 relative overflow-hidden">
      {/* Ethiopian Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-white/95 backdrop-blur-md border-b border-yellow-200 sticky top-0 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 via-yellow-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
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
                href="#tenders"
                className="text-gray-700 hover:text-green-600 font-medium transition-all duration-300 hover:scale-105"
              >
                ጨረታዎች
              </Link>
              <Link
                href="#about"
                className="text-gray-700 hover:text-green-600 font-medium transition-all duration-300 hover:scale-105"
              >
                ስለ እኛ
              </Link>
              <Link
                href="#contact"
                className="text-gray-700 hover:text-green-600 font-medium transition-all duration-300 hover:scale-105"
              >
                ያግኙን
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold transition-all duration-300 hover:scale-105"
                >
                  ግባ
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  ተመዝገብ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Ethiopian Star Pattern */}
        <div className="absolute top-20 right-20 w-32 h-32 opacity-20">
          <Star className="w-full h-full text-yellow-300 animate-pulse" />
        </div>
        <div className="absolute bottom-20 left-20 w-24 h-24 opacity-20">
          <Star className="w-full h-full text-yellow-300 animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Ethiopian Flag Accent */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-1">
                <div className="w-3 h-16 bg-green-500 rounded-full"></div>
                <div className="w-3 h-16 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-16 bg-red-500 rounded-full"></div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              <span className="inline-block transform hover:scale-105 transition-transform duration-300">
                <span className="bg-gradient-to-r from-green-300 to-green-100 bg-clip-text text-transparent">ግልጽ</span>
              </span>{" "}
              እና{" "}
              <span className="inline-block transform hover:scale-105 transition-transform duration-300">
                <span className="bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                  ቀልጣፋ
                </span>
              </span>
              <br />
              <span className="inline-block transform hover:scale-105 transition-transform duration-300">
                <span className="bg-gradient-to-r from-red-300 to-red-100 bg-clip-text text-transparent">
                  የጨረታ አስተዳደር
                </span>
              </span>
            </h1>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12 border border-white/20 shadow-2xl">
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium">
                🏗️ ለመንግስት እና ለግል ድርጅቶች የተዘጋጀ ሙሉ በሙሉ በአማርኛ የተዘጋጀ የጨረታ አስተዳደር ስርዓት
                <br />
                <span className="text-yellow-200">🌟 ግልጽነትን፣ ተደራሽነትን እና ተሳትፎን ለማሳደግ የተዘጋጀ</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 hover:from-green-600 hover:via-yellow-600 hover:to-red-600 text-white px-12 py-4 text-lg font-bold shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl rounded-xl"
                >
                  🚀 አሁኑኑ ተመዝገብ
                </Button>
              </Link>
              <Link href="/tenders">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-12 py-4 text-lg font-bold backdrop-blur-md transition-all duration-300 hover:scale-110 rounded-xl"
                >
                  🔍 ጨረታዎችን ይመልከቱ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Ethiopian Design */}
      <section className="py-20 bg-white relative">
        {/* Ethiopian Pattern Border */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"></div>

        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-red-700 bg-clip-text text-transparent mb-4">
              🏆 የእኛ ስኬቶች
            </h2>
            <p className="text-xl text-gray-600">በኢትዮጵያ ውስጥ የጨረታ አስተዳደር መሪ ስርዓት</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: "🏗️",
                number: "1,250+",
                label: "ንቁ ጨረታዎች",
                color: "from-green-500 to-green-600",
                bgColor: "bg-green-50",
              },
              {
                icon: "🏢",
                number: "850+",
                label: "የተመዘገቡ ድርጅቶች",
                color: "from-yellow-500 to-yellow-600",
                bgColor: "bg-yellow-50",
              },
              {
                icon: "🛡️",
                number: "100%",
                label: "ግልጽነት",
                color: "from-red-500 to-red-600",
                bgColor: "bg-red-50",
              },
              {
                icon: "📈",
                number: "95%",
                label: "የተሳካ ፕሮጀክቶች",
                color: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-50",
              },
            ].map((stat, index) => (
              <div key={index} className="group">
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform cursor-pointer overflow-hidden">
                  <CardContent className={`p-8 text-center ${stat.bgColor} relative`}>
                    <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <h3
                      className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                    >
                      {stat.number}
                    </h3>
                    <p className="text-gray-700 font-semibold text-lg">{stat.label}</p>
                    <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color}`}></div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Ethiopian Cultural Elements */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50 relative">
        {/* Ethiopian Coffee Bean Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-8 h-8 bg-amber-800 rounded-full"></div>
          <div className="absolute top-32 right-20 w-6 h-6 bg-amber-800 rounded-full"></div>
          <div className="absolute bottom-20 left-32 w-10 h-10 bg-amber-800 rounded-full"></div>
          <div className="absolute bottom-40 right-10 w-4 h-4 bg-amber-800 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-red-700 bg-clip-text text-transparent mb-6">
              ✨ ዋና ዋና ባህሪያት
            </h2>
            <p className="text-xl text-gray-600">የጨረታ አስተዳደር ስርዓታችን የሚያቀርባቸው ልዩ አገልግሎቶች</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: "🔍",
                title: "ቀላል ፍለጋ",
                description: "በተለያዩ መስፈርቶች ጨረታዎችን በቀላሉ ይፈልጉ እና ያግኙ። የላቀ ፍለጋ ባህሪያት እና ማጣሪያዎች።",
                gradient: "from-blue-500 to-cyan-500",
                pattern: "🔎🔍🔎",
              },
              {
                icon: "📋",
                title: "ቀላል አስተዳደር",
                description: "ጨረታዎችን በቀላሉ ይፍጠሩ፣ ያስተዳድሩ እና ይከታተሉ። ሙሉ የሰነድ አስተዳደር እና የሂደት ክትትል።",
                gradient: "from-green-500 to-emerald-500",
                pattern: "📊📈📋",
              },
              {
                icon: "🛡️",
                title: "ደህንነት",
                description: "የላቀ ደህንነት እና ግላዊነት ጥበቃ። ሙሉ በሙሉ የተመሰጠረ እና የተጠበቀ ስርዓት።",
                gradient: "from-red-500 to-pink-500",
                pattern: "🔒🛡️🔐",
              },
            ].map((feature, index) => (
              <div key={index} className="group">
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform cursor-pointer overflow-hidden h-full">
                  <CardHeader className={`bg-gradient-to-br ${feature.gradient} text-white relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 text-6xl opacity-20 transform rotate-12">
                      {feature.pattern}
                    </div>
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 relative z-10">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold relative z-10">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 bg-white">
                    <p className="text-gray-700 leading-relaxed text-lg">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Tenders with Ethiopian Construction Theme */}
      <section id="tenders" className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-red-700 bg-clip-text text-transparent mb-4">
                🏗️ የቅርብ ጊዜ ጨረታዎች
              </h2>
              <p className="text-xl text-gray-600">በኢትዮጵያ ውስጥ የሚገኙ ዋና ዋና የግንባታ እና የልማት ፕሮጀክቶች</p>
            </div>
            <Link href="/tenders">
              <Button className="bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105">
                ሁሉንም ይመልከቱ →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "🛣️ የመንገድ ግንባታ ፕሮጀክት",
                organization: "የአዲስ አበባ ከተማ አስተዳደር",
                budget: "50,000,000 ብር",
                deadline: "15 ቀናት",
                category: "ግንባታ",
                image: "🏗️",
                location: "አዲስ አበባ",
                urgency: "high",
              },
              {
                title: "💻 የኮምፒውተር እቃዎች ግዢ",
                organization: "የትምህርት ሚኒስቴር",
                budget: "25,000,000 ብር",
                deadline: "8 ቀናት",
                category: "ቴክኖሎጂ",
                image: "💻",
                location: "አዲስ አበባ",
                urgency: "medium",
              },
              {
                title: "🧹 የጽዳት አገልግሎት",
                organization: "የጤና ሚኒስቴር",
                budget: "5,000,000 ብር",
                deadline: "22 ቀናት",
                category: "አገልግሎት",
                image: "🏥",
                location: "አዲስ አበባ",
                urgency: "low",
              },
            ].map((tender, index) => (
              <div key={index} className="group">
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform cursor-pointer overflow-hidden h-full">
                  <CardHeader className="bg-gradient-to-br from-gray-900 to-gray-700 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 text-8xl opacity-20 transform rotate-12">{tender.image}</div>
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
                          tender.urgency === "high"
                            ? "bg-red-500 text-white"
                            : tender.urgency === "medium"
                              ? "bg-yellow-500 text-white"
                              : "bg-green-500 text-white"
                        }`}
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        {tender.deadline}
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-tight mb-2 relative z-10">{tender.title}</CardTitle>
                    <CardDescription className="text-gray-300 relative z-10 flex items-center">
                      🏢 {tender.organization}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 bg-gradient-to-br from-white to-gray-50">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">💰 በጀት</p>
                          <p className="text-xl font-bold text-green-600">{tender.budget}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-1">📍 አካባቢ</p>
                          <p className="font-semibold text-gray-700">{tender.location}</p>
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700 text-white font-semibold transition-all duration-300 hover:scale-105">
                        🔍 ዝርዝር ይመልከቱ
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ethiopian Cultural Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-green-900 to-red-900 text-white py-16 relative overflow-hidden">
        {/* Ethiopian Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-4 border-yellow-400 rounded-full"></div>
          <div className="absolute top-32 right-20 w-16 h-16 border-4 border-green-400 rounded-full"></div>
          <div className="absolute bottom-20 left-32 w-24 h-24 border-4 border-red-400 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 via-yellow-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">የጨረታ አስተዳደር ስርዓት</h3>
                  <p className="text-sm text-gray-300">🇪🇹 ለኢትዮጵያ</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                ለኢትዮጵያ የተዘጋጀ ሙሉ በሙሉ በአማርኛ የተዘጋጀ የጨረታ አስተዳደር ስርዓት። ግልጽነትን እና ተሳትፎን ለማሳደግ የተዘጋጀ።
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-yellow-400">🛠️ አገልግሎቶች</h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link href="#" className="hover:text-yellow-400 transition-colors">
                    🔍 ጨረታ ፍለጋ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-yellow-400 transition-colors">
                    📋 ጨረታ አስተዳደር
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-yellow-400 transition-colors">
                    📊 ሪፖርት
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-yellow-400 transition-colors">
                    🎯 ድጋፍ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-green-400">🏢 ድርጅት</h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link href="#" className="hover:text-green-400 transition-colors">
                    ℹ️ ስለ እኛ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-400 transition-colors">
                    👥 ቡድናችን
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-400 transition-colors">
                    💼 ስራ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-400 transition-colors">
                    📰 ዜና
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-red-400">📞 ያግኙን</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">📱 ስልክ: +251-11-123-4567</li>
                <li className="flex items-center">📧 ኢሜይል: info@tender.et</li>
                <li className="flex items-center">📍 አድራሻ: አዲስ አበባ፣ ኢትዮጵያ</li>
                <li className="flex items-center">🌐 ድረ-ገጽ: www.tender.et</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-400 mb-4 md:mb-0">&copy; 2024 የጨረታ አስተዳደር ስርዓት። ሁሉም መብቶች የተጠበቁ ናቸው። 🇪🇹</p>
              <div className="flex space-x-1">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
