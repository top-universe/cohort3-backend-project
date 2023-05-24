const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
