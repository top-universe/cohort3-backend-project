const { sendResponse, jwt_verify } = require("../utils/sendResponse");
require("dotenv").config({ path: "../config/.env" })

const studentAuth = function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return sendResponse(res, 401, 'No Authorization Header provided');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return sendResponse(res, 401, 'No Authorization Token provided');
        }
        const decoded = jwt_verify(token);
        const userRole = decoded.user.role;
        const userVerified= decoded.user.isVerified;
        if (userRole !== 'student') {
            return sendResponse(res, 403, 'Not authorized to access this resource');
        } 
        if (!userVerified.email){
            return sendResponse(res, 404, 'Email Not Verified');
        }
        else {
            req.user = decoded.user;
            next();
        }
    }
    catch (error) {
        return sendResponse(res, 500, error.toString());
    }
}

module.exports={studentAuth}