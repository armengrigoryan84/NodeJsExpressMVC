'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('accounts', [{
      name: 'testAccount',
      status:'Active',
      port: 123
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('accounts', null, {});
  }
};
