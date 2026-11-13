var btnSave = document.getElementById("btnSave");
var btnEdit = document.getElementById("btnEdit");
var productos = [];

btnSave.onclick = () => {
    let txtNombre = document.getElementById("nombre");
    let txtPrecio = document.getElementById("precio");
    if(txtNombre.value == "" || txtPrecio.value == ""){
        alert("ERROR: CAMPOS VACIOS");
        return;
    }
    const producto = {
        nombre: txtNombre.value,
        precio: txtPrecio.value
    }
    productos.push(producto);
    console.log(productos);
    localStorage.setItem("productos", JSON.stringify(productos));
    document.getElementById("addProductos").close();
    txtNombre.value = "";
    txtPrecio.value = "";
    cargarProductos();
}

btnEdit.onclick = () => {
    let txtNombre = document.getElementById("nombree");
    let txtPrecio = document.getElementById("precioe");
    let posicion = document.getElementById("posicion");
    if(txtNombre.value == "" || txtPrecio.value == ""){
        alert("ERROR: CAMPOS VACIOS");
        return;
    }
    productos[posicion.value].nombre = txtNombre.value;
    productos[posicion.value].precio = txtPrecio.value;
    localStorage.setItem("productos", JSON.stringify(productos));
    document.getElementById("editProducto").close();
    txtNombre.value = "";
    txtPrecio.value = "";
    cargarProductos();
}

const cargarProductos = () => {
    let posicion = 0;
    productos = JSON.parse(localStorage.getItem("productos")) || [];
    let tabla = document.getElementById("productos");
    let contenido = "";
    productos.map((producto) => {
        contenido += `<tr>
        <td class="text-center">${producto.nombre.toUpperCase()}</td>
        <td class="text-center">${parseFloat(producto.precio).toFixed(2)}</td>
        <td class="text-center">
            <button class="btn-solid btn-styled theme-danger" onclick="eliminarProducto(${posicion})"><i class="bi bi-trash"></i></button>
            <button class="btn-solid btn-styled theme-warning" data-bs-toggle="dialog" data-bs-target="#editProducto" onclick="editarProducto(${posicion})"><i class="bi bi-pencil"></i></button>
        </td>
        </tr>`;
        posicion++;
    });
    tabla.innerHTML = contenido;
}

cargarProductos();

const editarProducto = (posicion) => {
    const producto = productos[posicion];
    document.getElementById("nombree").value = producto.nombre;
    document.getElementById("precioe").value = producto.precio;
    document.getElementById("posicion").value = posicion;
}

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn-solid theme-success m-5",
        cancelButton: "btn-solid theme-danger"
    },
    buttonsStyling: false
});

const negro = Swal.mixin({
    customClass: { confirmButton: "btn-solid btn-styled theme-secondary" },
    buttonsStyling: false
});

const eliminarProducto = (posicion) => {
    swalWithBootstrapButtons.fire({
        title: "ELIMINAR REGISTRO",
        text: "Estas seguro de eliminar este registro?",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "SI",
        cancelButtonText: "NO",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            productos.splice(posicion, 1);
            localStorage.setItem("productos", JSON.stringify(productos));
            cargarProductos();
            negro.fire({ title: "EXITO!", text: "Se elimino correctamente", icon: "success" });
        }
    });
}

