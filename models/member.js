'use strict';
module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    userId: {
      type:DataTypes.INTEGER,
      allowNull:{
        args:false,
        msg:"Please enter user id"
      },
      references:{
        model:'User',
        key:'id',
        as:'userId'
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      unique: true
    },
    nin: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      unique: true
    },
    passport_photo: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  Member.associate = function (models) {
    Member.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Member.hasMany(models.Saving, {
      foreignKey: 'memberId',
    });
    Member.hasMany(models.Loan, {
      foreignKey: 'memberId',
    });
  };
  return Member;
};