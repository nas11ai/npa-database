const ApartmentAccess = require("./access");
const Apartment = require("./apartment");
const ApartmentFacility = require("./facility");
const ApartmentFee = require("./fee");
const ApartmentPhoto = require("./photo");
const ApartmentTaxFee = require("./tax_fee");

const { PropertyArea, PropertyFacilityName, PropertyPaymentTerm, PropertyIconicPlace, PropertyPersonInCharge } = require("../property");

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

PropertyPaymentTerm.hasMany(ApartmentFee);
ApartmentFee.belongsTo(PropertyPaymentTerm);

Apartment.hasOne(ApartmentFee);
ApartmentFee.belongsTo(Apartment);

ApartmentFee.hasMany(ApartmentTaxFee);
ApartmentTaxFee.belongsTo(ApartmentFee);

PropertyIconicPlace.hasMany(ApartmentAccess);
ApartmentAccess.belongsTo(PropertyIconicPlace);

Apartment.hasMany(ApartmentAccess);
ApartmentAccess.belongsTo(Apartment);

module.exports = {
  ApartmentAccess,
  Apartment,
  ApartmentFacility,
  ApartmentFee,
  ApartmentPhoto,
  ApartmentTaxFee,
};
