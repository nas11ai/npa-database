const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');

const accessTokenValidator = (req, res, next) => {
  const auth = req.get('authorization');
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(auth.substring(7));
      jwt.verify(auth.substring(7), SECRET);
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        error: true,
        message: err.message,
      });
    }
  } else {
    return res.status(401).json({
      error: true,
      message: 'Token missing',
    });
  }

  return next();
}

module.exports = accessTokenValidator