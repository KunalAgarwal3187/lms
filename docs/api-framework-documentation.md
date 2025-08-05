# Edemy LMS - API & Framework Documentation

## 🛠️ Technology Stack Overview

### **Frontend Framework**
- **React.js 19.1.0** - Modern JavaScript library for building user interfaces
- **Vite 6.3.5** - Fast build tool and development server
- **React Router DOM 7.6.2** - Client-side routing
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Framer Motion 12.23.3** - Animation library

### **Backend Framework**
- **Node.js** - JavaScript runtime environment
- **Express.js 5.1.0** - Web application framework
- **MongoDB 8.16.1** - NoSQL database
- **Mongoose** - MongoDB object modeling tool

### **Authentication & Security**
- **Clerk 1.7.2** - Authentication service
- **JWT (JSON Web Tokens)** - Token-based authentication

### **Payment Processing**
- **Stripe 18.2.1** - Payment gateway integration

### **File Storage**
- **Cloudinary 2.7.0** - Cloud-based image and video management

### **Deployment**
- **Vercel** - Frontend and backend deployment platform

---

## 🔌 External APIs Integration

### **1. Clerk Authentication API**

#### **Authentication Endpoints**
```javascript
// User Registration
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe"
}

// User Login
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "securepassword"
}

// Get User Profile
GET /api/auth/user
Headers: { Authorization: "Bearer <token>" }

// Update User Profile
PUT /api/auth/user
Headers: { Authorization: "Bearer <token>" }
{
  "firstName": "John",
  "lastName": "Doe",
  "imageUrl": "https://example.com/image.jpg"
}
```

#### **Webhook Integration**
```javascript
// Clerk Webhook Handler
POST /api/auth/webhook
{
  "type": "user.created",
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### **2. Stripe Payment API**

#### **Payment Processing Endpoints**
```javascript
// Create Checkout Session
POST /api/payments/create-checkout
Headers: { Authorization: "Bearer <token>" }
{
  "courseId": "course_123",
  "courseTitle": "React Masterclass",
  "coursePrice": 99.99,
  "currency": "usd"
}

// Payment Webhook Handler
POST /api/payments/webhook
{
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_123",
      "amount": 9999,
      "currency": "usd",
      "metadata": {
        "courseId": "course_123",
        "userId": "user_123"
      }
    }
  }
}
```

#### **Stripe Configuration**
```javascript
// Stripe Instance Setup
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia'
});

// Webhook Signature Verification
const event = stripe.webhooks.constructEvent(
  request.body,
  sig,
  process.env.STRIPE_WEBHOOK_SECRET
);
```

### **3. YouTube API Integration**

#### **Video Player Integration**
```javascript
// YouTube Player Component
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoUrl, onProgress }) => {
  const videoId = extractVideoId(videoUrl);
  
  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
      controls: 1,
      modestbranding: 1
    }
  };

  const onStateChange = (event) => {
    if (event.data === 0) { // Video ended
      onProgress();
    }
  };

  return (
    <YouTube
      videoId={videoId}
      opts={opts}
      onStateChange={onStateChange}
    />
  );
};
```

### **4. Cloudinary API**

#### **File Upload Integration**
```javascript
// Cloudinary Configuration
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload Course Thumbnail
const uploadThumbnail = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'edemy/courses',
      transformation: [
        { width: 800, height: 600, crop: 'fill' }
      ]
    });
    return result.secure_url;
  } catch (error) {
    throw new Error('Upload failed');
  }
};
```

---

## 🏗️ Internal API Architecture

### **RESTful API Endpoints**

#### **1. User Management API**

```javascript
// Base URL: /api/user

// Get User Profile
GET /api/user/data
Headers: { Authorization: "Bearer <token>" }
Response: {
  "success": true,
  "userData": {
    "_id": "user_123",
    "name": "John Doe",
    "email": "john@example.com",
    "imageUrl": "https://example.com/image.jpg",
    "role": "student",
    "enrolledCourses": ["course_1", "course_2"],
    "wallet": { "popcoins": 100 }
  }
}

// Update User Profile
PUT /api/user/profile
Headers: { Authorization: "Bearer <token>" }
Body: {
  "name": "John Doe",
  "imageUrl": "https://example.com/new-image.jpg"
}

// Update Course Progress
POST /api/user/update-course-progress
Headers: { Authorization: "Bearer <token>" }
Body: {
  "courseId": "course_123",
  "lectureId": "lecture_456"
}

// Get Course Progress
POST /api/user/get-course-progress
Headers: { Authorization: "Bearer <token>" }
Body: {
  "courseId": "course_123"
}
Response: {
  "success": true,
  "progressData": {
    "userId": "user_123",
    "courseId": "course_123",
    "completed": false,
    "lectureCompleted": ["lecture_1", "lecture_2"]
  }
}

// Mark Course as Completed
PUT /api/user/update-course-Complete
Headers: { Authorization: "Bearer <token>" }
Body: {
  "courseId": "course_123",
  "completed": true
}
```

#### **2. Course Management API**

```javascript
// Base URL: /api/course

// Get All Published Courses
GET /api/course/all
Response: {
  "success": true,
  "courses": [
    {
      "_id": "course_123",
      "courseTitle": "React Masterclass",
      "courseDescription": "Learn React from scratch",
      "courseThumbnail": "https://example.com/thumbnail.jpg",
      "coursePrice": 99.99,
      "isPublished": true,
      "educator": "educator_123",
      "courseRatings": [
        {
          "userId": "user_123",
          "rating": 5
        }
      ]
    }
  ]
}

// Get Course Details
GET /api/course/:courseId
Response: {
  "success": true,
  "course": {
    "_id": "course_123",
    "courseTitle": "React Masterclass",
    "courseDescription": "Learn React from scratch",
    "courseContent": [
      {
        "chapterId": "chapter_1",
        "chapterTitle": "Introduction to React",
        "chapterContent": [
          {
            "lectureId": "lecture_1",
            "lectureTitle": "What is React?",
            "lectureDuration": 15,
            "lectureUrl": "https://youtube.com/watch?v=abc123",
            "isPreviewFree": true
          }
        ]
      }
    ]
  }
}

// Create New Course (Educator Only)
POST /api/course/create
Headers: { Authorization: "Bearer <token>" }
Body: {
  "courseTitle": "New Course",
  "courseDescription": "Course description",
  "coursePrice": 99.99,
  "courseContent": [
    {
      "chapterId": "chapter_1",
      "chapterTitle": "Chapter 1",
      "chapterContent": []
    }
  ]
}

// Update Course (Educator Only)
PUT /api/course/:courseId
Headers: { Authorization: "Bearer <token>" }
Body: {
  "courseTitle": "Updated Course Title",
  "isPublished": true
}

// Delete Course (Educator Only)
DELETE /api/course/:courseId
Headers: { Authorization: "Bearer <token>" }
```

#### **3. Educator Management API**

```javascript
// Base URL: /api/educator

// Get Educator Courses
GET /api/educator/courses
Headers: { Authorization: "Bearer <token>" }
Response: {
  "success": true,
  "courses": [
    {
      "_id": "course_123",
      "courseTitle": "React Masterclass",
      "enrolledStudents": ["student_1", "student_2"],
      "totalRevenue": 199.98
    }
  ]
}

// Get Students Enrolled in Course
GET /api/educator/course/:courseId/students
Headers: { Authorization: "Bearer <token>" }
Response: {
  "success": true,
  "students": [
    {
      "_id": "student_123",
      "name": "John Doe",
      "email": "john@example.com",
      "progress": {
        "completed": false,
        "lectureCompleted": ["lecture_1", "lecture_2"]
      }
    }
  ]
}

// Get Educator Analytics
GET /api/educator/analytics
Headers: { Authorization: "Bearer <token>" }
Response: {
  "success": true,
  "analytics": {
    "totalCourses": 5,
    "totalStudents": 150,
    "totalRevenue": 1499.85,
    "monthlyRevenue": 299.97
  }
}
```

#### **4. Payment Processing API**

```javascript
// Base URL: /api/payments

// Create Stripe Checkout Session
POST /api/payments/create-checkout
Headers: { Authorization: "Bearer <token>" }
Body: {
  "courseId": "course_123",
  "courseTitle": "React Masterclass",
  "coursePrice": 99.99
}
Response: {
  "success": true,
  "sessionId": "cs_123",
  "url": "https://checkout.stripe.com/pay/cs_123"
}

// Handle Stripe Webhook
POST /api/payments/webhook
Body: {
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_123",
      "metadata": {
        "courseId": "course_123",
        "userId": "user_123"
      }
    }
  }
}
```

---

## 🔧 Framework Configuration

### **Frontend Configuration (Vite)**

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### **Backend Configuration (Express)**

```javascript
// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './configs/mongodb.js';
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoute.js';
import educatorRoutes from './routes/educatorRoues.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/educator', educatorRoutes);

// Webhook routes (no auth required)
app.post('/api/payments/webhook', stripeWebhooks);
app.post('/api/auth/webhook', clerkWebhooks);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### **Database Configuration (MongoDB)**

```javascript
// configs/mongodb.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
```

### **Authentication Middleware**

```javascript
// middlewares/authMiddleWare.js
import { clerkClient } from '@clerk/clerk-sdk-node';

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }
    
    const session = await clerkClient.sessions.verifySession(token);
    req.user = session.user;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }
};

export const requireEducator = async (req, res, next) => {
  try {
    if (req.user.publicMetadata.role !== 'educator') {
      return res.status(403).json({ 
        success: false, 
        message: 'Educator access required' 
      });
    }
    next();
  } catch (error) {
    res.status(403).json({ 
      success: false, 
      message: 'Access denied' 
    });
  }
};
```

---

## 📊 API Response Standards

### **Success Response Format**
```javascript
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data
  }
}
```

### **Error Response Format**
```javascript
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

### **Pagination Format**
```javascript
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10
    }
  }
}
```

---

## 🔐 Security Implementation

### **CORS Configuration**
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### **Rate Limiting**
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
```

### **Input Validation**
```javascript
import Joi from 'joi';

const courseSchema = Joi.object({
  courseTitle: Joi.string().required().min(3).max(100),
  courseDescription: Joi.string().required().min(10),
  coursePrice: Joi.number().required().min(0),
  courseContent: Joi.array().items(Joi.object({
    chapterId: Joi.string().required(),
    chapterTitle: Joi.string().required()
  }))
});
```

---

## 🚀 Deployment Configuration

### **Vercel Configuration (vercel.json)**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/server.js"
    }
  ],
  "env": {
    "MONGODB_URI": "@mongodb-uri",
    "CLERK_SECRET_KEY": "@clerk-secret-key",
    "STRIPE_SECRET_KEY": "@stripe-secret-key",
    "CLOUDINARY_CLOUD_NAME": "@cloudinary-cloud-name",
    "CLOUDINARY_API_KEY": "@cloudinary-api-key",
    "CLOUDINARY_API_SECRET": "@cloudinary-api-secret"
  }
}
```

### **Environment Variables**
```bash
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/edemy

# Authentication
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Payment
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# File Storage
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Application
CLIENT_URL=http://localhost:3000
NODE_ENV=development
PORT=5000
```

This comprehensive API and framework documentation covers all the external integrations, internal APIs, security measures, and deployment configurations used in your Edemy LMS project. 