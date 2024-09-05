import { get } from "https";

const urlSite = {
  hostname: "jonmircha.com",
  port: 443,
  path: "/cursos",
};

get(urlSite, (res) => {
  console.log(
    `El sitio ${urlSite.hostname} ha respondido. Código: ${res.statusCode}. Mensaje: ${res.statusMessage}`
  );
}).on("Error", (err) => {
  console.error(
    `El sitio ${urlSite.hostname} ha respondido. Código: ${err.code}. Mensaje: ${err.message}`
  );
});
