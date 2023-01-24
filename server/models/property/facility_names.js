const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../utils/db');

class PropertyFacilityName extends Model { }

PropertyFacilityName.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  facilityName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter facility name',
      },
    },
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'PropertyFacilityName',
});

module.exports = PropertyFacilityName;
