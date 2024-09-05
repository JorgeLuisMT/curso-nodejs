import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.end("<h1>Hola mundo desde Express.js</h1>");
});

app.get("/user/:id-:name-:age", (req, res) => {
  res.set({ "content-type": "text/html; charset=utf-8" });
  res.end(
    `<h1>Hola ${req.params.name} tu id es: ${req.params.id} y tu edad es: ${req.params.age}</h1>`
  );
});

app.get("/search", (req, res) => {
  res.set({ "content-type": "text/html; charset=utf-8" });
  res.end(
    `<h1>Hola ${req.query.name} tu id es: ${req.query.id} y tu edad es: ${req.query.age}</h1>`
  );
});

app.listen(3000, () => {
  console.log("Iniciando Express desde http://localhost:3000");
});
