const express = require("express");
require("dotenv").config({ path: "config/.env" });
const connectToDB = require("./config/database");
const router = require("./routes");

const server = express();
server.use(express.json());
// Mounting Routes
server.use(router);

PORT = process.env.PORT || 3550;

// Connect Database
connectToDB();
server.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
  );
});
