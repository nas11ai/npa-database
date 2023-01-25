const DataTypes = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("apartments", {
      kode_propar: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        unique: {
          args: true,
          msg: 'kode propar has been taken',
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter apartment\'s kode propar',
          },
        },
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter apartment name',
          },
        },
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      property_area_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'property_areas', key: 'id' },
      },
      size: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
      },
      tower: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      floor: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      address: {
        type: DataTypes.ENUM('Fully Furnished', 'Semi Furnished', 'Unfurnished'),
        allowNull: true,
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      property_person_in_charge_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'property_person_in_charges', key: 'id' },
      },
      remark: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter username that created new apartment',
          },
        },
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deleted_by: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    }, {
      uniqueKeys: {
        unique_tag: {
          customIndex: true,
          fields: ["name"],
        },
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("apartments");
  },
};
