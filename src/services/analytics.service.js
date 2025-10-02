import { BorrowingDB, BookDB, UserDB } from '../models/sequelize/index.js'
import sequelize from '../../config/database.js'
import { Sequelize } from 'sequelize';

export const analyticsService = {
    async mostBorrowedBooks() {

        const maxResult = await BorrowingDB.findAll({
            attributes: [
                [Sequelize.fn('COUNT', sequelize.col('bookId')), 'borrowCount']
            ],
            group: ['bookId'],
            order: [[Sequelize.literal('borrowCount'), 'DESC']],
            limit: 1
        });

        if (!maxResult) {
            return [];
        }

        const maxBorrowCount = maxResult[0].get('borrowCount');

        const results = await BorrowingDB.findAll({
            attributes: [
                'bookId',
                [Sequelize.fn('COUNT', sequelize.col('bookId')), 'borrowCount']
            ],
            group: ['bookId'],
            having: Sequelize.literal(`COUNT(bookId) = ${maxBorrowCount}`),
            include: [{ model: BookDB, attributes: ['title', 'author'] }]
        });

        return results;
    },

    async leastBorrowedBooks() {

        const leastResult = await BorrowingDB.findAll({
            attributes: [
                [Sequelize.fn('COUNT', sequelize.col('bookId')), 'borrowCount']
            ],
            group: ['bookId'],
            order: [[Sequelize.literal('borrowCount'), 'ASC']],
            limit: 1
        });

        if (!leastResult) {
            return [];
        }

        const leastBorrowCount = leastResult[0].get('borrowCount');

        const results = await BorrowingDB.findAll({
            attributes: [
                'bookId',
                [Sequelize.fn('COUNT', sequelize.col('bookId')), 'borrowCount']
            ],
            group: ['bookId'],
            having: Sequelize.literal(`COUNT(bookId) = ${leastBorrowCount}`),
            include: [{ model: BookDB, attributes: ['title', 'author'] }]
        });

        return results;
    },

    async mostBorrowedUsers() {
        const mostUser = await BorrowingDB.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('userId')), 'borrowCount']

            ],
            group: ['userId'],
            order: [[Sequelize.literal('borrowCount'), 'DESC']],
            limit: 1
        });
        if (!mostUser) {
            return [];
        }

        const mostBorrowedCount = mostUser[0].get('borrowCount');

        const results = await BorrowingDB.findAll({
            attributes: [
                'userId',
                [sequelize.fn('COUNT', sequelize.col('userId')), 'borrowCount']
            ],
            group: ['userId'],
            having: Sequelize.literal(`COUNT(userId) = ${mostBorrowedCount}`),
            include: [{ model: UserDB, attributes: ['name', 'role'] }]
        })
        return results;
    },

    async mostUserAndBook() {
        const topCombination = await BorrowingDB.findAll({
            attributes: [
                'userId',
                'bookId',
                [sequelize.fn('COUNT', sequelize.col('*')), 'mostBorrowedBook']
            ],
            group: ['userId', 'bookId'],
            order: [[sequelize.literal('mostBorrowedBook'), 'DESC']],
            limit: 1
        })
        if (!topCombination || topCombination.length === 0) {
            return [];
        }
        const mostBorrowedCount = topCombination[0].get
            ? topCombination[0].get('mostBorrowedBook')
            : topCombination[0].mostBorrowedBook;
        const results = await BorrowingDB.findAll({
            attributes: [
                'userId',
                'bookId',
                [sequelize.fn('COUNT', sequelize.col('*')), 'mostBorrowedBook']
            ],
            group: ['userId', 'bookId'],
            having: Sequelize.literal(`COUNT(*) = ${mostBorrowedCount}`),
            include: [
                { model: UserDB, attributes: ['name'] },
                { model: BookDB, attributes: ['title'] }
            ]
        })
        return results;
    }
};
