"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Eye, EyeOff, Star } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt:", formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-yellow-600 to-red-700 relative overflow-hidden flex items-center justify-center p-4">
      {/* Ethiopian Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32">
          <Star className="w-full h-full text-yellow-300 animate-pulse" />
        </div>
        <div className="absolute bottom-20 right-20 w-24 h-24">
          <Star className="w-full h-full text-yellow-300 animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        <div className="absolute top-1/2 left-10 w-20 h-20">
          <Star className="w-full h-full text-green-300 animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 via-yellow-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full border-3 border-white flex items-center justify-center">
              <span className="text-xs">🇪🇹</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent mb-2">
            የጨረታ አስተዳደር ስርዓት
          </h1>
          <p className="text-white/80 text-lg">🏗️ ወደ መለያዎ እንኳን ደህና መጡ</p>
        </div>

        <Card className="border-0 shadow-2xl backdrop-blur-md bg-white/95 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"></div>

          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-3xl text-center bg-gradient-to-r from-green-700 to-red-700 bg-clip-text text-transparent">
              🔐 ግባ
            </CardTitle>
            <CardDescription className="text-center text-lg text-gray-600">የመለያ መረጃዎን በደህንነት ያስገቡ</CardDescription>
          </CardHeader>

          <CardContent className="pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-lg font-semibold text-gray-700">
                  📧 ኢሜይል አድራሻ
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-12 text-lg border-2 border-gray-200 focus:border-green-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-lg font-semibold text-gray-700">
                  🔒 የይለፍ ቃል
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="የይለፍ ቃልዎን ያስገቡ"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="h-12 text-lg border-2 border-gray-200 focus:border-green-500 transition-colors pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                    className="border-2"
                  />
                  <Label htmlFor="remember" className="text-base font-medium">
                    💾 አስታውሰኝ
                  </Label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-base text-green-600 hover:text-green-700 font-semibold hover:underline"
                >
                  🤔 የይለፍ ቃል ረሳሁ
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg font-bold bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 hover:from-green-700 hover:via-yellow-700 hover:to-red-700 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                🚀 ግባ
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-base text-gray-600">
                መለያ የለዎትም?{" "}
                <Link
                  href="/register"
                  className="text-green-600 hover:text-green-700 font-bold hover:underline text-lg"
                >
                  ✨ ተመዝገብ
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Links */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-white/80 hover:text-white font-semibold text-lg transition-colors">
            ← 🏠 ወደ ዋና ገጽ ተመለስ
          </Link>
        </div>

        {/* Ethiopian Flag Decoration */}
        <div className="flex justify-center mt-6 space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
          <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>
      </div>
    </div>
  )
}
