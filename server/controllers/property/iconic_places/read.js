const router = require("express").Router();
const { Op } = require('sequelize');
const { SuccessResponse, DataDetails } = require("../../../models/response");
const { getAllPropertyIconicPlaceWithCondition, getAllPropertyIconicPlace, getPropertyIconicPlaceById, } = require("../../../services/property/iconic_places");

router.get("/", async (req, res, next) => {
  try {
    const where = {};

    if (req.query.place_name) {
      where.placeName = {
        [Op.substring]: req.query.place_name,
      };
    }

    if (Object.keys(where).length === 0) {
      const iconicPlaces = await getAllPropertyIconicPlace();

      const response = new SuccessResponse(200, "OK", new DataDetails("property_iconic_places", iconicPlaces));
      res.status(response.code).json(response);
      return;
    }

    const iconicPlaces = await getAllPropertyIconicPlaceWithCondition(where);

    const response = new SuccessResponse(200, "OK", new DataDetails("property_iconic_places", iconicPlaces));
    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const iconicPlace = await getPropertyIconicPlaceById(Number(req.params.id));

    const response = new SuccessResponse(200, "OK", new DataDetails("property_iconic_places", iconicPlace));
    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
