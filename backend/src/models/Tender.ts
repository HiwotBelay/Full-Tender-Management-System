import mongoose, { type Document, Schema } from "mongoose"

export interface ITender extends Document {
  title: string
  description: string
  category: string
  budget: number
  currency: string
  deadline: Date
  publishDate: Date
  status: "draft" | "published" | "closed" | "awarded" | "open"
  location: string
  organization: string
  requirements: string[]
  documents: Array<{
    name: string
    url: string
    type: string
  }>
  evaluationCriteria: Array<{
    criterion: string
    weight: number
    description: string
  }>
  createdBy: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const TenderSchema = new Schema<ITender>(
  {
    title: {
      type: String,
      required: [true, "የጨረታ ርዕስ ያስፈልጋል"],
      trim: true,
      maxlength: [200, "ርዕስ ከ200 ቁምፊ መብለጥ አይችልም"],
    },
    description: {
      type: String,
      required: [true, "የጨረታ መግለጫ ያስፈልጋል"],
      trim: true,
      maxlength: [5000, "መግለጫ ከ5000 ቁምፊ መብለጥ አይችልም"],
    },
    category: {
      type: String,
      required: [true, "ምድብ ያስፈልጋል"],
      enum: ["ግንባታ", "ቴክኖሎጂ", "አገልግሎት", "እቃዎች", "ማማከር", "ትራንስፖርት", "ጤና", "ትምህርት", "ሌላ"],
    },
    budget: {
      type: Number,
      required: [true, "በጀት ያስፈልጋል"],
      min: [0, "በጀት አሉታዊ ሊሆን አይችልም"],
    },
    currency: {
      type: String,
      default: "ETB",
      enum: ["ETB", "USD", "EUR"],
    },
    deadline: {
      type: Date,
      required: [true, "የመጨረሻ ቀን ያስፈልጋል"],
      validate: {
        validator: (value: Date) => value > new Date(),
        message: "የመጨረሻ ቀን ከዛሬ በኋላ መሆን አለበት",
      },
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["draft", "published", "closed", "awarded", "open"],
      default: "draft",
    },
    location: {
      type: String,
      required: [true, "አካባቢ ያስፈልጋል"],
      trim: true,
    },
    organization: {
      type: String,
      required: [true, "የድርጅት ስም ያስፈልጋል"],
    },
    requirements: [
      {
        type: String,
        trim: true,
      },
    ],
    documents: [
      {
        name: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
      },
    ],
    evaluationCriteria: [
      {
        criterion: {
          type: String,
          required: true,
        },
        weight: {
          type: Number,
          required: true,
          min: 0,
          max: 100,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Index for better search performance
TenderSchema.index({ title: "text", description: "text", category: 1 })
TenderSchema.index({ status: 1, deadline: 1 })
TenderSchema.index({ organization: 1 })

const Tender = mongoose.model<ITender>("Tender", TenderSchema)

export default Tender
