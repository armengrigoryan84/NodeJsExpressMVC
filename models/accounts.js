/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('accounts', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive', 'Expired'),
      allowNull: false,
      defaultValue: 'Active'
    },
    port: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    createdAt: 'createdDate',
    updatedAt: 'updatedDate',
    tableName: 'accounts'
  });
};
