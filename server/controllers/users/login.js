const router = require('express').Router();
const { SuccessResponse, DataDetails } = require('../../models/response');
const { login } = require("../../services/users");
router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;

  const { newAccessToken, newRefreshToken, userRole } = await login(username, password);

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

    const response = new SuccessResponse(200, "OK", new DataDetails("access_token", {
      "user_role": userRole,
      "access_token": newAccessToken,
    }));

    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }

  res.cookie('refresh_token', newRefreshToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

    const response = new SuccessResponse(200, "OK", new DataDetails("bearer_token", {
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
