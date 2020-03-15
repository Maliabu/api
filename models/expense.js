'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    type: {
      type:DataTypes.ENUM('Stationary','Food','Daily allowances','Monthly Salary'),
      allowNull:false
    },
    amount: {
      type:DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Expense.associate = function(models) {
    // associations can be defined here
  };
  return Expense;
};