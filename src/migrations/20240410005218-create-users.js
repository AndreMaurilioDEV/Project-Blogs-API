'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    display_name: {
      type: Sequelize.STRING,
    },
    email: {
      //unique: true,
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
   })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
