const router = require('express').Router();
const { SuccessResponse, DataDetails } = require('../../models/response');
const { login } = require("../../services/users");
router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const { newAccessToken, newRefreshToken, userRole } = await login(username, password);

    res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      //TODO: Ganti ke 1 hari kalau deployment
      // maxAge: 24 * 60 * 60 * 1000,
      maxAge: 15 * 1000,
    });

    const response = new SuccessResponse(200, "OK", new DataDetails("bearer_token", {
      "user_role": userRole,
      "access_token": newAccessToken,
    }));

    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;