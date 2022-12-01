const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

module.exports = asyncHandler(async (req, res, next) => {
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

  req.user = decodedData;
  next();
});
