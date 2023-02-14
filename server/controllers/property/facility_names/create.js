const router = require("express").Router();
const { SuccessResponse, DataDetails } = require("../../../models/response");
const { generateMulter } = require("../../../services/utilities");
const { createNewPropertyFacilityName } = require("../../../services/property/facility_names");

const upload = generateMulter("property_facility_icon");

router.post("/", upload.single("image"), async (req, res, next) => {
  try {
    await createNewPropertyFacilityName(req.body.facilityName, req.file);

    const response = new SuccessResponse(201, "CREATED", new DataDetails("property_facility_names", null));
    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
