const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../utils/db');

class ApartmentFee extends Model { }

ApartmentFee.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  apartmentKodePropar: {
    type: DataTypes.STRING(50),
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
    references: { model: 'apartments', key: 'kode_propar' },
  },
  priceCurrency: {
    type: DataTypes.ENUM('Rupiah', 'US Dollar'),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter apartment\'s price currency',
      },
    },
  },
  rentalPrice: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter apartment\'s rental price',
      },
    },
    get() {
      const currency = this.getDataValue('priceCurrency') === "Rupiah" ? "IDR" : "USD";
      return this.getDataValue('rentalPrice') ? new Intl.NumberFormat("en-US", { style: "currency", currency }).format(this.getDataValue('rentalPrice')) : null;
    }
  },
  sellPrice: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter apartment\'s sell price',
      },
    },
    get() {
      const currency = this.getDataValue('priceCurrency') === "Rupiah" ? "IDR" : "USD";
      return this.getDataValue('sellPrice') ? new Intl.NumberFormat("en-US", { style: "currency", currency }).format(this.getDataValue('sellPrice')) : null;
    }
  },
  propertyPaymentTermId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'property_payment_terms', key: 'id' },
  },
  leaseTerm: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
    get() {
      return this.getDataValue('leaseTerm') ? `${this.getDataValue('leaseTerm')} month` : null
    }
  },
}, {
  sequelize,
  underscored: true,
  paranoid: true,
  timestamps: true,
  modelName: 'ApartmentFee',
  indexes: [
    {
      unique: true,
      fields: ["kode_propar"],
    },
  ],
});

module.exports = ApartmentFee;
