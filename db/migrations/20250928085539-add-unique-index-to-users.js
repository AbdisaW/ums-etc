'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex("Users", ["email"], {
      unique: true,
      name: "uniq_user_email"


    })
  },

  async down(queryInterface, Sequelize) {
   await queryInterface.removeIndex("Users", "uniq_user_email");
  }
};
