const router = require('express').Router();

const { register } = require('../../services/users');

router.post('/', async (req, res, next) => {
  const { username, fullname, role, password } = req.body;

  const err = await register(username, fullname, role, password);
  if (err) {
    res.status(err.statusCode).json({
      error: true,
      name: err.name,
      message: err.message,
    });
    return;
  }

  res.status(201).json({
    error: false,
    message: "Registration success",
  });
});

module.exports = router;
