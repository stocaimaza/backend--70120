//TDD: Significa "Desarrollo Orientado a Pruebas". 
//Es una metodología de desarrollo de software que consiste en pensar y escribir las pruebas que debe cumplir determinada función, incluso antes de escribirla. 

//EL TDD Se divide en 3 pasos: 

//1) Escribir una prueba fallida
//2) Hacer que las pruebas pasen
//3) Refactorizar 

//EJEMPLO: función "suma".

//1) PASO

// const suma = (a, b) => {
//     return a + b;
// }

//2) HACEMOS QUE LAS PRUEBAS PASEN: 
// const suma = (a, b) => {
//     //test 2: 
//     if(!a || !b) {
//         return 0;
//     }
//     //test 1: 
//     if(typeof a !== "number" || typeof b !== "number") {
//         return null; 
//     }

//     //test 3: 
//     let resultado = a + b; 
//     return resultado; 

//     //test 4 y ahora??

// }

//PARA RESOLVER EL TEST 4 VAMOS A TENER QUE MODIFICAR TODA LA FUNCION PARA RECIBIR N PARAMETROS: 

// const suma = (...numeros) => {

//     //Retornar 0 si no recibo ningun elemento: 
//     if (numeros.length === 0) {
//         return 0;
//     }

//     //Retornar null si algun dato no es numerico: 
//     let banderita = true;
//     for (let i = 0; i < numeros.length && banderita; i++) {
//         if (typeof numeros[i] !== "number") {
//             banderita = false;
//         }
//     }
//     if (banderita !== true) {
//         return null;
//     }

//     //Sumar 2 o mas elementos: 
//     let resultado = 0;
//     for (let i = 0; i < numeros.length; i++) {
//         resultado += numeros[i];
//     }
//     return resultado;

// }

//3) REFACTORIZAR: 

const suma = (...numeros) => {
    if(numeros.length === 0) return 0; 
    if(!numeros.every(num => typeof num === "number")) return null; 
    return numeros.reduce((acumulador, elemento) => acumulador + elemento, 0); 
}

//Ahora tenemos que pensar multiples escenarios para poner a prueba nuestra función. 

//1. La función debe retornar null si algun parametro no es numerico. 
//2. La función debe retornar 0 si no se pasa ningun parametro. 
//3. La funcion debe poder realizar la suma correctamente. 
//4. La funcion debe poder hacer la suma con cualquier cantidad de numeros. 

//TESTEAMOS: 

let testPasados = 0;
let testTotales = 4;

//TEST 1: 
console.log("1. La función debe retornar null si algun parametro no es numerico.");
let resultado1 = suma("2", 3);
if (resultado1 === null) {
    console.log("Test 1 pasado!");
    testPasados++;
} else {
    console.log("El test 1 no se pasó, se esperaba null, pero se recibio: " + resultado1);
}
console.log("----------------------------------------------------------------");
//TEST 2: 
console.log("2. La función debe retornar 0 si no se pasa ningun parametro.");
let resultado2 = suma();
if (resultado2 === 0) {
    console.log("Test 2 pasado!");
    testPasados++;
} else {
    console.log("El test 2 no se paso, se esperaba 0 pero se recibio: " + resultado2);
}
console.log("----------------------------------------------------------------");

//TEST 3: 
console.log("3. La funcion debe poder realizar la suma correctamente. ");
let resultado3 = suma(2, 3);
if (resultado3 === 5) {
    console.log("Test 3 pasado!");
    testPasados++;
} else {
    console.log("El test 3 no se pasó, se esperaba un 5 pero se recibio: " + resultado3);
}
console.log("----------------------------------------------------------------");

//TEST 4: 
console.log("4. La funcion debe poder hacer la suma con cualquier cantidad de numeros.");
let resultado4 = suma(1, 2, 3, 4, 5);
if (resultado4 === 15) {
    console.log("Test 4 pasado!");
    testPasados++;
} else {
    console.log("El test 4 no se paso, se esperaba 15 pero se recibio: " + resultado4);
}

/////////////////////////////////////////////////////////////////////////////////


if (testPasados === testTotales) {
    console.log("Felicitaciones!, todos los test se pasaron con exito, la vida te sonrie, jugale al 34");
} else {
    console.log("Se pasaron " + testPasados + " de un total de " + testTotales + ", terrible lo tuyo, existiendo tantas carreras te decidiste por la que no tenes talento. Estas a tiempo, renuncia!");
}