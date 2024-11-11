export const suma = (...numeros) => {
    if(numeros.length === 0) return 0; 
    if(!numeros.every(num => typeof num === "number")) return null; 
    return numeros.reduce((acumulador, elemento) => acumulador + elemento, 0);
}

//SUBIMOS UN PROYECTO A NPM. 

//npm login 
//npm publish