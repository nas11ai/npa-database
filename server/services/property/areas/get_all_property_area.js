const { PropertyArea } = require("../../../models/property");

const getAllPropertyArea = async () => {
  return await PropertyArea.findAll();
}

module.exports = getAllPropertyArea;
