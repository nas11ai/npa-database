const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../utils/db');

class Apartment extends Model { }

Apartment.init({
  kodePropar: {
    type: DataTypes.STRING(50),
    primaryKey: true,
    unique: {
      args: true,
      msg: 'kode propar has been taken',
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter apartment\'s kode propar',
      },
    },
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter apartment name',
      },
    },
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  propertyAreaId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'property_areas', key: 'id' },
  },
  size: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  tower: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  floor: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  furnishing: {
    type: DataTypes.ENUM('Fully Furnished', 'Semi Furnished', 'Unfurnished'),
    allowNull: true,
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    get() {
      return this.getDataValue('available') ? 'Yes' : 'No';
    }
  },
  propertyPersonInChargeId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'property_person_in_charges', key: 'id' },
  },
  remark: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  createdBy: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter username that created new apartment',
      },
    },
  },
  updatedBy: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  deletedBy: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  sequelize,
  underscored: true,
  paranoid: true,
  timestamps: true,
  modelName: 'Apartment',
  indexes: [
    {
      unique: true,
      fields: ["kode_propar"],
    },
  ],
});

module.exports = Apartment;
