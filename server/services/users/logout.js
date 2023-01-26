const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");

const {
  REFRESH_TOKEN_SECRET,
  TOKEN_ALGORITHM,
  TOKEN_ISSUER,
  TOKEN_AUDIENCE,
} = require("../../utils/config");

const { SessionBlacklist } = require("../../models/user");
const { ErrorResponse, ErrorDetails } = require("../../models/response");

const logout = async (refreshToken) => {
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

    if (!user) {
      const err = new ErrorDetails("BlacklistTokenError", "refresh_token", "malicious refresh token");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
    }

    //TODO: ganti model jwtid jadi jti
    const blacklistedToken = await SessionBlacklist.create({ jwtid: jti, refreshToken, userId });

    if (!blacklistedToken) {
      const err = new ErrorDetails("BlacklistTokenError", "refresh_token", "refresh token is wrong");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(401, "UNAUTHORIZED", { [err.attribute]: err.message });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const { userId, jti } = jwt.decode(refreshToken, {
        algorithm: TOKEN_ALGORITHM,
      });

      const user = await User.findOne({
        where: {
          id: userId,
          deletedAt: null,
        },
      });

      if (!user) {
        const err = new ErrorDetails("BlacklistTokenError", "refresh_token", "malicious refresh token");
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
      }

      const blacklistedToken = await SessionBlacklist.create({ jwtid: jti, refreshToken, userId });
      if (!blacklistedToken) {
        const err = new ErrorDetails("BlacklistTokenError", "refresh_token", "refresh token is wrong");
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(401, "UNAUTHORIZED", { [err.attribute]: err.message });
      }
      return;
    }

    if (error.name === "JsonWebTokenError") {
      const err = new ErrorDetails("BlacklistTokenError", "refresh_token", error.message);
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

module.exports = logout
