const createNewApartment = require("./create_new_apartment");
const getAllApartments = require("./get_all_apartments");
const updateOrCreateApartmentById = require("./update_or_create_apartment_by_id");
const deleteApartmentById = require("./delete_apartment_by_id");
const restoreApartmentById = require("./restore_apartment_by_id");

module.exports = { createNewApartment, getAllApartments, updateOrCreateApartmentById, deleteApartmentById, restoreApartmentById };
