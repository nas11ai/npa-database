const router = require("express").Router();
const { Op } = require('sequelize');
const { SuccessResponse, DataDetails } = require("../../../models/response");
const { getAllApartmentPaymentTermWithCondition, getAllApartmentPaymentTerm, getApartmentPaymentTermById, } = require("../../../services/apartment/payment_terms");

router.get("/", async (req, res, next) => {
  try {
    const where = {};

    if (req.query.payment_term) {
      where.paymentTerm = {
        [Op.substring]: req.query.payment_term,
      };
    }

    if (Object.keys(where).length === 0) {
      const paymentTerms = await getAllApartmentPaymentTerm();

      const response = new SuccessResponse(200, "OK", new DataDetails("apartment_payment_terms", paymentTerms));
      res.status(response.code).json(response);
      return;
    }

    const paymentTerms = await getAllApartmentPaymentTermWithCondition(where);

    const response = new SuccessResponse(200, "OK", new DataDetails("apartment_payment_terms", paymentTerms));
    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const paymentTerm = await getApartmentPaymentTermById(Number(req.params.id));

    const response = new SuccessResponse(200, "OK", new DataDetails("apartment_payment_terms", paymentTerm));
    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
