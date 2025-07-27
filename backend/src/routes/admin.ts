import express from "express"
import asyncHandler from "express-async-handler"
import User from "../models/User"
import Tender from "../models/Tender"
import Application from "../models/Application"
import { protect, admin } from "../middleware/auth"

const router = express.Router()

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get(
  "/users",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
  }),
)

// @route   GET /api/admin/tenders
// @desc    Get all tenders (admin view)
// @access  Private/Admin
router.get(
  "/tenders",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const tenders = await Tender.find({})
    res.json(tenders)
  }),
)

// @route   GET /api/admin/applications
// @desc    Get all applications
// @access  Private/Admin
router.get(
  "/applications",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const applications = await Application.find({})
      .populate("tender", "title organization")
      .populate("applicant", "username email")
    res.json(applications)
  }),
)

// @route   PUT /api/admin/applications/:id/status
// @desc    Update application status (approve/reject)
// @access  Private/Admin
router.put(
  "/applications/:id/status",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { status } = req.body // 'approved' or 'rejected'

    const application = await Application.findById(req.params.id)

    if (application) {
      application.status = status
      const updatedApplication = await application.save()
      res.json(updatedApplication)
    } else {
      res.status(404)
      throw new Error("Application not found")
    }
  }),
)

export default router
