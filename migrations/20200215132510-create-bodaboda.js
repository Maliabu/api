'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bodabodas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date_of_birth: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      nin: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      LC1_letter: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gurantor1_nin: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      gurantor2_nin: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      riding_permit: {
        type: Sequelize.STRING,
        allowNull: false
      },
      stage_chairman_letter: {
        type: Sequelize.STRING,
        allowNull: false
      },
      application_form: {
        type: Sequelize.STRING,
        allowNull: false
      },
      passport_photo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gurantor1_passport_photo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gurantor2_passport_photo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address_proof: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gurantor1_stagecard: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gurantor2_stagecard: {
        type: Sequelize.STRING,
        allowNull: false
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
    return queryInterface.dropTable('Bodabodas');
  }
};