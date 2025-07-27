import express from "express"
import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import User from "../models/User"

const router = express.Router()

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "supersecretjwtkey", {
    expiresIn: "1h",
  })
}

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(400)
      throw new Error("User already exists")
    }

    const user = await User.create({
      username,
      email,
      password,
      role,
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id.toString()),
      })
    } else {
      res.status(400)
      throw new Error("Invalid user data")
    }
  }),
)

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id.toString()),
      })
    } else {
      res.status(401)
      throw new Error("Invalid email or password")
    }
  }),
)

export default router
