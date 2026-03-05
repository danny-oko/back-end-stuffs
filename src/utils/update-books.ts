import fs from "node:fs/promises";
import type { NewBook } from "./types.ts";
import { readBooks } from "./read-books.ts";

export const updateBooks = async (updateContext: NewBook) => {
  try {
    const data = await readBooks();
    console.log(data);

    const update = await fs.writeFile(
      "./db.json",
      JSON.stringify(updateContext),
    );
    console.log("Updated data:", update);
    return update;
  } catch (error) {
    console.log(error);
    return;
  }
};
