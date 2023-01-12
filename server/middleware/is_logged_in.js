const jwt = require("jsonwebtoken");
const {
  REFRESH_TOKEN_SECRET,
  TOKEN_ALGORITHM,
  TOKEN_ISSUER,
  TOKEN_AUDIENCE,
} = require("../utils/config");

const isLoggedIn = (req, res, next) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return next();
  }

  const decodedToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, {
    algorithm: TOKEN_ALGORITHM,
    issuer: TOKEN_ISSUER,
    audience: TOKEN_AUDIENCE,
  });

  if (!decodedToken) {
    return next();
  }

  return res.status(400).json({
    error: true,
    name: "LoginError",
    message: "User already logged in",
  });
}

module.exports = isLoggedIn;
