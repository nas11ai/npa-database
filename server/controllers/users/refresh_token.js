const router = require('express').Router();
const { refreshTokenValidator } = require("../../services/users");

router.post("/", async (req, res, next) => {
  const authorizationHeader = req.header('authorization');
  if (!authorizationHeader) {
    res.status(401).json({
      error: true,
      name: "EmptyAuthorizationHeader",
      message: "Invalid token",
    });
  }

  const parts = authorizationHeader.split(' ');
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    res.status(401).json({
      error: true,
      name: "MissingToken",
      message: "Missing access token",
    });
    return;
  }

  const accessToken = parts[1];
  const refreshToken = req.cookies.refresh_token

  if (!refreshToken) {
    res.status(401).json({
      error: true,
      name: "MissingToken",
      message: "Missing refresh token",
    });
    return;
  }

  const { newAccessToken, error } = await refreshTokenValidator(accessToken, refreshToken);
  if (error) {
    res.status(error.statusCode).json({
      error: true,
      name: error.name,
      message: error.message,
    });
    return;
  }

  if (!(newAccessToken && error)) {
    res.status(200).json({
      error: false,
      message: "Access token has not expired yet",
      access_token: "",
    });
    return;
  }

  res.status(201).json({
    error: false,
    message: "New access token has been created",
    access_token: newAccessToken
  });
});

module.exports = router;
