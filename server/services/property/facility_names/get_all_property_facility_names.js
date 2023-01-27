const { PropertyFacilityName } = require("../../../models/property");

const getAllPropertyFacilityName = async () => {
  return await PropertyFacilityName.findAll();
}

module.exports = getAllPropertyFacilityName;
