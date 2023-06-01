const express = require("express");
require("dotenv").config();
const connectToDB = require("./src/config/database");
const userRoutes = require("./src/modules/auth/Route");
// const router = require("./routes");

const server = express();
server.use(express.json());

// Mounting Routes
// server.use(router);
server.use("/api", userRoutes);

const PORT = process.env.PORT || 3550;

// Connect Database
connectToDB().then(() => {
  server.listen(PORT, () => {
    console.log(
      `DB Connected and Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
    );
  });
});
