const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

module.exports = (rolesToCheck) => {
  return function (req, res, next) {
    try {
      if (req.method === "OPTIONS") {
        next();
      }

      if (!req.headers.authorization.startsWith("Bearer")) {
        throw new Error("invalid type of token");
      }

      const [_, token] = req.headers.authorization.split(" ");
      if (!token) {
        throw new Error("no token provided");
      }

      const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const { roles } = decodedData;
      const hasRole = roles.includes(rolesToCheck);
      if (!hasRole) {
        return res.status(403).json({
          code: 403,
          status: "Error",
          message: "Forbidden. No access permition",
        });
      }

      next();
    } catch (error) {
      return res.status(403).json({
        code: 403,
        status: "Error",
        message: "User in not authorized",
      });
    }
  };
};
