'use strict';
require('dotenv').config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const authModule = await import("../../lib/auth.ts");
    //const auth = authModule.auth;
    const result = await authModule.auth.api.signUpEmail({
      body: {
        email: process.env.SEED_ADMIN_EMAIL,
        password: process.env.SEED_ADMIN_PASSWORD,
        name: process.env.SEED_ADMIN_NAME,
        username: process.env.SEED_ADMIN_NAME,
        displayUsername: process.env.SEED_ADMIN_NAME,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', {email: 'admin@probetag.de'})
  }
};
