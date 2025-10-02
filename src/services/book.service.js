import { CreateBookDTO, BookResponseDTO,UpdateBookDTO } from '../dto/book.dto.js';
import { bookRepository } from '../repositories/book.repository.js';

export const bookService = {
  async create(data) {
    const dto = new CreateBookDTO(data);
    const book = await bookRepository.create(dto);
    return new BookResponseDTO(book);
  },

  async update(id, data) {
    const dto = new UpdateBookDTO(data);
    const updatedBook = await bookRepository.update(id, dto);
    return new BookResponseDTO(updatedBook);
  },

  async getAll() {
    const books = await bookRepository.findAll();
    return books.map(b => new BookResponseDTO(b));
  },

  async getById(id) {
    const book = await bookRepository.findById(id);
    return new BookResponseDTO(book);
  },

  async delete(id) {
    const deletedBook = await bookRepository.delete(id);
    return new BookResponseDTO(deletedBook);
  }
};
