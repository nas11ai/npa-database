const { PropertyPersonInCharge } = require("../../../models/property");
const { ErrorResponse, ErrorDetails } = require("../../../models/response");

const updatePropertyPersonInChargeById = async (id, newFullname, newRole, newCompany, newPhoneNumber) => {
  if (isNaN(id)) {
    const err = new ErrorDetails("PropertyPersonInCharge", "id", [
      "id must be an integer",
      "id must not be null",
    ]);
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (id <= 0) {
    const err = new ErrorDetails("PropertyPersonInCharge", "id", "id must be more than zero");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (!(newFullname || newRole || newCompany || newPhoneNumber) || !(typeof newFullname === "string" || typeof newRole === "string" || typeof newCompany === "string") || typeof newPhoneNumber === "string") {
    const err = new ErrorDetails("PropertyPersonInCharge", "person_in_charge", [
      "new_fullname & new_role & new_company & new_phone_number must not be null",
      "new_fullname & new_role & new_company & new_phone_number must be string"
    ]);
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
  }

  const propertyPersonInCharge = await PropertyPersonInCharge.findByPk(id);

  if (!propertyPersonInCharge) {
    const err = new ErrorDetails("PropertyPersonInCharge", "id", "person_in_charge not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
  }

  try {
    if (typeof newFullname === "string") {
      propertyPersonInCharge.fullname = newFullname[0].toUpperCase() + newFullname.slice(1);
    }

    if (typeof newRole === "string") {
      propertyPersonInCharge.role = newRole;
    }

    if (typeof newCompany === "string") {
      propertyPersonInCharge.company = newCompany;
    }

    if (typeof newPhoneNumber === "string") {
      propertyPersonInCharge.phoneNumber = newPhoneNumber;
    }

    await propertyPersonInCharge.save();
  } catch (error) {
    // TODO: ganti console ke log kalau sudah mau production
    console.error(error);
    const err = new ErrorDetails("PropertyPersonInCharge", "person_in_charge", error.errors[0].message);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }
}

module.exports = updatePropertyPersonInChargeById;
