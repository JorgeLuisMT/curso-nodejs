import { createServer } from "http";

const server = createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("Home!!!😎");
  } else if (req.url === "/hola") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("Hola!!!😎");
  } else if (req.url === "/contacto") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("contacto!!!😎");
  } else {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end("Not Found!!!");
  }
});

server.listen(3000, "127.0.0.1", () => {
  console.log("Servidor web en ejecución en http://127.0.0.1:3000");
});
