export const generarInfoError = (usuario) => {
    return `Los datos estan incompletos o no son válidos.
    Necesitamos recibir los siguientes datos: 
    - Nombre: String, peeeeero recibimos ${usuario.nombre}
    - Apellido: String, peeero recibimos ${usuario.apellido}
    - Email: String, peeero recibimos ${usuario.email}
    `
}