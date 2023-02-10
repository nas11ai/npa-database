const { Op } = require('sequelize');

const { Apartment, ApartmentPhoto, ApartmentFee, ApartmentTaxFee, ApartmentFacility, ApartmentAccess, ApartmentIconicPlace, ApartmentPaymentTerm } = require("../../../models/apartment");
const { PropertyArea, PropertyPersonInCharge, PropertyFacilityName } = require("../../../models/property");
const { ErrorResponse, ErrorDetails } = require("../../../models/response");

const getAllApartments = async (req) => {
  if (req.query.page && isNaN(Number(req.query.page))) {
    const err = new ErrorDetails("ApartmentError", "pagination", "page must be integer");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  if (req.query.size && isNaN(Number(req.query.size))) {
    const err = new ErrorDetails("ApartmentError", "pagination", "size must be integer");
    // TODO: ganti console ke log kalau sudah mau production
    console.error(err);
    throw new ErrorResponse(400, "BAD_REQUEST", { [err.attribute]: err.message });
  }

  const apartmentWhere = {};

  const apartmentOrder = [];

  if (req.query.kode_propar) {
    if (req.query.kode_propar === 'ASC') {
      apartmentOrder.push(['kodePropar', 'ASC']);
    } else if (req.query.kode_propar === 'DESC') {
      apartmentOrder.push(['kodePropar', 'DESC']);
    } else {
      apartmentWhere.kodePropar = { [Op.like]: `%${req.query.kode_propar}%` };
    }
  }

  if (req.query.name) {
    if (req.query.name === 'ASC') {
      apartmentOrder.push(['name', 'ASC']);
    } else if (req.query.name === 'DESC') {
      apartmentOrder.push(['name', 'DESC']);
    } else {
      apartmentWhere.name = { [Op.like]: `%${req.query.name}%` };
    }
  }

  if (req.query.address) {
    if (req.query.address === 'ASC') {
      apartmentOrder.push(['address', 'ASC']);
    } else if (req.query.address === 'DESC') {
      apartmentOrder.push(['address', 'DESC']);
    } else {
      apartmentWhere.address = { [Op.like]: `%${req.query.address}%` };
    }
  }

  if (req.query.apartment_size === 'ASC') {
    apartmentOrder.push(['size', 'ASC']);
  }

  if (req.query.apartment_size === 'DESC') {
    apartmentOrder.push(['size', 'DESC']);
  }

  if (req.query.size_from && Number(req.query.size_from)) {
    apartmentWhere.size = { [Op.between]: [Number(req.query.size_from), req.query.size_to ? Number(req.query.size_to) ? Number(req.query.size_to) : Number(req.query.size_from) : Number(req.query.size_from)] };
  }

  if (req.query.tower) {
    if (req.query.tower === 'ASC') {
      apartmentOrder.push(['tower', 'ASC']);
    } else if (req.query.tower === 'DESC') {
      apartmentOrder.push(['tower', 'DESC']);
    } else {
      apartmentWhere.tower = { [Op.like]: `%${req.query.tower}%` };
    }
  }

  if (req.query.floor) {
    if (req.query.floor === 'ASC') {
      apartmentOrder.push(['floor', 'ASC']);
    } else if (req.query.floor === 'DESC') {
      apartmentOrder.push(['floor', 'DESC']);
    } else {
      apartmentWhere.floor = { [Op.like]: `%${req.query.floor}%` };
    }
  }

  if (req.query.furnishing) {
    if (req.query.furnishing === 'ASC') {
      apartmentOrder.push(['furnishing', 'ASC']);
    } else if (req.query.furnishing === 'DESC') {
      apartmentOrder.push(['furnishing', 'DESC']);
    } else {
      apartmentWhere.furnishing = `${req.query.furnishing}`;
    }
  }

  if (req.query.available) {
    if (req.query.available === 'ASC') {
      apartmentOrder.push(['available', 'ASC']);
    } else if (req.query.available === 'DESC') {
      apartmentOrder.push(['available', 'DESC']);
    } else {
      apartmentWhere.available = { [Op.eq]: `${req.query.available}` === 'Yes' };
    }
  };

  if (req.query.remark) {
    if (req.query.remark === 'ASC') {
      apartmentOrder.push(['remark', 'ASC']);
    } else if (req.query.remark === 'DESC') {
      apartmentOrder.push(['remark', 'DESC']);
    } else {
      apartmentWhere.remark = { [Op.like]: `%${req.query.remark}%` };
    }
  }

  const propertyFacilityNameWhere = {};

  const propertyFacilityOrder = [];

  if (req.query.facility_name) {
    if (req.query.facility_name === 'ASC') {
      propertyFacilityOrder.push(['facilityName', 'ASC']);
    } else if (req.query.facility_name === 'DESC') {
      propertyFacilityOrder.push(['facilityName', 'DESC']);
    } else {
      propertyFacilityNameWhere.facilityName = { [Op.like]: `%${req.query.facility_name}%` };
    }
  }

  const apartmentFacilityWhere = {};

  const apartmentFacilityOrder = [];

  if (req.query.facility_type) {
    if (req.query.facility_type === 'ASC') {
      apartmentFacilityOrder.push(['type', 'ASC']);
    } else if (req.query.facility_type === 'DESC') {
      apartmentFacilityOrder.push(['type', 'DESC']);
    } else {
      apartmentFacilityWhere.type = { [Op.like]: `%${req.query.facility_type}%` };
    }
  }

  if (req.query.facility_unit === 'ASC') {
    apartmentFacilityOrder.push(['unit', 'ASC']);
  }

  if (req.query.facility_unit === 'DESC') {
    apartmentFacilityOrder.push(['unit', 'DESC']);
  }

  if (req.query.facility_unit && Number(req.query.facility_unit)) {
    apartmentFacilityWhere.unit = { [Op.eq]: Number(req.query.facility_unit) };
    apartmentFacilityWhere.id = { [Op.ne]: null }
  }

  const apartmentIconicPlaceWhere = {};

  const apartmentIconicPlaceOrder = [];

  if (req.query.access_place) {
    if (req.query.access_place === 'ASC') {
      apartmentIconicPlaceOrder.push(['placeName', 'ASC']);
    } else if (req.query.access_place === 'DESC') {
      apartmentIconicPlaceOrder.push(['placeName', 'DESC']);
    } else {
      apartmentIconicPlaceWhere.placeName = { [Op.like]: `%${req.query.access_place}%` };
    }
  }

  const propertyAreaWhere = {};

  const propertyAreaOrder = [];

  if (req.query.area) {
    if (req.query.area === 'ASC') {
      propertyAreaOrder.push(['regionName', 'ASC']);
    } else if (req.query.area === 'DESC') {
      propertyAreaOrder.push(['regionName', 'DESC']);
    } else {
      propertyAreaWhere.regionName = { [Op.like]: `%${req.query.area}%` };
    }
  }

  const apartmentFeeWhere = {};

  const apartmentFeeOrder = [];

  if (req.query.rental_price === 'ASC') {
    apartmentFeeOrder.push(['rentalPrice', 'ASC']);
  }

  if (req.query.rental_price === 'DESC') {
    apartmentFeeOrder.push(['rentalPrice', 'DESC']);
  }

  if (req.query.rental_price_from && Number(req.query.rental_price_from) >= 0) {
    apartmentFeeWhere.rentalPrice = { [Op.between]: [Number(req.query.rental_price_from), req.query.rental_price_to ? Number(req.query.rental_price_to) ? Number(req.query.rental_price_to) : Number(req.query.rental_price_from) : Number(req.query.rental_price_from)] };
  }

  if (req.query.sell_price === 'ASC') {
    apartmentFeeOrder.push(['sellPrice', 'ASC']);
  }

  if (req.query.sell_price === 'DESC') {
    apartmentFeeOrder.push(['sellPrice', 'DESC']);
  }

  if (req.query.sell_price_from && Number(req.query.sell_price_from) >= 0) {
    apartmentFeeWhere.sellPrice = { [Op.between]: [Number(req.query.sell_price_from), req.query.sell_price_to ? Number(req.query.sell_price_to) ? Number(req.query.sell_price_to) : Number(req.query.sell_price_from) : Number(req.query.sell_price_from)] };
  }

  if (req.query.price_currency) {
    if (req.query.price_currency === 'ASC') {
      propertyAreaOrder.push(['priceCurrency', 'ASC']);
    } else if (req.query.price_currency === 'DESC') {
      propertyAreaOrder.push(['priceCurrency', 'DESC']);
    } else {
      apartmentFeeWhere.priceCurrency = { [Op.eq]: `${req.query.price_currency}` };
    }
  }

  if (req.query.lease_term === 'ASC') {
    apartmentFeeOrder.push(['leaseTerm', 'ASC']);
  }

  if (req.query.lease_term === 'DESC') {
    apartmentFeeOrder.push(['leaseTerm', 'DESC']);
  }

  if (req.query.lease_term_from && Number(req.query.lease_term_from) >= 0) {
    apartmentFeeWhere.leaseTerm = { [Op.between]: [Number(req.query.lease_term_from), req.query.lease_term_to ? Number(req.query.lease_term_to) ? Number(req.query.lease_term_to) : Number(req.query.lease_term_from) : Number(req.query.lease_term_from)] };
  }

  const apartmentPaymentTermWhere = {};

  if (req.query.payment_term) {
    apartmentPaymentTermWhere.paymentTerm = { [Op.eq]: `${req.query.payment_term}` };
  }

  const apartmentTaxFeeWhere = {};

  const apartmentTaxOrder = [];

  if (req.query.tax_type) {
    apartmentTaxFeeWhere.taxType = { [Op.eq]: `${req.query.tax_type}` };
  };

  if (req.query.tax_percentage === 'ASC') {
    apartmentTaxOrder.push(['percentage', 'ASC']);
  }

  if (req.query.tax_percentage === 'DESC') {
    apartmentTaxOrder.push(['percentage', 'DESC']);
  }

  if (req.query.tax_percentage_from && Number(req.query.tax_percentage_from) >= 0) {
    apartmentTaxFeeWhere.percentage = { [Op.between]: [Number(req.query.tax_percentage_from), req.query.tax_percentage_to ? Number(req.query.tax_percentage_to) ? Number(req.query.tax_percentage_to) : Number(req.query.tax_percentage_from) : Number(req.query.tax_percentage_from)] };
  }

  if (req.query.tax_is_included) {
    apartmentWhere.includedWithinPrice = { [Op.eq]: `${req.query.tax_is_included}` === 'Yes' };
  }

  const picWhere = {};

  const picOrder = [];

  if (req.query.pic_fullname) {
    if (req.query.pic_fullname === 'ASC') {
      picOrder.push(['fullname', 'ASC']);
    } else if (req.query.pic_fullname === 'DESC') {
      picOrder.push(['fullname', 'DESC']);
    } else {
      picWhere.fullname = { [Op.like]: `%${req.query.pic_fullname}%` };
    }
  }

  if (req.query.pic_role) {
    if (req.query.pic_role === 'ASC') {
      picOrder.push(['role', 'ASC']);
    } else if (req.query.pic_role === 'DESC') {
      picOrder.push(['role', 'DESC']);
    } else {
      picWhere.role = { [Op.eq]: `${req.query.pic_role}` };
    }
  }

  if (req.query.pic_company) {
    if (req.query.pic_company === 'ASC') {
      picOrder.push(['company', 'ASC']);
    } else if (req.query.pic_company === 'DESC') {
      picOrder.push(['company', 'DESC']);
    } else {
      picWhere.company = { [Op.like]: `%${req.query.pic_company}%` };
    }
  }

  if (req.query.pic_phone_number) {
    picWhere.phoneNumber = { [Op.like]: `%${req.query.pic_phone_number}%` };
  }

  return await Apartment.findAll({
    attributes: [
      'kodePropar',
      'name',
      'address',
      'size',
      'tower',
      'floor',
      'furnishing',
      'available',
      'remark',
    ],
    where: apartmentWhere,
    order: apartmentOrder,
    include: [
      {
        model: ApartmentFacility,
        separate: true,
        attributes: [
          'id',
          'type',
          'unit',
          'detail',
        ],
        where: apartmentFacilityWhere,
        order: apartmentFacilityOrder,
        include: {
          model: PropertyFacilityName,
          attributes: ['id', 'facilityName'],
          where: propertyFacilityNameWhere,
          order: propertyFacilityOrder,
        },
      },
      {
        model: ApartmentAccess,
        separate: true,
        attributes: ['id', 'type', 'detail'],
        order: [['id', 'ASC']],
        include: {
          model: ApartmentIconicPlace,
          attributes: ['id', 'placeName'],
          where: apartmentIconicPlaceWhere,
          order: apartmentIconicPlaceOrder,
        },
      },
      {
        model: ApartmentPhoto,
        separate: true,
        attributes: ['id', 'photoPath'],
        order: [['id', 'ASC']],
      },
      {
        model: PropertyArea,
        attributes: ['id', 'regionName'],
        where: propertyAreaWhere,
        order: propertyAreaOrder,
      },
      {
        model: ApartmentFee,
        attributes: [
          'id',
          'rentalPrice',
          'sellPrice',
          'priceCurrency',
          'leaseTerm',
        ],
        where: apartmentFeeWhere,
        order: apartmentFeeOrder,
        include: [
          {
            model: ApartmentPaymentTerm,
            attributes: ['id', 'paymentTerm'],
            where: apartmentPaymentTermWhere,
          },
          {
            model: ApartmentTaxFee,
            separate: true,
            attributes: [
              'id',
              'taxType',
              'percentage',
              'includedWithinPrice',
              'detail',
            ],
            where: apartmentTaxFeeWhere,
            order: apartmentTaxOrder,
          },
        ],
      },
      {
        model: PropertyPersonInCharge,
        attributes: [
          'id',
          'fullname',
          'role',
          'company',
          'phoneNumber'
        ],
        where: picWhere,
        group: 'fullname',
        order: picOrder,
      },
    ],
    offset: Number(req.query.page) && Number(req.query.size) ? (Number(req.query.page) - 1) * Number(req.query.size) : 0,
    limit: Number(req.query.page) && Number(req.query.size) ? Number(req.query.size) % 25 === 0 ? Number(req.query.size) : 25 : 25,
  });
}

module.exports = getAllApartments;
