const router = require('express').Router();
const { SuccessResponse, DataDetails } = require('../../models/response');
const { login } = require("../../services/users");


router.post('/', async (req, res, next) => {
<<<<<<< HEAD
  try {
    const { username, password } = req.body;

    const { newAccessToken, newRefreshToken, userRole, error } = await login(username, password);
=======
  const { username, password } = req.body;

  const { newAccessToken, newRefreshToken, userRole, error } = await login(username, password);
>>>>>>> 8325ee2 (fix: login and auth logic error)

    res.cookie('jwt', newRefreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: 'None',
      secure: true,
<<<<<<< HEAD
      //TODO: Ganti ke satu hari kalau sudah mau production
      // maxAge: 24 * 60 * 60 * 1000,
      maxAge: 15 * 1000,
=======
      maxAge: 24 * 60 * 60 * 1000,
>>>>>>> aa7f850 (feat add secure:true for cookie)
    });

    const response = new SuccessResponse(200, "OK", new DataDetails("login", {
      "user_role": userRole,
      "access_token": newAccessToken,
    }));

    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
<<<<<<< HEAD
=======

  res.cookie('refresh_token', newRefreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  res.status(200).json({
    error: false,
    message: "Login success",
    user_role: userRole,
    access_token: newAccessToken
  });
>>>>>>> 8325ee2 (fix: login and auth logic error)
});

module.exports = router;
