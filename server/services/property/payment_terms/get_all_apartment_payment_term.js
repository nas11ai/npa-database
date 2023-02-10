const { ApartmentPaymentTerm } = require("../../../models/apartment");

const getAllApartmentPaymentTerm = async () => {
  return await ApartmentPaymentTerm.findAll();
}

module.exports = getAllApartmentPaymentTerm;
