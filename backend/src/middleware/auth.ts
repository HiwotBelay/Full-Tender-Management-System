import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User, { type IUser } from "../models/User"

// Extend the Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user: IUser
    }
  }
}

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]

      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "supersecretjwtkey")

      req.user = (await User.findById(decoded.id).select("-password")) as IUser

      if (!req.user) {
        res.status(401)
        throw new Error("Not authorized, user not found")
      }

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error("Not authorized, token failed")
    }
  }

  if (!token) {
    res.status(401)
    throw new Error("Not authorized, no token")
  }
})

const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === "admin") {
    next()
  } else {
    res.status(403)
    throw new Error("Not authorized as an admin")
  }
}

export { protect, admin }
