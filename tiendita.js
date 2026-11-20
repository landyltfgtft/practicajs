var btnSave = document.getElementById("btnSave");
var btnEdit = document.getElementById("btnEdit");
var productos = [];
var dataTableInstance = null;
var imagenesFiltradasParaPdf = [];

const convertirBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

const inicializarDataTable = () => {
    if ($.fn.DataTable.isDataTable("#tablaProductos")) {
        $("#tablaProductos").DataTable().destroy();
    }

    dataTableInstance = $("#tablaProductos").DataTable({
        pageLength: 5,
        lengthMenu: [5, 10, 25, 50],
        dom: "Bfrtip",
        buttons: [
            {
                extend: "excelHtml5",
                text: '<i class="bi bi-file-earmark-excel"></i> Excel',
                className: "btn btn-success me-2",
                title: "Productos - Tiendita",
                exportOptions: {
                    columns: [1, 2, 3, 4]
                }
            },
            {
                extend: "pdfHtml5",
                text: '<i class="bi bi-file-earmark-pdf"></i> PDF',
                className: "btn btn-danger",
                title: "Productos - Tiendita",
                exportOptions: {
                    columns: [0, 1, 2, 3, 4]
                },
                customize: function (doc) {
                    const tablaPdf = doc.content[1].table.body;
                    // Fila 0 es el encabezado; las filas 1..N corresponden a los registros exportados
                    for (let i = 1; i < tablaPdf.length; i++) {
                        const base64Img = imagenesFiltradasParaPdf[i - 1];
                        if (base64Img && base64Img.startsWith("data:image")) {
                            tablaPdf[i][0] = {
                                image: base64Img,
                                width: 35,
                                height: 35,
                                alignment: "center"
                            };
                        } else {
                            tablaPdf[i][0] = {
                                text: "Sin imagen",
                                alignment: "center"
                            };
                        }
                    }
                }
            }
        ],
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.13.8/i18n/es-ES.json"
        }
    });
};

btnSave.onclick = async () => {
    let inputImg = document.getElementById("imagen");
    let txtNombre = document.getElementById("nombre");
    let txtCategoria = document.getElementById("categoria");
    let txtPrecio = document.getElementById("precio");
    let txtCantidad = document.getElementById("cantidad");

    if(txtNombre.value == "" || txtCategoria.value == "" || txtPrecio.value == "" || txtCantidad.value == ""){
        alert("ERROR: CAMPOS VACIOS");
        return;
    }

    let imagenBase64 = "";
    if (inputImg.files && inputImg.files[0]) {
        imagenBase64 = await convertirBase64(inputImg.files[0]);
    }

    const producto = {
        imagen: imagenBase64,
        nombre: txtNombre.value,
        categoria: txtCategoria.value,
        precio: txtPrecio.value,
        cantidad: txtCantidad.value
    }

    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));
    document.getElementById("addProductos").close();

    inputImg.value = "";
    txtNombre.value = "";
    txtCategoria.value = "";
    txtPrecio.value = "";
    txtCantidad.value = "";

    cargarProductos();
}

btnEdit.onclick = async () => {
    let inputImg = document.getElementById("imagene");
    let txtNombre = document.getElementById("nombree");
    let txtCategoria = document.getElementById("categoriae");
    let txtPrecio = document.getElementById("precioe");
    let txtCantidad = document.getElementById("cantidade");
    let posicion = document.getElementById("posicion");

    if(txtNombre.value == "" || txtCategoria.value == "" || txtPrecio.value == "" || txtCantidad.value == ""){
        alert("ERROR: CAMPOS VACIOS");
        return;
    }

    let index = posicion.value;
    let imagenBase64 = productos[index].imagen; 

    if (inputImg.files && inputImg.files[0]) {
        imagenBase64 = await convertirBase64(inputImg.files[0]);
    }

    productos[index].imagen = imagenBase64;
    productos[index].nombre = txtNombre.value;
    productos[index].categoria = txtCategoria.value;
    productos[index].precio = txtPrecio.value;
    productos[index].cantidad = txtCantidad.value;

    localStorage.setItem("productos", JSON.stringify(productos));
    document.getElementById("editProducto").close();
    
    inputImg.value = "";
    txtNombre.value = "";
    txtCategoria.value = "";
    txtPrecio.value = "";
    txtCantidad.value = "";

    cargarProductos();
}

const filtrarPorSelect = () => {
    cargarProductos();
}

const cargarProductos = () => {
    productos = JSON.parse(localStorage.getItem("productos")) || [];
    let tabla = document.getElementById("productos");
    let contenido = "";
    let sumaCantidad = 0;
    let sumaPrecio = 0;
    let sumaTotalGral = 0;
    let selectFiltro = document.getElementById("filtroCategoria");
    let categoriaSeleccionada = selectFiltro ? selectFiltro.value : "TODOS";

    imagenesFiltradasParaPdf = [];

    productos.forEach((producto, posicionReal) => {
        if (categoriaSeleccionada !== "TODOS" && producto.categoria !== categoriaSeleccionada) {
            return; 
        }

        let cant = parseFloat(producto.cantidad) || 0;
        let prec = parseFloat(producto.precio) || 0;
        let subtotal = prec * cant;
        sumaCantidad += cant;
        sumaPrecio += prec;
        sumaTotalGral += subtotal;

        imagenesFiltradasParaPdf.push(producto.imagen || "");

        let tagImg = producto.imagen ? `<img src="${producto.imagen}" width="50" height="50" class="rounded" style="object-fit: cover;">` : 'Sin imagen';

        contenido += `<tr>
        <td class="text-center">${tagImg}</td>
        <td class="text-center">${producto.nombre.toUpperCase()}</td>
        <td class="text-center">${(producto.categoria || "").toUpperCase()}</td>
        <td class="text-center">${prec.toFixed(2)}</td>
        <td class="text-center">${cant}</td>
        <td class="text-center">
            <button class="btn-solid btn-styled theme-danger" onclick="eliminarProducto(${posicionReal})"><i class="bi bi-trash"></i></button>
            <button class="btn-solid btn-styled theme-warning" data-bs-toggle="dialog" data-bs-target="#editProducto" onclick="editarProducto(${posicionReal})"><i class="bi bi-pencil"></i></button>
        </td>
        </tr>`;
    });

    if ($.fn.DataTable.isDataTable("#tablaProductos")) {
        $("#tablaProductos").DataTable().destroy();
    }

    tabla.innerHTML = contenido;

    let tablaTotales = document.getElementById("totales");
    if (tablaTotales) {
        tablaTotales.innerHTML = `
        <tr class="text-center fw-bold">
            <td>TOTALES</td>
            <td>-</td>
            <td>-</td>
            <td>${sumaPrecio.toFixed(2)}</td>
            <td>${sumaCantidad}</td>
            <td>${sumaTotalGral.toFixed(2)}</td>
        </tr>`;
    }

    inicializarDataTable();
}

cargarProductos();

const editarProducto = (posicion) => {
    const producto = productos[posicion];
    document.getElementById("nombree").value = producto.nombre;
    document.getElementById("categoriae").value = producto.categoria;
    document.getElementById("precioe").value = producto.precio;
    document.getElementById("cantidade").value = producto.cantidad;
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
        text: "¿Estás seguro de eliminar este registro?",
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
            negro.fire({ title: "EXITO!", text: "Se eliminó correctamente", icon: "success" });
        }
    });
}