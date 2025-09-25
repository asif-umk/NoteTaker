import express from 'express'
import dotenv from 'dotenv'
const app = express()
import authRoutes from './routes/auth.js'
import { connectDB } from './config/db.js'
import notesRoutes from './routes/notes.js'
import cors from 'cors'
import path from 'path'
dotenv.config()
const allowedOrigins = [
  "http://localhost:5173",              // local dev
  "https://notetaker-gzk8.onrender.com" // deployed frontend
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,               
}));
app.use(express.json())
app.use('/api/users' , authRoutes)
app.use('/api/notes' , notesRoutes)
const __dirname = path.resolve()
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname , '/frontend/dist')))
  app.get('/{*splat}' , (req , res) => {
    res.sendFile(path.resolve(__dirname , 'frontend' , 'dist' , 'index.html'))
  })
}

connectDB() 

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`)) 