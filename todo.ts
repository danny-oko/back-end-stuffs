import type { Request, Response } from "express";
import express from "express";

const app = express();
const port = 8080;

app.use(express.json());

// home page
// todo array
// add task
// is completed
// delete task
// delete completed

let tasks = [
  {
    id: 1,
    title: "Task 1 ",
    isCompleted: false,
  },
];

// Home
app.get("/tasks", (req: Request, res: Response) => {
  res.send({
    message: "Hello! Danny",
    "your tasks:": tasks,
  });
});

// create new tasks
app.post("/tasks", (req: Request, res: Response) => {
  const { title, isCompleted } = req.body;

  const newTaskId = tasks.length + 1;
  const updatedTask = {
    id: newTaskId,
    title: title,
    isCompleted: isCompleted,
  };
  tasks.push(updatedTask);

  console.log(tasks);
  res.send(tasks);
});

// update tasks data
app.put("/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, isCompleted } = req.body;

  const udpateTask = tasks.map((task) => {
    if (id === String(task.id)) {
      const updatedData = {
        id: task.id,
        title: title,
        isCompleted: isCompleted,
      };
      task = updatedData;
      console.log(task);
      return task;
    } else {
      return;
    }
  });

  res.send(udpateTask);
});

app.delete("/tasks/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const foundedTask = tasks.find((task) => id === String(task.id));
  if (!foundedTask) {
    res.send("task not found");
    return;
  }

  const filteredData = tasks.filter((task) => id !== String(task.id));
  tasks = filteredData;

  res.send({
    message: "task deleted successfully",
    tasks,
  });
});

app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
