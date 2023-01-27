const createNewApartmentPaymentTerm = require("./create_new_apartment_payment_terms");
const getAllApartmentPaymentTerm = require("./get_all_apartment_payment_term");
const getAllApartmentPaymentTermWithCondition = require("./get_all_apartment_payment_term_with_condition");
const getApartmentPaymentTermById = require("./get_apartment_payment_term_by_id");
const updatePaymentTermById = require("./update_payment_term_by_id");
const deleteApartmentPaymentTermById = require("./delete_apartment_payment_term_by_id");

module.exports = { createNewApartmentPaymentTerm, getAllApartmentPaymentTerm, getAllApartmentPaymentTermWithCondition, getApartmentPaymentTermById, updatePaymentTermById, deleteApartmentPaymentTermById };
