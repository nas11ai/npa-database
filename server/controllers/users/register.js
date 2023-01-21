const router = require('express').Router();

const { register } = require('../../services/users');

router.post('/', async (req, res, next) => {
  try {
    const { username, fullname, role, password } = req.body;

    await register(username, fullname, role, password);

    res.status(201).json({
      error: false,
      message: "Registration success",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
