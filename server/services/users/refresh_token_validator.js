const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../../models");
const {
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
  TOKEN_ALGORITHM,
  TOKEN_ISSUER,
  TOKEN_AUDIENCE,
  ENCRYPTION_ALGORITHM,
} = require("../../utils/config");

const { SessionBlacklist } = require("../../models");

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
      return {
        newAccessToken: "",
        userRole: "",
        error: {
          name: "RefreshTokenError",
          statusCode: 401,
          message: "Session has expired"
        },
      };
    }

    const newAccessToken = jwt.sign({
      userId,
      userRole,
    },
      ACCESS_TOKEN_SECRET,
      {
        algorithm: TOKEN_ALGORITHM,
        issuer: TOKEN_ISSUER,
        audience: TOKEN_AUDIENCE,
        expiresIn: '10m'
      });

    return {
      newAccessToken,
      userRole: user.role,
      error: null,
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
        return {
          newAccessToken: "",
          userRole: "",
          error: {
            name: "RefreshTokenError",
            statusCode: 401,
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
  }
}

module.exports = refreshTokenValidator;
