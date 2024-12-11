"use strict";
console.log("Hola mamá, estoy en TypeScript!");
console.log("Olis ke asen?");
//Trabajamos con variables: 
let nombre = "Pepe";
let apellido = "Argento";
const nacimiento = 1960;
let trabaja = true;
let variableUndefined = undefined;
let datoNull = null;
//Objetos literales: 
const persona = {
    nombre: "Juan",
    edad: 30
};
//Arrays: 
const numeros = [1, 2, 3, 4, 5];
const personitas = ["Juan", "Pablo", "Lucas"];
const combinadito = ["Ola", "Ke", "ase", 100];
console.log(combinadito);
//Funciones: 
function suma(numeroA, numeroB) {
    return numeroA + numeroB;
}
console.log(suma(155, 5));
//Con una función flechiña: 
const restar = (a, b) => a - b;
//Aca ya se interpreta que el retorno sera un number tambien. 
console.log(restar(100, 10));
//Clases: 
class Perro {
    constructor(raza, edad) {
        this.raza = raza;
        this.edad = edad;
    }
    ladrar() {
        console.log("guau guau");
    }
}
//Instancia de la clase:
const firulais = new Perro("Ladrador", 5);
console.log(firulais);
firulais.ladrar();
