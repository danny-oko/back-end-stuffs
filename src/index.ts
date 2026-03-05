import type { Request, Response } from "express";
import express from "express";

import type { Book, NewBook } from "./utils/types.ts";

import { readBooks } from "./utils/read-books.ts";
import { writeBooks } from "./utils/write-books.ts";
import { updateBooks } from "./utils/update-books.ts";
import { title } from "node:process";
import { captureRejectionSymbol } from "node:events";
import { write } from "node:fs";

const app = express();
const port = 8080;

app.use(express.json());

// get books
app.get("/books", async (req: Request, res: Response) => {
  const books = await readBooks();

  if (!books) {
    return res.status(500).json({ message: "Failed", books: [] });
  }

  res.status(200).json({ message: "Success!", books: books });
});

app.get("/books/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const books: Book[] = await readBooks();

  const bookById = books.find((book) => String(book.id) === id);

  if (!bookById) {
    return res.status(500).json({ message: "book not found" });
  }

  res.status(200).json({ status: "Success!", book_found: bookById });
});

app.post("/books", async (req: Request, res: Response) => {
  const { title, author } = req.body;
  const books = await readBooks();
  const newBookId = Date.now();

  console.log(books);

  const newBook: NewBook = {
    id: newBookId,
    title: title,
    author: author,
  };

  if (!books || !newBook) {
    return res
      .status(500)
      .json({ status: "Failed to create new book :( ", book: [] });
  }

  const createNewBook = await writeBooks(newBook);

  res.status(201).json({
    status: "Success!",
    new_book: createNewBook,
    books: books,
  });
});

app.put("/books/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author } = req.body;

  const books = await readBooks();
  let findBook = books.filter((book: Book) => String(book.id) === id);
  // console.log("book found:", findBook);

  let updateBook: Book = findBook.map((data: Book) => {
    if (String(data.id) === id) {
      const updateData = {
        id: data.id,
        title: title,
        author: author,
      };
      // console.log("updating data:", updateData);

      data = updateData;
      // console.log("current data after update:", data);
      return data;
    } else {
      return [];
    }
  });

  // console.log("update:", updateBook);

  const finalForm = await updateBooks(updateBook);

  console.log("Final form:", finalForm);

  res.status(200).json({
    status: "Success!",
    // updated_book_data: updateBook,
    // books: books,
  });
});

app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
