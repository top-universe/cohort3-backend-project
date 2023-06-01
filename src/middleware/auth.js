
const helper = require("../utils/helpers");
require("dotenv").config();

const userAuthenticate = async function (req, res, next) {
  try {
    // fetch if authorization header where set
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return helper.Response(res, 401, "No Authorization Header provided");
    }

    // Extract access token from the headers
    const token = authHeader.split(" ")[1];
    if (!token) {
      return helper.Response(res, 401, "No Authorization Token provided");
    }

    // Verify JWT token and extract the payload
    const user = await helper.verifyJWT(token);
    req.user = user;

    next();
  } catch (error) {
    return sendResponse(res, 500, error.toString());
  }
};

/* const userAuthorize = async function (req, res, next) {
  const userRole = decoded.user.role;
  const userVerified = decoded.user.isVerified;
  if (userRole !== "student") {
    return sendResponse(res, 403, "Not authorized to access this resource");
  }
  if (!userVerified.email) {
    return sendResponse(res, 404, "Email Not Verified");
  } else {
    req.user = decoded.user;
  }
}; */

