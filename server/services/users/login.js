const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const { User } = require("../../models/user");
const { LoginError } = require("../../models/error");
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
    throw new LoginError(401, "Invalid username or password")
  }

  const newAccessToken = jwt.sign({
    userId: user.id,
    userRole: user.role,
  }, ACCESS_TOKEN_SECRET, {
    algorithm: TOKEN_ALGORITHM,
    issuer: TOKEN_ISSUER,
    audience: TOKEN_AUDIENCE,
    expiresIn: '10m'
  });

  const newRefreshToken = jwt.sign({
    userId: user.id,
  }, REFRESH_TOKEN_SECRET, {
    jwtid: crypto.randomUUID(),
    algorithm: TOKEN_ALGORITHM,
    issuer: TOKEN_ISSUER,
    audience: TOKEN_AUDIENCE,
    expiresIn: '1d',
  });

  return {
    newAccessToken,
    newRefreshToken,
    userRole: user.role,
    error: null,
  };
}

module.exports = login;