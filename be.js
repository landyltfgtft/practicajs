const calcular = () => {
    var producto = document.querySelector("#producto").value;
    var img = document.querySelector("#img");
    var precio = document.querySelector("#precio");
    
    var costo = 0;
    var plazo = 0;
    var aumento = 0;
    
    img.innerHTML = `<img src="img/${producto}.jpg" width="400">`;
    
    switch(producto){
        case "blusa": costo = 499; break;
        case "pantalon": costo = 899; break;
        case "vestido": costo = 999; break;
        case "falda": costo = 599; break;
        case "short": costo = 450; break;
    }
    
    precio.innerHTML = `<h3>Precio: $ ${costo.toFixed(2)} MXN</h3>`;
    
    var uno = document.querySelector("#uno");
    var dos = document.querySelector("#dos");
    var tres = document.querySelector("#tres");
    var cantidad = document.querySelector("#cantidad").value;

    if(uno.checked){
        plazo = 6;
        aumento = 1.1;   
    } else if(dos.checked){
        plazo = 12;
        aumento = 1.15; 
    } else {
        plazo = 18;
        aumento = 1.2;  
    }
    
    var contado = costo * cantidad;
    var credito = contado * aumento;
    var abono = credito / plazo;
    
    document.querySelector("#contado").innerHTML = `<h3>Precio de Contado: $ ${contado.toFixed(2)} MXN</h3>`;
    document.querySelector("#credito").innerHTML = `<h3>Precio a Crédito: $ ${credito.toFixed(2)} MXN</h3>`;
    document.querySelector("#abono").innerHTML = `<h3>Abono Mensual: $ ${abono.toFixed(2)} MXN</h3>`;
}