const jwt = require("jsonwebtoken");
const crypto = require("crypto");
<<<<<<< HEAD
const { User } = require("../../models/user");

=======
const User = require("../../models");
>>>>>>> 8325ee2 (fix: login and auth logic error)
const {
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
  TOKEN_ALGORITHM,
  TOKEN_ISSUER,
  TOKEN_AUDIENCE,
  ENCRYPTION_ALGORITHM,
} = require("../../utils/config");

<<<<<<< HEAD
const { SessionBlacklist } = require("../../models/user");
const { ErrorResponse, ErrorDetails } = require("../../models/response");
=======
const { SessionBlacklist } = require("../../models");
>>>>>>> 8325ee2 (fix: login and auth logic error)

const refreshTokenValidator = async (refreshToken) => {
  try {
    const { userId, jwtid } = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, {
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

    const blacklistedToken = await SessionBlacklist.findByPk(jwtid);

    if (blacklistedToken) {
      const err = new ErrorDetails("BlacklistTokenError", "refresh_token", "refresh token has expired");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(401, "UNAUTHORIZED", { [err.attribute]: err.message });
=======
      return {
        newAccessToken: "",
        userRole: "",
        error: {
          name: "RefreshTokenError",
          statusCode: 401,
          message: "Session has expired"
        },
      };
>>>>>>> 8325ee2 (fix: login and auth logic error)
    }

    const newAccessToken = jwt.sign({
      userId,
<<<<<<< HEAD
      userRole: user.role,
=======
      userRole,
>>>>>>> 8325ee2 (fix: login and auth logic error)
    },
      ACCESS_TOKEN_SECRET,
      {
        algorithm: TOKEN_ALGORITHM,
        issuer: TOKEN_ISSUER,
        audience: TOKEN_AUDIENCE,
<<<<<<< HEAD
        //TODO: Change to 10 minute when production
        expiresIn: '15s',
=======
        expiresIn: '10m'
>>>>>>> 8325ee2 (fix: login and auth logic error)
      });

    return {
      newAccessToken,
      userRole: user.role,
<<<<<<< HEAD
=======
      error: null,
>>>>>>> 8325ee2 (fix: login and auth logic error)
    };

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const { userId, jwtid } = jwt.decode(refreshToken, {
        algorithm: TOKEN_ALGORITHM,
      });

      const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, crypto.randomBytes(32), crypto.randomBytes(16));

      let encryptedRefreshToken = cipher.update(refreshToken, "utf-8", "hex");
      encryptedRefreshToken += cipher.final("hex");

      const blacklistedToken = await SessionBlacklist.create({ jwtid, encryptedRefreshToken, userId });
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
=======
        return {
          newAccessToken: "",
          userRole: "",
          error: {
            name: "RefreshTokenError",
            statusCode: 400,
            message: "Invalid token",
          },
        };
      }
      return {
        newAccessToken: "",
        userRole: "",
        error: {
          name: "RefreshTokenError",
          statusCode: 401,
          message: "Session has expired",
        },
      };
    }
    return {
      newAccessToken: "",
      userRole: "",
      error: {
        name: 'RefreshTokenError',
        statusCode: 500,
        message: error.message,
      },
    };
>>>>>>> 8325ee2 (fix: login and auth logic error)
  }
}

module.exports = refreshTokenValidator;
