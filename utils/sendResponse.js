require("dotenv").config({ path: "config/.env" });
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
const HOST = process.env.HOST || "http://localhost:3550";
const PORT = process.env.PORT || 3004

const sendResponse = function (res, status, message, data) {
    res.status(status).json({
        status,
        message,
        data,
    })
};

const generate_link = (token) => {
  return `${HOST}:${PORT}/api/users/verify/${token}`;
};

const generate_token = async (input) => {
    try {
        return await jwt.sign(input, SECRET, { expiresIn: process.env.EXPIRY });
    } catch (err) {
        return sendResponse(res,401,err.toString())
    }
};

const jwt_verify = async (token)=>{
    try {
        return await jwt.verify(token, process.env.JWT_SECRET);
    }catch(err){
        return sendResponse(res,401,'Invalid Authorization Token',token);
    }}

module.exports = { sendResponse, generate_token, jwt_verify, generate_link }