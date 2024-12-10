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

        it("Al obtener a las mascotas con el método GET, la respuesta debe tener los campos status y payload. Además, payload debe ser de tipo arreglo.", async () => {
            const {statusCode, _body} =  await requester.get("/api/pets");

            expect(statusCode).to.equal(200); 
            expect(_body).to.have.property("status").that.equals("success"); 
            expect(_body).to.have.property("payload").that.is.an("array"); 
        })

        it("El método PUT debe poder actualizar correctamente a una mascota determinada (esto se puede testear comparando el valor previo con el nuevo valor de la base de datos).", async () => {
            const idMascotaExistente = "6756ee22591b8baec5c14663"; 

            const datosActualizados = {
                name: "Sub Zero", 
                specie: "Perrito tira hielo"
                //Podes agregar cualquier datito que quieras actualizar. 
            }

            const {statusCode} = await requester.put(`/api/pets/${idMascotaExistente}`).send(datosActualizados); 

            expect(statusCode).to.equal(200); 
            //No se olviden de verificar si en la base de datos se modifico el documento y no se olviden de escribir la carta a papa noel. 
        })
    
        it("El método DELETE debe poder borrar la última mascota agregada, ésto se puede alcanzar agregando a la mascota con un POST, tomando el id, borrando la mascota  con el DELETE, y luego corroborar si la mascota existe con un GET", async () => {
            //Paso 1: Agregar una nueva mascota: 

            const nuevaMascota = {
                name: "Mascota a borrar",
                specie: "Perro", 
                birthDate: "2023-02-20"
            }

            //Paso 2: Lo enviamos con un post: 

            const {body: {payload: {_id}}} = await requester.post("/api/pets").send(nuevaMascota); 

            //Paso 3: Voy a borrar la mascota agregada
            const {statusCode} = await requester.delete(`/api/pets/${_id}`); 

            //Paso 4: Validamos con expect
            expect(statusCode).to.equal(200); 

        })
    })

    //Registro de usuarios: 
    describe("Test Avanzado", () => {
        //Declaramos de forma global una variable "cookie" que vamos a usar en las siguientes pruebas. 
        let cookie; 

        it("Debe registrar correctamente a un usuario", async () => {
            const mockUsuario = {
                first_name: "Pepe", 
                last_name: "Argento", 
                email: "pepe@zapateriagarmendia.com", 
                password: "1234"
            }

            const {_body} = await requester.post("/api/sessions/register").send(mockUsuario); 

            //Validamos que tengamos un payload: 
            expect(_body.payload).to.be.ok; 
        })

        it("Debe loguear correctamente al usuario y recuperar la cookie", async () => {
            //Enviamos al login los mismos datos que registramos en el paso anterior: 
            const mockUsuario = {
                email: "pepe@zapateriagarmendia.com", 
                password: "1234"
            }

            const resultado = await requester.post("/api/sessions/login").send(mockUsuario); 

            //Guardo los headers de la peticion. 

            const cookieResultado = resultado.headers['set-cookie']['0']; 
            //Se obtiene la cookie de sesion de la respuesta y se guarda en una variable. 

            //Verificamos que la cookie recuperada exista: 
            expect(cookieResultado).to.be.ok; 

            //Se separa el nombre y el valor de la cookie recuperada y se guardan en un objeto. 

            cookie = {
                name: cookieResultado.split("=")['0'],
                value: cookieResultado.split("=")['1']
            }

            //Recuerden que el método split separa un string en cadenas más pequeñas. 

            //Se verifica que el nombre de la cookie sea igual a "coderCookie"
            expect(cookie.name).to.be.ok.and.eql("coderCookie");
            expect(cookie.value).to.be.ok; 
        })
        
        //Probamos la ruta current:

        it("Debe enviar la cookie que contiene el usuario", async () => {
            //Enviamos la cookie que guardamos: 
            const {_body} = await requester.get("/api/sessions/current").set("Cookie", [`${cookie.name}=${cookie.value}`]); 

            //Verificamos que nos retorne el email: 
            expect(_body.payload.email).to.be.eql("pepe@zapateriagarmendia.com"); 

        })
    })

    //TESTING CON CARGA DE IMAGENES: 

    describe("Testeamos la carga de imagenes", () => {
        it("Tenemos que crear una mascota con una imagen", async () => {
            const mascotaMock = {
                name: "CoderGatito", 
                specie: "gatito", 
                birthDate: "2021-06-01"
            }

            //Ahora ya no usamos el método send, sino que usamos field, para los distintos campos: 
            const resultado = await requester.post("/api/pets/withimage")
                .field("name", mascotaMock.name)
                .field("specie", mascotaMock.specie)
                .field("birthDate", mascotaMock.birthDate)
                .attach("image", "./test/gatito.jpg")

            //Verificamos que la peticion resulto ok: 
            expect(resultado.status).to.be.eql(200)

            //Verificamos que la mascota tenga un campo id: 
            expect(resultado._body.payload).to.have.property("_id"); 

            //Verificamos que la mascota tenga el campo "image"
            expect(resultado._body.payload.image).to.be.ok; 
        })  
    })
})