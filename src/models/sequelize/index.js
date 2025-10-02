// src/models/sequelize/index.js
import dotenv from 'dotenv';
import User from './user.model.js'; 
import Book from './book.model.js';
import Borrowing from './borrowing.model.js';
import sequelize from '../../../config/database.js';

dotenv.config();

// Initialize models
export const UserDB = User(sequelize);
export const BookDB = Book(sequelize);
export const BorrowingDB = Borrowing(sequelize);

// Associations (✅ use the initialized models)
UserDB.hasMany(BorrowingDB, { foreignKey: "userId" });
BorrowingDB.belongsTo(UserDB, { foreignKey: "userId" });

BookDB.hasMany(BorrowingDB, { foreignKey: "bookId" });
BorrowingDB.belongsTo(BookDB, { foreignKey: "bookId" });

export default sequelize;
