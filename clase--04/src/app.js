/** CLASE 4 - LOGGERS Y TESTING DE PERFORMANCE **/

//Temas de hoy: 
//1) Que son los loggers
//2) Winston
//3) Test de carga con Artillery
//4) Testeamos el proyecto de Login-JWT

//LOGGERS: es una herramienta que registra información importante sobre el funcionamiento de la aplicacion mientras esta se ejecuta. Esto es util para diagnosticar problemas, rastrear eventos y ver el rendimiento de la aplicación. 

//Los FLOGGERS tienen dos caracteristicas: 

//a) Podemos separar los mensajes en "niveles". 

//b) Podemos enviar esa información a otros recursos, como consola, bd, txt / json / log. 

//WINSTON: es una biblioteca popular de loggin para Node JS
//npm i winston

//LEVANTAMOS UN MINI SERVIDOR DE EJEMPLO: 

import express from "express";
const app = express(); 
const PUERTO = 8080;
import addLogger from "./utils/flogger.js"; 

//Middleware
app.use(addLogger); 

//Ruta para testear winston: 

app.get("/loggertest", (req, res) => {
    req.logger.http("Mensaje HTTP"); 
    req.logger.info("Mensaje de info"); 
    req.logger.warning("Guarda, algo esta pasando"); 
    req.logger.error("Cuidado, hombre radiactivo!"); 
    res.send("Estamos testeando");
})

//ARTILLERY: Es una herramienta que me permite simular multiples peticiones de informacion a mi servidor, con la idea de testear su funcionamiento. 

//OPERACION SIMPLE: 

app.get("/operacionsimple", (req, res) => {
    let suma = 0; 

    for( let i = 0; i < 1000000; i++ ) {
        suma += i; 
    }

    res.send({suma});
})

//OPERACION COMPLEJA: 

app.get("/operacioncompleja", (req, res) => {
    let suma = 0; 

    for( let i = 0; i < 5e8; i++ ) {
        suma += i; 
    }

    res.send({suma});
})



app.listen(PUERTO, () => console.log("Trabajando como nunca en el 8080")); 
