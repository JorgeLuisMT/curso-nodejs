import { createServer } from "http";
import { get } from "https";

const host = "localhost",
  port = 3000,
  options = {
    hostname: "jonmircha.cokjnk",
    port: 443,
    path: "/cursos",
  };

let httpHTML = "";

const httpClient = (res) => {
  console.log(
    `El servidor ${options.hostname} ha respondido. Code: ${res.statusCode}. Mensaje: ${res.statusMessage}`
  );

  res.on("data", (data) => {
    httpHTML += data;
    // console.log(data.toString());
  });
};

const httpError = (err) => {
  console.log(
    `El servidor ${options.hostname} NO ha respondido. Code: ${err.code}. Mensaje: ${err.message}`
  );
};

const webServer = (req, res) => {
  res.statusCode = 200;
  res.setHeader = ("Content-Type", "text/html; charset=utf-8");
  res.end(httpHTML);
};

createServer(webServer).listen(port, host, () => {
  console.log(`Servidor corriendo en http://${host}:${port}`);
});

get(options, httpClient).on("error", httpError);
