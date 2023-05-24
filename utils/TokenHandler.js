require("dotenv").config({ path: "config/.env" });
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

const generate_token = async (input) => {
  try {
    return jwt.sign(input, SECRET, { expiresIn: "2d" });
  } catch (err) {
    throw err;
  }
};

module.exports = { generate_token };
