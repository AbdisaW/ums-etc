
export class BorrowBookDTO{
    constructor({userId, bookId}){
        this.userId = userId;
        this.bookId = bookId
    }
}

export class ReturnBookDTO{
    constructor({userId, bookId}){
        this.userId = userId;
        this.bookId = bookId
    }
}