const { readFile } = require("node:fs/promises");

(async () => {
  console.log("Leyendo el primer archivo");
  const text = await readFile("./1.txt", "utf-8");
  console.log("Primer texto", text);

  console.log("-------- Hacere cosas mientras");

  const secondText = await readFile("./2.txt", "utf-8");
  console.log("segundo texto", secondText);
})();

console.log("hola soy un entrometido");
