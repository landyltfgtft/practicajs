var peso = document.getElementById("peso");
var altura = document.getElementById("altura");
var valorPeso = document.getElementById("valorPeso");
var valorAltura = document.getElementById("valorAltura");
var imc = document.getElementById("imc");
var clasificacion = document.getElementById("clasificacion");
var resultado = document.querySelector(".resultado");

function calcular() {
    valorPeso.innerHTML = peso.value;
    valorAltura.innerHTML = altura.value;
    let indice = peso.value / (altura.value * altura.value);
    indice = indice.toFixed(2);
    imc.innerHTML = indice;
    document.getElementById("t-bajo").classList.remove("resaltar");
    document.getElementById("t-normal").classList.remove("resaltar");
    document.getElementById("t-sobrepeso").classList.remove("resaltar");
    document.getElementById("t-obs1").classList.remove("resaltar");
    document.getElementById("t-obs2").classList.remove("resaltar");
    document.getElementById("t-obs3").classList.remove("resaltar");
    if (indice < 18.5) {
        clasificacion.innerHTML = "Bajo peso";
        clasificacion.style.color = "blue";
        document.getElementById("t-bajo").classList.add("resaltar");

    } else if (indice < 25) {
        clasificacion.innerHTML = "Normal";
        clasificacion.style.color = "green";
        document.getElementById("t-normal").classList.add("resaltar");

    } else if (indice < 30) {
        clasificacion.innerHTML = "Sobrepeso";
        clasificacion.style.color = "orange";
        document.getElementById("t-sobrepeso").classList.add("resaltar");

    } else if (indice < 35) {
        clasificacion.innerHTML = "Obesidad I";
        clasificacion.style.color = "red";
        document.getElementById("t-obs1").classList.add("resaltar");

    } else if (indice < 40) {
        clasificacion.innerHTML = "Obesidad II";
        clasificacion.style.color = "pink";
        document.getElementById("t-obs2").classList.add("resaltar");

    } else {
        clasificacion.innerHTML = "Obesidad III";
        clasificacion.style.color = "purple";
        document.getElementById("t-obs3").classList.add("resaltar");
    }
}
peso.oninput = calcular;
altura.oninput = calcular;

function reset() {
    peso.value = 0;
    altura.value = 0;
    calcular();
}
calcular();

