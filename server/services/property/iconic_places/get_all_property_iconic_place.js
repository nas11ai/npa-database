const { PropertyIconicPlace } = require("../../../models/property");

const getAllPropertyIconicPlace = async () => {
  return await PropertyIconicPlace.findAll();
}

module.exports = getAllPropertyIconicPlace;
