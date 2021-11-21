/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('companies', {
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
    phone: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive', 'Deleted'),
      allowNull: true,
      defaultValue: 'Active'
    },
    timeZone: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    modifiedBy: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    accountId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'accounts',
        key: 'id'
      }
    }
  }, {
    createdAt: 'createdDate',
    updatedAt: 'updatedDate',
    tableName: 'companies'
  });
};
