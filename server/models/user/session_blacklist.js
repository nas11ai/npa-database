const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../../utils/db');

class SessionBlacklist extends Model { }

SessionBlacklist.init({
  jwtid: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: {
      args: true,
      msg: 'UUID blacklist has been taken',
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter blacklisted token UUID',
      },
    },
  },
  encryptedRefreshToken: {
    type: DataTypes.STRING,
    unique: {
      args: true,
      msg: 'Blacklist token already exist',
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter user\'s refresh token',
      },
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
    validate: {
      notNull: {
        msg: 'Please enter user\'s id',
      },
    },
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'SessionBlacklist',
  indexes: [
    {
      unique: true,
      fields: ["jwtid", "encrypted_refresh_token"],
    },
  ],
});

module.exports = SessionBlacklist;