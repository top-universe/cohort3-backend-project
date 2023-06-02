// api/users/profile - GET user info
userRoutes.get("/users/profile", Profile);

// api/users/profile - PUT update info
userRoutes.put("users/profile", Update);

// api/users/reset_password - Change Password
userRoutes.post("users/change_password", changePassword);

// api/users/reset_password - Change Password
userRoutes.post("users/change_password", changePassword);
