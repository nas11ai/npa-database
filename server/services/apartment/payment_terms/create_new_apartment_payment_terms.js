const { ApartmentPaymentTerm } = require("../../../models/apartment");
const { ErrorResponse, ErrorDetails } = require("../../../models/response");

const createNewApartmentPaymentTerm = async (paymentTerm) => {
  if (typeof paymentTerm !== "string") {
    const err = new ErrorDetails("ApartmentPaymentTermError", "payment_term", [
      "payment_term must be a string",
      "payment_term must not be null",
    ]);
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (!paymentTerm) {
    const err = new ErrorDetails("ApartmentPaymentTermError", "payment_term", "payment_term must not be blank");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  try {
    await ApartmentPaymentTerm.create({ paymentTerm: paymentTerm[0].toUpperCase() + paymentTerm.slice(1) });
  } catch (error) {
    // TODO: ganti console ke log kalau sudah mau production
    console.error(error);
    const err = new ErrorDetails("ApartmentPaymentTermError", "payment_term", error.errors[0].message);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }
}

module.exports = createNewApartmentPaymentTerm;
