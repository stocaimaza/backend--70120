const Router = require("express").Router;
const router = Router();

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/register", (req, res) => {
    res.render("register");
});

//Ejercicio restablecer password: 
router.get("/reset-password", (req, res) => {
    res.render("passwordreset"); 
})

router.get("/password", (req, res) => {
    res.render("passwordcambio"); 
})

router.get("/confirmacion-envio", (req, res) => {
    res.render("confirmacion-envio"); 
})

module.exports = router;