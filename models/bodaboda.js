'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bodaboda = sequelize.define('Bodaboda', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nin: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    LC1_letter: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gurantor1_nin: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    gurantor2_nin: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    riding_permit: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stage_chairman_letter: {
      type: DataTypes.STRING,
      allowNull: false
    },
    application_form: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passport_photo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gurantor1_passport_photo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gurantor2_passport_photo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address_proof: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gurantor1_stagecard: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gurantor2_stagecard: {
      type: DataTypes.STRING,
      allowNull: false
    },

  }, {});
  Bodaboda.associate = function (models) {
    Bodaboda.hasMany(models.Loan, {
      foreignKey: 'bodabodaId',
    });
  };
  return Bodaboda;
};