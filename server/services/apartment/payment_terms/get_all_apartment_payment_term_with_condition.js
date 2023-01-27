const { ApartmentPaymentTerm } = require("../../../models/apartment");
const { ErrorResponse, ErrorDetails } = require("../../../models/response");

const getAllApartmentPaymentTermWithCondition = async (where) => {
  if (typeof where !== "object" || Array.isArray(where) || where === null || Object.keys(where).length === 0) {
    const err = new ErrorDetails("ApartmentPaymentTermError", "where", [
      "condition must be an object",
      "condition must not be null"
    ]);
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  const paymentTerms = await ApartmentPaymentTerm.findAll({ where });

  if (paymentTerms.length === 0) {
    const err = new ErrorDetails("ApartmentPaymentTermError", "payment_term", "payment_term not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
  }

  return paymentTerms;
}

module.exports = getAllApartmentPaymentTermWithCondition;
