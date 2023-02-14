const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("property_facility_names", "icon_path", {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter property facility\'s icon filepath',
        },
      },
    });

    await queryInterface.addColumn("property_facility_names", "icon_url", {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter property facility\'s icon url',
        },
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("property_facility_names", "icon_url");
    await queryInterface.removeColumn("property_facility_names", "icon_path");
  },
};
