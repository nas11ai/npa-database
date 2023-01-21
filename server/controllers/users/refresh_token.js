const jwt = require('jsonwebtoken');

const { ErrorResponse, ErrorDetails } = require("../models/response");
const {
  ACCESS_TOKEN_SECRET,
  TOKEN_ALGORITHM,
  TOKEN_ISSUER,
  TOKEN_AUDIENCE,
} = require("../utils/config");

const accessTokenValidator = (req, res, next) => {
  const authorizationHeader = req.header('authorization');
  if (!authorizationHeader) {
    const err = new ErrorDetails("AccessTokenError", "access_token", "access token is wrong");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(401, "UNAUTHORIZED", { [err.attribute]: err.message });
  }

  const parts = authorizationHeader.split(' ');
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    const err = new ErrorDetails("AccessTokenError", "access_token", "access token is missing");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(401, "UNAUTHORIZED", { [err.attribute]: err.message });
  }

  const accessToken = parts[1];

  try {
    console.log(req.cookies);

    const cookies = req.cookies;

    if (!cookies?.jwt) {
      const err = new ErrorDetails("BlacklistTokenError", "refresh_token", "is missing");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(401, "UNAUTHORIZED", { [err.attribute]: err.message });
=======
router.get("/", async (req, res, next) => {
  try {
    console.log(req.cookies);

    const cookies = req.cookies;

    if (!cookies?.jwt) {
      const err = new ErrorDetails("BlacklistTokenError", "refresh_token", "is missing");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(401, "UNAUTHORIZED", { [err.attribute]: err.message });
    }

    const refreshToken = cookies.jwt

    const { newAccessToken, userRole } = await refreshTokenValidator(refreshToken);

    const response = new SuccessResponse(201, "CREATED", new DataDetails("access_token", {
      "user_role": userRole,
      "new_access_token": newAccessToken,
    }));
    res.status(201).json(response);
  } catch (error) {
    res.clearCookie('jwt');
    next(error);
  }
=======
router.post("/", async (req, res, next) => {
  const refreshToken = req.cookies.refresh_token

  if (!refreshToken) {
    res.status(401).json({
      error: true,
      name: "MissingToken",
      message: "Missing refresh token",
    });
    return;
  }

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const err = new ErrorDetails("AccessTokenError", "access_token", "access token has expired");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(401, "UNAUTHORIZED", { [err.attribute]: err.message });
    }

    const refreshToken = cookies.jwt

    const { newAccessToken, userRole } = await refreshTokenValidator(refreshToken);

    res.status(201).json({
      error: false,
      message: "New access token has been created",
      user_role: userRole,
      access_token: newAccessToken,
    });
  } catch (error) {
    // res.clearCookie('refresh_token');
    next(error);
  }

  res.status(201).json({
    error: false,
    message: "New access token has been created",
    user_role: userRole,
    access_token: newAccessToken,
  });
>>>>>>> 8325ee2 (fix: login and auth logic error)
});

module.exports = accessTokenValidator
