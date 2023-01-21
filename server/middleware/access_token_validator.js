const jwt = require('jsonwebtoken');
const {
  ACCESS_TOKEN_SECRET,
  TOKEN_ALGORITHM,
  TOKEN_ISSUER,
  TOKEN_AUDIENCE,
} = require("../utils/config");

const accessTokenValidator = (req, res, next) => {
  try {
    const authorizationHeader = req.header('authorization');
    if (!authorizationHeader) {
      res.status(401).json({
        error: true,
        name: "AccessTokenError",
        message: "Invalid token",
      });
      return
    }

    const parts = authorizationHeader.split(' ');
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
      res.status(401).json({
        error: true,
        name: "AccessTokenError",
        message: "Missing access token",
      });
      return;
    }

    const accessToken = parts[1];

    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, {
      algorithm: TOKEN_ALGORITHM,
      issuer: TOKEN_ISSUER,
      audience: TOKEN_AUDIENCE,
    });

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({
        error: true,
        name: "AccessTokenError",
        message: "Access token has expired",
      });
    }
    res.status(500).json({
      error: true,
      name: "AccessTokenError",
      message: error.message,
    });
  }
}

module.exports = accessTokenValidator