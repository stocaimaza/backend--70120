//MOCK: Es una imitacion de un dato real. Es una simulación que generamos en el entorno de desarrollopara no manipular datos reales y para tener herramientas de trabajo de forma rápida. 

//FAKER-JS: 
//Instalamos: npm i @faker-js/faker

import express from "express";
const app = express(); 
const PUERTO = 8080; 
import usuariosRouter from "./routes/usuarios.router.js"; 

app.use("/api/users", usuariosRouter); 

app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto 8080");
})
