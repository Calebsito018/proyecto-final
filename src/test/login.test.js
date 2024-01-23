import { login } from "../login.js";

let testPassed = 0
const totalTest = 5
//1. password vacio
const response1 = login("coderUser");
if(response1 === "No se ha proporcionado una contraseña"){
    testPassed++;
    console.log("Test 1 passed");
}else console.log("Test 1 failed");

//2. Usuario vacio
const response2 = login(null, "123");
if(response2 === "No se ha proporcionado un usuario"){
    testPassed++;
    console.log("Test 2 passed");
}else{
    console.log("Test 2 failed");
}
//3. password incorrecto
const response3 = login("coderUser", "abc");
if(response3 === "Contraseña incorrecta"){
    testPassed++;
    console.log("Test 3 passed");
}else{
    console.log("Test 3 failed");
}
//4. Usuario incorrecto
const response4 = login("coderUser2", "123");
if(response4 === "Credenciales incorrectas"){
    testPassed++;
    console.log("Test 4 passed");
}else{
    console.log("Test 4 failed");
}

//5. Usuario y password coinciden
const response5 = login("coderUser", "123");
if(response5 === "logueado"){
    testPassed++;
    console.log("Test 5 passed");
}else{
    console.log("Test 5 failed");
}
console.log(`Passed ${testPassed} of ${totalTest} test`);