const express = require("express");
require("dotenv").config();
const connectToDB = require("./src/config/database");
const authRoutes = require("./src/modules/auth/Route");
const userRoutes= require("./src/modules/user/Route")
const courseRoutes = require("./src/modules/courses/Route");
const helper = require("./src/utils/helpers");

const server = express();
server.use(express.json());
 
// Mounting Routes
// server.use(router);
server.use("/api", authRoutes);
server.use("/api", userRoutes);
server.use("/api", courseRoutes);

server.use((req, res, next) => { next(new Error(`Could not handle request to ${req.url}`)); });
server.use((err, req, res, next) => { helper.Response(res, 404, err.toString()) });

const PORT = process.env.PORT || 3550;

// Connect Database
connectToDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(
        `DB Connected and Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
      );
    });
  })
  .catch((error)=>{
    throw error.toString()
});
