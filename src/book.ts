import type { BookId, Genre, LoanStatus } from './types';

export class Book {
  public readonly id: BookId;
  public readonly title: string;
  public readonly author: string;
  public readonly year: number;
  public readonly genre: Genre;

  private status: LoanStatus = "available";
  private borrowedBy: string | null = null;

  constructor(id: BookId, title: string, author: string, year: number, genre: Genre) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.genre = genre;
  }

  public getStatus(): LoanStatus {
    return this.status;
  }

  public markBorrowed(personName: string): void {
    if (this.status === "borrowed") {
      throw new Error(`Already borrowed by ${this.borrowedBy}`);
    }
    this.status = "borrowed";
    this.borrowedBy = personName;
  }

  public markReturned(): void {
    if (this.status === "available") {
      throw new Error("Already available");
    }
    this.status = "available";
    this.borrowedBy = null;
  }

  public getInfo(): string {
    if (this.status === "available") {
      return `${this.title} — ${this.author} (${this.year}), ${this.genre} [Available]`;
    } else {
      return `${this.title} — ${this.author} (${this.year}), ${this.genre} [Borrowed by ${this.borrowedBy}]`;
    }
  }
}
