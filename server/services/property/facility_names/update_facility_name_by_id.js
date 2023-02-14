const fs = require('fs');
const { PropertyFacilityName } = require("../../../models/property");
const { ErrorResponse, ErrorDetails } = require("../../../models/response");

const updateFacilityNameById = async (id, newFacilityName, newIcon) => {
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

  const propertyFacilityName = await PropertyFacilityName.findByPk(id);

  if (!propertyFacilityName) {
    const err = new ErrorDetails("PropertyFacilityName", "id", "facility_name not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
  }

  try {
    if (newFacilityName) {
      if (typeof newFacilityName !== "string") {
        const err = new ErrorDetails("PropertyFacilityName", "facility_name", "facility_name must be string");
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
      }

      propertyFacilityName.regionName = newFacilityName[0].toUpperCase() + newFacilityName.slice(1);
    }

    if (newIcon) {
      if (newIcon === null || (typeof newIcon === 'object' && Object.keys(newIcon).length === 0) || Array.isArray(newIcon)) {
        const err = new ErrorDetails("PropertyFacilityNameError", "image", [
          "image must be an image file",
          "image must not be null",
        ]);
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
      }

      fs.unlink(propertyFacilityName.iconPath, (err) => {
        if (err) throw err;
      });

      propertyFacilityName.iconPath = newIcon.path;
      propertyFacilityName.iconUrl = `/static/property_facility_icon/${newFacilityName ? newFacilityName : propertyFacilityName.facilityName}/${newIcon.filename}`;
    }

    await propertyFacilityName.save();
  } catch (error) {
    throw error;
  }
}

module.exports = updateFacilityNameById;
