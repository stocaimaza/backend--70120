console.log("Hola mamá, estoy en TypeScript!"); 

console.log("Olis ke asen?");

//Trabajamos con variables: 

let nombre: string = "Pepe"; 
let apellido: string = "Argento";

const nacimiento: number = 1960; 

let trabaja: boolean = true; 

let variableUndefined: undefined = undefined; 
let datoNull: null = null; 

//Objetos literales: 

const persona: {nombre: string, edad: number} = {
    nombre: "Juan",
    edad: 30
}

//Arrays: 

const numeros: number[] = [1,2,3,4,5]; 

const personitas: string[] = ["Juan", "Pablo", "Lucas"]; 

const combinadito: (number | string)[] = ["Ola", "Ke", "ase", 100];
console.log(combinadito);

//Funciones: 

function suma(numeroA:number, numeroB:number): number {
    return numeroA + numeroB; 
}

console.log(suma(155, 5));

//Con una función flechiña: 

const restar = (a:number, b:number) => a - b;
//Aca ya se interpreta que el retorno sera un number tambien. 

console.log(restar(100, 10));


//Clases: 

class Perro {
    raza: string;
    edad: number
    constructor(raza: string, edad: number) {
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