const router = require("express").Router();
const { SuccessResponse, DataDetails } = require("../../../models/response");
const { deletePropertyIconicPlaceById } = require("../../../services/property/iconic_places");

router.delete("/:id", async (req, res, next) => {
  try {
    await deletePropertyIconicPlaceById(Number(req.params.id));

    const response = new SuccessResponse(204, "NO_CONTENT", new DataDetails("property_iconic_places", null));
    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
