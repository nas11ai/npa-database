const { PropertyFacilityName } = require("../../../models/property");
const { ErrorResponse, ErrorDetails } = require("../../../models/response");

const updateFacilityNameById = async (id, newFacilityName) => {
  if (isNaN(id)) {
    const err = new ErrorDetails("PropertyFacilityName", "id", [
      "id must be an integer",
      "id must not be null",
    ]);
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (id <= 0) {
    const err = new ErrorDetails("PropertyFacilityName", "id", "id must be more than zero");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (typeof newFacilityName !== "string") {
    const err = new ErrorDetails("PropertyFacilityName", "facility_name", [
      "facility_name must be string",
      "facility_name must not be null",
    ]);
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (!newFacilityName) {
    const err = new ErrorDetails("PropertyFacilityName", "facility_name", "facility_name must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  const propertyFacilityName = await PropertyFacilityName.findByPk(id);

  if (!propertyFacilityName) {
    const err = new ErrorDetails("PropertyFacilityName", "id", "property area not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
  }

  try {
    propertyFacilityName.regionName = newFacilityName[0].toUpperCase() + newFacilityName.slice(1);
    await propertyFacilityName.save();
  } catch (error) {
    // TODO: ganti console ke log kalau sudah mau production
    console.error(error);
    const err = new ErrorDetails("PropertyFacilityName", "facility_name", error.errors[0].message);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }
}

module.exports = updateFacilityNameById;
