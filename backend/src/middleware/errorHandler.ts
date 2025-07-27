import type { Request, Response, NextFunction } from "express"
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken"
import { MongoError } from "mongodb"

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err.stack)

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.json({
      success: false,
      error: "የመረጃ ስህተት",
      details: err.message,
    })
  }

  // Mongoose duplicate key error
  if (err instanceof MongoError && err.code === 11000) {
    return res.json({
      success: false,
      error: "ይህ መረጃ ቀደም ሲል ተመዝግቧል",
    })
  }

  // JWT errors
  if (err instanceof JsonWebTokenError) {
    return res.json({
      success: false,
      error: "ልክ ያልሆነ ማረጋገጫ",
    })
  }

  if (err instanceof TokenExpiredError) {
    return res.json({
      success: false,
      error: "የመለያ ጊዜ አልፏል",
    })
  }

  // Default error
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  })
}

export default errorHandler
