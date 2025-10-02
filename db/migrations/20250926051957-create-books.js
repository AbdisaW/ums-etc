'use strict';

import { UUIDV4 } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("Books",{
      id:{
        type:Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true       
      },
      title:{
        type:Sequelize.STRING,
        allowNull: false
      },
      author:{
        type: Sequelize.STRING,
        allowNull:false
      },
      publishedYear:{
        type:Sequelize.STRING,
        allowNull:false
      },
      availableCopies:{
        type:Sequelize.INTEGER,
        defaultValue: 1

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },



    })
  
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable("Books")
  }
};
