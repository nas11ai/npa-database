const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../utils/db');

class PropertyArea extends Model { }

PropertyArea.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  regionName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter region name',
      },
    },
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'PropertyArea',
});

module.exports = PropertyArea;
