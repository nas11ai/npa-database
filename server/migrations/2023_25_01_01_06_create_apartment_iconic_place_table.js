const DataTypes = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("apartment_iconic_places", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      place_name: {
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
            fields: ["place_name"],
          },
        },
      });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("apartment_iconic_places");
  },
};
