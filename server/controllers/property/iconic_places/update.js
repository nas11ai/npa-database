const router = require("express").Router();
const { SuccessResponse, DataDetails } = require("../../../models/response");
const { updatePlaceNameById } = require("../../../services/property/iconic_places");

router.put("/:id", async (req, res, next) => {
  try {
    await updatePlaceNameById(Number(req.params.id), req.body.new_place_name);

    const response = new SuccessResponse(204, "NO_CONTENT", new DataDetails("property_iconic_places", null));
    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
