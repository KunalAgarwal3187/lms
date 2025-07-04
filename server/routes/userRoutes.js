import express from 'express'
import { addUserRatings, getUserCourseProgress, getUserData, purchaseCourse, UpdateuserCourseProgress, userEnrolledCourses } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/data',getUserData)
userRouter.get('/enrolled-courses',userEnrolledCourses)
userRouter.post('/purchase',purchaseCourse);

userRouter.post('/update-course-progress',UpdateuserCourseProgress);
userRouter.get('/get-course-progress',getUserCourseProgress);
userRouter.get('/add-rating',addUserRatings);

export default userRouter;