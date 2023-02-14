const router = require("express").Router();
const { SuccessResponse, DataDetails } = require("../../../models/response");
const { generateMulter } = require("../../../services/utilities");
const { updateFacilityNameById } = require("../../../services/property/facility_names");

const upload = generateMulter("property_facility_icon");

router.put("/:id", upload.single("image"), async (req, res, next) => {
  try {
    await updateFacilityNameById(Number(req.params.id), req.body.new_facility_name, req.file);

    const response = new SuccessResponse(204, "NO_CONTENT", new DataDetails("property_facility_names", null));
    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
