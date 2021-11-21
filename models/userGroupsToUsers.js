/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userGroupsToUsers', {
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    userGoupId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'userGroupsToUsers'
  });
};
