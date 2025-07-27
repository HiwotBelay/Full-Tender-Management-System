import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "የጨረታ አስተዳደር ስርዓት - Tender Management System",
  description: "የኢትዮጵያ የጨረታ አስተዳደር ስርዓት - Ethiopian Tender Management System",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="am" dir="ltr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
