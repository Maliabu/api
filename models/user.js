'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter firstName'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter lastName'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          args:true,
          msg: "Email is invalid."
        },
        notNull:{
          args:true,
          msg:"Please enter email"
        }

      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nin: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: {
          args: [14, 20],
          msg: "nin number invalid, too short."
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: {
          args: [10, 20],
          msg: "Phone number invalid, too short."
        }
      }
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('administrator', 'agent'),
      allowNull: false,
    }
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};