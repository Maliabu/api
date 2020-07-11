'use strict';
module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
    userId:{
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
    amount_borrowed:{
      type: DataTypes.BIGINT,
      allowNull: {
        args: false,
        msg: "Please fill amount borrowed"
      }
    },
    amount_remaining:{
      type: DataTypes.BIGINT,
      allowNull: {
        args: false,
        msg: "Please fill amount remaining"
      }
    },
    payment_period:{
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Please fill payment period"
      }
    },
    interest:{
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: "Please fill interest"
      }
    },
  }, {});
  Loan.associate = function(models) {
    Loan.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Loan.belongsTo(models.Member, {
      foreignKey: 'memberId',
      onDelete: 'CASCADE'
    });
  };
  return Loan;
};