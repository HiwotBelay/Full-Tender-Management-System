import mongoose, { type Document, Schema } from "mongoose"

export interface IApplication extends Document {
  tenderId: mongoose.Types.ObjectId
  applicantId: mongoose.Types.ObjectId
  applicantName: string
  organizationName: string
  proposedBudget: number
  currency: string
  proposal: string
  documents: Array<{
    name: string
    url: string
    type: string
  }>
  status: "pending" | "approved" | "rejected" | "under_review" | "shortlisted" | "awarded"
  submissionDate: Date
  evaluationScore?: number
  evaluationNotes?: string
  evaluatedBy?: mongoose.Types.ObjectId
  evaluatedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const ApplicationSchema = new Schema<IApplication>(
  {
    tenderId: {
      type: Schema.Types.ObjectId,
      ref: "Tender",
      required: [true, "የጨረታ መለያ ያስፈልጋል"],
    },
    applicantId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "የአመልካች መለያ ያስፈልጋል"],
    },
    applicantName: {
      type: String,
      required: [true, "የአመልካች ስም ያስፈልጋል"],
    },
    organizationName: {
      type: String,
      required: [true, "የድርጅት ስም ያስፈልጋል"],
    },
    proposedBudget: {
      type: Number,
      required: [true, "የተሰጠ በጀት ያስፈልጋል"],
      min: [0, "በጀት አሉታዊ ሊሆን አይችልም"],
    },
    currency: {
      type: String,
      default: "ETB",
      enum: ["ETB", "USD", "EUR"],
    },
    proposal: {
      type: String,
      required: [true, "ፕሮፖዛል ያስፈልጋል"],
      maxlength: [10000, "ፕሮፖዛል ከ10000 ቁምፊ መብለጥ አይችልም"],
    },
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
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "under_review", "shortlisted", "awarded"],
      default: "pending",
    },
    submissionDate: {
      type: Date,
      default: Date.now,
    },
    evaluationScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    evaluationNotes: {
      type: String,
      maxlength: [2000, "የግምገማ ማስታወሻ ከ2000 ቁምፊ መብለጥ አይችልም"],
    },
    evaluatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    evaluatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)

// Compound index to prevent duplicate applications
ApplicationSchema.index({ tenderId: 1, applicantId: 1 }, { unique: true })
ApplicationSchema.index({ status: 1, submissionDate: -1 })

const Application = mongoose.model<IApplication>("Application", ApplicationSchema)

export default Application
