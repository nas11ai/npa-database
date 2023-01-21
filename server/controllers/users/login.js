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

<<<<<<< HEAD
<<<<<<< HEAD
    res.cookie('jwt', newRefreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: 'None',
      secure: true,
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

=======
>>>>>>> 16ef581 (feat: change token expired time for development)
      res.cookie('jwt', newRefreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
>>>>>>> 7c3571e (feat: remove secure:true for development)
=======
      // maxAge: 24 * 60 * 60 * 1000,
      maxAge: 10 * 1000,
>>>>>>> eb5e7af (feat: change cookie expired time to 10 second)
=======
      // maxAge: 24 * 60 * 60 * 1000,
      maxAge: 15 * 1000,
>>>>>>> 16ef581 (feat: change token expired time for development)
      });

      const response = new SuccessResponse(200, "OK", new DataDetails("login", {
        "user_role": userRole,
        "access_token": newAccessToken,
      }));

      res.status(response.code).json(response);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
