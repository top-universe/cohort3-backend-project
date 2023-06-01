const AuthModel = require("./Model");
const helper = require("../../utils/helpers");

const AuthController = {
  /**
   * This controller function enables new user sign up
   * @param {object} req - accepts user input from the request body
   * @param {any} res
   * @returns - sends a verification email to user and success a message if everything checks
   */

  Register: async (req, res) => {
    try {
      // receive input
      let { email, password } = req.body;

      // validate - to ensure all required field were submitted
      if (!email || !password) {
        return helper.Response(res, 400, "All fields are required");
      }
      // Check for duplicates
      const userExists = await AuthModel.checkIfUserExists(email);
      if (userExists) {
        helper.Response(res, 409, "Email Already in use.");
      }

      // Hash the password - BCRYPT
      password = await helper.hashPassword(password);

      // 1. generate a token
      const token = await helper.generateJWT({ email });

      // 2. Generate Link and append that token to the link
      const keyPath = "verifyemail";
      const link = helper.generateLink(keyPath, token);

      // Email the verification Link to the user
      /*

        Postmark will be used for this implementation in future amendment

      */

      // save to the records to database
      const user = await AuthModel.signUp({
        email,
        password,
        verificationToken: token,
      });

      // send success response
      // data property contains verification link while postmark isnt in use now
      helper.Response(
        res,
        201,
        "Registration Successful. Verification link sent to your email.",
        link
      );
    } catch (err) {
      // send back error
      helper.Response(res, 501, err.toString());
    }
  },

  /**
   * This controller function handles User login
   * @param {object} req - accepts email and password from the request body
   * @param {*} res
   * @returns - a successful message if login credentials are valid
   */

  Login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if email and password was supplied
      if (!email || !password) {
        return helper.Response(res, 400, "All fields are required");
      }
      // Find the user by email
      const user = await AuthModel.checkIfUserExists(email);

      if (!user) {
        return sendResponse(res, 404, "User not found");
      }

      // Compare the provided password with the stored password
      const checkPassword = await helper.matchPasswords(
        password,
        user.password
      );
      if (!checkPassword) {
        return helper.Response(res, 401, "Incorrect Login Credentials");
      }

      // generate acces token with the user email and id as payload
      const accessToken = await helper.generateJWT({ email, id: user.id });

      // Success message if everything goes well
      return helper.Response(res, 200, "Login successful", { accessToken });
    } catch (error) {
      return sendResponse(res, 500, "Internal server error");
    }
  },

  /**
   * This controller function handles email verification
   * @param {*} req
   * @param {*} res
   * @returns
   */

  emailVerification: async (req, res) => {
    try {
      // Fetch the verification token from the request params
      const { token } = req.params;

      // Find the user with the matching verification token
      const JWTPayload = await helper.verifyJWT(token);

      // Check if email exists
      let user = await AuthModel.checkIfUserExists(JWTPayload.email);
      if (!user) {
        return helper.Response(res, 404, "User not found");
      }

      // compare the email token and the Database token
      if (token !== user.verificationToken) {
        return helper.Response(res, 401, "Invalid token");
      }

      // Update the user's verification status and remove the verification token
      const updatedData = {
        isVerified: true,
        verificationToken: null,
      };

      user = await AuthModel.UpdateUser(user._id, updatedData);

      // Return a success response
      return helper.Response(res, 200, "Email verified successfully");
    } catch (error) {
      return helper.Response(res, 500, "Server error");
    }
  },

  /**
   * This function handles password reset
   * @param {*} req - accepts user's email from the request body
   * @param {*} res
   * @returns
   */

  forgotPassword: async (req, res) => {
    try {
      // Get the user's email
      const { email } = req.body;

      // Check if user exists
      const user = await AuthModel.checkIfUserExists(email);
      if (!user) {
        return helper.Response(res, 404, "Email not found");
      }

      // Generate token and append on the password reset link
      const token = await helper.generateJWT({ id: user._id });

      // Generate Password reset Link
      const keyPath = "changepassword";
      const link = helper.generateLink(keyPath, token);

      // Email the Password Reset Link to the user
      /*

        Postmark will be used for this implementation in future amendment

      */

      // Return a success response
      return helper.Response(res, 200, "Password Reset link sent", link);
    } catch (error) {
      return sendResponse(res, 500, error.toString());
    }
  },

  changePassword: async (req, res) => {
    try {
      // receive input
      const { token } = req.params;
      let { password, confirmPassword } = req.body;

      // validate - to ensure all required field were submitted
      if (!password || !confirmPassword || password !== confirmPassword) {
        return helper.Response(
          res,
          400,
          "All fields required. They should be the same."
        );
      }

      // Verify token
      const JWTpayload = await helper.verifyJWT(token);

      // Hash the password - BCRYPT
      password = await helper.hashPassword(password);

      // Update password
      const user = await AuthModel.UpdateUser(JWTpayload.id, { password });

      // success message
      return helper.Response(res, 200, "Email verified successfully");
    } catch (err) {
      return helper.Response(res, 500, "Server error");
    }
  },
};

module.exports = AuthController;
