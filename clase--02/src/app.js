/** CLASE 02 - OPTIMIZACIÓN **/

//1) Compresión. 
//2) Manejo personalizado de errores. 

import express from "express"; 
import compression from "express-compression";
import usuariosRouter from "./routes/usuarios.router.js";
import manejadorError from "./middleware/error.js";
const app = express(); 
const PUERTO = 8080; 

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(compression({
    brotli: {
        enabled: true, 
        zlib: {}
    }
})); 

//Rutas 
// app.get("/", (req, res) => {
//     let string = "Hola comisión, somos programadores y no sabemos arreglar impresoras"; 

//     for(let i = 0; i < 5e4; i++) {
//         string += "Hola comisión, somos programadores y no sabemos arreglar impresoras"; 
//     }

//     res.send(string); 
// })

app.use("/usuarios", usuariosRouter);
app.use(manejadorError);

app.listen(PUERTO, () => {
    console.log(`Esuchando en el puerto de Mar del Plata con la hinchada de Aldosivi que estaba festejando`); 
})

//Sin compresión: 3.4mb
//Con compresion con GZIP: 11.9 kb
//Con brotli: 357 bytes. 
