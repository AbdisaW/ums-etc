import { BookDB, BorrowingDB } from "../models/sequelize/index.js"


export const borrowingRepository = {
    async create({ userId, bookId }) {
        const book = await BookDB.findByPk(bookId);
        if (!book) throw new Error("Book not found");

        const existingBorrow = await BorrowingDB.findOne({
            where: {
                userId,
                bookId,
                returnDate: null 
            }
        });
        if (existingBorrow) throw new Error("You have already borrowed this book");


        if (book.availableCopies < 1) throw new Error(" No copies available");

        await book.update({ availableCopies: book.availableCopies - 1 });

        return await BorrowingDB.create({ userId, bookId });

    },

    async returnBook({ userId, bookId }) {
        const borrow = await BorrowingDB.findOne({
            where: { userId, bookId, returnDate: null }
        });

        if (!borrow) throw new Error("Borrow record not found");

        await borrow.update({ returnDate: new Date() });

        const book = await BookDB.findByPk(bookId);
        await book.update({ availableCopies: book.availableCopies + 1 });

        return borrow;
    },

    async getUserBorrowedBooks(whereClause) {
        return await BorrowingDB.findAll({
            where: whereClause,
            include: [
                {
                    model: BookDB,
                    attributes: ["id", "title", "author", "publishedYear"],
                }

            ]
        });
    }
}