const User = require("./Schema");

// Checks if your exists
exports.checkIfEmailExist = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (err) {
    throw err;
  }
};

//save to the records to database
exports.createAccount = async (input) => {
  try {
    return await User.create(input);
  } catch (err) {
    throw err;
  }
};
