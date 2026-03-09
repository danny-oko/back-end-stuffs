import fs from "node:fs/promises";
import type { Book, NewBook } from "./types.ts";
import { readBooks } from "./read-books.ts";

export const updateBooks = async (updateContext: any) => {
  try {
    const contextJSON = updateContext;
    console.log(contextJSON.id);

    const existingData: any = await readBooks();
    const obj = JSON.parse(existingData);

    const finalData = obj.map((book: any) => {
      if (String(book.id) === String(contextJSON.id)) {
        book = contextJSON;
        console.log(book);
      } else {
        return "Failed";
      }
    });

    console.log(finalData);

    await fs.writeFile("./db.json", finalData);
  } catch (error) {
    console.log(error);
    return;
  }
};
