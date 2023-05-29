const DashboardController = {
  // @desc - View user profile
  // @routes - api/users/profile
  // @access - Private
  Profile: async (req, res) => {
    try {
      // Get the user ID from the authenticated user or request parameters
      const { email } = req.user; // or req.params.id

      // Retrieve the user profile from the database
      const user = await userModel.findOne({ email });

      // Check if the user exists
      if (!user) {
        return sendResponse(res, 404, "User not found");
      }
      // Return the user profile as the response
      return sendResponse(
        res,
        200,
        "User profile retrieved successfully.",
        user
      );
    } catch (error) {
      // Handle any errors that occur during the retrieval process
      return sendResponse(res, 500, error.toString());
    }
  },

  // @desc - View user profile
  // @routes - api/users/profile
  // @access - Private
  Update: async (req, res) => {
    try {
      // Get user email from the authenticated JWT payload
      const userEmail = req.user.email;

      // Find the user by email in the database
      const user = await userModel.findOne({ email: userEmail });

      // Check if the user exists
      if (!user) {
        return sendResponse(res, 404, "User not found");
      }

      // Update the user's data
      if (userEmail) {
        user.email = userEmail;
      }

      // Save the updated user data in the database
      await user.save();

      // Return the updated user data in the response
      return sendResponse(res, 200, "User profile updated successfully", user);
    } catch (error) {
      return sendResponse(
        res,
        500,
        "Failed to update user profile",
        error.toString()
      );
    }
  },

  // @desc - change user password
  // @routes - api/users/change-password
  // @access - Private
  changePassword: async (req, res) => {
    try {
      // Get the user's email from the request body
      const { email, password } = req.user;

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
  },

  // @desc - forgot user password
  // @routes - api/users/forgot-password
  // @access - Private
  forgotPassword: async (req, res) => {
    const { email } = req.body;

    try {
      // Check if the user with the given email exists
      const user = await userModel.findOne({ email });
      if (!user) {
        return sendResponse(res, 404, "User not found");
      }

      // Generate a password reset token
      const resetToken = await generate_token(email);

      // Store the reset token and its expiration in the user's document
      user.verification_token = resetToken;
      await user.save();

      // Return the reset token as part of the JSON response
      return sendResponse(
        res,
        200,
        "Token Generated",
        generate_link(resetToken)
      );
    } catch (error) {
      return sendResponse(res, 500, "Internal Server Error");
    }
  },
};
