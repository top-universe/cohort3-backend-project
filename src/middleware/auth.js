const helper = require("../utils/helpers");

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
    return helper.Response(res, 500, error.toString());
  }
};


const authRole = (role) => {
  return (req, res, next) => {
    // Check if the user's role is allowed
    if (role === req.user.role) {
      next(); // User is authorized, proceed to the next middleware/route handler
    } else {
      return helper.Response(res, 403, 'Unauthorized to access this route');
    }
  };
};

module.exports = { userAuthenticate, authRole }
