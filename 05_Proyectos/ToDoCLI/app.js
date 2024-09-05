import { createInterface } from "readline";
import chalk from "chalk";

const tasks = [];

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

function addTask() {
  rl.question(chalk.bgMagentaBright("Escribe la tarea: "), (task) => {
    tasks.push({ task, complete: false });

    console.log(chalk.greenBright.bold("Tarea agregada"));

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
      let status = task.complete ? "✅" : "❌";

      if (task.complete) {
        console.log(chalk.bgGreen(`${i + 1} - ${task.task} ${status}`));
      } else {
        console.log(chalk.bgRed(`${i + 1} - ${task.task} ${status}`));
      }
    });
  }

  displayMenu();
  chooseOption();
}

function completeTask() {
  rl.question(chalk.bgMagenta("Número de tarea completada"), (index) => {
    index = parseInt(index) - 1;
    if (index >= 0 && index < tasks.length) {
      tasks[index].complete = true;
    } else {
      console.log(chalk.red("Número inválido"));
    }

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
        completeTask();
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

displayMenu();
chooseOption();
