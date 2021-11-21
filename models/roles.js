/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) { 
    return sequelize.define('roles', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    createdAt   : 'createdDate',
    updatedAt   : 'updatedDate',
    tableName   : 'roles'
  });
};
