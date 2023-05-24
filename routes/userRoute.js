const express = require("express");
const UserRoutes = express.Router();
const { Register, Verify } = require("../controllers/userController");

// routes
UserRoutes.post("/users", Register);
UserRoutes.put("/users/verify", Verify);

// exports
module.exports = UserRoutes;

/* api/users - register
api/users/auth - login
api/users/profile - GET user info
api/users/profile - PUT update info 
api/users/verify - Email verification
api/users/reset_password - Reset/Forgotten Password
*/
