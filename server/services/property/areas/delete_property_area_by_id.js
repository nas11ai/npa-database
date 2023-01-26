const { PropertyArea } = require("../../../models/property");
const { ErrorResponse, ErrorDetails } = require("../../../models/response");

const deletePropertyAreaById = async (id) => {
  if (isNaN(id)) {
    const err = new ErrorDetails("PropertyAreaError", "id", "id must be an integer");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (id <= 0) {
    const err = new ErrorDetails("PropertyAreaError", "id", "id must be more than zero");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  const propertyArea = await PropertyArea.findByPk(id);

  if (!propertyArea) {
    const err = new ErrorDetails("PropertyAreaError", "region_name", "region not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
  }

  try {
    await propertyArea.destroy();
  } catch (error) {
    // TODO: ganti console ke log kalau sudah mau production
    console.error(error);
    const err = new ErrorDetails("PropertyAreaError", "region_name", error.message);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }
}

module.exports = deletePropertyAreaById;
