const errorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    res.status(err.statusCode).json({
      name: err.name,
      message: err.message
    });
    return
  }
  // TODO: ganti console ke log kalau sudah mau production
  console.error(err);
  res.status(500).json({
    name: err.name,
    message: "Internal Server Error"
  });
}

module.exports = errorHandler;
