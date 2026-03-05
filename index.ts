import type { Request, Response } from "express";
import express from "express";

const app = express();
const port = 8080;

app.use(express.json());

// app.get("/student/:name", (req: Request, res: Response) => {
//   const id = req.params;
//   console.log(`Hello ${id.name}`);

//   res.send("Hello");
// });

// app.get("/filter", (req: Request, res: Response) => {
//   const query = req.query;
//   console.log(query);
//   res.send("oko");
// });

// app.get("/users", (req: Request, res: Response) => {
//   const header = req.headers;

//   const token = header.authorization;
//   const agent = header["user-agent"];
//   console.log("agent", agent);
//   console.log(token);

//   res.send("hello");
// });

// app.all("/", (req: Request, res: Response) => {
//   const path = req.path;
//   const method = req.method;

//   console.log(path);
//   console.log(method);

//   res.send("ok");
// });

app.get("/library/:category/:bookId", (req: Request, res: Response) => {
  const { category } = req.params;
  const { bookId } = req.params;
  const { lan } = req.query;
  const headers = req.headers;

  const path = req.path;

  const token: any = headers.authorization?.split(" ");
  const finalToken = token[1];

  let authorized = true;

  if (!finalToken || !authorized) {
    authorized = false;

    res.status(403).send("unauthorized!");
    return;
  }

  res.status(200).json({
    status: "Амжилттай",
    request_info: {
      method: "GET",
      path: path,
    },
    extracted_data: {
      category: category,
      id: bookId,
      language: lan,
      isAuthorized: authorized,
    },
  });
});

app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
