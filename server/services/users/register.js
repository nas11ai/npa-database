const bcrypt = require("bcrypt");

const { RegisterError } = require("../../models/error");
const { User } = require("../../models/user");

const register = async (username, fullname, role, password) => {
  if (!(username && fullname && role && password)) {
    throw new RegisterError(400, "Invalid register request");
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {
    //TODO: change createdBy when production
    await User.create({ username, fullname, role, passwordHash, createdBy: "Superadmin" });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new RegisterError(400, "Username has been taken");
    }
    if (error.message.includes("role")) {
      throw new RegisterError(400, "Invalid role, must be (superadmin)/(admin)/(user)");
    }
    throw new RegisterError(500, error.message);
  }

  return;
}

module.exports = register;
