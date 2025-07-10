import express from 'express' 
import { addCourse, deleteCourse, educatorDeshboardData, geEducatorCourse, getEnrolledStudentData, UpdateCourse, updateRoleToEducator } from '../controllers/educatorController.js'
import upload from '../configs/multer.js'
import { protectEducator } from '../middlewares/authMiddleWare.js'

const educatorRouter = express.Router()

//add Educator Role 
educatorRouter.get('/update-role', updateRoleToEducator)

// upload.single('image') takes the image from the frontend and stores it temporarily on the server. The file is available in req.file

educatorRouter.post('/add-course',upload.single('image'),protectEducator,addCourse)

// update-course 
educatorRouter.put('/update-courses/:courseId',upload.single('image'),protectEducator,UpdateCourse)

// router for get all courses
educatorRouter.get('/courses',protectEducator,geEducatorCourse)

educatorRouter.get('/dashboard',protectEducator,educatorDeshboardData)

educatorRouter.get('/enorlled-students',protectEducator,getEnrolledStudentData)

educatorRouter.delete('/delete-course/:courseId',deleteCourse)

export default educatorRouter;