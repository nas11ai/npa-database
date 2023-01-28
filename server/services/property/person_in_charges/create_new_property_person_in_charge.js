const { PropertyPersonInCharge } = require("../../../models/property");
const { ErrorResponse, ErrorDetails } = require("../../../models/response");

const createNewPropertyPersonInCharge = async (fullname, role, company, phoneNumber) => {
  if (typeof fullname !== "string") {
    const err = new ErrorDetails("PropertyPersonInChargeError", "fullname", [
      "fullname must be a string",
      "fullname must not be null",
    ]);
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (!fullname) {
    const err = new ErrorDetails("PropertyPersonInChargeError", "fullname", "fullname must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (typeof company !== "string") {
    const err = new ErrorDetails("PropertyPersonInChargeError", "company", [
      "company must be a string",
      "company must not be null",
    ]);
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (!company) {
    const err = new ErrorDetails("PropertyPersonInChargeError", "company", "company must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (typeof role !== "string") {
    const err = new ErrorDetails("PropertyPersonInChargeError", "role", [
      "role must be a string",
      "role must not be null",
    ]);
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (!role) {
    const err = new ErrorDetails("PropertyPersonInChargeError", "role", "role must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (typeof phoneNumber !== "string") {
    const err = new ErrorDetails("PropertyPersonInChargeError", "phoneNumber", [
      "phoneNumber must be a string",
      "phoneNumber must not be null",
    ]);
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (!phoneNumber) {
    const err = new ErrorDetails("PropertyPersonInChargeError", "phoneNumber", "phoneNumber must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  try {
    await PropertyPersonInCharge.create({ fullname, role, company, phoneNumber });
  } catch (error) {
    // TODO: ganti console ke log kalau sudah mau production
    console.error(error);
    const err = new ErrorDetails("PropertyPersonInChargeError", "property_person_in_charges", error.message);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }
}

module.exports = createNewPropertyPersonInCharge;
