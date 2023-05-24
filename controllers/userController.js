const User = require("../models/userModel");
const { hash_password } = require("../utils/Hasher");
const { generate_token } = require("../utils/TokenHandler");
const generate_link = require("../utils/GenerateLink");

// @desc - Register new User
// @routes - api/users - POST
// @access - Public
const Register = async (req, res) => {
  try {
    // receive input
    let { email, password } = req.body;

    // validate - to ensure all required field were submitted
    if (!email || !password) {
      throw Error("All fields are required!");
    }

    // Check for duplicates
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw Error("Email Already in use.");
    }

    // Hash the password - BCRYPT
    password = await hash_password(password);

    // Generate a verification Link
    // 1. generate a token
    const token = await generate_token({ email });

    // 2. Generate Link and append that token to the link
    const link = await generate_link(token);

    // Email the verification Link to the user

    // save to the records to database
    const user = await User.create({
      email,
      password,
      verification_token: token,
    });

    // send success response
    res.status(201).json({
      status: "success",
      message: "Registration Successful. Verification link sent to your email.",
      user,
    });
  } catch (err) {
    // send back error
    res.status(501).json({ status: "failed", message: err.message });
  }
};

// @desc - Authenticate new User
// @routes - api/users/auth
// @access - Public
const Login = () => {
  // check if user exits - using email
  // compare password - using password - bcrypt
  //Success
};

const Verify = () => {
  // Fetch token
  // compare
  //Update the verification status and delete the verification token
};

// @desc - View user profile
// @routes - api/users/profile
// @access - Private
const Profile = () => {};

module.exports = { Register, Login, Verify, Profile };
