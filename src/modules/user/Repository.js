const { Auth, Course } = require("./Model");

//global function to compare students object
const isStudentEnrolled = (studentObj, userId) => {
    return studentObj.student.toString() === userId;
};

// Enroll in a single course
const authRepo = {
    enrollCourse: async (userId, courseId) => {
        const course = await Course.findById(courseId);
        if (!course) {
            throw new Error('Course not found');
        }
        const enrolledStudent = course.students.find(studentObj => isStudentEnrolled(studentObj, userId));
        if (enrolledStudent) {
            throw new Error('You are already enrolled in this course');
        }
        course.students.push(userId);
        await course.save();
    },
    // Pay for a course
    payCourse: async (userId, courseId) => {
        const course = await Course.findById(courseId);
        if (!course) {
            throw new Error('Course not found');
        }
        const enrolledStudent = course.students.find(studentObj => isStudentEnrolled(studentObj, userId));
        if (!enrolledStudent) {
            throw new Error('You are not enrolled in this course');
        }
        if (enrolledStudent.paymentStatus) {
            throw new Error('Payment for this course has already been completed');
        }
        course.paymentStatus = true;
        await course.save();
    },
    // Watch a course
    watchCourse: async (userId, courseId) => {
        const course = await Course.findOne({ _id: courseId, students: userId });
        if (!course) {
            throw new Error('Course not found');
        }
        const enrolledStudent = course.students.find(studentObj => isStudentEnrolled(studentObj, userId));
        if (!enrolledStudent) {
            throw new Error('You are not enrolled in this course');
        }
        if (!enrolledStudent.paymentStatus) {
            throw new Error('Payment for this course has not been completed');
        }
        //watch-course logic here
        // we will assume the user is watching the course
        return "Watching the course";
    },
    // Get a single course
    getCourse: async (userId, courseId) => {
        const course = await Course.findById(courseId);
        if (!course) {
            throw new Error('Course not found');
        }
        const enrolledStudent = course.students.find(studentObj => isStudentEnrolled(studentObj, userId));
        if (!enrolledStudent) {
            throw new Error('You are not enrolled in this course');
        }
        return course;
    },
    // Get all courses
    getCourses: async (userId) => {
        try {
            // retrieve all courses
            const courses = await Course.find({ 'students.student': userId });
            return courses;
        } catch (error) {
            throw new Error(error)
        }
    },
    // Drop a single course
    dropCourse: async (userId, courseId) => {
        const course = await Course.findById(courseId);
        if (!course) {
            throw new Error('Course not found');
        }
        const enrolledStudentIndex = course.students.findIndex(studentObj => isStudentEnrolled(studentObj, userId));
        if (enrolledStudentIndex === -1) {
            throw new Error('You are not enrolled in this course');
        }
        // Remove the user from the course's students array
        course.students.splice(enrolledStudentIndex, 1);
        await course.save();
    }
}

module.exports = authRepo;