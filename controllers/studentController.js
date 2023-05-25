const userModel = require("../models/studentModel");
const { hash_password, compare_password } = require("../utils/Password.js");
const { sendResponse, generate_token, generate_link } = require("../utils/sendResponse");

// @desc - Register new User
// @routes - api/users - POST
// @access - Public
const Register = async (req, res) => {
  try {
    // receive input
    let { email, password } = req.body;
    // validate - to ensure all required field were submitted
    if (!email || !password) {
      return sendResponse(res, 400, "All fields are required");}
    // Check for duplicates
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      sendResponse(res,409,"Email Already in use.");
    }
   
    // Hash the password - BCRYPT
    password = await hash_password(password);

    // Generate a verification Link 
    // Payload for userModel to generate token 
    const payload = {
      user: {
        email,
        password
      }
    };
    // 1. generate a token
    const token = await generate_token(payload);
    // 2. Generate Link and append that token to the link
    const link = await generate_link(token);
    // Email the verification Link to the user
    // Postmark will be used for this implementation in future amendment 

    // save to the records to database
    const user = await userModel.create({
      email,
      password,
      verification_token: token,
    });

    // send success response
    // data property contains verification link while postmark isnt in use now
    sendResponse(res,201,"Registration Successful. Verification link sent to your email.",link)
  } catch (err) {
    // send back error
    sendResponse(res,501,err.toString());
  }
};

// @desc - Authenticate & Authorize User
// @routes - api/users/auth
// @access - Public
const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return sendResponse(res, 404, 'User not found');
    }

    // Compare the provided password with the stored password
    const isPasswordMatch = await compare_password(password, user.password);
    if (!isPasswordMatch) {
      return sendResponse(res, 401, 'Incorrect password');
    }
    const token = generate_token(payload);
    return sendResponse(res, 200, 'Login successful', { token });

  } catch (error) {
    return sendResponse(res, 500, 'Internal server error');
  }
};

// @desc - Authenticate & Authorize User
// @routes - api/users/auth
// @access - Private
const Verify = async (req, res) => {
  try {
    // Fetch the verification token from the request params
    const { id } = req.params;
    
    // Find the user with the matching verification token
    const student = await userModel.findOne({ verificationToken: id });
    
    // Check if user exists
    if (!student) {
      return sendResponse(res, 404, "Student not found");
    }
    
    // Update the user's verification status and remove the verification token
    student.isVerified = true;
    student.verificationToken = undefined;
    await student.save();
    
    // Return a success response
    return sendResponse(res, 200, "Email verified successfully");
  } catch (error) {
    return sendResponse(res, 500, "Server error");
  }
};


// @desc - View user profile
// @routes - api/users/profile
// @access - Private
const Profile = () => { };

// @desc - View user profile
// @routes - api/users/profile
// @access - Private
const Update = () => { };


// @desc - reset user password
// @routes - api/users/reset-password
// @access - Private
const resetPassword = async (req, res) => {
  try {
    // Get the user's email from the request body
    const { email,password } = req.user;

    // Find the user with the matching email
    const user = await userModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return sendResponse(res, 404, "User not found");
    }
    // Hash the new password
    const hashedPassword = await hash_password(password);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();
    // Return a success response
    return sendResponse(res, 200, "Password reset successfully");
  } catch (error) {
    return sendResponse(res, 500, error.toString());
  }
};


module.exports = { Register, Login, Verify, Profile, Update, resetPassword };
