//Instalamos: 
//npm i express cors mercadopago

import express from "express";
import cors from "cors"; 
const app = express(); 
const PUERTO = 8080; 

import {MercadoPagoConfig, Preference} from "mercadopago"; 

//Agremos nuestras credenciales: 
const client = new MercadoPagoConfig({accessToken: "APP_USR-5217446546529179-103010-71ca618b8620935dc4f97987132d43dc-1890358266"}); 

//Middleware: 
app.use(express.json()); 
app.use(cors()); 

app.get("/", (req, res) => {
    res.send("Se anotaron al coder camp?"); 
})

app.post("/create-preference", async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title, 
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price), 
                    currency_id: "ARS"
                }
            ],
            back_urls: {
                success: "https://www.mercadolibre.com.ar/",
                failure: "https://www.mercadolibre.com.ar/", 
                pending: "https://www.mercadolibre.com.ar/"
            }, 
            auto_return: "approved", 
        }

        const preference = new Preference(client); 
        const result = await preference.create({body});

        //Se  lo enviamos al front: 
        res.json({
            id: result.id
        })

    } catch (error) {
        console.log(error);
        res.send("Error terrible!")
    }
})

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})