const router = require('express').Router();
const { login } = require("../../services/users");


router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const { newAccessToken, newRefreshToken, userRole, error } = await login(username, password);

    // if (error) {
    //   res.status(error.statusCode).json({
    //     error: true,
    //     name: error.name,
    //     message: error.message,
    //   });
    //   return;
    // }

    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      error: false,
      message: "Login success",
      user_role: userRole,
      access_token: newAccessToken
    });
  } catch (error) {
    next(error);
  }
<<<<<<< HEAD
=======

  res.cookie('refresh_token', newRefreshToken, {
    httpOnly: true,
    sameSite: 'none',
    //TODO: ganti ke true kalau sudah di deploy
    secure: false,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  res.status(200).json({
    error: false,
    message: "Login success",
    access_token: newAccessToken
  });
>>>>>>> 4b3631d (feat: channge same site cookie to none)
});

module.exports = router;
