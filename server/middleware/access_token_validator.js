const jwt = require('jsonwebtoken');
<<<<<<< HEAD

const { ErrorResponse, ErrorDetails } = require("../models/response");
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
      const err = new ErrorDetails("AccessTokenError", "access_token", "authorization header is empty");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
    }

    const parts = authorizationHeader.split(' ');
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
      const err = new ErrorDetails("AccessTokenError", "access_token", "access token is missing");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
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
      const err = new ErrorDetails("AccessTokenError", "access_token", "access token has expired");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(401, "UNAUTHORIZED", { [err.attribute]: err.message });
    }
    if (error.name === "JsonWebTokenError") {
      const err = new ErrorDetails("AccessTokenError", "access_token", error.message);
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(401, "UNAUTHORIZED", { [err.attribute]: err.message });
    }
    next(error);
  }
}

module.exports = accessTokenValidator
