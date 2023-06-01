// api/users/profile - GET user info
userRoutes.get("/users/profile", studentAuth, Profile);
// api/users/profile - PUT update info
userRoutes.put("users/profile", studentAuth, Update);
// api/users/reset_password - Change Password
userRoutes.post("users/change_password", changePassword);
// api/users/reset_password - Change Password
userRoutes.post("users/change_password", changePassword);
