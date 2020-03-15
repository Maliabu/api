'use strict';
module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
    bodabodaId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      onDelete: 'CASCADE',
      references: {
        model: 'Bodaboda',
        key: 'id',
        as: 'bodabodaId'
      }
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      onDelete: 'CASCADE',
      references: {
        model: 'User',
        key: 'id',
        as: 'userId'
    }
  },
    stage_name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    amount: {
      type:DataTypes.FLOAT,
      allowNull:false,
      default:0.0
    },
    return_date: {
      type:DataTypes.DATE,
      allowNull:false
    }
  }, {});
  Loan.associate = function(models) {
    Loan.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'

    });
    Loan.belongsTo(models.Bodaboda, {
      foreignKey: 'bodabodaId',
      targetKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'

    });
  };
  return Loan;
};