const DataTypes = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("property_person_in_charges", {
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
      phone_number: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter property\'s person in charge phone number',
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
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("property_person_in_charges");
  },
};
