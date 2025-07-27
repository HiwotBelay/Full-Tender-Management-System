import express from "express"
import asyncHandler from "express-async-handler"
import Application from "../models/Application"
import { protect } from "../middleware/auth"

const router = express.Router()

// @route   POST /api/applications
// @desc    Submit a new application for a tender
// @access  Private (Applicant)
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { tenderId, proposal } = req.body
    const applicantId = req.user._id // Assuming req.user is populated by protect middleware

    const existingApplication = await Application.findOne({ tender: tenderId, applicant: applicantId })

    if (existingApplication) {
      res.status(400)
      throw new Error("You have already applied for this tender")
    }

    const application = new Application({
      tender: tenderId,
      applicant: applicantId,
      proposal,
    })

    const createdApplication = await application.save()
    res.status(201).json(createdApplication)
  }),
)

// @route   GET /api/applications/my
// @desc    Get applications submitted by the logged-in user
// @access  Private (Applicant)
router.get(
  "/my",
  protect,
  asyncHandler(async (req, res) => {
    const applications = await Application.find({ applicant: req.user._id }).populate(
      "tender",
      "title organization budget deadline",
    )
    res.json(applications)
  }),
)

// @route   GET /api/applications/:id
// @desc    Get a single application by ID
// @access  Private (Applicant/Admin)
router.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const application = await Application.findById(req.params.id)
      .populate("tender", "title organization")
      .populate("applicant", "username email")

    if (application) {
      // Only allow access if user is admin or the applicant themselves
      if (req.user.role === "admin" || application.applicant.toString() === req.user._id.toString()) {
        res.json(application)
      } else {
        res.status(403)
        throw new Error("Not authorized to view this application")
      }
    } else {
      res.status(404)
      throw new Error("Application not found")
    }
  }),
)

export default router
