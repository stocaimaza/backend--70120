import { Router } from "express";
const router = Router(); 
import generateUsers from "../utils/util.js";

router.get("/", (req, res) => {
    //Generar un array de usuarios: 
    const usuarios = []; 

    for(let i = 0; i < 100; i++) {
        usuarios.push(generateUsers()); 
    }

    res.json(usuarios); 
})

export default router; 