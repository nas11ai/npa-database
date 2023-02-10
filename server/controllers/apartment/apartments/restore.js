const router = require("express").Router();
const { SuccessResponse, DataDetails } = require("../../../models/response");
const { restoreApartmentById } = require("../../../services/apartment/apartments");

router.get("/:kode_propar", async (req, res, next) => {
  try {
    await restoreApartmentById(Number(req));

    const response = new SuccessResponse(200, "OK", new DataDetails("property_person_in_charges", null));
    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
