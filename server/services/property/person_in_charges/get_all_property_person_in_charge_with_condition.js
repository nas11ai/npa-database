const { PropertyPersonInCharge } = require("../../../models/property");
const { ErrorResponse, ErrorDetails } = require("../../../models/response");

const getAllPropertyPersonInChargeWithCondition = async (where) => {
  if (typeof where !== "object" || Array.isArray(where) || where === null || Object.keys(where).length === 0) {
    const err = new ErrorDetails("PropertyPersonInChargeError", "where", [
      "condition must be an object",
      "condition must not be null"
    ]);
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  const personInCharges = await PropertyPersonInCharge.findAll({ where });

  if (personInCharges.length === 0) {
    const err = new ErrorDetails("PropertyPersonInChargeError", "person_in_charge", "person_in_charge not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
  }

  return personInCharges;
}

module.exports = getAllPropertyPersonInChargeWithCondition;
