import { borrowingRepository } from '../repositories/borrowing.repository.js';
import { BorrowBookDTO, ReturnBookDTO } from '../dto/borrowing.dto.js';

export const borrowingService = {
  async borrowBook(data) {
    const dto = new BorrowBookDTO(data);
    return await borrowingRepository.create(dto);
  },

  async returnBook(data) {
    const dto = new ReturnBookDTO(data);
    return await borrowingRepository.returnBook(dto);
  },

  async getUserBorrowedBooks(whereClause) {
    return await borrowingRepository.getUserBorrowedBooks(whereClause);
  }
};