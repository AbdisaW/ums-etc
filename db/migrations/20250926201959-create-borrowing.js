'use strict';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Borrowings", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Users", key: "id" },
        onDelete: "CASCADE"
      },
      bookId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "Books", key: "id" },
        onDelete: "CASCADE"
      },
      borrowDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      },
      returnDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
        allowNull: false
      }
    });

    // 🔹 Add unique composite index
    await queryInterface.addIndex("Borrowings", ["userId", "bookId", "returnDate"], {
      unique: true,
      name: "uniq_active_borrow"
    });

    // 🔹 Add index for borrowDate (optional, speeds up queries)
    await queryInterface.addIndex("Borrowings", ["borrowDate"]);
  },

  async down(queryInterface) {
    // Drop indexes first (good practice)
    await queryInterface.removeIndex("Borrowings", "uniq_active_borrow");
    await queryInterface.removeIndex("Borrowings", ["borrowDate"]);

    // Then drop table
    await queryInterface.dropTable("Borrowings");
  }
};
