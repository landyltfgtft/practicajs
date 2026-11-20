var btnSave = document.getElementById("btnSave");
var btnEdit = document.getElementById("btnEdit");
var categorias = [];
var dataTableInstance = null;

const inicializarDataTable = () => {
    if ($.fn.DataTable.isDataTable("#tablaCategorias")) {
        $("#tablaCategorias").DataTable().destroy();
    }

    dataTableInstance = $("#tablaCategorias").DataTable({
        pageLength: 5,
        lengthMenu: [5, 10, 25, 50],
        dom: "Bfrtip",
        buttons: [
            {
                extend: "excelHtml5",
                text: '<i class="bi bi-file-earmark-excel"></i> Excel',
                className: "btn btn-success me-2",
                title: "Categorías - Tiendita",
                exportOptions: {
                    columns: [0]
                }
            },
            {
                extend: "pdfHtml5",
                text: '<i class="bi bi-file-earmark-pdf"></i> PDF',
                className: "btn btn-danger",
                title: "Categorías - Tiendita",
                exportOptions: {
                    columns: [0]
                }
            }
        ],
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.13.8/i18n/es-ES.json"
        }
    });
};

btnSave.onclick = () => {
    let txtNombreCategoria = document.getElementById("nombreCategoria");
    
    if (txtNombreCategoria.value.trim() === "") {
        alert("ERROR: CAMPO VACÍO");
        return;
    }
    
    const categoria = {
        nombre: txtNombreCategoria.value
    }
    
    categorias.push(categoria);
    localStorage.setItem("categorias", JSON.stringify(categorias));
    
    document.getElementById("addCategorias").close();
    txtNombreCategoria.value = "";
    
    cargarCategorias();
}

btnEdit.onclick = () => {
    let txtNombreCategoriaE = document.getElementById("nombreCategoriae");
    let posicion = document.getElementById("posicion");
    
    if (txtNombreCategoriaE.value.trim() === "") {
        alert("ERROR: CAMPO VACÍO");
        return;
    }
    
    categorias[posicion.value].nombre = txtNombreCategoriaE.value;
    localStorage.setItem("categorias", JSON.stringify(categorias));
    
    document.getElementById("editCategoria").close();
    txtNombreCategoriaE.value = "";
    
    cargarCategorias();
}

const cargarCategorias = () => {
    let posicion = 0;
    categorias = JSON.parse(localStorage.getItem("categorias")) || [];
    let tabla = document.getElementById("categorias");
    let contenido = "";

    categorias.map((categoria) => {
        contenido += `<tr>
        <td class="text-center align-middle">${categoria.nombre.toUpperCase()}</td>
        <td class="text-center">
            <button class="btn-solid btn-styled theme-danger" onclick="eliminarCategoria(${posicion})"><i class="bi bi-trash"></i></button>
            <button class="btn-solid btn-styled theme-warning" data-bs-toggle="dialog" data-bs-target="#editCategoria" onclick="editarCategoria(${posicion})"><i class="bi bi-pencil"></i></button>
        </td>
        </tr>`;
        posicion++;
    });

    if ($.fn.DataTable.isDataTable("#tablaCategorias")) {
        $("#tablaCategorias").DataTable().destroy();
    }
    
    tabla.innerHTML = contenido;

    inicializarDataTable();
}
cargarCategorias();

const editarCategoria = (posicion) => {
    const categoria = categorias[posicion];
    document.getElementById("nombreCategoriae").value = categoria.nombre;
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

const eliminarCategoria = (posicion) => {
    swalWithBootstrapButtons.fire({
        title: "ELIMINAR REGISTRO",
        text: "¿Estás seguro de eliminar esta categoría?",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "SÍ",
        cancelButtonText: "NO",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            categorias.splice(posicion, 1);
            localStorage.setItem("categorias", JSON.stringify(categorias));
            cargarCategorias();
            negro.fire({ title: "¡ÉXITO!", text: "Se eliminó correctamente", icon: "success" });
        }
    });
}