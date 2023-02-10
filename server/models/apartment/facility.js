const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../utils/db');

class ApartmentFacility extends Model { }

ApartmentFacility.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  apartmentKodePropar: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter apartment\'s kode propar',
      },
    },
    references: { model: 'apartments', key: 'kode_propar' },
  },
  propertyFacilityNameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter property facility name id',
      },
    },
    references: { model: 'property_facility_names', key: 'id' },
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  unit: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  detail: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.unit} ${this.type} ${this.PropertyFacilityName.facilityName}`;
    }
  },
}, {
  sequelize,
  underscored: true,
  paranoid: true,
  timestamps: true,
  modelName: 'ApartmentFacility',
});

module.exports = ApartmentFacility;
