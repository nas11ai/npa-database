const DataTypes = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("apartment_tax_fees", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      apartment_fee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter apartment\'s fee id',
          },
        },
        references: { model: 'apartment_fees', key: 'id' },
      },
      tax_type: {
        type: DataTypes.ENUM('Value Added Tax', 'Withholding Tax'),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter tax fee type',
          },
        },
      },
      percentage: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter tax fee\'s percentage',
          },
        },
      },
      included_within_price: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter tax fee\'s included within price value'
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
    await queryInterface.dropTable("apartment_tax_fees");
  },
};
