import { readFileSync, writeFileSync } from "fs";
import { createInterface } from "readline";
import chalk from "chalk";

const tasks = [];

const DB_FILE = "tasks.txt";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function displayMenu() {
  console.log(chalk.blueBright("\n ToDo List App!!!"));
  console.log("1. Agregar tarea");
  console.log("2. Listar tarea");
  console.log("3. Completar tarea");
  console.log("4. Salir \n");
}

function loadTasks() {
  try {
    const data = readFileSync(DB_FILE, "utf-8");
    let lines = data.split("\n");
    tasks.length = 0; //por si acaso
    lines.forEach((line) => {
      if (line.trim() !== "") {
        const [task, completed] = line.split("|");
        tasks.push({ task, completed: completed === "true" });
      }
    });
    console.log(chalk.green("Tareas cargadas"));
  } catch (error) {
    console.log(chalk.red("No hay tareas"));
  }
}

function saveTask() {
  const data = tasks.map((task) => `${task.task}|${task.completed}`).join("\n");
  writeFileSync(DB_FILE, data, "utf-8");
}

function addTask() {
  rl.question(chalk.bgMagentaBright("Escribe la tarea: "), (task) => {
    tasks.push({ task, completed: false });

    console.log(chalk.greenBright.bold("Tarea agregada"));

    saveTask();
    displayMenu();
    chooseOption();
  });
}

function listTasks() {
  console.log(chalk.blueBright.bold("\n Tareas por hacer \n"));

  if (tasks.length === 0) {
    console.log(chalk.bgGreen("No hay tareas por hacer"));
  } else {
    tasks.forEach((task, i) => {
      let status = task.completed ? "✅" : "❌";

      if (task.completed) {
        console.log(chalk.bgGreen(`${i + 1} - ${task.task} ${status}`));
      } else {
        console.log(chalk.bgRed(`${i + 1} - ${task.task} ${status}`));
      }
    });
  }

  displayMenu();
  chooseOption();
}

function completedTask() {
  rl.question(chalk.bgMagenta("Número de tarea completada"), (index) => {
    index = parseInt(index) - 1;
    if (index >= 0 && index < tasks.length) {
      tasks[index].completed = true;
    } else {
      console.log(chalk.red("Número inválido"));
    }

    saveTask();
    displayMenu();
    chooseOption();
  });
}

function chooseOption() {
  rl.question("Elige una opción: ", (chose) => {
    switch (chose) {
      case "1":
        addTask();
        break;
      case "2":
        listTasks();
        break;
      case "3":
        completedTask();
        break;
      case "4":
        console.log(chalk.blue("Salir"));
        rl.close();
        break;
      default:
        console.log(chalk.red("Opción Inválida \n"));
        displayMenu();
        chooseOption();
        break;
    }
  });
}

loadTasks();
displayMenu();
chooseOption();
