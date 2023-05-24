const bcrypt = require("bcryptjs");

const hash_password = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    throw err;
  }
};

module.exports = { hash_password };
