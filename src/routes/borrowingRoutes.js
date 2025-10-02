import express from 'express';
import { borrowBook, returnBook, getMyBorrowedBooks } from '../controlles/borrowing.controller.js'
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/borrow', authenticate, borrowBook);
router.post('/return', authenticate, returnBook);
router.get('/user', authenticate, getMyBorrowedBooks);

export default router;