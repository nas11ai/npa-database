const router = require('express').Router();
const { refreshTokenValidator } = require("../../services/users");

router.post("/", async (req, res, next) => {
  const refreshToken = req.cookies.refresh_token

  const { newAccessToken, userRole } = await refreshTokenValidator(refreshToken);

  const { newAccessToken, userRole, error } = await refreshTokenValidator(refreshToken);
  if (error) {
    res.clearCookie('refresh_token');
    res.status(error.statusCode).json({
      error: true,
      name: error.name,
      message: error.message,
    });
    return;
  }

  res.status(201).json({
    error: false,
    message: "New access token has been created",
    user_role: userRole,
    access_token: newAccessToken,
  });
});

module.exports = router;
