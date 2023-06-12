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


// Function to update the database record
exports.updateRecord = async (id, updatedData) => {
  try {
    // Update the record by ID and return the updated record
    const updatedRecord = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return updatedRecord;
  } catch (err) {
    throw err;
  }
};

// Function to get UserbyId

