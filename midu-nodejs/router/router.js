const http = require("node:http");

const dittoJSON = require("../pokemon/ditto.json");

const serverRes = (req, res) => {
  const { method, url } = req;

  switch (method) {
    case "GET":
      switch (url) {
        case "/pokemon/ditto":
          res.setHeader("Content-type", "application/json; charset=utf-8");
          return res.end(JSON.stringify(dittoJSON));

        default:
          res.setHeader("Content-type", "text/html; charset=utf-8");
          return res.end("<h1>Error 404</h1>");
      }

    case "POST":
      switch (url) {
        case "/pokemon": {
          let body = "";

          req.on("data", (chunk) => {
            body += chunk.toString();
          });

          req.on("end", () => {
            const data = JSON.parse(body);

            res.writeHead(201, {
              "Content-Type": "application/json; charset=utf-8",
            });
            res.end(JSON.stringify(data));
          });

          break;
        }

        default:
          res.statusCode = 404;
          res.setHeader("Content-type", "text/html; charset=utf-8");
          return res.end("<h1>Error 404</h1>");
      }
  }
};

const server = http.createServer(serverRes);

server.listen(3001, () =>
  console.log(`El servidor levantado en: http://localhost:3001`)
);
