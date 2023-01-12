const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
  TOKEN_ALGORITHM,
  TOKEN_ISSUER,
  TOKEN_AUDIENCE,
  ENCRYPTION_ALGORITHM,
} = require("../../utils/config");

const { SessionBlacklist } = require("../../models");

const refreshTokenValidator = async (accessToken, refreshToken) => {
  try {
    const { userId, jwtid } = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, {
      algorithm: TOKEN_ALGORITHM,
      issuer: TOKEN_ISSUER,
      audience: TOKEN_AUDIENCE,
    });

    const blacklistedToken = await SessionBlacklist.findByPk(jwtid);

    if (blacklistedToken) {
      return {
        newAccessToken: "",
        error: {
          name: "BlacklistedTokenError",
          statusCode: 401,
          message: "Session has expired"
        },
      };
    }

    const err = accessTokenValidator(accessToken);
    if (!err) {
      return {
        newAccessToken: "",
        error: null,
      };
    }

    if (err && err.name !== "TokenExpiredError") {
      return {
        newAccessToken: "",
        error: {
          name: err.name,
          statusCode: 401,
          message: err.message,
        },
      };
    }

    const newAccessToken = jwt.sign({
      userId
    }, ACCESS_TOKEN_SECRET, {
      algorithm: TOKEN_ALGORITHM,
      issuer: TOKEN_ISSUER,
      audience: TOKEN_AUDIENCE,
      expiresIn: '1h'
    });

    return {
      newAccessToken,
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
          error: {
            name: "TokenValidatorError",
            statusCode: 400,
            message: "Invalid token",
          },
        };
      }
      return {
        newAccessToken: "",
        error: {
          name: "BlacklistedTokenError",
          statusCode: 401,
          message: "Session has expired",
        },
      };
    }
    return {
      newAccessToken: "",
      error: {
        name: error.name,
        statusCode: 500,
        message: error.message,
      },
    };
  }
}

const accessTokenValidator = (accessToken) => {
  try {
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, {
      algorithm: TOKEN_ALGORITHM,
      issuer: TOKEN_ISSUER,
      audience: TOKEN_AUDIENCE,
    });

    return null
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return {
        name: "TokenExpiredError",
        message: "Access token has expired"
      };
    }
    return {
      name: error.name,
      message: error.message
    };
  }
}

module.exports = refreshTokenValidator;
