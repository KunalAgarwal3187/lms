import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoues.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './configs/cloudinary.js'
import courseRouter from './routes/courseRoute.js'
import userRouter from './routes/userRoutes.js'

const app = express()

// ✅ Webhooks FIRST (before any middleware)
app.post('/clerk', express.raw({ type: "*/*" }), clerkWebhooks)
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks)

// Then use middlewares
app.use(cors())
app.use(clerkMiddleware())

await connectDB()
await connectCloudinary()

// JSON parsers only after webhooks
app.use('/api/educator', express.json(), educatorRouter)
app.use('/api/course', express.json(), courseRouter)
app.use('/api/user', express.json(), userRouter)

app.get('/', (req, res) => res.send("API WORKING"))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
