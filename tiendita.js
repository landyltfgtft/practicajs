var btnSave=document.getElementById("btnSave");
const productos=[];
btnSave.onclick=()=>{
    txtNombre=document.getElementById("nombre");
    txtPrecio=document.getElementById("precio");
    if(txtNombre.value=="" || txtPrecio.value==""){
        alert("ERROR: CAMPOS VACIOS")
        return;
    }
    const producto={
        nombre:txtNombre.value,
        precio:txtPrecio.value
    }
    productos.push(producto);
    console.log(productos)
    localStorage.setItem("productos",JSON.stringify(productos));
}  