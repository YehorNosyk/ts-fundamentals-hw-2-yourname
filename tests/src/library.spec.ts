import type { BookId } from "./types";
import { Book } from "./book";

export class Library {
  private books: Map<BookId, Book> = new Map();

  private getBookOrThrow(id: BookId): Book {
    const book = this.books.get(id);
    if (!book) {
      throw new Error("Book not found");
    }
    return book;
  }

  public add(item: Book): void {
    if (this.books.has(item.id)) {
      throw new Error("Item already exists");
    }
    this.books.set(item.id, item);
  }

  public remove(id: BookId): void {
    const book = this.getBookOrThrow(id);

    if (book.getStatus() === "borrowed") {
      throw new Error("Cannot remove borrowed item");
    }

    this.books.delete(id);
  }

  public listAll(): Book[] {
    return Array.from(this.books.values());
  }

  public listAvailable(): Book[] {
    return this.listAll().filter((book) => book.getStatus() === "available");
  }

  public borrow(bookId: BookId, personName: string): void {
    const book = this.getBookOrThrow(bookId);
    book.markBorrowed(personName);
  }

  public return(bookId: BookId): void {
    const book = this.getBookOrThrow(bookId);
    book.markReturned();
  }
}
