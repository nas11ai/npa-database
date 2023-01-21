const router = require('express').Router();
const { SuccessResponse, DataDetails } = require('../../models/response');
const { login } = require("../../services/users");


router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const { newAccessToken, newRefreshToken, userRole, error } = await login(username, password);

<<<<<<< HEAD
    res.cookie('jwt', newRefreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      //TODO: Ganti ke 1 hari kalau deployment
      // maxAge: 24 * 60 * 60 * 1000,
      maxAge: 15 * 1000,
=======
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
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
>>>>>>> 7c3571e (feat: remove secure:true for development)
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
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  res.status(200).json({
    error: false,
    message: "Login success",
    access_token: newAccessToken
  });
>>>>>>> d783db1 (fix: cors policy error and cookie does not included in browser)
});

module.exports = router;
