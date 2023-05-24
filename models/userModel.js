const mongoose = require("mongoose");
// const validator = require("validator");

const userSchema = new mongoose.Schema({
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
    /* validator: [validator.isEmail, "Please enter a valid email"], */
    required: true,
    validate: {
      validator: function (v) {
        return v.endsWith(".com");
      },
      message: (err) => `${err.value} is not a valid email.`,
    },
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
    default: "User",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verification_token: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);
