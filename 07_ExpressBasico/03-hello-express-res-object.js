import express from "express";
import { resolve } from "path";

const app = express();

app.get("/", (req, res) => {
  res.end("<h1>Hola mundo desde Express.js</h1>");
  //res.send("<h1>Hola mundo desde Express.js</h1>");
  console.log(req);
  console.log(res);
});

app.get("/json", (req, res) => {
  const json = {
    name: "jorge",
    age: 21,
  };
  res.json(json);
});

app.get("/archivo", (req, res) => {
  res.sendFile(resolve("index.html"));
});

app.get("/plantilla", (req, res) => {
  //no funciona esta ruta porque hay que configurar las opciones de motor de plantilla
  res.render("plantilla");
});

app.get("/jonmircha", (req, res) => {
  //res.send("<h1>Redireccionando</h1>");
  res.redirect(301, "https://jonmircha.com");
});

app.listen(3000, () => {
  console.log("Iniciando Express desde http://localhost:3000");
});
