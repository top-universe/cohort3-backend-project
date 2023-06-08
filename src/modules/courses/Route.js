const courseRouter = require('express').Router();
const {courseController,lessonController} = require('./Controller');
const {authRole,userAuthenticate} = require('../../middleware/auth');
const { courseValidator, lessonValidator } = require('../../middleware/validator');
const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Course-routes
courseRouter.post('/courses',userAuthenticate, authRole('instructor'),courseValidator.createCourseValidator, courseController.createCourse); // Create a new course
courseRouter.put('/courses/:courseId',userAuthenticate, authRole('instructor'),courseValidator.updateCourseValidator, courseController.updateCourse); // Update a course
courseRouter.delete('/courses/:courseId',userAuthenticate, authRole('instructor'), courseController.deleteCourse); // Delete a course

//Course-lesson routes 
courseRouter.post('/courses/:courseId/lessons',userAuthenticate, authRole('instructor'),lessonValidator.createLessonValidator,lessonController.createLesson); // Create a new lesson under a course
courseRouter.put('/courses/:courseId/lessons/:lessonId',userAuthenticate, authRole('instructor'),lessonValidator.updateLessonValidator, lessonController.updateLesson); // Update a lesson
courseRouter.delete('/courses/:courseId/lessons/:lessonId',userAuthenticate, authRole('instructor'), lessonController.deleteLesson); // Delete a lesson
// Lesson upload route //using digital oceans for file upload
courseRouter.post('/courses/:courseId/lessons/:lessonId',userAuthenticate, upload.single('file'),lessonController.uploadLesson);
// authRole('instructor'), 


/*
// Route for accessing and enrolling in courses, accessible to only students
courseRouter.get('users/courses', userAuthenticate, authRole('student'), AuthController.getCourses);//get all courses
courseRouter.get('users/courses/:courseId', userAuthenticate, authRole('student'), AuthController.getCourse);//get a single course
courseRouter.post('users/courses/:courseId/enroll', userAuthenticate, authRole('student'), AuthController.enrollCourse);//enroll in a single course
courseRouter.delete('users/courses/:courseId', userAuthenticate, authRole('student'), AuthController.dropCourse);//drop a single course
*/

module.exports = courseRouter;