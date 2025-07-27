"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { registerUser } from "@/lib/api"

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("applicant") // Default role
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const data = await registerUser(username, email, password, role)
      localStorage.setItem("token", data.token)
      localStorage.setItem(
        "user",
        JSON.stringify({ id: data._id, username: data.username, email: data.email, role: data.role }),
      )
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-yellow-600 to-red-700 p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-md shadow-2xl border-yellow-200">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-700 to-red-700 bg-clip-text text-transparent amharic-text">
            ✨ ተመዝገብ
          </CardTitle>
          <CardDescription className="text-gray-600 amharic-text">አዲስ መለያ ለመፍጠር መረጃዎን ያስገቡ</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="username" className="text-gray-700 amharic-text">
                የተጠቃሚ ስም
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="የተጠቃሚ ስም"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-700 amharic-text">
                ኢሜይል
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-700 amharic-text">
                የይለፍ ቃል
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="role" className="text-gray-700 amharic-text">
                ሚና
              </Label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm amharic-text"
              >
                <option value="applicant">አመልካች</option>
                <option value="admin">አስተዳዳሪ</option>
              </select>
            </div>
            {error && <p className="text-red-500 text-sm text-center amharic-text">{error}</p>}
            <Button
              type="submit"
              className="w-full ethiopian-gradient text-white font-semibold py-2 shadow-lg hover:opacity-90 transition-all duration-300"
              disabled={loading}
            >
              {loading ? "በመመዝገብ ላይ..." : "ተመዝገብ"}
            </Button>
          </form>
          <p className="mt-6 text-center text-gray-600 amharic-text">
            መለያ አለዎት?{" "}
            <Link href="/login" className="text-green-700 hover:underline font-semibold">
              ግባ
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
