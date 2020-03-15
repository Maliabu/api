'use strict';
module.exports = (sequelize, DataTypes) => {
  const Saving = sequelize.define('Saving', {
    client: {
      type:DataTypes.STRING,
      allowNull:false
    },
    amount:  {
      type:DataTypes.FLOAT,
      allowNull:false
    },
    clientNumber:  {
      type:DataTypes.STRING,
      allowNull:false
    }
  }, {});
  Saving.associate = function(models) {
    // associations can be defined here
  };
  return Saving;
};