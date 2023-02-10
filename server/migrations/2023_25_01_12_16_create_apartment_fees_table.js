const DataTypes = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("apartment_fees", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      apartment_kode_propar: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter apartment\'s kode propar',
          },
        },
        references: { model: 'apartments', key: 'kode_propar' },
      },
      price_currency: {
        type: DataTypes.ENUM('Rupiah', 'US Dollar'),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter apartment\'s price currency',
          },
        },
      },
      rental_price: {
        type: DataTypes.BIGINT.UNSIGNED,
        validate: {
          notNull: {
            msg: 'Please enter apartment\'s rental price',
          },
        },
      },
      sell_price: {
        type: DataTypes.BIGINT.UNSIGNED,
        validate: {
          notNull: {
            msg: 'Please enter apartment\'s sell price',
          },
        },
      },
      property_payment_term_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'property_payment_terms', key: 'id' },
      },
      lease_term: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
    await queryInterface.dropTable("apartment_fees");
  },
};
