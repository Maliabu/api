'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      nin: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: true
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull:false,
        unique: true
      },
      photo: {
        type: Sequelize.STRING,
        allowNull:false
      },
      role: {
        type: Sequelize.ENUM,
        values:['administrator','agent'],
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};