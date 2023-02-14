const path = require('path');
const fs = require('fs');
const multer = require("multer");

const { ErrorResponse, ErrorDetails } = require("../../models/response");

const generateMulter = (propertyType) => {
  if (typeof propertyType !== "string") {
    const err = new ErrorDetails("MulterError", "property_type", "property_type must be string");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  return multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        let imagePath = path.join(path.resolve(''), 'assets', `${propertyType}`, `${req.body.kodePropar ? req.body.kodePropar : req.body.facilityName}`);
        if (!fs.existsSync(imagePath)) {
          fs.mkdirSync(imagePath, { recursive: true });
        }
        cb(null, imagePath);
      },
      filename: function (req, file, cb) {
        let date = new Date();
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        let hours = date.getHours().toString().padStart(2, '0');
        let minutes = date.getMinutes().toString().padStart(2, '0');
        let seconds = date.getSeconds().toString().padStart(2, '0');
        let formattedDate = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;

        cb(null, `${req.body.kodePropar ? req.body.kodePropar : req.body.facilityName}_${formattedDate}_${file.originalname}`);
      }
    }),
  });
}

module.exports = generateMulter;
