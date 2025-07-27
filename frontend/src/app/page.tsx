import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, Star, Users, DollarSign, MapPin, Building } from "lucide-react"

export default function HomePage() {
  const featuredTenders = [
    {
      id: "T001",
      title: "🛣️ የመንገድ ግንባታ እና ማሻሻያ ፕሮጀክት",
      organization: "የአዲስ አበባ ከተማ አስተዳደር",
      budget: "50,000,000 ብር",
      deadline: "15 ቀናት",
      category: "ግንባታ",
      location: "አዲስ አበባ",
      applicants: 12,
      urgency: "high",
    },
    {
      id: "T002",
      title: "💻 የኮምፒውተር እና ቴክኖሎጂ እቃዎች ግዢ",
      organization: "የትምህርት ሚኒስቴር",
      budget: "25,000,000 ብር",
      deadline: "8 ቀናት",
      category: "ቴክኖሎጂ",
      location: "አዲስ አበባ",
      applicants: 8,
      urgency: "medium",
    },
    {
      id: "T003",
      title: "🏥 የጤና ተቋማት ጽዳት አገልግሎት",
      organization: "የጤና ሚኒስቴር",
      budget: "5,000,000 ብር",
      deadline: "22 ቀናት",
      category: "አገልግሎት",
      location: "አዲስ አበባ",
      applicants: 15,
      urgency: "low",
    },
  ]

  const stats = [
    { icon: "🏗️", number: "1,250+", label: "ንቁ ጨረታዎች", color: "from-green-500 to-green-600" },
    { icon: "🏢", number: "850+", label: "የተመዘገቡ ድርጅቶች", color: "from-yellow-500 to-yellow-600" },
    { icon: "🛡️", number: "100%", label: "ግልጽነት", color: "from-red-500 to-red-600" },
    { icon: "📈", number: "95%", label: "የተሳካ ፕሮጀክቶች", color: "from-blue-500 to-blue-600" },
  ]

  const features = [
    {
      icon: "🔍",
      title: "ቀላል ፍለጋ",
      description: "በተለያዩ መስፈርቶች ጨረታዎችን በቀላሉ ይፈልጉ እና ያግኙ። የላቀ ፍለጋ ባህሪያት እና ማጣሪያዎች።",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: "📋",
      title: "ቀላል አስተዳደር",
      description: "ጨረታዎችን በቀላሉ ይፍጠሩ፣ ያስተዳድሩ እና ይከታተሉ። ሙሉ የሰነድ አስተዳደር እና የሂደት ክትትል።",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: "🛡️",
      title: "ደህንነት",
      description: "የላቀ ደህንነት እና ግላዊነት ጥበቃ። ሙሉ በሙሉ የተመሰጠረ እና የተጠበቀ ስርዓት።",
      gradient: "from-red-500 to-pink-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-yellow-600 to-red-700 relative overflow-hidden">
      {/* Ethiopian Pattern Background */}
      <div className="absolute inset-0 opacity-10 ethiopian-pattern"></div>

      {/* Header */}
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

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Ethiopian Star Pattern */}
        <div className="absolute top-20 right-20 w-32 h-32 opacity-20">
          <Star className="w-full h-full text-yellow-300 animate-ethiopian-pulse" />
        </div>
        <div className="absolute bottom-20 left-20 w-24 h-24 opacity-20">
          <Star className="w-full h-full text-yellow-300 animate-ethiopian-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Ethiopian Flag Accent */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-1">
                <div className="w-3 h-16 bg-green-500 rounded-full animate-pulse"></div>
                <div
                  className="w-3 h-16 bg-yellow-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div className="w-3 h-16 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight amharic-text">
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
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium amharic-text">
                🏗️ ለመንግስት እና ለግል ድርጅቶች የተዘጋጀ ሙሉ በሙሉ በአማርኛ የተዘጋጀ የጨረታ አስተዳደር ስርዓት
                <br />
                <span className="text-yellow-200">🌟 ግልጽነትን፣ ተደራሽነትን እና ተሳትፎን ለማሳደግ የተዘጋጀ</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="ethiopian-gradient hover:opacity-90 text-white px-12 py-4 text-lg font-bold shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl rounded-xl"
                >
                  🚀 አሁኑኑ ተመዝገብ
                </Button>
              </Link>
              <Link href="/tenders">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-12 py-4 text-lg font-bold backdrop-blur-md transition-all duration-300 hover:scale-110 rounded-xl bg-transparent"
                >
                  🔍 ጨረታዎችን ይመልከቱ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-2 ethiopian-gradient"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-red-700 bg-clip-text text-transparent mb-4 amharic-text">
              🏆 የእኛ ስኬቶች
            </h2>
            <p className="text-xl text-gray-600 amharic-text">በኢትዮጵያ ውስጥ የጨረታ አስተዳደር መሪ ስርዓት</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform cursor-pointer overflow-hidden">
                  <CardContent className="p-8 text-center bg-gradient-to-br from-gray-50 to-white relative">
                    <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <h3
                      className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                    >
                      {stat.number}
                    </h3>
                    <p className="text-gray-700 font-semibold text-lg amharic-text">{stat.label}</p>
                    <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color}`}></div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-red-700 bg-clip-text text-transparent mb-6 amharic-text">
              ✨ ዋና ዋና ባህሪያት
            </h2>
            <p className="text-xl text-gray-600 amharic-text">የጨረታ አስተዳደር ስርዓታችን የሚያቀርባቸው ልዩ አገልግሎቶች</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 transform cursor-pointer overflow-hidden h-full">
                  <CardHeader className={`bg-gradient-to-br ${feature.gradient} text-white relative overflow-hidden`}>
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 relative z-10">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold relative z-10 amharic-text">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 bg-white">
                    <p className="text-gray-700 leading-relaxed text-lg amharic-text">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Tenders Section */}
      <section id="tenders" className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-red-700 bg-clip-text text-transparent mb-4 amharic-text">
                🏗️ የቅርብ ጊዜ ጨረታዎች
              </h2>
              <p className="text-xl text-gray-600 amharic-text">በኢትዮጵያ ውስጥ የሚገኙ ዋና ዋና የግንባታ እና የልማት ፕሮጀክቶች</p>
            </div>
            <Link href="/tenders">
              <Button className="ethiopian-gradient hover:opacity-90 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105">
                ሁሉንም ይመልከቱ →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTenders.map((tender, index) => (
              <div key={index} className="group">
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
                          <p className="text-xl font-bold text-green-600">{tender.budget}</p>
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
                          <Users className="w-4 h-4 mr-1" />
                          {tender.applicants} አመልካቾች
                        </div>
                        <Link href={`/tenders/${tender.id}`}>
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
        </div>
      </section>

      {/* Footer */}
      <footer className="ethiopian-gradient text-white py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold amharic-text">የጨረታ አስተዳደር ስርዓት</h3>
                  <p className="text-sm text-white/80">🇪🇹 ለኢትዮጵያ</p>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed amharic-text">
                ለኢትዮጵያ የተዘጋጀ ሙሉ በሙሉ በአማርኛ የተዘጋጀ የጨረታ አስተዳደር ስርዓት። ግልጽነትን እና ተሳትፎን ለማሳደግ የተዘጋጀ።
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-yellow-200 amharic-text">🛠️ አገልግሎቶች</h4>
              <ul className="space-y-3 text-white/80">
                <li>
                  <Link href="#" className="hover:text-yellow-200 transition-colors amharic-text">
                    🔍 ጨረታ ፍለጋ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-yellow-200 transition-colors amharic-text">
                    📋 ጨረታ አስተዳደር
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-yellow-200 transition-colors amharic-text">
                    📊 ሪፖርት
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-yellow-200 transition-colors amharic-text">
                    🎯 ድጋፍ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-green-200 amharic-text">🏢 ድርጅት</h4>
              <ul className="space-y-3 text-white/80">
                <li>
                  <Link href="#" className="hover:text-green-200 transition-colors amharic-text">
                    ℹ️ ስለ እኛ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-200 transition-colors amharic-text">
                    👥 ቡድናችን
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-200 transition-colors amharic-text">
                    💼 ስራ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-200 transition-colors amharic-text">
                    📰 ዜና
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6 text-red-200 amharic-text">📞 ያግኙን</h4>
              <ul className="space-y-3 text-white/80 amharic-text">
                <li className="flex items-center">📱 ስልክ: +251-11-123-4567</li>
                <li className="flex items-center">📧 ኢሜይል: info@tender.et</li>
                <li className="flex items-center">📍 አድራሻ: አዲስ አበባ፣ ኢትዮጵያ</li>
                <li className="flex items-center">🌐 ድረ-ገጽ: www.tender.et</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-white/60 mb-4 md:mb-0 amharic-text">
                &copy; 2024 የጨረታ አስተዳደር ስርዓት። ሁሉም መብቶች የተጠበቁ ናቸው። 🇪🇹
              </p>
              <div className="flex space-x-1">
                <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                <div
                  className="w-4 h-4 bg-yellow-300 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
