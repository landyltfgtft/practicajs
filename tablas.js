var numero1 = document.querySelector("#numeroA");
var numero2 = document.querySelector("#numeroB");

var calcular = () => {
    document.getElementById("cargando").style.display = "block";

    setTimeout(() => {

        var valor1 = parseInt(numero1.value);
        var valor2 = parseInt(numero2.value);

        document.querySelector("#valorNumeroA").innerHTML = "NÚMERO " + valor1;
        document.querySelector("#valorNumeroB").innerHTML = "NÚMERO " + valor2;

        var resultado = document.querySelector("#resultado");
        resultado.innerHTML = valor1 + " * " + valor2 + " = " + (valor1 * valor2);

        document.getElementById("cargando").style.display = "none";

    }, 2000);
}

numero1.oninput = calcular;
numero2.oninput = calcular;

function limpiar() {

    document.getElementById("numeroA").value = 1;
    document.getElementById("numeroB").value = 1;

    document.getElementById("valorNumeroA").innerText = "NÚMERO 1";
    document.getElementById("valorNumeroB").innerText = "NÚMERO 1";
    document.getElementById("resultado").innerText = "1 * 1 = 1";
}