'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    memberId:{
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
    amount:{
      type: DataTypes.BIGINT,
      allowNull: {
        args: false,
        msg: "Please fill amount"
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Please fill type"
      }
    },
  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Member, {
      foreignKey: 'memberId',
      onDelete: 'CASCADE'
    });
  };
  return Transaction;
};