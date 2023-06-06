const {model,Schema} = require('mongoose');

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  lessons: {
    type: [
      {
        lessonTitle: String,
        lessonContent: String,
        lessonURL:String, //url of uploaded lesson 
        //extra fields(possible)
      }
    ],
    default: [],
  },
  // Other course fields
});

const Course = model('Course', courseSchema);

module.exports = Course;