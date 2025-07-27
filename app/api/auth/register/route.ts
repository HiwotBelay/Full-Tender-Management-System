import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// Mock database - in production, use a real database
const users = [
  {
    id: 1,
    email: "admin@tender.et",
    password: "$2a$10$rQvwIuLcY4F.T8eeDjy4/.OHxdTNsAdHcxKcR6t9nhOfY2Rb1q2SS",
    name: "አድሚን ተስፋዬ",
    role: "admin",
    organizationType: "government",
    organizationName: "የጨረታ አስተዳደር ስርዓት",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { organizationType, organizationName, contactPerson, email, phone, password } = await request.json()

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "ይህ ኢሜይል አድራሻ ቀደም ሲል ተመዝግቧል" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      name: contactPerson,
      role: organizationType === "government" ? "government" : "contractor",
      organizationType,
      organizationName,
      phone,
      createdAt: new Date().toISOString(),
      status: "pending", // Requires admin approval
    }

    users.push(newUser)

    return NextResponse.json({
      success: true,
      message: "መለያዎ በተሳካ ሁኔታ ተፈጥሯል። የአድሚን ማረጋገጫ በመጠባበቅ ላይ።",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        organizationType: newUser.organizationType,
        organizationName: newUser.organizationName,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "የአገልግሎት ስህተት" }, { status: 500 })
  }
}
