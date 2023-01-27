const { ApartmentPaymentTerm } = require("../../../models/apartment");
const { ErrorResponse, ErrorDetails } = require("../../../models/response");

const getApartmentPaymentTermById = async (id) => {
  if (isNaN(id)) {
    const err = new ErrorDetails("ApartmentPaymentTermError", "id", "id must be an integer");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (id <= 0) {
    const err = new ErrorDetails("ApartmentPaymentTermError", "id", "id must be more than zero");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  const paymentTerm = await ApartmentPaymentTerm.findByPk(id);
  if (!paymentTerm) {
    const err = new ErrorDetails("ApartmentPaymentTermError", "payment_term", "payment_term not found");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
  }

  return paymentTerm;
}

module.exports = getApartmentPaymentTermById;