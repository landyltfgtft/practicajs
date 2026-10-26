var valorDia=document.getElementById("valorDia");
var dia=document.getElementById("dia");
var mes=document.getElementById("mes");
var signo=document.getElementById("signo");
var fecha=document.getElementById("fecha");

const verSigno=()=>{
    let d=parseInt(dia.value)
    let m=mes.value
    valorDia.innerHTML="DIA "+d
    fecha.textContent=d+" de "+m
    var imgSigno=""
    switch(m){
        case "ENERO": imgSigno=(d>20)?"acuario":"capricornio";break;
        case "FEBRERO": imgSigno=(d>19)?"piscis":"acuario";break;
        case "MARZO": imgSigno=(d>21)?"aries":"piscis";break;
        case "ABRIL": imgSigno=(d>20)?"tauro":"aries";break;
        case "MAYO": imgSigno=(d>21)?"geminis":"tauro";break;
        case "JUNIO": imgSigno=(d>22)?"cancer":"geminis";break;
        case "JULIO": imgSigno=(d>23)?"leon":"cancer";break; // Cambiado "leo" por "leon"
        case "AGOSTO": imgSigno=(d>23)?"virgo":"leon";break; // Cambiado "leo" por "leon"
        case "SEPTIEMBRE": imgSigno=(d>23)?"libra":"virgo";break;
        case "OCTUBRE": imgSigno=(d>23)?"escorpio":"libra";break;
        case "NOVIEMBRE": imgSigno=(d>22)?"sagitario":"escorpio";break;
        case "DICIEMBRE": imgSigno=(d>22)?"capricornio":"sagitario";break;
    }
    signo.src="img/signos/"+imgSigno+".jpg"; 
}

document.getElementById("reset").onclick=()=>{
    dia.value = 1;
    mes.value = "ENERO";
    valorDia.innerHTML = "DIA 1";
    fecha.textContent = "1 de ENERO";
    signo.src = "img/signos/signos.jpg";
};

dia.oninput=()=>{verSigno()};
mes.onchange=()=>{verSigno()};

verSigno();
