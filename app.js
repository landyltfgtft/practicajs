function calcular() {
    let base = document.getElementById("base").value;
    let altura = document.getElementById("altura").value;

    
    document.getElementById("vb").innerText = base;
    document.getElementById("va").innerText = altura;

    
    let area = (base * altura) / 2;
    document.getElementById("area").innerText = area;
}

function limpiar() { 
    document.getElementById("base").value = 1;
    document.getElementById("altura").value = 1;

   
    document.getElementById("vb").innerText = "1";
    document.getElementById("va").innerText = "1";
    document.getElementById("area").innerText = "0";
}




