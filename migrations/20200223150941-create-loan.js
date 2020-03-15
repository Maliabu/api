'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Loans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bodabodaId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
        references: {
          model: 'Bodabodas',
          key: 'id',
          as: 'bodabodaId',
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        }
      },
      stage_name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull:false,
        default:0.0
      },
      return_date: {
        type: Sequelize.DATE,
        allowNull:false,
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
    return queryInterface.dropTable('Loans');
  }
};