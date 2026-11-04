var peso = document.getElementById("peso");
var altura = document.getElementById("altura");
var valorPeso = document.getElementById("valorPeso");
var valorAltura = document.getElementById("valorAltura");
var imc = document.getElementById("imc");
var clas = document.getElementById("clas");
var resultado = document.querySelector(".resultado");

function calcular() {
    valorPeso.innerHTML = peso.value;
    valorAltura.innerHTML = altura.value;
    let indice =
        peso.value /
        (altura.value * altura.value);
         indice = indice.toFixed(2);
    imc.innerHTML = indice;
    if (indice < 18.5) {
        clasificacion.innerHTML="bajo peso";
        clasificacion.style.color = "blue";
        
} else if (indice < 25) {
        clasificacion.innerHTML="Normal";
        clasificacion.style.color = "green";
    }else if (indice < 30) {
        clasificacion.innerHTML="Sobrepeso";
        clasificacion.style.color = "orange";
        
    } else if (indice < 35) {
       
        clasificacion. innerHTML="obrsidad I";
        clasificacion.style.color = "red";
    } else if (indice < 40) {
        clasificacion.innerHTML="Obesidad II";
        clasificacion.style.color = "pink";
        
} else {
        clasificacion.innerHTML="Obesidad III";
        clasificacion.style.color = "black";
        
    }
}
peso.oninput = calcular;
altura.oninput = calcular;

function reset() {
    peso.value = 70;
    altura.value = 1.70;
    calcular();
}
calcular();


