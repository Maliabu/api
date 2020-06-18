'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    title: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "Please fill expense title"
      }
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: {
        args: false,
        msg: "Please fill expense amount"
      }
    },
    note: {
      type: DataTypes.BIGINT,
      allowNull: {
        args: false,
        msg: "Please fill expense note"
      }
    }
  }, {});
  Expense.associate = function (models) {
    // associations can be defined here
  };
  return Expense;
};