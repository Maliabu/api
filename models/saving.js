'use strict';
module.exports = (sequelize, DataTypes) => {
  const Saving = sequelize.define('Saving', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: "Please enter user id"
      },
      references: {
        model: 'User',
        key: 'id',
        as: 'userId'
      }
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: "Please enter member id"
      },
      references: {
        model: 'Member',
        key: 'id',
        as: 'memberId'
      }
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: {
        args: false,
        msg: "Please fill amount"
      }
    }
  }, {});
  Saving.associate = function (models) {
    Saving.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Saving.belongsTo(models.Member, {
      foreignKey: 'memberId',
      onDelete: 'CASCADE'
    });
  };
  return Saving;
};