const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../utils/db');

class ApartmentAccess extends Model { }

ApartmentAccess.init({
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
  propertyIconicPlaceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter property iconic place id',
      },
    },
    references: { model: 'property_iconic_places', key: 'id' },
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  detail: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.type[0].toUpperCase() + this.type.slice(1)} Access to ${this.PropertyIconicPlace.placeName}`;
    }
  },
}, {
  sequelize,
  underscored: true,
  paranoid: true,
  timestamps: true,
  modelName: 'ApartmentAccess',
});

module.exports = ApartmentAccess;
