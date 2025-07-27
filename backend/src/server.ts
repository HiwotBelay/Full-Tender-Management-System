import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/database"
import authRoutes from "./routes/auth"
import tenderRoutes from "./routes/tenders"
import applicationRoutes from "./routes/applications"
import adminRoutes from "./routes/admin"
import errorHandler from "./middleware/errorHandler"
import notFound from "./middleware/notFound"

dotenv.config()

const app = express()

// Connect to database
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/tenders", tenderRoutes)
app.use("/api/applications", applicationRoutes)
app.use("/api/admin", adminRoutes)

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Backend is healthy!" })
})

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
