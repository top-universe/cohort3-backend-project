const { courseRepo, lessonRepo } = require("./Repository");
const helper = require("../../utils/helpers");

// courseController 
const courseController = {
  createCourse: async (req, res) => {
    try {
      const { title, description } = req.body;
      const course = await courseRepo.createCourse(title, description, req.user.id);
      return helper.Response(res, 201, 'Course created successfully', course);
    } catch (error) {
      return helper.Response(res, 500, error.toString());
    }
  },
  updateCourse: async (req, res) => {
    try {
      const { courseId } = req.params;
      const { title, description } = req.body;
      // Check if the authenticated user is the instructor/owner of the course
      const isOwner = await courseRepo.verifyCourseOwnership(courseId, req.user.id);
      if (!isOwner) {
        return helper.Response(res, 403, 'You are not authorized to update this course');
      }

      const course = await courseRepo.updateCourse(courseId, title, description);

      if (!course) {
        return helper.Response(res, 404, 'Course not found');
      }

      return helper.Response(res, 200, 'Course updated successfully', course);
    } catch (error) {
      return helper.Response(res, 500, error.toString());
    }
  },
  deleteCourse: async (req, res) => {
    try {
      const { courseId } = req.params;

      // Check if the authenticated user is the instructor/owner of the course
      const isOwner = await courseRepo.verifyCourseOwnership(courseId, req.user.id);
      if (!isOwner) {
        return helper.Response(res, 403, 'You are not authorized to delete this course');
      }

      await courseRepo.deleteCourse(courseId);

      return helper.Response(res, 200, 'Course deleted successfully');
    } catch (error) {
      return helper.Response(res, 500, error.toString());
    }
  },
  // Add other controller functions as needed
};

// lessonController
const lessonController = {
  createLesson: async (req, res) => {
    try {
      const { courseId } = req.params;
      const { title, content } = req.body;
      // Check if the authenticated user is the instructor/owner of the course
      const isOwner = await courseRepo.verifyCourseOwnership(courseId, req.user.id);
      if (!isOwner) {
        return helper.Response(res, 403, 'You are not authorized to create a lesson in this course');
      }

      const lesson = await lessonRepo.createLesson(courseId, title, content);
      return helper.Response(res, 201, 'Lesson created successfully', lesson);
    } catch (error) {
      return helper.Response(res, 500, error.toString());
    }
  },
  updateLesson: async (req, res) => {
    try {
      const { courseId, lessonId } = req.params;
      const { title, content } = req.body;
      // Check if the authenticated user is the instructor/owner of the course
      const isOwner = await courseRepo.verifyCourseOwnership(courseId, req.user.id);
      if (!isOwner) {
        return helper.Response(res, 403, 'You are not authorized to update this lesson');
      }
      const lesson = await lessonRepo.updateLesson(courseId, lessonId, title, content);
      return helper.Response(res, 200, 'Lesson updated successfully', lesson);
    } catch (error) {
      return helper.Response(res, 500, error.toString());
    }
  },
  deleteLesson: async (req, res) => {
    try {
      const { courseId, lessonId } = req.params;
      // Check if the authenticated user is the instructor/owner of the course
      const isOwner = await courseRepo.verifyCourseOwnership(courseId, req.user.id);
      if (!isOwner) {
        return helper.Response(res, 403, 'You are not authorized to delete this lesson');
      }
      await lessonRepo.deleteLesson(courseId, lessonId);
      return helper.Response(res, 200, 'Lesson deleted successfully');
    } catch (error) {
      return helper.Response(res, 500, error.toString());
    }
  },
  uploadLesson: async (req, res) => {
    try {
      const { courseId, lessonId } = req.params;
      // Check if the authenticated user is the instructor/owner of the course
      const isOwner = await courseRepo.verifyCourseOwnership(courseId, req.user.id);
      if (!isOwner) {
        return helper.Response(res, 403, 'You are not authorized to upload a file for this lesson');
      }
      // Check if file is available in the request
      console.log(req.body)
      console.log(req.file)
      if (!req.file) {
        return helper.Response(res, 400, 'No file uploaded');
      }
      // configure single upload parameter
      const uploadParameters = {
        bucket: process.env.DO_BUCKET_NAME,
        ContentType: req.query.content_type,
        body: req.file.buffer,
        ACL: process.env.ACL,
        key: req.query.file_name
      };
      const lesson = await lessonRepo.uploadLesson(courseId, lessonId, uploadParameters);
      
      return helper.Response(res, 200, 'Lesson file uploaded successfully', lesson);
    } catch (error) {
      console.log("000000000000000000");
      return helper.Response(res, 500, error.toString()+" here");
    }
  },
  // Add other controller functions as needed
};


module.exports = { courseController, lessonController }