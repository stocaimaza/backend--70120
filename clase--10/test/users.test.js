import mongoose from "mongoose";
import User from "../src/dao/Users.dao.js"; 

//Modulo nativo de Node JS que nos permite hacer las validaciones: 
import assert from "assert"; 

//Me conecto a mi Base de Datos:
mongoose.connect("mongodb+srv://coderhouse70110:coderhouse@cluster0.pripd.mongodb.net/Documentacion?retryWrites=true&w=majority&appName=Cluster0");

//Describe: es una función que me permite agrupar un conjunto de pruebas relacionadas bajo un mismo bloque descriptivo. 

describe("Testeamos el DAO de Usuarios", function () {
    //Le asignamos un nombre o titulo
    //Pasamos una función callbaack que contiene todas las pruebas individuales. 

    //Esto se ejecuta una vez, antes de las pruebas
    before(function () {
        this.usersDao = new User();
    })

    //Limpiamos la base de datos cada vez que testeamos: 
    beforeEach(async function () {
        await mongoose.connection.collections.users.drop(); 
    })

    ///////////////////////////////////////////////////////

    //En el it describimos lo que se espera del test. 
    //Desarrollamos cada prueba individual: 
    it("El get de usuarios me debe retornar un array", async function () {
        const resultado = await this.usersDao.get(); 
        
        //Una vez que obtengo los resultados del get a usuarios, tengo que validar si es un array o no: 
        assert.strictEqual(Array.isArray(resultado), true);
    })

    it("El DAO debe poder agregar un usuario nuevo a la Base de Datos", async function () {
        let usuario = {
            first_name: "Mirtha", 
            last_name: "Legrand", 
            email: "lachiqui@legrand.com", 
            password: "1234"
        }

        const resultado = await this.usersDao.save(usuario);
        assert.ok(resultado._id);
        //Aca verificamos que el valor que recibimos es verdadero. 
    })

    it("Validamos que el usuario tenga un array de mascotas vacio", async function() {
        let usuario = {
            first_name: "Lia",
            last_name: "Crucet", 
            email: "lia@crucet.com", 
            password: "1234"
        }

        const resultado = await this.usersDao.save(usuario); 
        assert.deepStrictEqual(resultado.pets, []);
    })

    it("El DAO puede obtener un usurio por email", async function (){
        let usuario = {
            first_name: "Lia",
            last_name: "Crucet", 
            email: "lia@crucet.com", 
            password: "1234"
        }

        await this.usersDao.save(usuario); 

        const user = await this.usersDao.getBy({email: usuario.email}); 

        assert.strictEqual(typeof user, "object"); 

    })

    ////////////////////////////////////////////////////////////////

    after(async function () {
        await mongoose.disconnect();
    })
})