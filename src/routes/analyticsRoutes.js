import express from 'express';
import { analyticsService } from '../services/analytics.service.js';
const router = express.Router();

router.get('/most-borrowed', async (req, res) => {
  const book = await analyticsService.mostBorrowedBooks();
  res.json({ mostBorrowedBooks: book });
});
router.get('/least-borrowed', async (req, res) => {
  const book = await analyticsService.leastBorrowedBooks();
  res.json({ leastBorrowedBooks: book });
});
router.get('/most-user-borrowed', async (req, res) => {
  const user = await analyticsService.mostBorrowedUsers();
  res.json({ mostBorrowedUsers: user });
});
router.get('/most_user_book', async (req, res) => {
  const userandBook = await analyticsService.mostUserAndBook();
  res.json({ mostUserAndBook: userandBook });
});

export default router;