import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import notesRoutes from './routes/notes.js'
import { connectDB } from './config/db.js'
import path from 'path'

dotenv.config()

const app = express()

// ✅ Allowed origins: local + deployed frontend
const allowedOrigins = [
  "http://localhost:5173",              // local dev
  "https://notetaker-frontend-qiz7.onrender.com" // deployed frontend
]

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}))

app.use(express.json())

// ✅ API routes only
app.use('/api/users', authRoutes)
app.use('/api/notes', notesRoutes)

// ✅ Connect to MongoDB
connectDB()

// ✅ Serve React frontend in production
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'client/dist'))) // if using Vite build output

// ✅ Fallback for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'))
})

// ✅ Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
