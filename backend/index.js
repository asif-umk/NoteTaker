import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import notesRoutes from './routes/notes.js'
import { connectDB } from './config/db.js'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()

// ✅ Allowed origins: local + deployed frontend
const allowedOrigins = [
  "http://localhost:5173",
  "https://notetaker-asif.netlify.app/" // deployed frontend
]

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}))

app.use(express.json())

// ✅ API routes
app.use('/api/users', authRoutes)
app.use('/api/notes', notesRoutes)

// ✅ Connect to MongoDB
connectDB()

// ✅ React build paths (for ES modules)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ✅ Serve React frontend
app.use(express.static(path.join(__dirname, '../frontend/dist'))) // relative path to your build folder

// ✅ Fallback for React Router
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'))
})

// ✅ Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
