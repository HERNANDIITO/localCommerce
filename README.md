# localCommerce
### Sistemas Multimedia - Práctica 2

## Introducción

Este repositorio contiene tanto el back end como el front end y, por lo tanto, requiere de cierto material para funcionar.

## Set up

Esos son todos los prerrequisitos para ejecutar el proyecto, por lo tanto procedemos con el Set up del mismo:

### Prerrequisitos

* Node.js: https://nodejs.org/en/download/current
* MongoDB: https://www.mongodb.com/try/download/enterprise
  * Aquí deberás introducir tus datos en la derecha, como profesión poned Student y en empresa University of Alicante
* MongoDBTools: https://www.mongodb.com/try/download/database-tools
* MongoGUI: https://www.mongodb.com/try/download/compass

### Set up de BackEnd

#### Set up DataBase
* Abre la aplicación: MongoDBCompass que hemos descargado en los prerrequisitos.
* Haz click en `New Connection` arriba a la izquierda
* Haz cick en `Save and connect`
  * Deberías de poder elegir el nombre pero llámala `localCommerce` por lo que pueda pasar

#### Set up API
* Abrir una consola en localCommerce-api
* Ejecutar `npm i`
* Ejecutar `npm run dev`

Ahora deberías de ver por consola esto:


>[nodemon] restarting due to changes...
>[nodemon] starting `node src/index.js`
>(node:14928) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
>(Use `node --trace-deprecation ...` to show where the warning was created)
>
>App is running on port 3000
>Connected to database

Si es así, todo ha funcionado correctamente.

### Set up de FrontEnd

* Abrir una consola en localCommerce
* Ejecutar `npm i`
* Ejecutar `ng serve`

Ahora deberías de ver por consola esto:

>√ Browser application bundle generation complete.
>
>Initial Chunk Files | Names   | Raw Size
>main.js             | main    |  8.74 kB |
>runtime.js          | runtime |  6.52 kB |
>
>3 unchanged chunks
>
>Build at: 2023-11-05T09:45:23.189Z - Hash: 6814682a9ee50109 - Time: 8518ms
>
>√ Compiled successfully.

### Test

Ve a http://localhost:4200/ y chequea la consola: deberás de ver un mensaje que dice:
> data: {}

## Run

Estos son los pasos que deberás seguir cada vez que quieras ejecutar el proyecto:

1) Abre MongoGUICompass y conéctate.
2) Abre una consola en localCommerce-api y escribe `npm run dev`
3) Desde localCommerce escribe: `ng serve`

Y ahora deberías de tener el proyecto funcionando en http://localhost:4200/
