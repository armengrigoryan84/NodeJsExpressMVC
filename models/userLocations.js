/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userLocations', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    locationId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'locations',
        key: 'id'
      }
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    createdAt   : 'createdDate',
    updatedAt   : 'updatedDate',
    tableName: 'userLocations'
  });
};
