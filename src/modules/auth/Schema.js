const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    // required: [true, "Please enter a firstName"],
    minLength: [2, "firstName should be more than 2 characters"],
    maxLength: [15, "firstName cannot exceed 15 characters"],
  },
  lastName: {
    type: String,
    // required: [true, "Please enter a lastName"],
    minLength: [2, "lastName should be more than 2 characters"],
    maxLength: [15, "lastName cannot exceed 15 characters"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    default: "empty@gmail.com",
  },
  password: {
    type: String,
    required: true,
    required: [true, "Please enter your password"],
    minLength: [8, "Password should be greater than 8 characters"],
  },
  role: {
    type: String,
    default: "student",
  },
  course: [{
      type: Schema.Types.ObjectId,
      ref: 'Course' // This refers to the 'Course' collection
    }],
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: null,
  },
});
const User = model("User", userSchema);
module.exports = User;
