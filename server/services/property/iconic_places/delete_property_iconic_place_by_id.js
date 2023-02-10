const { PropertyIconicPlace } = require("../../../models/property");
const { ErrorResponse, ErrorDetails } = require("../../../models/response");

const deletePropertyIconicPlaceById = async (id) => {
  if (isNaN(id)) {
    const err = new ErrorDetails("PropertyIconicPlaceError", "id", "id must be an integer");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (id <= 0) {
    const err = new ErrorDetails("PropertyIconicPlaceError", "id", "id must be more than zero");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  const iconicPlace = await PropertyIconicPlace.findByPk(id);

  if (!iconicPlace) {
    const err = new ErrorDetails("PropertyIconicPlaceError", "place_name", "place_name not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
  }

  try {
    await iconicPlace.destroy();
  } catch (error) {
    // TODO: ganti console ke log kalau sudah mau production
    console.error(error);
    const err = new ErrorDetails("PropertyIconicPlaceError", "place_name", error.message);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }
}

module.exports = deletePropertyIconicPlaceById;
