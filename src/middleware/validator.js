const Joi = require('joi');
const helper = require('../utils/helpers');

//Courses-Validator
const courseValidator = {
    createCourseValidator: (res,req,next) => {
        const schema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
        });

        validateRequest(res,req, schema);
        next();
    },

    updateCourseValidator: (res,req,next) => {
        const schema = Joi.object({
            title: Joi.string(),
            description: Joi.string(),
        });

        validateRequest(res,req, schema);
        next();
    },
};
//Lessons-Validator
const lessonValidator = {
    createLessonValidator: (res,req,next) => {
        const schema = Joi.object({
            title: Joi.string().required(),
            Description: Joi.string().required(),
        });

        validateRequest(res,req, schema);
        next();
    },

    updateLessonValidator: (res,req,next) => {
        const schema = Joi.object({
            title: Joi.string().required(),
            Description: Joi.string().required(),
        });

        validateRequest(res,req, schema);
        next();
    },
};

//General-Validator
function validateRequest(res,req, schema) {
    const { error } = schema.validate(req.body);
    if (error) {
        // Handle validation error
        return helper.Response(res, 400, error.details[0].message);
    }
}

module.exports = { courseValidator, lessonValidator };
