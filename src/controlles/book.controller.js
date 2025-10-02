import { bookService } from '../services/book.service.js';

export async function createBook(req, res) {
  try {
    const book = await bookService.create(req.body);
    res.status(201).json({
      message: req.__('messages.bookCreated'),
      book
    });
  } catch (error) {
    res.status(400).json({
      error: req.__('errors.serverError', { message: error.message })
    });
  }
}

export async function getBooks(req, res) {
  try {
    const { q } = req.query;
    const books = q ? await bookService.search(q) : await bookService.getAll();
    res.json({ books });
  } catch (error) {
    res.status(500).json({
      error: req.__('errors.serverError', { message: error.message })
    });
  }
}

export async function getBookById(req, res) {
  try {
    const book = await bookService.getById(req.params.id);
    res.json({ book });
  } catch (error) {
    res.status(404).json({
      error: req.__('errors.notFound', { message: error.message })
    });
  }
}

export async function updateBook(req, res) {
  try {
    const book = await bookService.update(req.params.id, req.body);
    res.json({
      message: req.__('messages.bookUpdated'),
      book
    });
  } catch (error) {
    res.status(400).json({
      error: req.__('errors.serverError', { message: error.message })
    });
  }
}

export async function deleteBook(req, res) {
  try {
    const book = await bookService.delete(req.params.id);
    res.json({
      message: req.__('messages.bookDeleted'),
      book
    });
  } catch (error) {
    res.status(404).json({
      error: req.__('errors.notFound', { message: error.message })
    });
  }
}
