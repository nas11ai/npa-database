const { sequelize } = require("../../../utils/db");
const { Apartment, ApartmentPhoto, ApartmentFee, ApartmentTaxFee, ApartmentFacility, ApartmentAccess } = require("../../../models/apartment");
const { ErrorResponse, ErrorDetails } = require("../../../models/response");

const restoreApartmentById = async (req) => {
  if (!req.params.kode_propar) {
    const err = new ErrorDetails("ApartmentError", "kode_propar", "kode_propar must not be null");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  try {
    await sequelize.transaction(async (t) => {
      const apartment = await Apartment.findByPk(req.params.kode_propar, { paranoid: false });

      if (!apartment) {
        const err = new ErrorDetails("ApartmentError", "kode_propar", "kode_propar not found");
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
      }

      await apartment.restore({ transaction: t });

      apartment.deletedBy = null;
      apartment.updatedBy = req.username;
      await apartment.save({ transaction: t });

      const fees = await ApartmentFee.findOne({
        where: { apartmentKodePropar: apartment.kodePropar },
        paranoid: false,
      });

      await fees.restore({ transaction: t });

      if (fees) {
        const taxFees = await ApartmentTaxFee.findAll({
          where: { apartmentFeeId: fees.id },
          paranoid: true,
        });

        if (taxFees) {
          taxFees.forEach(async (tax) => await tax.restore({ transaction: t }));
        }
      }

      const accesses = await ApartmentAccess.findAll({
        where: { apartmentKodePropar: apartment.kodePropar },
        paranoid: false,
      });

      if (accesses) {
        accesses.forEach(async (access) => await access.restore({ transaction: t }));
      }

      const facilities = await ApartmentFacility.findAll({
        where: { apartmentKodePropar: apartment.kodePropar },
        paranoid: false,
      });

      if (facilities) {
        facilities.forEach(async (facility) => await facility.restore({ transaction: t }));
      }

      const photos = await ApartmentPhoto.findAll({
        where: { apartmentKodePropar: apartment.kodePropar },
        paranoid: false,
      });

      if (photos) {
        photos.forEach(async (photo) => await photo.restore({ transaction: t }));
      }
    });
  } catch (error) {
    throw error
  }
}

module.exports = restoreApartmentById;
