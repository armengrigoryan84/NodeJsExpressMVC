'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
        firstName: 'John',
        lastName: 'Doe',
        email: 'demo@demo.com',
        password:'$2b$10$ojxVA3o.TI1PkKwORP/Zh.PJ5BdwARhDs2r.1HhDcfBF.3iApRhju', //apass
        roleId:1
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
