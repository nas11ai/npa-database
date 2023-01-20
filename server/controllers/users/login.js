const router = require('express').Router();
const { SuccessResponse, DataDetails } = require('../../models/response');
const { login } = require("../../services/users");


router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const { newAccessToken, newRefreshToken, userRole, error } = await login(username, password);

    res.cookie('jwt', newRefreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      // maxAge: 24 * 60 * 60 * 1000,
      maxAge: 15 * 1000,
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
<<<<<<< HEAD
=======
>>>>>>> 79b4eb1 (fix: cors policy error and cookie does not included in browser)

  res.cookie('refresh_token', newRefreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
<<<<<<< HEAD
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
=======
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
>>>>>>> 79b4eb1 (fix: cors policy error and cookie does not included in browser)
  });

  res.status(200).json({
    error: false,
    message: "Login success",
<<<<<<< HEAD
    user_role: userRole,
    access_token: newAccessToken
  });
=======
    access_token: newAccessToken
  });
>>>>>>> d783db1 (fix: cors policy error and cookie does not included in browser)
>>>>>>> 79b4eb1 (fix: cors policy error and cookie does not included in browser)
});

module.exports = router;
