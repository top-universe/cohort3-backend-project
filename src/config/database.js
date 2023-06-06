const mongoose = require("mongoose");
require("dotenv").config();

const connectToDB = async () => {
  return await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectToDB;
