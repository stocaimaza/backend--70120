const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({

    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        index: true, 
        unique: true
    }, 
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"], // Enumera los roles permitidos
        default: "user" // Asigna por defecto el rol de "user"
    },
    resetToken: {
        token: String,
        expiresAt: Date
    }
})

const UsuarioModel = mongoose.model("usuarios", usuarioSchema);

module.exports = UsuarioModel;