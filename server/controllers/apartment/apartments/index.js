const createNewApartmentRouter = require("./create");
const readApartmentRouter = require("./read");
const updateApartmentRouter = require("./update");
const deleteApartmentRouter = require("./delete");
const restoreApartmentRouter = require("./restore");

module.exports = { createNewApartmentRouter, readApartmentRouter, updateApartmentRouter, deleteApartmentRouter, restoreApartmentRouter };
