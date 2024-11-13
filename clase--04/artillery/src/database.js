const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://coderhouse70110:coderhouse@cluster0.pripd.mongodb.net/JWT?retryWrites=true&w=majority&appName=Cluster0")
    .then( () => console.log("Conectado a la BD"))
    .catch( (error) => console.log(error))