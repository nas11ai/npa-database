const fs = require("fs");
const { sequelize } = require("../../../utils/db");
const { Apartment, ApartmentPhoto, ApartmentFee, ApartmentTaxFee, ApartmentFacility, ApartmentAccess } = require("../../../models/apartment");
const { ErrorResponse, ErrorDetails } = require("../../../models/response");

const deleteApartmentById = async (req) => {
  if (!req.params.kode_propar) {
    const err = new ErrorDetails("ApartmentError", "kode_propar", "kode_propar must not be null");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  try {
    await sequelize.transaction(async (t) => {
      const apartment = await Apartment.findByPk(req.params.kode_propar);

      if (!apartment) {
        const err = new ErrorDetails("ApartmentError", "kode_propar", "kode_propar not found");
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
      }

      const fees = await ApartmentFee.findOne({ where: { apartmentKodePropar: apartment.kodePropar } });

      if (fees) {
        const taxFees = await ApartmentTaxFee.findAll({ where: { apartmentFeeId: fees.id } });

        if (taxFees) {
          taxFees.forEach(async (tax) => {
            await tax.destroy({
              force: req.query.force === "true",
              transaction: t
            });
          });
        }

        await fees.destroy({
          force: req.query.force === "true",
          transaction: t
        });
      }

      const accesses = await ApartmentAccess.findAll({ where: { apartmentKodePropar: apartment.kodePropar } });

      if (accesses) {
        accesses.forEach(async (access) => {
          await access.destroy({ transaction: t });
        });
      }

      const facilities = await ApartmentFacility.findAll({ where: { apartmentKodePropar: apartment.kodePropar } });

      if (facilities) {
        facilities.forEach(async (facility) => {
          await facility.destroy({
            transaction: t,
            force: req.query.force === "true",
          });
        });
      }

      const photos = await ApartmentPhoto.findAll({ where: { apartmentKodePropar: apartment.kodePropar } });

      if (photos) {
        if (req.query.force === "true") {
          const path = photos.map(photo => {
            return photo.path
          });

          path.forEach(filepath => fs.unlink(filepath, (err) => {
            if (err) throw err;
          }));
        }

        photos.forEach(async (photo) => {
          await photo.destroy({
            transaction: t,
            force: req.query.force === "true",
          });
        });
      }

      apartment.deletedBy = req.username;
      await apartment.save({ transaction: t });

      await apartment.destroy({
        transaction: t,
        force: req.query.force === "true",
      });
    });
  } catch (error) {
    throw error;
  }
}

module.exports = deleteApartmentById;
