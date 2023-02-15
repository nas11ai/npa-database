const ApartmentAccess = require("./access");
const Apartment = require("./apartment");
const ApartmentFacility = require("./facility");
const ApartmentFee = require("./fee");
const ApartmentPhoto = require("./photo");
const ApartmentTaxFee = require("./tax_fee");

const { PropertyArea, PropertyFacilityName, PropertyPaymentTerm, PropertyIconicPlace, PropertyPersonInCharge } = require("../property");

PropertyPersonInCharge.hasMany(Apartment);
Apartment.belongsTo(PropertyPersonInCharge, { as: "propertyPersonInCharge" });

PropertyArea.hasMany(Apartment);
Apartment.belongsTo(PropertyArea, { as: "propertyArea" });

Apartment.hasMany(ApartmentPhoto, { as: "apartmentPhoto" });
ApartmentPhoto.belongsTo(Apartment);

PropertyFacilityName.hasMany(ApartmentFacility);
ApartmentFacility.belongsTo(PropertyFacilityName, { as: "propertyFacilityName" });

Apartment.hasMany(ApartmentFacility, { as: "apartmentFacilities" });
ApartmentFacility.belongsTo(Apartment);

PropertyPaymentTerm.hasMany(ApartmentFee);
ApartmentFee.belongsTo(PropertyPaymentTerm, { as: "propertyPaymentTerm" });

Apartment.hasOne(ApartmentFee, { as: "apartmentFee", foreignKey: "apartmentKodePropar" });
ApartmentFee.belongsTo(Apartment);

ApartmentFee.hasMany(ApartmentTaxFee, { as: "taxFees" });
ApartmentTaxFee.belongsTo(ApartmentFee);

PropertyIconicPlace.hasMany(ApartmentAccess);
ApartmentAccess.belongsTo(PropertyIconicPlace, { as: "propertyIconicPlace" });

Apartment.hasMany(ApartmentAccess, { as: "apartmentAccesses" });
ApartmentAccess.belongsTo(Apartment);

module.exports = {
  ApartmentAccess,
  Apartment,
  ApartmentFacility,
  ApartmentFee,
  ApartmentPhoto,
  ApartmentTaxFee,
};
