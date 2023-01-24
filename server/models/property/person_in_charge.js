const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../utils/db');

class PropertyPersonInCharge extends Model { }

PropertyPersonInCharge.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter property\'s person in charge fullname',
      },
    },
  },
  role: {
    type: DataTypes.ENUM("Agent", "Developer", "Management", "Owner"),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter property\'s person in charge role',
      },
    },
  },
  company: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter property\'s person in charge company',
      },
    },
  },
  phoneNumber: {
    type: DataTypes.STRING(15),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter property\'s person in charge phone number',
      },
    },
  },
}, {
  sequelize,
  paranoid: true,
  underscored: true,
  timestamps: true,
  modelName: 'PropertyPersonInCharge',
});

module.exports = PropertyPersonInCharge;
