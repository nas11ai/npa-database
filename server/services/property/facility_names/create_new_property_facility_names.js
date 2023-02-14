const fs = require('fs');
const { PropertyFacilityName } = require("../../../models/property");
const { ErrorResponse, ErrorDetails } = require("../../../models/response");

const createNewPropertyFacilityName = async (facilityName, icon) => {
  try {
    if (!facilityName) {
      const err = new ErrorDetails("PropertyFacilityNameError", "facility_name", "facility_name must not be blank");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
    }

    if (typeof facilityName !== "string") {
      const err = new ErrorDetails("PropertyFacilityNameError", "facility_name", [
        "facility_name must be a string",
        "facility_name must not be null",
      ]);
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
    }

    if (icon === null || (typeof icon === 'object' && Object.keys(icon).length === 0) || Array.isArray(icon)) {
      const err = new ErrorDetails("PropertyFacilityNameError", "image", [
        "image must be an image file",
        "image must not be null",
      ]);
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
    }

    await PropertyFacilityName.create({
      facilityName: facilityName[0].toUpperCase() + facilityName.slice(1),
      iconPath: icon.path,
      iconUrl: `/static/property_facility_icon/${facilityName}/${icon.filename}`,
    });
  } catch (error) {
    fs.unlink(icon.path, (err) => {
      if (err) throw err;
    });

    throw error;
  }
}

module.exports = createNewPropertyFacilityName;
