const { ApartmentIconicPlace } = require("../../../models/apartment");

const getAllApartmentIconicPlace = async () => {
  return await ApartmentIconicPlace.findAll();
}

module.exports = getAllApartmentIconicPlace;
