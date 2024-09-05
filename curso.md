# Primeros pasos

1. Crear el archivo app.js
2. Desde la terminal ir a la carpeta donde se encuentra app.js
3. Ejecutar node app.js

Proccess es como el document del dom.  
Global es como el windows.

## Modules

Node usa modulos que se pueden importar haciendo uso de require() o simplemente  
haciendo uso del import de js, los ejemplos estan en la carpeta 02_Modules
si se usa ESModules (import, export) se debe agregar en el package.json "type":"module" o cambiando la extensión del archivo a ".mjs"

## package.json

Para inicializar el package.json se usa el comando npm init en la carpeta donde desea colocar el archivo.

## NPM, node_modules y .gitignore

Npm es el manejador de paquetes de Node, con el se pueden descargar dependencias.
En esta carpeta se almacena el codigo fuente de las dependencias instaladas pero no debe subirse a la hora  
de desplegar a producción el proyecto, con el package.json es suficiente ya que cuando las personas descarguen el proyecto el json servirá para descargar automaticamente todas las dependencias y evitar incompatibilidades con usuarios de otros sistemas operativos.  
Para que se ignore la carpeta node_modules a la hora de subirse el proyecto simplemente se usa un archivo .gitignore.

## package-lock.json

Sirve para llevar un registro de las dependencias instaladas así como evitar incompatibilidades con otros sistemas operativos.

## NPX

El comando npx es una herramienta incluida en NPM a partir de la versión 5.2.0. Su función principal es permitir la ejecución de paquetes Node.js temporales o instalados globalmente sin la necesidad de instalarlos en tu sistema o proyecto de manera permanente.

## nodemon

Es para que la consola se actualice con los cambios realizados desde el codigo.
