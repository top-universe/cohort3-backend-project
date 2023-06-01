require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
const HOST = process.env.HOST || "http://localhost:3550";
const PORT = process.env.PORT || 3004;
const bcrypt = require("bcryptjs");

/******************************************************************************************
 *This is a custom Response handler
 * @param {*} res
 * @param {*} status
 */

exports.Response = function (res, status, message, data) {
  res.status(status).json({
    status,
    message,
    data,
  });
};

/*****************************************************************************************
 * This function recieves a token, generate a verification link and append the payload
 * @param {String} token
 * @returns - a verification link
 */

exports.generateLink = (path, token) => {
  return `${PORT}/api/users/${path}/${token}`;
};

/*****************************************************************************************
 * This function receives a payload, a secret and generates a token
 * @param {Object} - payload
 * @returns
 */

exports.generateJWT = async (input) => {
  try {
    return jwt.sign(input, SECRET, { expiresIn: process.env.EXPIRY_DATE });
  } catch (err) {
    throw err;
  }
};

/*****************************************************************************************
 * This function recieve the JWT Token and verifies it
 * @param {String} token
 * @returns - JWT status
 */
exports.verifyJWT = async (token) => {
  try {
    let user;

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      user = payload;
    });
    return user;
  } catch (err) {
    throw err;
  }
};

/****************************************************************************************
 * This function receive the user inputted password and hash it
 * @param {String} password
 * @returns - A hashed Password
 */

exports.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    throw err;
  }
};

/*****************************************************************************************
 * This function compares user inputted password and the existing password stored in the Database
 * @param {String, String} password
 * @returns
 */

exports.matchPasswords = async (incomingPassword, databasePassword) => {
  try {
    return await bcrypt.compare(incomingPassword, databasePassword);
  } catch (err) {
    throw err;
  }
};
