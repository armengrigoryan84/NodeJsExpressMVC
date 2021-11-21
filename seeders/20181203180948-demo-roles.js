'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('roles', [
         {
            name: 'Account admin'
      }
      ,{
            name: 'Company admin'
      }
      ,{
            name: 'User stuff'
      }
      ,{
            name: 'User students'
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
