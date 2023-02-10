const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../utils/db');

class ApartmentTaxFee extends Model { }

ApartmentTaxFee.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  apartmentFeeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter apartment\'s fee id',
      },
    },
    references: { model: 'apartment_fees', key: 'id' },
  },
  taxType: {
    type: DataTypes.ENUM('Value Added Tax', 'Withholding Tax'),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter tax fee type',
      },
    },
  },
  percentage: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter tax fee\'s percentage',
      },
    },
    get() {
      return `${this.getDataValue('percentage')}%`;
    }
  },
  includedWithinPrice: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter tax fee\'s included within price value'
      },
    },
    get() {
      return this.getDataValue('rentalPrice') ? "Yes" : "No";
    }
  },
  detail: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.getDataValue('includedWithinPrice') ? `${this.percentage} ${this.taxType} included within price` : `${this.percentage} ${this.taxType} NOT included within price`;
    }
  },
}, {
  sequelize,
  underscored: true,
  paranoid: true,
  timestamps: true,
  modelName: 'ApartmentTaxFee',
});

module.exports = ApartmentTaxFee;
