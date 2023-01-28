const { PropertyPersonInCharge } = require("../../../models/property");

const getAllPropertyPersonInCharges = async () => {
  return await PropertyPersonInCharge.findAll();
}

module.exports = getAllPropertyPersonInCharges;
