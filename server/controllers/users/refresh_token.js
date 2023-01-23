const router = require('express').Router();
const { refreshTokenValidator } = require("../../services/users");

const { SuccessResponse, DataDetails, ErrorResponse, ErrorDetails } = require("../../models/response");

router.get("/", async (req, res, next) => {
  try {
    console.log(req.cookies);

    const cookies = req.cookies;

    if (!cookies?.jwt) {
      throw new RefreshTokenError(401, "Missing refresh token");
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
    res.clearCookie('jwt');
    next(error);
  }
});

module.exports = router;
