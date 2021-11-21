'use strict';

module.exports = function(sequelize, DataTypes) { 
  let users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('active','blocked','deleted'),
      allowNull: true,
      defaultValue: 'active'
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
    lastLoginDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    profilePicture: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    modifiedBy: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    roleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
    }
  }, {
    indexes     : [
        {
            unique: true,
            fields: ['email']
        }
    ],
    createdAt   : 'createdDate',
    updatedAt   : 'updatedDate',
    tableName   : 'users'
  });
  users.belongsTo(sequelize.models.roles,{as:'roles',foreignKey: 'roleId', targetKey: 'id'});
  return users;
};
