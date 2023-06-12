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
  students: [
    {
      student: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      paymentStatus: {
        type: Boolean,
        default: false,
      },
    },
  ],
  lessons: {
    type: [
      {
        lessonTitle: String,
        lessonDescription: String,
        lessonURL:String, //url of uploaded lesson 
      }
    ],
    default: [],
  },
  // Other course fields
});

const Course = model('Course', courseSchema);

module.exports = Course;