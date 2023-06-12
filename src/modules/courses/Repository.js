const Course = require('./Schema');
const User = require("../auth/Schema")
const upload = require("../../client/awsFileUtils")
require("dotenv").config();

const courseRepo = {
    createCourse: async (title, description, instructorID) => {
        try {
            const course = await Course.create({
                title,
                description,
                instructor: instructorID,
                lessons: []
            });
            return course;
        } catch (error) {
            throw new Error(error);
        }
    },
    updateCourse: async (courseId, title, description) => {
        try {
            const course = await Course.findByIdAndUpdate(
                courseId,
                {
                    title,
                    description,
                },
                { new: true }
            );
            return course;
        } catch (error) {
            throw new Error(error);
        }
    },
    deleteCourse: async (courseId) => {
        try {
            await Course.findByIdAndDelete(courseId);
        } catch (error) {
            throw new Error(error);
        }
    },
    verifyCourseOwnership: async (courseId, instructorID) => {
        try {
            const course = await Course.findById(courseId);
            return course && course.instructor.toString() === instructorID.toString();
        } catch (error) {
            throw new Error(error);
        }
    },
    // Add other repository functions as needed
};


const lessonRepo = {
    createLesson: async (courseId, title, Description) => {
        const course = await Course.findById(courseId);

        if (!course) {
            throw new Error('Course not found');
        }

        const lesson = {
            lessonTitle: title,
            lessonDescription: Description
        };

        course.lessons.push(lesson);
        await course.save();
        return lesson;
    },
    updateLesson: async (courseId, lessonId, title, Description) => {
        const course = await Course.findById(courseId);

        if (!course) {
            throw new Error('Course not found');
        }

        const lesson = course.lessons.id(lessonId);

        if (!lesson) {
            throw new Error('Lesson not found');
        }

        lesson.lessonTitle = title;
        lesson.lessonDescription = Description;

        await course.save();

        return lesson;
    },
    deleteLesson: async (courseId, lessonId) => {
        const course = await Course.findById(courseId);

        if (!course) {
            throw new Error('Course not found');
        }

        const lesson = course.lessons.id(lessonId);

        if (!lesson) {
            throw new Error('Lesson not found');
        }

        lesson.remove();
        await course.save();
    },
    uploadLesson: async (courseId, lessonId, uploadParameters) => {
        try {
            // Find the course by ID
            const course = await Course.findById(courseId);

            // Check if the course exists
            if (!course) {
                throw new Error('Course not found');
            }

            // Find the lesson within the course's lessons array
            const lesson = course.lessons.id(lessonId);

            // Check if the lesson exists
            if (!lesson) {
                throw new Error('Lesson not found');
            }
            // Handle the file upload process here using Digital Oceans
            const data = await upload(uploadParameters);
            console.log("[--------------------------------------------------------------]")
            // Save the file details to the lesson or course
            const fileUrl = `${process.env.DO_SPACES_LESSON}${uploadParameters.Key}`;
            lesson.lessonURL = fileUrl;
            await course.save();
            return lesson;
        } catch (error) {
            throw error;
        }
    },
    // Add other repository functions as needed
};

module.exports = { courseRepo, lessonRepo };
