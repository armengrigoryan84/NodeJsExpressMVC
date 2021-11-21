/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userGroups', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    accountId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    createdBy: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'userGroups'
  });
};
