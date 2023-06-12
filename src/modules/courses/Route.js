const courseRouter = require('express').Router();
const { courseController, lessonController } = require('./Controller');
const { authRole, userAuthenticate } = require('../../middleware/auth');
const { courseValidator, lessonValidator } = require('../../middleware/validator');
// to process the file operations on the api
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Course-routes 
courseRouter.post('/courses', userAuthenticate, authRole('instructor'), courseValidator.createCourseValidator, courseController.createCourse); // Create a new course
courseRouter.put('/courses/:courseId', userAuthenticate, authRole('instructor'), courseValidator.updateCourseValidator, courseController.updateCourse); // Update a course
courseRouter.delete('/courses/:courseId', userAuthenticate, authRole('instructor'), courseController.deleteCourse); // Delete a course

//Course-lesson routes 
courseRouter.post('/courses/:courseId/lessons', userAuthenticate, authRole('instructor'), lessonValidator.createLessonValidator, lessonController.createLesson); // Create a new lesson under a course
courseRouter.put('/courses/:courseId/lessons/:lessonId', userAuthenticate, authRole('instructor'), lessonValidator.updateLessonValidator, lessonController.updateLesson); // Update a lesson
courseRouter.delete('/courses/:courseId/lessons/:lessonId', userAuthenticate, authRole('instructor'), lessonController.deleteLesson); // Delete a lesson
// Lesson upload route //using digital oceans for file upload
courseRouter.post('/courses/:courseId/lessons/:lessonId', userAuthenticate, authRole('instructor'), upload.single('file'), lessonController.uploadLesson);


module.exports = courseRouter;