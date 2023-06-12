const authRepo = require('./Repository');
const helper = require("../../utils/helpers");

const authController = {
    enrollCourse: async (req, res) => {
        try {
            const courseId = req.params.courseId;
            const userId = req.user.id;
            await authRepo.enrollCourse(userId, courseId);
            return helper.Response(res, 200, 'Enrolled in the course successfully');
        } catch (error) {
            return helper.Response(res, 500, 'Internal server error')
        }
    },
    payCourse: async (req, res) => {
        try {
            const courseId = req.params.courseId;
            const userId = req.user.id;
            await authRepo.payCourse(userId, courseId);
            return helper.Response(res,200,{ message: 'Payment for the course successful' });
        } catch (error) {
            return helper.Response(res,500,{ message: 'Internal server error' });
        }
    },
    watchCourse: async (req, res) => {
        try {
            const courseId = req.params.courseId;
            const userId = req.user.id;
            await authRepo.watchCourse(userId, courseId);
            return helper.Response(res,200,{ message: 'Watching the course' });
        } catch (error) {
            return helper.Response(res,500,{ message: 'Internal server error' });
        }
    },
    getCourse: async (req, res) => {
        try {
            const courseId = req.params.courseId;
            const userId = req.user.id;
            const course = await authRepo.getCourse(userId,courseId);
            if (!course) {
                return helper.Response(res,404,{ message: 'Course not found' });
            }
            return helper.Response(res,200,{ course });
        } catch (error) {
            return helper.Response(res,500,{ message: 'Internal server error' });
        }
    },
    getCourses: async (req, res) => {
        try {
            const courses = await authRepo.getCourses();
            return helper.Response(res,200,{ courses });
        } catch (error) {
            return helper.Response(res,500,{ message: 'Internal server error' });
        }
    },
    dropCourse: async (req, res) => {
        try {
            const courseId = req.params.courseId;
            const userId = req.user.id;
            await authRepo.dropCourse(userId, courseId);
            return helper.Response(res,200,{ message: 'Dropped the course successfully' });
        } catch (error) {
            return helper.Response(res,500,{ message: 'Internal server error' });
        }
    }
}

module.exports = authController;
