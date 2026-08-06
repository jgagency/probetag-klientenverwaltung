'use strict';

// Legt die Tabelle klienten an. Alle Felder außer id sind bewusst nullable –
// Pflichtfeld-Validierung ist Aufgabe des Frontends.

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('klienten', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      vorname: { type: Sequelize.TEXT, allowNull: true },
      nachname: { type: Sequelize.TEXT, allowNull: true },
      strasse: { type: Sequelize.TEXT, allowNull: true },
      plz: { type: Sequelize.TEXT, allowNull: true },
      ort: { type: Sequelize.TEXT, allowNull: true },
      telefon: { type: Sequelize.TEXT, allowNull: true },
      email: { type: Sequelize.TEXT, allowNull: true },
      versicherungsnummer: { type: Sequelize.TEXT, allowNull: true },
      versicherungsname: { type: Sequelize.TEXT, allowNull: true },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('klienten');
  },
};
