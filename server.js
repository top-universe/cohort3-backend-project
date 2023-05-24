const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const UserRoutes = require("./routes/userRoute");

// Routes
// const users = require("./routes/userRoute");

const app = express();

app.use(express.json());

// Config
dotenv.config({ path: "config/.env" });

// Mounting Routes
app.use("/api", UserRoutes);

port = process.env.PORT || 3550;

// Connect Database
connectDatabase();
app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${port}`
  );
});
