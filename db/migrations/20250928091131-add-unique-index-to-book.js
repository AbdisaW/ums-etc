'use strict';

/** @type {import('sequelize-cli').Migration} */


export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex("books", ["title", "author"], {
      name: "books_title_author_idx"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("books", "books_title_author_idx");
  }
};

