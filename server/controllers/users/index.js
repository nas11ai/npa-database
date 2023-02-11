const loginRouter = require("./login");
const refreshTokenRouter = require("./refresh_token");
const accessTokenValidatorRouter = require("./access_token_validator");
const registerRouter = require("./register");
const logoutRouter = require("./logout");

module.exports = { loginRouter, refreshTokenRouter, accessTokenValidatorRouter, registerRouter, logoutRouter };
