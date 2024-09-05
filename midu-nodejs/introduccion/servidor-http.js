const http = require("node:http");

const port = process.env.PORT ?? 3001;

const server = http.createServer((req, res) => {
  console.log("server levantado", req.url);
  res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
  res.end("<h1>Hola bienvenido a mi página</h1>");
});

server.listen(port, () => console.log(`http://localhost:${port}`));
