document.addEventListener("DOMContentLoaded", () => {
    var inputBase = document.querySelector("#base");
    var inputAltura = document.querySelector("#altura");
    var btnReset = document.querySelector("#reset");

    const calcular = () => {
        let b = parseFloat(inputBase.value);
        let a = parseFloat(inputAltura.value);
        document.querySelector("#vb").innerHTML = `<b style="color:red">${b}</b>`;
        document.querySelector("#va").innerHTML = `<b style="color:green">${a}</b>`;
        let area = (b * a) / 2;
        document.querySelector("#area").innerHTML = `<b style="color:blue;font-size:40px">${area.toFixed(2)}</b>`;
    }

    const reset = () => {
        inputBase.value = 1;
        inputAltura.value = 1;
        document.querySelector("#vb").innerHTML = "1";
        document.querySelector("#va").innerHTML = "1";
        document.querySelector("#area").innerHTML = "0";
    }

    inputBase.addEventListener("input", calcular, false);
    inputAltura.addEventListener("input", calcular, false);
    btnReset.addEventListener("click", reset, false);
});