const router = require('express').Router();
const { SuccessResponse, DataDetails } = require('../../models/response');
const { login } = require("../../services/users");


router.post('/', async (req, res, next) => {
  const { username, password } = req.body;

  const { newAccessToken, newRefreshToken, userRole, error } = await login(username, password);

  res.cookie('jwt', newRefreshToken, {
    path: "/",
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    // maxAge: 24 * 60 * 60 * 1000,
    maxAge: 10 * 1000,
  });

  res.status(200).json({
    error: false,
    message: "Login success",
    user_role: userRole,
    access_token: newAccessToken
  });
});

module.exports = router;
