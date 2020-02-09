'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: "User firtname is required"
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: "User lastname is required"
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      notNull: {
        msg: "User email is required"
      },
      validate: {
        isEmail: {
          msg: "Phone number invalid."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: "User password is required"
      }
    },
    nin: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      notNull: {
        msg: "User nin number is required"
      },
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
      notNull: {
        msg: "User phone number is required"
      },
      validate: {
        len: {
          args: [7, 20],
          msg: "Phone number invalid, too short."
        },
        isNumeric: {
          msg: "not a valid phone number."
        }
      }
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: {
        msg: "User photo is required"
      }
    },
    role: {
      type: DataTypes.ENUM('administrator', 'agent'),
      allowNull: false,
      notNull: {
        msg: "User role is required"
      }
    }
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};