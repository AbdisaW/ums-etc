import { borrowingService } from "../services/borrowing.service.js";

export async function borrowBook(req, res) {
  try {
    const userId = req.user.id;
    const { bookId } = req.body;
    const borrow = await borrowingService.borrowBook({ userId, bookId });
    res.status(201).json({ message: "Book borrowed successfully", borrow });

  } catch (err) {
    res.status(400).json({ error: err.message });

  }

}

export async function returnBook(req, res) {

  try {
    const userId = req.user.id;
    const { bookId } = req.body;

    const returned = await borrowingService.returnBook({ userId, bookId });
    res.json({ message: 'Book returned successfully', returned });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

}

export async function getMyBorrowedBooks(req, res) {
  try {
    const userId = req.user.id;
    const status = req.query.status || "all";
    const whereClause = { userId };

    if (status === "notReturned") {
      whereClause.returnDate = null;
    }

    let borrowedBooks = await borrowingService.getUserBorrowedBooks(whereClause);

    if (status === "returned") {
      borrowedBooks = borrowedBooks.filter(b => b.returnDate !== null);
    }

    let response = { 
      message: "Borrowed books fetched successfully",
      borrowedBooks
    };

    if (status === "all") {
      response.notReturnedCount = borrowedBooks.filter(b => b.returnDate === null).length;
      response.returnedCount = borrowedBooks.filter(b => b.returnDate !== null).length;
      response.total = borrowedBooks.length;
    } else if (status === "returned") {
      response.returnedCount = borrowedBooks.length; // all are returned
    } else if (status === "notReturned") {
      response.notReturnedCount = borrowedBooks.length; // all are not returned
    }

    res.json(response);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

