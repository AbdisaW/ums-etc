'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Books', 'availableCopies',{
      type: Sequelize.INTEGER,
       defaultValue: 1,
      allowNull: false,

    })
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Books","availableCopies")

  }
};
