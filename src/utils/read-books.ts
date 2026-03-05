import fs from "node:fs/promises";

export const readBooks = async () => {
  try {
    const data = await fs.readFile("./db.json", { encoding: "utf-8" });
    const obj = JSON.parse(data);

    return obj;
  } catch (error) {
    console.log(error);
  }
};

// export const writeFile = async () => {
//   try {
//     const updatedData = await fs.writeFile("./db.json", {encoding: "utf-8"});
//   } catch (error) {}
// };
