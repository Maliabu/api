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
    amount:{
      type: DataTypes.BIGINT,
      allowNull: {
        args: false,
        msg: "Please fill amount"
      }
    },
    payment_period:{
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Please fill payment period"
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