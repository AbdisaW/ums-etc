import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Book as FileBook } from '../models/file/bookModel.js';
import { BookDB } from '../models/sequelize/index.js';

const BOOKS_FILE = path.join('data', 'books.json');
const USE_DB = process.env.USE_DB === 'true';

// File helpers
async function readFileBooks() {
  try {
    const raw = await fs.readFile(BOOKS_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch {
    return [];
  }
}

async function writeFileBooks(books) {
  await fs.mkdir(path.dirname(BOOKS_FILE), { recursive: true });
  await fs.writeFile(BOOKS_FILE, JSON.stringify(books, null, 2), 'utf8');
}

// Repository
export const bookRepository = {
  async create(payload) {
    if (USE_DB) {
    const { title, author, publishedYear, totalCopies = 1 } = payload;

      const existingBook = await BookDB.findOne({ where: { title, author } });

      if (existingBook) {
        existingBook.totalCopies += totalCopies;
        existingBook.availableCopies += totalCopies;
        await existingBook.save();
        return existingBook;
      }

      return await BookDB.create({
        title,
        author,
        publishedYear,
        totalCopies,
        availableCopies: totalCopies,
      });
    }

    const books = await readFileBooks();
    const newBook = new FileBook({ id: uuidv4(), ...payload });
    books.push(newBook);
    await writeFileBooks(books);
    return newBook;
  },

  async findById(id) {
    if (USE_DB) return await BookDB.findByPk(id);
    const books = await readFileBooks();
    return books.find(b => b.id === id);
  },

  async findAll() {
    if (USE_DB) return await BookDB.findAll();
    return await readFileBooks();
  },

  async update(id, updates) {
    if (USE_DB) {
      const book = await BookDB.findByPk(id);
      if (!book) return null;
      return await book.update(updates);
    }

    const books = await readFileBooks();
    const idx = books.findIndex(b => b.id === id);
    if (idx === -1) return null;
    books[idx] = { ...books[idx], ...updates };
    await writeFileBooks(books);
    return books[idx];
  },

  async delete(id) {
    if (USE_DB) {
      const book = await BookDB.findByPk(id);
      if (!book) return null;
      await book.destroy();
      return book;
    }

    const books = await readFileBooks();
    const idx = books.findIndex(b => b.id === id);
    if (idx === -1) return null;
    const [deleted] = books.splice(idx, 1);
    await writeFileBooks(books);
    return deleted;
  },

  async search(keyword) {
    if (USE_DB) {
      const { Op } = (await import('sequelize')).default;
      return await BookDB.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${keyword}%` } },
            { author: { [Op.like]: `%${keyword}%` } }
          ]
        }
      });
    }

    const books = await readFileBooks();
    return books.filter(
      b =>
        b.title.toLowerCase().includes(keyword.toLowerCase()) ||
        b.author.toLowerCase().includes(keyword.toLowerCase())
    );
  }
};
