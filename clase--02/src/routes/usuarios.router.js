import { Router } from "express";
const router = Router(); 

//Importamos las herramientas creadas para gestionar errores: 
import { generarInfoError } from "../services/errors/info.js";
import { EErrors } from "../services/errors/enum.js";
import CustomError from "../services/errors/custom-error.js";

const arrayUsuarios = [];

router.post("/", async (req, res, next ) => {
    const { nombre, apellido, email } = req.body;

    try {
        if (!nombre || !apellido || !email) {
            throw CustomError.crearError({
                nombre: "Usuario nuevo, faltan datos ",
                causa: generarInfoError({nombre, apellido, email}),
                mensaje: "Error al intentar crear un usuario",
                codigo: EErrors.TIPO_INVALIDO
            })
        }

        const usuario = {
            nombre, 
            apellido, 
            email
        }

        arrayUsuarios.push(usuario); 
        console.log(arrayUsuarios);
        res.send({status: "success", payload: usuario}); 

    } catch (error) {
        next(error);
    }
})


export default router; 