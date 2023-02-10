const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../utils/db');

class PropertyPaymentTerm extends Model { }

PropertyPaymentTerm.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  paymentTerm: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter payment term\'s name',
      },
    },
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'PropertyPaymentTerm',
});

module.exports = PropertyPaymentTerm;
