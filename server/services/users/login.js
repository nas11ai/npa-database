const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const { User } = require("../../models");
const {
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
  TOKEN_ALGORITHM,
  TOKEN_ISSUER,
  TOKEN_AUDIENCE,
} = require("../../utils/config");

const login = async (username, password) => {
  const user = await User.findOne({
    where: {
      username: username,
      deletedAt: null,
    },
  });

  const passwordExists = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false;

  if (!(user && passwordExists)) {
    return {
      newAccessToken: "",
      newRefreshToken: "",
      error: {
        name: "LoginError",
        statusCode: 401,
        message: "Invalid username or password"
      },
    };
  }

  const newAccessToken = jwt.sign({
    userId: user.id
  }, ACCESS_TOKEN_SECRET, {
    algorithm: TOKEN_ALGORITHM,
    issuer: TOKEN_ISSUER,
    audience: TOKEN_AUDIENCE,
    expiresIn: '1h'
  });

  const newRefreshToken = jwt.sign({
    userId: user.id,
  }, REFRESH_TOKEN_SECRET, {
    jwtid: crypto.randomUUID(),
    algorithm: TOKEN_ALGORITHM,
    issuer: TOKEN_ISSUER,
    audience: TOKEN_AUDIENCE,
    expiresIn: '7d',
  });

  return {
    newAccessToken,
    newRefreshToken,
    error: null,
  };
}

module.exports = login;