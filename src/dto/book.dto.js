import { v4 as uuidv4 } from 'uuid';

export class CreateBookDTO {
  constructor({ title, author, publishedYear, totalCopies = 1 }) {
    if (!title || !author || !publishedYear) 
      throw new Error('Title and author and published Year are required');
    if (totalCopies <= 0) throw new Error("Total copies must be positive");

    

    this.id = uuidv4();                 
    this.title = title;
    this.author = author;
    this.publishedYear = publishedYear || null;
    this.totalCopies = totalCopies;
  }
}

export class UpdateBookDTO {
  constructor({ title, author, publishedYear, totalCopies }) {
    if (!title && !author && !publishedYear && totalCopies === undefined) {
      throw new Error('At least one field must be provided for update');
    }

    if (title) this.title = title;
    if (author) this.author = author;
    if (publishedYear) this.publishedYear = publishedYear;
    if (availableCopies !== undefined) this.availableCopies = availableCopies;
  }
}

export class BookResponseDTO {
  constructor(book) {
    this.id = book.id;
    this.title = book.title;
    this.author = book.author;
    this.publishedYear = book.publishedYear;
    this.availableCopies = book.availableCopies;
    this.createdAt = book.createdAt;
    this.updatedAt = book.updatedAt;
  }
}
