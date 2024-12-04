//Instalamos SUPERTEST: npm i supertest -D

//Importamos: 
import supertest from "supertest";

//Importamos chai: 
import { expect } from "chai";

//Ahora vamos a crear una constante "requester", quien se encarga de hacer las peticiones al servidor. 

const requester = supertest("http://localhost:8080"); 

//Ahora vamos a trabajar con dos "describe". Uno hace referencia a la aplicacion "Adoptame", y el otro para cada entidad interna. 

describe("Testing de la App Web Adoptame", () => {
    describe("Testing de Mascotas", () => {
        it("El Endpoint POST /api/pets debe crear una mascota correctamente", async () => {

            //Voy a crear un mock de una mascotita: 
            const pichichoMock = {
                name: "Firulais", 
                specie: "Pichicho", 
                birthDate: "2021-03-10"
            }

            const {statusCode, ok, _body} = await requester.post("/api/pets").send(pichichoMock); 

            //Mostramos por consola: 
            console.log(statusCode);
            console.log(ok);
            console.log(_body); 

            //Y ahora evaluamos, si el payload que me envian tiene el _id: 
            expect(_body.payload).to.have.property("_id"); 

        })

        //Nuevos test: 
        it("Al crear una mascota solo con los datos elementales, la mascota creada debe tener la propiedad adopted con el valor false", async () => {
            const nuevaMascota = {
                name: "Rex", 
                specie: "Perro Alfa de los de Antes", 
                birthDate: "1990-01-01"
            }

            const {statusCode, _body} = await requester.post("/api/pets").send(nuevaMascota); 

            expect(statusCode).to.equal(200); 
            expect(_body.payload).to.have.property("adopted").that.equals(false); 
        })

        it("Si se desea crear una mascota sin el campo  nombre, el módulo debe responder con un status 400.", async () => {
            const mascotaSinNombre = {
                specie: "Gato", 
                birthDate: "2020-05-15"
            }

            const {statusCode} = await requester.post("/api/pets").send(mascotaSinNombre); 

            expect(statusCode).to.equal(400);
        })
    })
})