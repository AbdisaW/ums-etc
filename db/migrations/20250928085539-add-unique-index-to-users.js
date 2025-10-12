'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex("users", ["email"], {
      unique: true,
      name: "uniq_user_email"


    })
  },

  async down(queryInterface, Sequelize) {
   await queryInterface.removeIndex("users", "uniq_user_email");
  }
};
