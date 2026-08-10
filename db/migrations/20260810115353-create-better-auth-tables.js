'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: { type: Sequelize.STRING, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      emailVerified: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      image: { type: Sequelize.STRING, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('session', {
      id: { type: Sequelize.STRING, primaryKey: true },
      userId: { type: Sequelize.STRING, allowNull: false, references: { model: 'user', key: 'id' }, onDelete: 'CASCADE' },
      token: { type: Sequelize.STRING, allowNull: false, unique: true },
      expiresAt: { type: Sequelize.DATE, allowNull: false },
      ipAddress: { type: Sequelize.STRING, allowNull: true },
      userAgent: { type: Sequelize.STRING, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('account', {
      id: { type: Sequelize.STRING, primaryKey: true },
      userId: { type: Sequelize.STRING, allowNull: false, references: { model: 'user', key: 'id' }, onDelete: 'CASCADE' },
      accountId: { type: Sequelize.STRING, allowNull: false },
      providerId: { type: Sequelize.STRING, allowNull: false },
      accessToken: { type: Sequelize.STRING, allowNull: true },
      refreshToken: { type: Sequelize.STRING, allowNull: true },
      accessTokenExpiresAt: { type: Sequelize.DATE, allowNull: true },
      refreshTokenExpiresAt: { type: Sequelize.DATE, allowNull: true },
      scope: { type: Sequelize.STRING, allowNull: true },
      idToken: { type: Sequelize.TEXT, allowNull: true },
      password: { type: Sequelize.STRING, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('verification', {
      id: { type: Sequelize.STRING, primaryKey: true },
      identifier: { type: Sequelize.STRING, allowNull: false },
      value: { type: Sequelize.STRING, allowNull: false },
      expiresAt: { type: Sequelize.DATE, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('verification');
    await queryInterface.dropTable('account');
    await queryInterface.dropTable('session');
    await queryInterface.dropTable('user');
  }
};
