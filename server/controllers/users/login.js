const router = require('express').Router();
const { login } = require("../../services/users");
const { isLoggedIn } = require("../../middleware");


router.post('/', isLoggedIn, async (req, res, next) => {
  const { username, password } = req.body;

  const { newAccessToken, newRefreshToken, error } = await login(username, password);

  if (error) {
    res.status(error.statusCode).json({
      error: true,
      name: error.name,
      message: error.message,
    });
    return;
  }

  res.cookie('refresh_token', newRefreshToken, {
    httpOnly: true,
    sameSite: 'None',
    //TODO: ganti ke true kalau sudah di deploy
    secure: false,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  res.status(200).json({
    error: false,
    message: "Login success",
    access_token: newAccessToken
  });
});

module.exports = router;
