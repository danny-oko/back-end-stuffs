import fs from "node:fs/promises";
import type { NewBook } from "./types.ts";
import { readBooks } from "./read-books.ts";

export const writeBooks = async (updateContext: NewBook) => {
  try {
    const data = await readBooks();
    // console.log(1, data);

    data.push(updateContext);
    // console.log(2, data);

    const updatedData = await fs.writeFile("./db.json", JSON.parse(data));

    return updatedData;
  } catch (error) {
    console.log(error);
    return;
  }
};
