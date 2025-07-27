import type { Request, Response, NextFunction } from "express"
import asyncHandler from "express-async-handler"
import { protect } from "./auth" // Assuming protect middleware is defined elsewhere

const adminAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // First, ensure the user is authenticated
  await protect(req, res, async () => {
    // Then, check if the authenticated user is an admin
    if (req.user && req.user.role === "admin") {
      next()
    } else {
      res.status(403) // Forbidden
      throw new Error("Not authorized as an admin")
    }
  })
})

export default adminAuth
