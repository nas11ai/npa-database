const { ApartmentIconicPlace } = require("../../../models/apartment");
const { ErrorResponse, ErrorDetails } = require("../../../models/response");

const getAllApartmentIconicPlaceWithCondition = async (where) => {
  if (typeof where !== "object" || Array.isArray(where) || where === null || Object.keys(where).length === 0) {
    const err = new ErrorDetails("ApartmentIconicPlaceError", "where", [
      "condition must be an object",
      "condition must not be null"
    ]);
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  const iconicPlaces = await ApartmentIconicPlace.findAll({ where });

  if (iconicPlaces.length === 0) {
    const err = new ErrorDetails("ApartmentIconicPlaceError", "place_name", "place_name not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
  }

  return iconicPlaces;
}

module.exports = getAllApartmentIconicPlaceWithCondition;
