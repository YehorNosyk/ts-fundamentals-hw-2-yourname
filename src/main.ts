import { Book } from './book';
import { Library } from './library';

const library = new Library();

// Створюємо книги
const book1 = new Book("b1", "1984", "George Orwell", 1949, "dystopian");
const book2 = new Book("b2", "Sapiens", "Yuval Noah Harari", 2011, "science");
const book3 = new Book("b3", "Harry Potter", "J.K. Rowling", 1997, "fantasy");

// Додаємо книги в бібліотеку
library.add(book1);
library.add(book2);
library.add(book3);

// Виводимо всі книги
library.listAll().forEach(b => console.log(b.getInfo()));

// Позичаємо книгу
library.borrow("b1", "Alice");
console.log(book1.getInfo());

// Повертаємо книгу
library.return("b1");
console.log(book1.getInfo());

// Видаляємо книгу
library.remove("b2");
library.listAll().forEach(b => console.log(b.getInfo()));
