'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("books", "reject", {
      type: Sequelize.BOOLEAN,
     
      allowNull: false,
    })
    
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("books", "totalCopies")
  
  }
};
