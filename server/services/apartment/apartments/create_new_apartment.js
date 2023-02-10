const fs = require('fs');
const { sequelize } = require("../../../utils/db");
const { Apartment, ApartmentPhoto, ApartmentFee, ApartmentTaxFee, ApartmentFacility, ApartmentAccess } = require("../../../models/apartment");
const { ErrorResponse, ErrorDetails } = require("../../../models/response");

const { getPropertyPersonInChargeById } = require("../../property/person_in_charges");
const { getAllPropertyAreaWithCondition } = require('../../property/areas');
const { getAllPropertyPaymentTermWithCondition } = require('../../property/payment_terms');
const { getAllPropertyFacilityNameWithCondition } = require('../../property/facility_names');
const { getAllPropertyIconicPlaceWithCondition } = require('../../property/iconic_places');

const createNewApartment = async (req) => {
  const { fees, taxFees, facilities, accesses, ...apartment } = req.body;

  const apartmentFees = fees ? JSON.parse(fees) : null;
  const apartmentTaxFees = taxFees ? JSON.parse(taxFees) : null;
  const apartmentFacilities = facilities ? JSON.parse(facilities) : null;
  const apartmentAccesses = accesses ? JSON.parse(accesses) : null;

  try {
    await sequelize.transaction(async (t) => {
      if (!apartment.kodePropar) {
        const err = new ErrorDetails("ApartmentError", "kode_propar", "kode_propar must not be null");
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
      }

      let pattern = /^[A-Z]{1,7}-[0-9]{3}$/;

      if (!pattern.test(apartment.kodePropar)) {
        const err = new ErrorDetails("ApartmentError", "kode_propar", [
          "total character must not be more than 10",
          "last 3 characters of kode_propar must be digits",
          "before the digits there must be " - " character",
          "the rest of the characters must be capitalized letter",
        ]);

        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
      }

      if (!apartment.name) {
        const err = new ErrorDetails("ApartmentError", "name", "name must not be null");
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
      }

      pattern = /[^a-zA-Z0-9]+/;

      if (pattern.test(apartment.name)) {
        const err = new ErrorDetails("ApartmentError", "name", "name must not contain special character");
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
      }

      if (!apartment.picId) {
        const err = new ErrorDetails("ApartmentError", "pic_id", "pic_id must not be null");
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
      }

      const picId = Number(apartment.picId);

      if (typeof picId !== "number") {
        const err = new ErrorDetails("ApartmentError", "pic_id", "pic_id must be number");
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
      }

      const pic = await getPropertyPersonInChargeById(picId);

      if (!pic) {
        const err = new ErrorDetails("ApartmentError", "pic_id", "pic_id not found");
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
      }

      apartment.propertyPersonInChargeId = pic.id;

      if (!apartment.propertyArea) {
        const err = new ErrorDetails("ApartmentError", "property_area", "property_area must not be null");
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
      }

      const area = await getAllPropertyAreaWithCondition({ regionName: apartment.propertyArea });

      if (!area) {
        const err = new ErrorDetails("ApartmentError", "property_area", "property_area not found");
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
      }

      apartment.propertyAreaId = area.id;

      if (apartment.address) {
        pattern = /[^a-zA-Z0-9.,]+/;

        if (pattern.test(apartment.address)) {
          const err = new ErrorDetails("ApartmentError", "address", "address must not contain special character");

          // TODO: ganti console ke log kalau sudah mau production
          console.error(err);
          throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
        }
      }

      if (apartment.tower) {
        pattern = /[^a-zA-Z0-9]+/;

        if (pattern.test(apartment.tower)) {
          const err = new ErrorDetails("ApartmentError", "tower", "tower must not contain special character");

          // TODO: ganti console ke log kalau sudah mau production
          console.error(err);
          throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
        }
      }

      if (apartment.floor) {
        pattern = /[^a-zA-Z0-9]+/;

        if (pattern.test(apartment.floor)) {
          const err = new ErrorDetails("ApartmentError", "floor", "floor must not contain special character");

          // TODO: ganti console ke log kalau sudah mau production
          console.error(err);
          throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
        }
      }

      if (apartment.size) {
        apartment.size = Number(apartment.size);

        if (typeof apartment.size !== "number") {
          const err = new ErrorDetails("ApartmentError", "size", "size must be integer");
          // TODO: ganti console ke log kalau sudah mau production
          console.error(err);
          throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
        }
      }

      apartment.available = apartment.available ? (apartment.available).toLowerCase() === "true" : null;
      apartment.furnishing = apartment.furnishing && (apartment.furnishing === "Fully Furnished" || apartment.furnishing === "Semi Furnished" || apartment.furnishing === "Unfurnished") ? apartment.furnishing : null;
      apartment.remark = apartment.remark ? apartment.remark : null;

      //TODO: UNCOMMENT THIS
      await Apartment.create({
        kodePropar: apartment.kodePropar,
        name: apartment.name,
        address: apartment.address ? apartment.address : null,
        propertyAreaId: apartment.propertyAreaId ? apartment.propertyAreaId : null,
        size: apartment.size ? apartment.size : null,
        tower: apartment.tower ? apartment.tower : null,
        floor: apartment.floor ? apartment.floor : null,
        furnishing: apartment.furnishing,
        available: apartment.available,
        propertyPersonInChargeId: apartment.propertyPersonInChargeId ? apartment.propertyPersonInChargeId : null,
        remark: apartment.remark,
        createdBy: req.username,
        updatedBy: req.username,
      }, { transaction: t });

      if (req.files) {
        const photos = req.files.map(photo => {
          return {
            apartmentKodePropar: apartment.kodePropar,
            photoPath: photo.path,
            photoUrl: `/static/apartment/${apartment.kodePropar}/${photo.filename}`,
          };
        });

        await ApartmentPhoto.bulkCreate(photos, { transaction: t });
      }

      if (apartmentFees) {
        if (apartmentFees.propertyPaymentTermsName) {
          const pt = await getAllPropertyPaymentTermWithCondition({ paymentTerm: apartmentFees.propertyPaymentTermsName });

          apartmentFees.propertyPaymentTermId = pt.id;
        }

        const newApartmentFees = await ApartmentFee.create({
          apartmentKodePropar: apartment.kodePropar,
          rentalPrice: Number(apartmentFees.rentalPrice) ? Number(apartmentFees.rentalPrice) : 0,
          sellPrice: Number(apartmentFees.sellPrice) ? Number(apartmentFees.sellPrice) : 0,
          priceCurrency: apartmentFees.priceCurrency ? `${apartmentFees.priceCurrency}` : null,
          propertyPaymentTermId: apartmentFees.propertyPaymentTermId ? apartmentFees.propertyPaymentTermId : null,
          leaseTerm: Number(apartmentFees.leaseTerms) ? Number(apartmentFees.leaseTerms) : null,
        }, { transaction: t });

        if (apartmentTaxFees) {
          if (!(Array.isArray(apartmentTaxFees))) {
            const err = new ErrorDetails("ApartmentTaxFeeError", "tax_fees", "tax_fees must be array");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          if (apartmentTaxFees.length > 2 || apartmentTaxFees.length < 1) {
            const err = new ErrorDetails("ApartmentTaxFeeError", "tax_fees", "tax_fees length must be 1 or 2 items");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          if (apartmentTaxFees.length == 2 && apartmentTaxFees[0].taxType === apartmentTaxFees[1].taxType) {
            const err = new ErrorDetails("ApartmentTaxFeeError", "tax_type", "tax_type between items must be different");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          const taxFees = apartmentTaxFees.map(tax => {
            return {
              apartmentFeeId: newApartmentFees.id,
              taxType: `${tax.taxType}`,
              percentage: Number(tax.percentage),
              includedWithinPrice: tax.includedWithinPrice,
            };
          });

          await ApartmentTaxFee.bulkCreate(taxFees, { transaction: t });
        }
      }

      if (apartmentFacilities) {
        if (!(Array.isArray(apartmentFacilities))) {
          const err = new ErrorDetails("ApartmentFacilityError", "facilities", "facilities must be array");
          // TODO: ganti console ke log kalau sudah mau production
          console.error(err);
          throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
        }

        if (apartmentFacilities.length < 1) {
          const err = new ErrorDetails("ApartmentFacilityError", "facilities", "facilities must have a minimum of one item");
          // TODO: ganti console ke log kalau sudah mau production
          console.error(err);
          throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
        }

        const facilities = await Promise.all(
          apartmentFacilities.map(async (item) => {
            if (!item.propertyFacilityName) {
              const err = new ErrorDetails("ApartmentFacilityError", "property_facility_name", "property_facility_name must not be null");
              // TODO: ganti console ke log kalau sudah mau production
              console.error(err);
              throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
            }

            const facility = await getAllPropertyFacilityNameWithCondition({ facilityName: `${item.propertyFacilityName}` });

            if (!facility) {
              const err = new ErrorDetails("ApartmentFacilityError", "property_facility_name", "property_facility_name not found");
              // TODO: ganti console ke log kalau sudah mau production
              console.error(err);
              throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
            }

            if (item.type) {
              if (typeof item.type !== "string") {
                const err = new ErrorDetails("ApartmentFacilityError", "type", "type must be string");
                // TODO: ganti console ke log kalau sudah mau production
                console.error(err);
                throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
              }

              pattern = /[^a-zA-Z0-9]+/;

              if (pattern.test(newFacility.type)) {
                const err = new ErrorDetails("ApartmentFacilityError", "type", "type must not contain special character");

                // TODO: ganti console ke log kalau sudah mau production
                console.error(err);
                throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
              }
            }

            return {
              apartmentKodePropar: apartment.kodePropar,
              propertyFacilityNameId: facility.id,
              type: typeof item.type === "string" ? item.type : null,
              unit: Number(item.unit) ? Number(item.unit) : null,
            };
          }),
        );

        await ApartmentFacility.bulkCreate(facilities, { transaction: t });
      }

      if (apartmentAccesses) {
        if (!(Array.isArray(apartmentAccesses))) {
          const err = new ErrorDetails("ApartmentAccessError", "accesses", "accesses must be string");
          // TODO: ganti console ke log kalau sudah mau production
          console.error(err);
          throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
        }

        if (apartmentAccesses.length < 1) {
          const err = new ErrorDetails("ApartmentAccessError", "accesses", "accesses must have a minimum of 1 item");
          // TODO: ganti console ke log kalau sudah mau production
          console.error(err);
          throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
        }

        const accesses = await Promise.all(
          apartmentAccesses.map(async (item) => {
            if (!item.propertyIconicPlaceName) {
              const err = new ErrorDetails("ApartmentAccessError", "property_iconic_place_name", "property_iconic_place_name must not be null");
              // TODO: ganti console ke log kalau sudah mau production
              console.error(err);
              throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
            }

            const place = await getAllPropertyIconicPlaceWithCondition({ placeName: item.propertyIconicPlaceName });

            if (!place) {
              const err = new ErrorDetails("ApartmentAccessError", "property_iconic_place_name", "property_iconic_place_name not found");
              // TODO: ganti console ke log kalau sudah mau production
              console.error(err);
              throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
            }

            if (typeof item.type !== "string") {
              const err = new ErrorDetails("ApartmentAccessError", "type", "type must be string");
              // TODO: ganti console ke log kalau sudah mau production
              console.error(err);
              throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
            }

            pattern = /[^a-zA-Z0-9]+/;

            if (pattern.test(item.type)) {
              const err = new ErrorDetails("ApartmentAccessError", "type", "type must not contain special character");
              // TODO: ganti console ke log kalau sudah mau production
              console.error(err);
              throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
            }

            return {
              apartmentKodePropar: apartment.kodePropar,
              propertyIconicPlaceId: place.id,
              type: typeof item.type === "string" ? item.type : null,
            };
          }),
        );

        await ApartmentAccess.bulkCreate(accesses, { transaction: t });
      }
    });
  } catch (error) {
    console.log(error);
    if (req.files.length > 0) {
      for (const image of req.files) {
        fs.unlink(image.path, (err) => {
          if (err) throw err;
        });
      }
    }

    if (error.name === "SequelizeUniqueConstraintError" && error.errors[0].path === "PRIMARY" && error.errors[0].instance instanceof Apartment) {
      const err = new ErrorDetails("ApartmentError", "kode_propar", "kode_propar must be unique");
      // TODO: ganti console ke log kalau sudah mau production
      console.error(err);
      throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
    }

    if (error.errors && error.errors.length > 0) {
      error.errors.map(err => {
        throw new ErrorResponse(400, "BAD_REQUEST", { [err.path]: err.message });
      })
    }

    throw error;
  }
}

module.exports = createNewApartment;
