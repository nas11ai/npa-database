const fs = require("fs");
const { sequelize } = require("../../../utils/db");
const { Apartment, ApartmentPhoto, ApartmentFee, ApartmentTaxFee, ApartmentFacility, ApartmentAccess } = require("../../../models/apartment");
const { ErrorResponse, ErrorDetails } = require("../../../models/response");

const { getPropertyPersonInChargeById } = require("../../property/person_in_charges");
const { getAllPropertyAreaWithCondition } = require('../../property/areas');
const { getAllPropertyPaymentTermWithCondition } = require('../../property/payment_terms');
const { getAllPropertyFacilityNameWithCondition } = require('../../property/facility_names');
const { getAllPropertyIconicPlaceWithCondition } = require('../../property/iconic_places');

const updateOrCreateApartmentById = async (req) => {

  if (!req.params.kode_propar) {
    const err = new ErrorDetails("ApartmentError", "kode_propar", "kode_propar must not be null");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  const { fees, taxFees, facilities, accesses, photoIds, ...newApartment } = req.body;

  const newApartmentFees = fees ? JSON.parse(fees) : null;
  const newApartmentTaxFees = taxFees ? JSON.parse(taxFees) : null;
  const newApartmentFacilities = facilities ? JSON.parse(facilities) : null;
  const newApartmentAccesses = accesses ? JSON.parse(accesses) : null;
  const apartmentPhotos = photoIds ? JSON.parse(photoIds) : null;

  try {
    await sequelize.transaction(async (t) => {
      const apartment = await Apartment.findByPk(req.params.kode_propar);

      if (!apartment) {
        const err = new ErrorDetails("ApartmentError", "kode_propar", "kode_propar not found");
        // TODO: ganti console ke log kalau sudah mau production
        console.error(err);
        throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
      }

      if (newApartment !== null && typeof newApartment === "object" && Object.keys(newApartment).length !== 0) {

        if (newApartment.kodePropar) {
          const pattern = /^[A-Z]{1,7}-[0-9]{3}$/;

          if (!pattern.test(newApartment.kodePropar)) {
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

          const duplicateApartment = await Apartment.findOne({ where: { kodePropar: newApartment.kodePropar } });
          if (duplicateApartment) {
            const err = new ErrorDetails("ApartmentError", "kode_propar", "kode_propar has been taken");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          apartment.kodePropar = newApartment.kodePropar;
        }

        if (newApartment.name) {
          if (typeof newApartment.name !== "string") {
            const err = new ErrorDetails("ApartmentError", "name", "name must be string");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          const pattern = /[^a-zA-Z0-9 ]+/;

          if (pattern.test(newApartment.name)) {
            const err = new ErrorDetails("ApartmentError", "name", "name must not contain special character");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          apartment.name = newApartment.name;
        }

        if (newApartment.address) {
          const pattern = /[^a-zA-Z0-9., ]+/;

          if (pattern.test(newApartment.address)) {
            const err = new ErrorDetails("ApartmentError", "address", "address must not contain special character");

            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          apartment.address = newApartment.address;
        }

        if (newApartment.propertyAreaName) {
          const { id } = await getAllPropertyAreaWithCondition({ regionName: newApartment.propertyAreaName });

          if (!id) {
            const err = new ErrorDetails("ApartmentError", "property_area_name", "property_area_name not found");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
          }

          apartment.propertyAreaId = id;
        }

        if (newApartment.size) {
          const size = Number(newApartment.size);
          if (typeof size !== "number") {
            const err = new ErrorDetails("ApartmentError", "size", "size must be integer");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          apartment.size = size;
        }

        if (newApartment.tower) {
          if (typeof newApartment.tower !== "string") {
            const err = new ErrorDetails("ApartmentError", "tower", "tower must be string");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          const pattern = /[^a-zA-Z0-9]+/;

          if (pattern.test(newApartment.tower)) {
            const err = new ErrorDetails("ApartmentError", "tower", "tower must not contain special character");

            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          apartment.tower = newApartment.tower;
        }

        if (newApartment.floor) {
          if (typeof newApartment.floor !== "string") {
            const err = new ErrorDetails("ApartmentError", "floor", "floor must be string");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          const pattern = /[^a-zA-Z0-9]+/;

          if (pattern.test(newApartment.floor)) {
            const err = new ErrorDetails("ApartmentError", "floor", "floor must not contain special character");

            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          apartment.floor = newApartment.floor;
        }

        if (newApartment.furnishing) {
          const { furnishing } = newApartment;
          if (!(furnishing === "Fully Furnished" || furnishing === "Semi Furnished" || furnishing === "Unfurnished")) {
            const err = new ErrorDetails("ApartmentError", "furnishing", "invalid value");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          apartment.furnishing = furnishing;
        }

        if (newApartment.available) {
          apartment.available = (newApartment.available).toLowerCase() === "true";
        }

        if (newApartment.picId) {
          const picId = Number(newApartment.picId);

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
        }

        if (newApartment.remark) {
          apartment.remark = newApartment.remark;
        }
      }

      apartment.updatedBy = req.username;
      await apartment.save({
        transaction: t,
      });

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

      if (newApartmentFees) {

        const apartmentFee = await ApartmentFee.findOrCreate({
          where: { apartmentKodePropar: apartment.kodePropar },
          defaults: {
            apartmentKodePropar: apartment.kodePropar,
            rentalPrice: Number(newApartmentFees.rentalPrice) ? Number(newApartmentFees.rentalPrice) : 0,
            sellPrice: Number(newApartmentFees.sellPrice) ? Number(newApartmentFees.sellPrice) : 0,
            priceCurrency: newApartmentFees.priceCurrency ? `${newApartmentFees.priceCurrency}` : null,
            propertyPaymentTermId: newApartmentFees.propertyPaymentTermId ? newApartmentFees.propertyPaymentTermId : null,
            leaseTerm: Number(newApartmentFees.leaseTerms) ? Number(newApartmentFees.leaseTerms) : null,
          },
          transaction: t,
        });

        if (apartmentFee.length > 0) {
          apartmentFee.forEach(async (fees) => {
            if (fees.isNewRecord) return;

            fees.apartmentKodePropar = apartment.kodePropar;

            if (newApartmentFees.rentalPrice) {
              const rentalPrice = Number(newApartmentFees);

              if (typeof rentalPrice !== "number") {
                const err = new ErrorDetails("ApartmentFeeError", "rental_price", "rental_price must be integer");
                // TODO: ganti console ke log kalau sudah mau production
                console.error(err);
                throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
              }

              fees.rentalPrice = rentalPrice;
            }

            if (newApartmentFees.sellPrice) {
              const sellPrice = Number(newApartmentFees);

              if (typeof sellPrice !== "number") {
                const err = new ErrorDetails("ApartmentFeeError", "sell_price", "sell_price must be integer");
                // TODO: ganti console ke log kalau sudah mau production
                console.error(err);
                throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
              }

              fees.sellPrice = sellPrice;
            }

            if (newApartmentFees.priceCurrency) {
              if (typeof newApartmentFees.priceCurrency !== "string") {
                const err = new ErrorDetails("ApartmentFeeError", "price_currency", "price_currency must be string");
                // TODO: ganti console ke log kalau sudah mau production
                console.error(err);
                throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
              }

              if (!(newApartmentFees.priceCurrency === "Rupiah" || newApartmentFees.priceCurrency === "US Dollar")) {
                const err = new ErrorDetails("ApartmentFeeError", "price_currency", "invalid price_currency");
                // TODO: ganti console ke log kalau sudah mau production
                console.error(err);
                throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
              }

              fees.priceCurrency = newApartmentFees.priceCurrency;
            }

            if (newApartmentFees.propertyPaymentTermsName) {
              const pt = await getAllPropertyPaymentTermWithCondition({ paymentTerm: newApartmentFees.propertyPaymentTermsName });

              fees.propertyPaymentTermId = pt.id;
            }

            if ("leaseTerms" in newApartmentFees) {
              if (typeof newApartmentFees.leaseTerms !== "number") {
                const err = new ErrorDetails("ApartmentFeeError", "lease_term", "lease_term must be integer");
                // TODO: ganti console ke log kalau sudah mau production
                console.error(err);
                throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
              }

              if (newApartmentFees.leaseTerms < 0) {
                const err = new ErrorDetails("ApartmentFeeError", "lease_term", "lease_term must be equal or more than zero");
                // TODO: ganti console ke log kalau sudah mau production
                console.error(err);
                throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
              }

              fees.leaseTerm = newApartmentFees.leaseTerms;
            }

            await apartmentFee.save({ transaction: t });
          });
        }

        if (newApartmentTaxFees) {
          if (!(Array.isArray(newApartmentTaxFees))) {
            const err = new ErrorDetails("ApartmentTaxFeeError", "tax_fees", "tax_fees must be array");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          if (newApartmentTaxFees.length > 2 || newApartmentTaxFees.length < 1) {
            const err = new ErrorDetails("ApartmentTaxFeeError", "tax_fees", "tax_fees length must be 1 or 2 items");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          for (const tax of newApartmentTaxFees) {
            if (!tax.id) {
              const err = new ErrorDetails("ApartmentTaxFeeError", "id", "id length must not be null");
              // TODO: ganti console ke log kalau sudah mau production
              console.error(err);
              throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
            }

            if (typeof tax.id !== "number") {
              const err = new ErrorDetails("ApartmentTaxFeeError", "id", "id must be integer");
              // TODO: ganti console ke log kalau sudah mau production
              console.error(err);
              throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
            }

            if (!tax.apartmentFeeId) {
              const err = new ErrorDetails("ApartmentTaxFeeError", "apartment_fee_id", "apartment_fee_id must not be null");
              // TODO: ganti console ke log kalau sudah mau production
              console.error(err);
              throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
            }

            if (typeof tax.apartmentFeeId !== "number") {
              const err = new ErrorDetails("ApartmentTaxFeeError", "apartment_fee_id", "apartment_fee_id must be integer");
              // TODO: ganti console ke log kalau sudah mau production
              console.error(err);
              throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
            }

            const existingApartmentFee = await ApartmentFee.findByPk(tax.apartmentFeeId);

            if (!existingApartmentFee) {
              const err = new ErrorDetails("ApartmentTaxFeeError", "apartment_fee_id", "apartment_fee_id not found");
              // TODO: ganti console ke log kalau sudah mau production
              console.error(err);
              throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
            }

            if (!tax.taxType) {
              const err = new ErrorDetails("ApartmentTaxFeeError", "tax_type", "tax_type must not be null");
              // TODO: ganti console ke log kalau sudah mau production
              console.error(err);
              throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
            }

            if (typeof tax.taxType !== "string") {
              const err = new ErrorDetails("ApartmentTaxFeeError", "tax_type", "tax_type must be string");
              // TODO: ganti console ke log kalau sudah mau production
              console.error(err);
              throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
            }

            if (!(tax.taxType === "Value Added Tax" || tax.taxType === "Withholding Tax")) {
              const err = new ErrorDetails("ApartmentTaxFeeError", "tax_type", "invalid tax_type");
              // TODO: ganti console ke log kalau sudah mau production
              console.error(err);
              throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
            }

            if (!tax.percentage) {
              const err = new ErrorDetails("ApartmentTaxFeeError", "percentage", "percentage must not be null");
              // TODO: ganti console ke log kalau sudah mau production
              console.error(err);
              throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
            }

            if (typeof tax.percentage !== "number") {
              const err = new ErrorDetails("ApartmentTaxFeeError", "percentage", "percentage must be integer");
              // TODO: ganti console ke log kalau sudah mau production
              console.error(err);
              throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
            }

            if (!tax.includedWithinPrice) {
              const err = new ErrorDetails("ApartmentTaxFeeError", "included_within_price", "included_within_price must not be null");
              // TODO: ganti console ke log kalau sudah mau production
              console.error(err);
              throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
            }

            if (!(tax.includedWithinPrice === true || tax.includedWithinPrice === false)) {
              const err = new ErrorDetails("ApartmentTaxFeeError", "included_within_price", "included_within_price must be boolean");
              // TODO: ganti console ke log kalau sudah mau production
              console.error(err);
              throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
            }

            const apartmentTaxFee = await ApartmentTaxFee.findOrCreate({
              where: { id: tax.id },
              defaults: {
                apartmentFeeId: existingApartmentFee.id,
                taxType: tax.taxType,
                percentage: tax.percentage,
                includedWithinPrice: tax.includedWithinPrice,
              },
              transaction: t,
            });

            if (!apartmentTaxFee[0].isNewRecord) {
              apartmentTaxFee[0].apartmentFeeId = existingApartmentFee.id;
              apartmentTaxFee[0].taxType = tax.taxType;
              apartmentTaxFee[0].percentage = tax.percentage;
              apartmentTaxFee[0].includedWithinPrice = tax.includedWithinPrice;
            }

            await apartmentTaxFee[0].save({ transaction: t });
          }
        }
      }

      if (newApartmentFacilities) {
        if (!(Array.isArray(newApartmentFacilities))) {
          const err = new ErrorDetails("ApartmentFacilityError", "facilities", "facilities must be array");
          // TODO: ganti console ke log kalau sudah mau production
          console.error(err);
          throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
        }

        if (newApartmentFacilities.length < 1) {
          const err = new ErrorDetails("ApartmentFacilityError", "facilities", "facilities must have a minimum of one item");
          // TODO: ganti console ke log kalau sudah mau production
          console.error(err);
          throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
        }

        for (const newFacility of newApartmentFacilities) {
          const facilityObj = {};

          if (!newFacility.id) {
            const err = new ErrorDetails("ApartmentFacilityError", "id", "id must not be null");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          if (typeof newFacility.id !== "number") {
            const err = new ErrorDetails("ApartmentFacilityError", "id", "id must be number");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          facilityObj.apartmentKodePropar = apartment.kodePropar;

          if (!newFacility.propertyFacilityName) {
            const err = new ErrorDetails("ApartmentFacilityError", "property_facility_name", "property_facility_name must not be null");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          if (typeof newFacility.propertyFacilityName !== "string") {
            const err = new ErrorDetails("ApartmentFacilityError", "property_facility_name", "property_facility_name must be string");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          const facility = await getAllPropertyFacilityNameWithCondition({ facilityName: newFacility.propertyFacilityName });

          if (!facility) {
            const err = new ErrorDetails("ApartmentFacilityError", "property_facility_name", "property_facility_name not found");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
          }

          facilityObj.propertyFacilityNameId = facility.id;

          if (newFacility.type) {
            if (typeof newFacility.type !== "string") {
              const err = new ErrorDetails("ApartmentFacilityError", "type", "type must be string");
              // TODO: ganti console ke log kalau sudah mau production
              console.error(err);
              throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
            }

            const pattern = /[^a-zA-Z0-9 ]+/;

            if (pattern.test(newFacility.type)) {
              const err = new ErrorDetails("ApartmentFacilityError", "type", "type must not contain special character");

              // TODO: ganti console ke log kalau sudah mau production
              console.error(err);
              throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
            }

            facilityObj.type = newFacility.type;
          }

          if (newFacility.unit) {
            if (typeof newFacility.type !== "number") {
              const err = new ErrorDetails("ApartmentFacilityError", "type", "type must be integer");
              // TODO: ganti console ke log kalau sudah mau production
              console.error(err);
              throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
            }

            facilityObj.type = newFacility.type;
          }

          const apartmentFacility = await ApartmentFacility.findOrCreate({
            where: { id: newFacility.id },
            defaults: facilityObj,
            transaction: t,
          });

          if (!apartmentFacility[0].isNewRecord) {
            apartmentFacility[0].apartmentKodePropar = facilityObj.apartmentKodePropar;
            apartmentFacility[0].propertyFacilityNameId = facilityObj.propertyFacilityNameId;
            apartmentFacility[0].type = facilityObj.type ? facilityObj.type : (apartmentFacility[0].type ? apartmentFacility[0].type : null);
            apartmentFacility[0].unit = facilityObj.unit ? facilityObj.unit : (apartmentFacility[0].unit ? apartmentFacility[0].unit : null);
          }

          await apartmentFacility[0].save({ transaction: t });
        }
      }

      if (newApartmentAccesses) {
        if (!(Array.isArray(newApartmentAccesses))) {
          const err = new ErrorDetails("ApartmentAccessError", "accesses", "accesses must be string");
          // TODO: ganti console ke log kalau sudah mau production
          console.error(err);
          throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
        }

        if (newApartmentAccesses.length < 1) {
          const err = new ErrorDetails("ApartmentAccessError", "accesses", "accesses must have a minimum of 1 item");
          // TODO: ganti console ke log kalau sudah mau production
          console.error(err);
          throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
        }

        for (const newAccess of newApartmentAccesses) {
          const accessObj = {};

          accessObj.apartmentKodePropar = apartment.kodePropar;

          if (!newAccess.propertyIconicPlaceName) {
            const err = new ErrorDetails("ApartmentAccessError", "property_iconic_place_name", "property_iconic_place_name must not be null");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          const place = await getAllPropertyIconicPlaceWithCondition({ placeName: newAccess.propertyIconicPlaceName });

          if (!place) {
            const err = new ErrorDetails("ApartmentAccessError", "property_iconic_place_name", "property_iconic_place_name not found");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
          }

          accessObj.propertyIconicPlaceId = place.id;

          if (!newAccess.id) {
            const err = new ErrorDetails("ApartmentAccessError", "id", "id must not be null");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          if (typeof newAccess.id !== "number") {
            const err = new ErrorDetails("ApartmentAccessError", "id", "id must be integer");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          if (newAccess.type) {
            if (typeof newAccess.type !== "string") {
              const err = new ErrorDetails("ApartmentAccessError", "type", "type must be string");
              // TODO: ganti console ke log kalau sudah mau production
              console.error(err);
              throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
            }

            const pattern = /[^a-zA-Z0-9 ]+/;

            if (pattern.test(newAccess.type)) {
              const err = new ErrorDetails("ApartmentAccessError", "type", "type must not contain special character");

              // TODO: ganti console ke log kalau sudah mau production
              console.error(err);
              throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
            }

            accessObj.type = newAccess.type;
          }

          const access = await ApartmentAccess.findOrCreate({
            where: { id: newAccess.id },
            defaults: accessObj,
            transaction: t,
          });

          if (!access[0].isNewRecord) {
            access[0].apartmentKodePropar = accessObj.apartmentKodePropar;
            access[0].propertyIconicPlaceId = accessObj.propertyIconicPlaceId;
            access[0].type = accessObj.type ? accessObj.type : (access[0].type ? access[0].type : null);
          }

          await access[0].save({ transaction: t });
        }
      }

      if (apartmentPhotos) {
        if (!(Array.isArray(apartmentPhotos))) {
          const err = new ErrorDetails("ApartmentPhotoError", "apartment_photos", "apartment_photos must be array");
          // TODO: ganti console ke log kalau sudah mau production
          console.error(err);
          throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
        }

        if (apartmentPhotos.length < 1) {
          const err = new ErrorDetails("ApartmentPhotoError", "apartment_photos", "apartment_photos must have a minimum of 1 item");
          // TODO: ganti console ke log kalau sudah mau production
          console.error(err);
          throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
        }

        for (const photo of apartmentPhotos) {
          console.log(photo);

          if (!photo.id) {
            const err = new ErrorDetails("ApartmentPhotoError", "id", "id must not be null");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          if (typeof photo.id !== "number") {
            const err = new ErrorDetails("ApartmentPhotoError", "id", "id must be integer");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
          }

          const existingPhoto = await ApartmentPhoto.findOne({
            where: {
              id: photo.id,
              apartmentKodePropar: apartment.kodePropar,
            },
          });

          if (!existingPhoto) {
            const err = new ErrorDetails("ApartmentPhotoError", "id", "id not found");
            // TODO: ganti console ke log kalau sudah mau production
            console.error(err);
            throw new ErrorResponse(404, "NOT_FOUND", { [err.attribute]: err.message });
          }

          const path = existingPhoto.path;

          await existingPhoto.destroy({ transaction: t });

          fs.unlink(path, (err) => {
            if (err) throw err;
          });
        }
      }
    });
  } catch (error) {
    if (req.files.length > 0) {
      for (const image of req.files) {
        fs.unlink(image.path, (err) => {
          if (err) throw err;
        });
      }
    }

    throw error;
  }
}

module.exports = updateOrCreateApartmentById;
