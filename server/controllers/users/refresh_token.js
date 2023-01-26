const router = require('express').Router();
const { refreshTokenValidator } = require("../../services/users");

const { SuccessResponse, DataDetails, ErrorResponse, ErrorDetails } = require("../../models/response");

router.get("/", async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      const err = new ErrorDetails("BlacklistTokenError", "refresh_token", "is missing");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(401, "UNAUTHORIZED", { [err.attribute]: err.message });
=======
router.get("/", async (req, res, next) => {
  try {
    console.log(req.cookies);

    const cookies = req.cookies;

    if (!cookies?.jwt) {
      const err = new ErrorDetails("BlacklistTokenError", "refresh_token", "is missing");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(401, "UNAUTHORIZED", { [err.attribute]: err.message });
    }

    const refreshToken = cookies.jwt

    const { newAccessToken, userRole } = await refreshTokenValidator(refreshToken);

    const response = new SuccessResponse(201, "CREATED", new DataDetails("access_token", {
      "user_role": userRole,
      "new_access_token": newAccessToken,
    }));
    res.status(201).json(response);
  } catch (error) {
<<<<<<< HEAD
    res.clearCookie('jwt');
=======
    // res.clearCookie('refresh_token');
>>>>>>> 7c3571e (feat: remove secure:true for development)
    next(error);
  }
=======
router.post("/", async (req, res, next) => {
  const refreshToken = req.cookies.refresh_token

    const cookies = req.cookies;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const err = new ErrorDetails("AccessTokenError", "access_token", "access token has expired");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(401, "UNAUTHORIZED", { [err.attribute]: err.message });
    }

    const refreshToken = cookies.jwt

    const { newAccessToken, userRole } = await refreshTokenValidator(refreshToken);

    res.status(201).json({
      error: false,
      message: "New access token has been created",
      user_role: userRole,
      access_token: newAccessToken,
    });
  } catch (error) {
    res.clearCookie('jwt');
    next(error);
  }
=======
router.post("/", async (req, res, next) => {
  const refreshToken = req.cookies.refresh_token

    const cookies = req.cookies;

    if (!cookies?.jwt) {
      throw new RefreshTokenError(401, "Missing refresh token");
    }

    const refreshToken = cookies.jwt

    const { newAccessToken, userRole } = await refreshTokenValidator(refreshToken);

    res.status(201).json({
      error: false,
      message: "New access token has been created",
      user_role: userRole,
      access_token: newAccessToken,
    });
  } catch (error) {
    // res.clearCookie('refresh_token');
    next(error);
  }
}

    const response = new SuccessResponse(201, "CREATED", new DataDetails("access_token", {
      "user_role": userRole,
      "new_access_token": newAccessToken,
    }));
    res.status(201).json(response);
  } catch (error) {
    res.clearCookie('jwt');
    next(error);
  }
});

module.exports = router;