import { writeFileSync } from "fs";
import { createServer } from "http";
import { get } from "https";
import { createInterface } from "readline";

const host = "localhost",
  port = 3000,
  options = {
    hostname: "jonmircha.com",
    port: 443,
    path: "/cursos",
  };

let httpHTML = "";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const httpClient = (res) => {
  console.log(
    `El servidor ${options.hostname} ha respondido. Code: ${res.statusCode}. Mensaje: ${res.statusMessage}`
  );

  res.on("data", (data) => {
    httpHTML += data;
    // console.log(data.toString());
    writeFileSync(`archivo.html`, httpHTML, "utf-8");
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

function questions() {
  rl.question("Hostname: ", (hostname) => {
    options.hostname = hostname;
    rl.question("Port: ", (puerto) => {
      options.port = parseInt(puerto);
      rl.question("Path: ", (path) => {
        options.path = path;
        createServer(webServer).listen(port, host, () => {
          console.log(`Servidor corriendo en http://${host}:${port}`);
        });

        get(options, httpClient).on("error", httpError);
      });
    });
  });
}
questions();
