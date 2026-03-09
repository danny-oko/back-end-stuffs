import type { Request, Response } from "express";
import express from "express";

import type { Book, NewBook } from "./utils/types.ts";

import { readBooks } from "./utils/read-books.ts";
import { writeBooks } from "./utils/write-books.ts";
import { updateBooks } from "./utils/update-books.ts";

const app = express();
const port = 8080;

app.use(express.json());

app.post("/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  res.send("ok");
});

// get books
app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
