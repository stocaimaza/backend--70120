/** REPASITO DE DOCKER **/

import express from "express";
const app = express(); 
const PUERTO = 8080; 

//Rutas

app.get("/", (req, res) => {
    res.send("HOLA MUNDO"); 
})

app.listen(PUERTO, () => console.log("Trabajando en el puerto 8080"));