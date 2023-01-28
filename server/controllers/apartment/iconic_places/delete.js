const router = require("express").Router();
const { SuccessResponse, DataDetails } = require("../../../models/response");
const { deleteApartmentIconicPlaceById } = require("../../../services/apartment/iconic_places");

router.delete("/:id", async (req, res, next) => {
  try {
    await deleteApartmentIconicPlaceById(Number(req.params.id));

    const response = new SuccessResponse(204, "NO_CONTENT", new DataDetails("apartment_iconic_places", null));
    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
