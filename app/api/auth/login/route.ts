import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Mock database - in production, use a real database
const users = [
  {
    id: 1,
    email: "admin@tender.et",
    password: "$2a$10$rQvwIuLcY4F.T8eeDjy4/.OHxdTNsAdHcxKcR6t9nhOfY2Rb1q2SS", // password123
    name: "አድሚን ተስፋዬ",
    role: "admin",
    organizationType: "government",
    organizationName: "የጨረታ አስተዳደር ስርዓት",
  },
  {
    id: 2,
    email: "contractor@example.com",
    password: "$2a$10$rQvwIuLcY4F.T8eeDjy4/.OHxdTNsAdHcxKcR6t9nhOfY2Rb1q2SS", // password123
    name: "አቶ ሙሉጌታ አበበ",
    role: "contractor",
    organizationType: "private",
    organizationName: "ሙሉጌታ ግንባታ ኩባንያ",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Find user
    const user = users.find((u) => u.email === email)
    if (!user) {
      return NextResponse.json({ error: "የተሳሳተ ኢሜይል ወይም የይለፍ ቃል" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ error: "የተሳሳተ ኢሜይል ወይም የይለፍ ቃል" }, { status: 401 })
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" },
    )

    const response = NextResponse.json({
      success: true,
      message: "በተሳካ ሁኔታ ገብተዋል",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        organizationType: user.organizationType,
        organizationName: user.organizationName,
      },
    })

    // Set HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "የአገልግሎት ስህተት" }, { status: 500 })
  }
}
