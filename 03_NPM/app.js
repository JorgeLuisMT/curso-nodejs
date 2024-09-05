//Es el mismo archivo que en la carpeta Modules solo que aquí se agrega el type en el json y así no cambiar la extensión js

import { calculadora } from "./calculadora.js";

let c = console.log;

c(calculadora.sumar(5, 5));
c(calculadora.restar(5, 5));
c(calculadora.multiplicar(5, 5));
c(calculadora.dividir(5, 5));
c(calculadora.modulo(5, 5));
