const bcrypt = require("bcrypt");

const { User } = require("../../models");

const register = async (username, fullname, role, password) => {
  if (!(username && fullname && role && password)) {
    return {
      name: "RegisterRequestError",
      statusCode: 400,
      message: "Invalid register request",
    };
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {
    await User.create({ username, fullname, role, passwordHash, createdBy: "Superadmin" });
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    if (error.name === "SequelizeUniqueConstraintError") {
      return {
        name: "RegistrationError",
        statusCode: 400,
        message: error.message,
      };
    }
    if (error.message.includes("role")) {
      return {
        name: "RegistrationError",
        statusCode: 400,
        message: "Invalid role, must be (superadmin)/(admin)/(user)",
      };
    }
    return {
      name: "InternalServerError",
      statusCode: 500,
      message: error.message,
    };
  }

  return null;
}

module.exports = register;
