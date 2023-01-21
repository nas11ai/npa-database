const jwt = require('jsonwebtoken');
<<<<<<< HEAD

const { ErrorResponse, ErrorDetails } = require("../../models/response");
=======
>>>>>>> 8325ee2 (fix: login and auth logic error)
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
<<<<<<< HEAD
      const err = new ErrorDetails("AccessTokenError", "access_token", "is wrong");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(401, "UNAUTHORIZED", { [err.attribute]: err.message });
    }

    const parts = authorizationHeader.split(' ');
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
      const err = new ErrorDetails("AccessTokenError", "access_token", "is missing");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(401, "UNAUTHORIZED", { [err.attribute]: err.message });
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
      const err = new ErrorDetails("AccessTokenError", "access_token", "has expired");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(401, "UNAUTHORIZED", { [err.attribute]: err.message });
    }
    const err = new ErrorDetails("AccessTokenError", "access_token", error.message);
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(401, "UNAUTHORIZED", { [err.attribute]: err.message });
=======
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
>>>>>>> 8325ee2 (fix: login and auth logic error)
  }
}

module.exports = accessTokenValidator