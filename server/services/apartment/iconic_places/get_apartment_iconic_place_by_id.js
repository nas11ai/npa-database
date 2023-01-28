const { ApartmentIconicPlace } = require("../../../models/apartment");
const { ErrorResponse, ErrorDetails } = require("../../../models/response");

const getApartmentIconicPlaceById = async (id) => {
  if (isNaN(id)) {
    const err = new ErrorDetails("ApartmentIconicPlaceError", "id", "id must be an integer");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (id <= 0) {
    const err = new ErrorDetails("ApartmentIconicPlaceError", "id", "id must be more than zero");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  const iconicPlace = await ApartmentIconicPlace.findByPk(id);
  if (!iconicPlace) {
    const err = new ErrorDetails("ApartmentIconicPlaceError", "place_name", "place_name not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
  }

  return iconicPlace;
}

module.exports = getApartmentIconicPlaceById;