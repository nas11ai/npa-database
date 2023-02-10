const router = require("express").Router();
const { SuccessResponse, DataDetails } = require("../../../models/response");
const { createNewPropertyIconicPlace } = require("../../../services/property/iconic_places");

router.post("/", async (req, res, next) => {
  const { place_name } = req.body;

  try {
    await createNewPropertyIconicPlace(place_name);

    const response = new SuccessResponse(201, "CREATED", new DataDetails("property_iconic_places", null));
    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
