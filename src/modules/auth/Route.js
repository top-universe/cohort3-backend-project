const userRoutes = require("express").Router();
const AuthController = require("./Controller");

// student-routes

// api/users - register
userRoutes.post("/users", AuthController.Register);

// api/users/auth - login

userRoutes.post("/users/login", AuthController.Login);

// api/users/emailverification - Email verification
userRoutes.put("/users/verifyemail/:token", AuthController.emailVerification);

// api/users/forgotpassword - Initiate Forgot Password
userRoutes.post("/users/forgotpassword", AuthController.forgotPassword);

// api/users/changepassword - Finalize Forgot Password
userRoutes.post("/users/changepassword/:token", AuthController.changePassword);

// exports
module.exports = userRoutes;
