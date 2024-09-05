import express from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import taskControllers from "./controllers/taskControllers.js";
import errorControllers from "./controllers/errorControllers.js";

//const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();
const port = 3000;

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.set("views", path.join(process.cwd(), "views"));

//esta linea es del video pero no me funcionó
//app.set("views", path.join(__dirname, "views"));

app.set("view engine", "pug");

app.use(express.static(path.join(process.cwd(), "public")));

//app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", taskControllers.getAllTasks);
app.get("/add", taskControllers.getAddTaskForm);
app.post("/add", taskControllers.addTask);
app.get("/edit/:id", taskControllers.getEditTasks);
app.post("/edit/:id", taskControllers.editTask);
app.get("/complete/:id", taskControllers.completeTask);
app.get("/uncomplete/:id", taskControllers.uncompleteTask);
app.get("/delete/:id", taskControllers.deleteTask);

app.use(errorControllers.error404);

app.listen(port, () => {
  console.log(`La aplicación está funcionando en http://localhost:${port}`);
});
