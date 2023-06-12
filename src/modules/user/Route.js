const courseRouter = require('express').Router();
const authController = require('./Controller');
const {authRole,userAuthenticate} = require('../../middleware/auth');
const { courseValidator, lessonValidator } = require('../../middleware/validator');
// Route for accessing and enrolling in courses, accessible to only students

courseRouter.post('/users/courses/:courseId/enroll', userAuthenticate, authRole('student'), authController.enrollCourse); //enroll in a single course
courseRouter.post('/users/:courseId/courses/pay', userAuthenticate, authRole('student'), authController.payCourse);//pay for a course
courseRouter.get('/courses/:courseId/watch',  userAuthenticate, authRole('student'), authController.watchCourse);//watch course
courseRouter.get('/users/courses/:courseId', userAuthenticate, authRole('student'), authController.getCourse);//get a single course
// courseRouter.get('/users/courses/:courseId/:lessonId', userAuthenticate, authRole('student'), authController.getCourseLesson);//get a single course-lesson
//get all courses
courseRouter.get('/users/courses', userAuthenticate, authRole('student'), authController.getCourses);//ongoing course & //completed course
courseRouter.delete('/users/courses/:courseId', userAuthenticate, authRole('student'), authController.dropCourse);//drop a single course

module.exports = courseRouter;