import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import taskControllers from "./controllers/taskControllers.js";
import errorControllers from "./controllers/errorControllers.js";

const app = express();
const port = 3000;

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/tasks", taskControllers.getAllTasks);
app.post("/tasks", taskControllers.addTask);
app.get("/tasks/:id", taskControllers.getTask);
app.put("/tasks/:id", taskControllers.editTask);
app.put("/tasks/complete/:id", taskControllers.completeTask);
app.put("/tasks/uncomplete/:id", taskControllers.uncompleteTask);
app.delete("/tasks/:id", taskControllers.deleteTask);

app.use(errorControllers.error404);

app.listen(port, () => {
  console.log(`La aplicación está funcionando en http://localhost:${port}`);
});
