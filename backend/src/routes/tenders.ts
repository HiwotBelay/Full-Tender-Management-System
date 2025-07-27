import express from "express"
import asyncHandler from "express-async-handler"
import Tender from "../models/Tender"
import { protect, admin } from "../middleware/auth"

const router = express.Router()

// @route   GET /api/tenders
// @desc    Get all tenders
// @access  Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const tenders = await Tender.find({})
    res.json(tenders)
  }),
)

// @route   GET /api/tenders/:id
// @desc    Get single tender by ID
// @access  Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const tender = await Tender.findById(req.params.id)

    if (tender) {
      res.json(tender)
    } else {
      res.status(404)
      throw new Error("Tender not found")
    }
  }),
)

// @route   POST /api/tenders
// @desc    Create a new tender
// @access  Private/Admin
router.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { title, description, organization, budget, deadline, category, location } = req.body

    const tender = new Tender({
      title,
      description,
      organization,
      budget,
      deadline,
      category,
      location,
    })

    const createdTender = await tender.save()
    res.status(201).json(createdTender)
  }),
)

// @route   PUT /api/tenders/:id
// @desc    Update a tender
// @access  Private/Admin
router.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { title, description, organization, budget, deadline, category, location, status } = req.body

    const tender = await Tender.findById(req.params.id)

    if (tender) {
      tender.title = title || tender.title
      tender.description = description || tender.description
      tender.organization = organization || tender.organization
      tender.budget = budget || tender.budget
      tender.deadline = deadline || tender.deadline
      tender.category = category || tender.category
      tender.location = location || tender.location
      tender.status = status || tender.status

      const updatedTender = await tender.save()
      res.json(updatedTender)
    } else {
      res.status(404)
      throw new Error("Tender not found")
    }
  }),
)

// @route   DELETE /api/tenders/:id
// @desc    Delete a tender
// @access  Private/Admin
router.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const tender = await Tender.findById(req.params.id)

    if (tender) {
      await tender.deleteOne()
      res.json({ message: "Tender removed" })
    } else {
      res.status(404)
      throw new Error("Tender not found")
    }
  }),
)

export default router
