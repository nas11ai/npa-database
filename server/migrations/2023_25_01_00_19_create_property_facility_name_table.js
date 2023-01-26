const DataTypes = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("property_facility_names", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      facility_name: {
        type: DataTypes.STRING(100),
        unique: {
          args: true,
          msg: 'facility name is already exist in the table',
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter facility name',
          },
        },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
      {
        uniqueKeys: {
          unique_tag: {
            customIndex: true,
            fields: ["facility_name"],
          },
        },
      });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("property_facility_names");
  },
};
