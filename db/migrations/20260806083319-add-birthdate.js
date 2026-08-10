'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('klienten', 'geburtsdatum', {type: Sequelize.DATEONLY, allowNull: true});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('klienten', 'geburtsdatum');
  }
};
