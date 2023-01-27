const router = require("express").Router();
const { Op } = require('sequelize');
const { SuccessResponse, DataDetails } = require("../../../models/response");
const { getAllPropertyFacilityNameWithCondition, getAllPropertyFacilityName, getPropertyFacilityNameById, } = require("../../../services/property/facility_names");

router.get("/", async (req, res, next) => {
  try {
    const where = {};

    if (req.query.facility_name) {
      where.facilityName = {
        [Op.substring]: req.query.facility_name,
      };
    }

    if (Object.keys(where).length === 0) {
      const areas = await getAllPropertyFacilityName();

      const response = new SuccessResponse(200, "OK", new DataDetails("property_facility_names", areas));
      res.status(response.code).json(response);
      return;
    }

    const areas = await getAllPropertyFacilityNameWithCondition(where);

    const response = new SuccessResponse(200, "OK", new DataDetails("property_facility_names", areas));
    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const area = await getPropertyFacilityNameById(Number(req.params.id));

    const response = new SuccessResponse(200, "OK", new DataDetails("property_facility_names", area));
    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
