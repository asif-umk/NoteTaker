import express from 'express'
import dotenv from 'dotenv'
const app = express()
import authRoutes from './routes/auth.js'
import { connectDB } from './config/db.js'
import notesRoutes from './routes/notes.js'
import cors from 'cors'
import path from 'path'
dotenv.config()
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true,               // allow cookies/auth headers
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