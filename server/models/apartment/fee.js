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
    allowNull: true,
    get() {
      const currency = this.getDataValue('priceCurrency') === "Rupiah" ? "IDR" : "USD";
      return this.getDataValue('rentalPrice') ? new Intl.NumberFormat("en-US", { style: "currency", currency }).format(this.getDataValue('rentalPrice')) : null;
    }
  },
  sellPrice: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
    get() {
      const currency = this.getDataValue('priceCurrency') === "Rupiah" ? "IDR" : "USD";
      return this.getDataValue('sellPrice') ? new Intl.NumberFormat("en-US", { style: "currency", currency }).format(this.getDataValue('sellPrice')) : null;
    }
  },
  apartmentPaymentTermId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'apartment_payment_terms', key: 'id' },
  },
  leaseTerm: {
    type: DataTypes.INTEGER,
    allowNull: true,
    get() {
      return this.getDataValue('leaseTerm') ? `${this.getDataValue('leaseTerm')} month` : null
    }
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'ApartmentFee',
});

module.exports = ApartmentFee;
