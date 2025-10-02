'use strict';

/** @type {import('sequelize-cli').Migration} */


export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex("Books", ["title", "author"], {
      name: "books_title_author_idx"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("Books", "books_title_author_idx");
  }
};

