const express = require("express");
const router = express.Router();
//const UsuarioModel = require("../models/usuarios.model.js");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//Rutas: 

//Register: 
router.post("/register", async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;

    //Aca pueden meter alguna validación. 

    try {
        // Verificar si el usuario ya existe
        const existeUsuario = await UsuarioModel.findOne({ email });
        if (existeUsuario) {
            return res.status(400).send("El usuario ya existe");
        }

        // Crear un nuevo usuario
        const nuevoUsuario = new UsuarioModel({
            first_name, 
            last_name, 
            email, 
            password, 
            //Tarea para el hogar: hasear el password
            age
        });

        await nuevoUsuario.save();

        // Generar el token JWT
        const token = jwt.sign({ usuario: nuevoUsuario.first_name, rol: nuevoUsuario.role }, "coderhouse", {
            expiresIn: "1h"
        });

        // Establecer el token como cookie
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, // 1 hora de expiración
            httpOnly: true // La cookie solo es accesible mediante HTTP(S)
        });

        res.redirect("/home");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        // Buscar el usuario en MongoDB
        const usuarioEncontrado = await UsuarioModel.findOne({ email });

        // Verificar si el usuario existe
        if (!usuarioEncontrado) {
            return res.status(401).send("Usuario no válido");
        }

        // Verificar la contraseña
        if (password !== usuarioEncontrado.password) {
            return res.status(401).send("Contraseña incorrecta");
        }

        // Generar el token JWT
        const token = jwt.sign({ usuario: usuarioEncontrado.first_name, rol: usuarioEncontrado.role }, "coderhouse", {
            expiresIn: "1h"
        });

        // Establecer el token como cookie
        res.cookie("coderCookieToken", token, {
            maxAge: 3600000, // 1 hora de expiración
            httpOnly: true // La cookie solo es accesible mediante HTTP(S)
        });

        res.redirect("/home");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
});

router.get("/home", passport.authenticate("jwt", {session:false}), (req, res) => {
    res.render("home", { usuario: req.user.usuario });
    console.log(req.user);
})

router.post("/logout", (req, res) => {
    // Limpiar la cookie de token
    res.clearCookie("coderCookieToken");
    // Redirigir a la página de login
    res.redirect("/login");
});

//Ruta Admin: 

router.get("/admin", passport.authenticate("jwt", {session:false}), (req, res) => {
    
    if (req.user.rol !== "admin") {
        return res.status(403).send("Acceso denegado");
    }
    // Si el usuario es administrador, mostrar el dashboard de administrador
    res.render("admin");
});

//Retorna usuario: Artillery

const {faker} = require("@faker-js/faker");

router.get("/user", (req, res) => {
    const user = {
        usuario: faker.person.firstName(),
        password: faker.internet.password()
    }

    res.send(user);
})

//Nuevo ejercicio: restablecemos mail. 
const UsuarioModel = require("../models/usuarios.model.js");
const { generateResetToken } = require("../utils/util.js"); 
const EmailManager = require("../services/email.js"); 
const emailManager = new EmailManager(); 

router.post("/requestPasswordReset", async (req, res) => {
    const { email } = req.body; 

    try {
        //Buscamos al usuario por su correo electronico. 
        const user = await UsuarioModel.findOne({email}); 

        if(!user) {
            return res.status(404).send("Usuario no encontrado"); 
        }

        //Generamos el tokencilio: 
        const token = generateResetToken(); 

        //Guardar el token en el usuario: 
        user.resetToken = {
            token: token, 
            expiresAt: new Date(Date.now() + 3600000) // 1 hora de duración.
        }

        await user.save(); 

        //Enviar email con en enlace de restablecimiento utilizando EmailService: 
        await emailManager.enviarCorreoRestablecimiento(email, user.first_name, token); 

        res.redirect("/confirmacion-envio"); 

    } catch (error) {
        res.status(500).send("Nos vamos a morir, tenemos un error fatal");
    }

})

router.post("/reset-password", async (req, res) => {
    const { email, password, token } = req.body; 

    try {
        //Buscar al usuario: 
        const user = await UsuarioModel.findOne({email}); 
        if(!user) {
            return res.render("passwordcambio", {error: "Usuario no encontrado"}); 
        }

        //Obtener el token de restablecimiento de la contraseña del usuario: 

        const resetToken = user.resetToken; 

        if(!resetToken || resetToken.token !== token) {
            console.log("Caimos aca!"); 
            return res.render("passwordreset", {error: "El Token de restablecimiento es invalido"}); 
        }

        //Verificar si el token ha expirado
        const now = new Date(); 
        if(now > resetToken.expiresAt) {
            //Redirigir a la pagina de generacion de un nuevo correo de restablecimiento. 
            return res.redirect("passwordcambio"); 
        }

        //Verificamos que la nueva contraseña no sea igual a la anterior: 
        if(password === user.password) {
            return res.render("passwordcambio", {error: "La nueva contraseña no puede ser igual a la anterior"}); 
        }

        //Actualizamos la contraseña: 
        user.password = password; 
        user.resetToken = undefined; //Aca marcamos el token como utilizado. 
        await user.save(); 

        //Renderizamos el login: 
        return res.redirect("/login");
    } catch (error) {
        res.status(500).send("Error terrible");
    }
})




module.exports = router;