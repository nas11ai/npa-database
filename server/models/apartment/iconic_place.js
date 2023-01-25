const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../utils/db');

class ApartmentIconicPlace extends Model { }

ApartmentIconicPlace.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  placeName: {
    type: DataTypes.STRING(255),
    unique: {
      args: true,
      msg: 'place name is already exist in the table',
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter iconic place name',
      },
    },
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'ApartmentIconicPlace',
  indexes: [
    {
      unique: true,
      fields: ["place_name"],
    },
  ],
});

module.exports = ApartmentIconicPlace;
