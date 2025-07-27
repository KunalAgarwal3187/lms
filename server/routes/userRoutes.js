import express from 'express'
import { addUserRatings, getUserCourseProgress, getUserData, purchaseCourse, UpdateCompleteTrue, UpdateuserCourseProgress, userEnrolledCourses } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/data',getUserData)
userRouter.get('/enrolled-courses',userEnrolledCourses)
userRouter.post('/purchase',purchaseCourse);
userRouter.post('/update-course-progress',UpdateuserCourseProgress);
userRouter.post('/get-course-progress',getUserCourseProgress);
userRouter.post('/add-rating',addUserRatings);
userRouter.put('/update-course-Complete',UpdateCompleteTrue);
export default userRouter;