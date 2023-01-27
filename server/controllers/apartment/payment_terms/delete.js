const router = require("express").Router();
const { SuccessResponse, DataDetails } = require("../../../models/response");
const { deleteApartmentPaymentTermById } = require("../../../services/apartment/payment_terms");

router.delete("/:id", async (req, res, next) => {
  try {
    await deleteApartmentPaymentTermById(Number(req.params.id));

    const response = new SuccessResponse(204, "NO_CONTENT", new DataDetails("apartment_payment_terms", null));
    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
