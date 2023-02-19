const { PropertyPaymentTerm } = require("../../../models/property");

const getAllPropertyPaymentTerm = async () => {
  return await PropertyPaymentTerm.findAll();
}

module.exports = getAllPropertyPaymentTerm;
