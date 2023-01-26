const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");

const {
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
  TOKEN_ALGORITHM,
  TOKEN_ISSUER,
  TOKEN_AUDIENCE,
} = require("../../utils/config");

const { SessionBlacklist } = require("../../models/user");
const { ErrorResponse, ErrorDetails } = require("../../models/response");

const refreshTokenValidator = async (refreshToken) => {
  try {
    const { userId, jti } = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, {
      algorithm: TOKEN_ALGORITHM,
      issuer: TOKEN_ISSUER,
      audience: TOKEN_AUDIENCE,
    });

    const user = await User.findOne({
      where: {
        id: userId,
        deletedAt: null,
      },
    });

    const blacklistedToken = await SessionBlacklist.findByPk(jti);

    if (blacklistedToken) {
      const err = new ErrorDetails("BlacklistTokenError", "refresh_token", "refresh token has expired");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(401, "UNAUTHORIZED", { [err.attribute]: err.message });
    }

    const newAccessToken = jwt.sign({
      userId,
      userRole: user.role,
    },
      ACCESS_TOKEN_SECRET,
      {
        algorithm: TOKEN_ALGORITHM,
        issuer: TOKEN_ISSUER,
        audience: TOKEN_AUDIENCE,
        //TODO: Change to 10 minute when production
        expiresIn: '15s',
      });

    return {
      newAccessToken,
      userRole: user.role,
    };

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const { userId, jti } = jwt.decode(refreshToken, {
        algorithm: TOKEN_ALGORITHM,
      });

      const blacklistedToken = await SessionBlacklist.create({ jwtid: jti, refreshToken, userId });
      if (!blacklistedToken) {
        const err = new ErrorDetails("BlacklistTokenError", "refresh_token", "refresh token is wrong");
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(401, "UNAUTHORIZED", { [err.attribute]: err.message });
      }
      const err = new ErrorDetails("BlacklistTokenError", "refresh_token", "refresh token has expired");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(401, "UNAUTHORIZED", { [err.attribute]: err.message });
    }
    const err = new ErrorDetails(error.name, "refresh_token", error.message);
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(500, "INTERNAL_SERVER_ERROR", { [err.attribute]: err.message });
  }
}

module.exports = refreshTokenValidator;
