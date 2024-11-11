import express from "express";
const app = express(); 

app.get("/", (req, res) => {
    res.send("Hola Mundillo, que cuentan? "); 
})

app.listen(8080, () => {
    console.log("Estamos en FM Hit en el 8080");
})

//NPM CI me permite instalar las depenencias pero leyendo el packaje-lock.json

//NPM AUDIT busca vulnerabilidades con respecto a las versiones de las dependencias que tenemos instaladas. 

//NPM AUDIT FIX --FORCE corrige esas vulnerabilidades. 