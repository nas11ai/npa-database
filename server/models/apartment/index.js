const ApartmentAccess = require("./access");
const Apartment = require("./apartment");
const ApartmentFacility = require("./facility");
const ApartmentFee = require("./fee");
const ApartmentIconicPlace = require("./iconic_place");
const ApartmentPaymentTerm = require("./payment_term");
const ApartmentPhoto = require("./photo");
const ApartmentTaxFee = require("./tax_fee");

const { PropertyArea, PropertyFacilityName, PropertyPersonInCharge } = require("../property");

PropertyPersonInCharge.hasMany(Apartment);
Apartment.belongsTo(PropertyPersonInCharge);

PropertyArea.hasMany(Apartment);
Apartment.belongsTo(PropertyArea);

Apartment.hasMany(ApartmentPhoto);
ApartmentPhoto.belongsTo(Apartment);

PropertyFacilityName.hasMany(ApartmentFacility);
ApartmentFacility.belongsTo(PropertyFacilityName);

Apartment.hasMany(ApartmentFacility);
ApartmentFacility.belongsTo(Apartment);

ApartmentPaymentTerm.hasMany(ApartmentFee);
ApartmentFee.belongsTo(ApartmentPaymentTerm);

Apartment.hasOne(ApartmentFee);
ApartmentFee.belongsTo(Apartment);

ApartmentFee.hasMany(ApartmentTaxFee);
ApartmentTaxFee.belongsTo(ApartmentFee);

ApartmentIconicPlace.hasMany(ApartmentAccess);
ApartmentAccess.belongsTo(ApartmentIconicPlace);

Apartment.hasMany(ApartmentAccess);
ApartmentAccess.belongsTo(Apartment);

module.exports = {
  ApartmentAccess,
  Apartment,
  ApartmentFacility,
  ApartmentFee,
  ApartmentIconicPlace,
  ApartmentPaymentTerm,
  ApartmentPhoto,
  ApartmentTaxFee,
};
