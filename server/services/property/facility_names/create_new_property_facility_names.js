const { PropertyFacilityName } = require("../../../models/property");
const { ErrorResponse, ErrorDetails } = require("../../../models/response");

const createNewPropertyFacilityName = async (facilityName) => {
  if (typeof facilityName !== "string") {
    const err = new ErrorDetails("PropertyFacilityNameError", "facility_name", [
      "facility_name must be a string",
      "facility_name must not be null",
    ]);
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (!facilityName) {
    const err = new ErrorDetails("PropertyFacilityNameError", "facility_name", "facility_name must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  try {
    await PropertyFacilityName.create({ facilityName: facilityName[0].toUpperCase() + facilityName.slice(1) });
  } catch (error) {
    // TODO: ganti console ke log kalau sudah mau production
    console.error(error);
    const err = new ErrorDetails("PropertyFacilityNameError", "facility_name", error.errors[0].message);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }
}

module.exports = createNewPropertyFacilityName;
