const { PropertyIconicPlace } = require("../../../models/property");
const { ErrorResponse, ErrorDetails } = require("../../../models/response");

const createNewPropertyIconicPlace = async (placeName) => {
  if (typeof placeName !== "string") {
    const err = new ErrorDetails("PropertyIconicPlaceError", "place_name", [
      "place_name must be a string",
      "place_name must not be null",
    ]);
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (!placeName) {
    const err = new ErrorDetails("PropertyIconicPlaceError", "place_name", "place_name must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  try {
    await PropertyIconicPlace.create({ placeName: placeName[0].toUpperCase() + placeName.slice(1) });
  } catch (error) {
    // TODO: ganti console ke log kalau sudah mau production
    console.error(error);
    const err = new ErrorDetails("PropertyIconicPlaceError", "place_name", error.errors[0].message);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }
}

module.exports = createNewPropertyIconicPlace;
