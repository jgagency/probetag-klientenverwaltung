'use strict';
require('dotenv').config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const authModule = await import("../../lib/auth.ts");
    //const auth = authModule.auth;
    const result = await authModule.auth.api.signUpEmail({
      body: {
        email: 'admin@probetag.de',
        password: 'sicheresPasswort123',
        name: 'Admin',
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', {email: 'admin@probetag.de'})
  }
};
