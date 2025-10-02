import { v4 as uuidv4 } from 'uuid';

export class Book {
    constructor({ id = uuidv4(), title, author, publishedYear, createdAt = new Date().toISOString() }) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.publishedYear = publishedYear;
        this.createdAt = createdAt;
    }
}
