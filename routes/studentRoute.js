const express = require("express");
const userRoutes = express.Router();
const { Register, Verify, Login, Profile, Update, resetPassword } = require("../controllers/studentController");
const {studentAuth}=require("../middleware/auth")

// student-routes
// api/users - register
userRoutes.post("/users", Register);
// api/users/auth - login
userRoutes.post("users/login",Login)
// api/users/profile - GET user info
userRoutes.get("/users/profile",studentAuth,Profile)
// api/users/profile - PUT update info
userRoutes.put("users/profile",studentAuth,Update)
// api/users/verify - Email verification
userRoutes.get("/users/verify/:id", Verify);
// api/users/reset_password - Reset/Forgotten Password
userRoutes.post("users/reset_password", resetPassword)


// exports
module.exports = UserRoutes;

