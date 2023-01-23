const router = require('express').Router();
const { SuccessResponse, DataDetails } = require('../../models/response');

router.get("/", (req, res, next) => {
  try {
    res.removeHeader("Authorization");
    res.clearCookie();

    const response = new SuccessResponse(200, "OK", new DataDetails("logout", null));

    res.status(response.code).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
