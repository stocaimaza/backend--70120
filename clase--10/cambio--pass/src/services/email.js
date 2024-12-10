const nodemailer = require("nodemailer"); 

class EmailManager {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: "coderhouse70110@gmail.com",
                pass: "ijnr fiqh yslf oqpg"
            }
        })
    }

    async enviarCorreoRestablecimiento(email, first_name, token) {
        try {
            const mailOptions = {
                from: "coderhouse70110@gmail.com", 
                to: email, 
                subject: "Restablecimiento de Contraseña", 
                html: `
                    <h1> Restablecimiento de Contraseña </h1>
                    <p> Hola ${first_name} </p>
                    <p> Nos pediste restablecer la contraseña, utiliza el siguiente código para modificarla </p>
                    <strong> ${token} </strong>
                    <a href="http://localhost:8080/password"> Restablecer </a>
                    <p>Si no realizaste esta solicitud ignora este mensaje</p>
                `
            };
            await this.transporter.sendMail(mailOptions); 
        } catch (error) {
            console.error(error); 
            throw new Error("Error al enviar el mensaje de restablecimiento "); 
        }
    }

}

module.exports = EmailManager; 