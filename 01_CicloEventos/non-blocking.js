const fs = require("fs");

console.log("inicio del programa");

fs.readFile("archivo.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

console.log("fin del programa");
