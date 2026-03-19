// tests/typecheck.ts
// 🧪 Перевірки ТИПІВ (без рантайму). Запуск: `npm run typecheck`
// Якщо типи неправильні — TypeScript видасть помилку. Рядки з `@ts-expect-error`
// спеціально містять помилки: якщо помилки НЕ буде — tsc теж впаде.

import { Book } from "../src/book";
import { Library } from "../src/library";
import type { BookId, Genre, LoanStatus } from "../src/types";

/** Допоміжна утиліта: перевіряємо, що фактичний тип збігається з очікуваним */
function assertType<T>(_v: T) {}

// ---------- Book: конструктор та публічні поля ----------

// ✅ Правильне створення книги
const goodBook = new Book({
  id: "b1" as BookId,
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  year: 1937,
  genre: "fantasy" as Genre,
});

// ❌ Невалідні приклади — мають впасти на типах

// @ts-expect-error id має бути рядком (BookId)
new Book({ id: 123, title: "t", author: "a", year: 2000, genre: "fiction" });

// @ts-expect-error year має бути number
new Book({ id: "b2", title: "t", author: "a", year: "2000", genre: "fiction" });

// @ts-expect-error genre має бути одним із літералів Genre
new Book({ id: "b3", title: "t", author: "a", year: 2000, genre: "sci-fi" });

// ✅ Перевірка типів публічних властивостей
assertType<BookId>(goodBook.id);
assertType<string>(goodBook.title);
assertType<string>(goodBook.author);
assertType<number>(goodBook.year);
assertType<Genre>(goodBook.genre);

// ---------- Book: методи ----------

// ✅ getStatus повертає LoanStatus
assertType<LoanStatus>(goodBook.getStatus());

// ❌ markBorrowed має приймати тільки string
// @ts-expect-error
goodBook.markBorrowed(42);
goodBook.markBorrowed("Alice");

// ❌ markReturned не приймає аргументів
// @ts-expect-error
goodBook.markReturned("extra");

// ✅ getInfo повертає рядок
assertType<string>(goodBook.getInfo());

// ---------- Library: публічний API ----------

const lib = new Library();

// ❌ add приймає лише екземпляр Book
// @ts-expect-error
lib.add({});
lib.add(goodBook);

// ❌ borrow: перший аргумент — BookId, другий — string
// @ts-expect-error
lib.borrow(123, "Alice");
// @ts-expect-error
lib.borrow("b1", 123);
// ✅ правильний виклик
lib.borrow("b1", "Alice");

// ❌ return приймає тільки BookId
// @ts-expect-error
lib.return(456);
// ✅ правильний виклик
lib.return("b1");

// ✅ listAll / listAvailable повертають масиви Book
assertType<Book[]>(lib.listAll());
assertType<Book[]>(lib.listAvailable());

// ❌ remove приймає лише BookId
// @ts-expect-error
lib.remove(789);
// ✅ правильний виклик
lib.remove("b1");

// ---------- Перевірка, що в публічному API Book немає any ----------

type IsAny<T> = 0 extends 1 & T ? true : false;

type PublicBookApi =
  | (typeof goodBook)["id"]
  | (typeof goodBook)["title"]
  | (typeof goodBook)["author"]
  | (typeof goodBook)["year"]
  | (typeof goodBook)["genre"]
  | ReturnType<typeof goodBook.getStatus>
  | ReturnType<typeof goodBook.getInfo>;

// @ts-expect-error Публічний API Book не повинен містити any
type _NoAnyInBookApi = IsAny<PublicBookApi> extends true ? "has-any" : "ok";
