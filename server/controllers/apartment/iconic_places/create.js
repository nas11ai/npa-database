const router = require("express").Router();
const { SuccessResponse, DataDetails } = require("../../../models/response");
const { createNewApartmentIconicPlace } = require("../../../services/apartment/iconic_places");

router.post("/", async (req, res, next) => {
  const { place_name } = req.body;

  try {
    await createNewApartmentIconicPlace(place_name);

    const response = new SuccessResponse(201, "CREATED", new DataDetails("apartment_iconic_places", null));
    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
