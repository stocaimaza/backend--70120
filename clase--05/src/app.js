/** CLUSTER Y ESCALABILIDAD **/

//ESCALABILIDAD: se refiere a la capacidad de un sistema, proceso o recurso para manejar un aumento en la carga de trabajo. 

//ESCALABILIDAD VERTICAL
//ESCALABILIDAD HORIZONTAL

//MI SERVIDOR: 

import express from "express";
import cluster from "cluster";
import { cpus } from "os";
const numeroProcesos = cpus().length; 
//console.log(numeroProcesos); // 8


//console.log(process.pid);
//Recuerden que con esta propiedad puedo obtener el identificador del proceso. 

//Nota: al proceso principal lo llamaremos Primary Process (anteriormente Master), mientras que a las multiples instancias que se generaran se llamaran Workers. 

//console.log(cluster.isPrimary); //Me retorna true si es un proceso principal. 

if (cluster.isPrimary) {
    console.log("Proceso primario");

    for( let i = 0; i < numeroProcesos; i++ ){
        cluster.fork();
    }

} else {
    console.log(`Soy un proceso worker y tengo el siguiente id: ${process.pid} `)

    const app = express(); 

    //Rutas: 

    app.get("/operacionsimple", (req, res) => {
        let suma = 0; 

        for(let i = 0 ; i < 1000000; i++) {
            suma += i; 
        }

        res.send({suma});
    })

    app.get("/operacioncompleja", (req, res) => {
        let suma = 0; 
        for (let i = 0; i < 5e8; i++) {
            suma += i;
        }
        res.send({suma}); 
    })

    app.listen(8080, console.log("Escuchando en FM 8080"));
}
