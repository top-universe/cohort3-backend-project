const userRoutes = require("express").Router();
const AuthController = require("./Controller");

// student-routes

// api/users - register
userRoutes.post("/users", AuthController.Register);

// api/users/auth - login
userRoutes.post("users/login", AuthController.Login);

// api/users/verify - Email verification
userRoutes.get("/users/verify/:id", AuthController.Verify);

// api/users/reset_password - Reset Password
userRoutes.post("users/reset_password", AuthController.resetPassword);
// exports
module.exports = userRoutes;
