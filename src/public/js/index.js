// Conectar con el servidor de sockets
const socket = io();
const btnAdd = document.getElementById("btnAdd");
const btnDel = document.getElementById("btnDel");

// Evento para agregar producto al hacer clic en el botón
btnAdd.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const code = document.getElementById("code").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;
    
    if (!title || !description || !price || !code || !stock || !category) {
        // Mostrar SweetAlert con el mensaje de error si algún campo está vacío
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Todos los campos son obligatorios",
        });
        return;
    }
    // Si todos los campos están completos, creo un obj con la info
    const product = {
        title,
        description,
        price,
        code,
        stock,
        category,
    };
    // Emitir el evento para agregar un nuevo producto al servidor
    socket.emit('newProduct', product);
    Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Producto agregado con exito",
    });
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("code").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("category").value = "";
});

// Evento para eliminar producto al hacer clic en el botón
btnDel.addEventListener("click", (e) => {
    e.preventDefault();
    const productId = document.getElementById("pid").value;
    if (productId.length !== 24) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "El ID del producto no es válido",
        });
        return;
    }

    Swal.fire({
        icon: "warning",
        title: "¿Está seguro?",
        text: "Esta acción eliminará el producto. ¿Desea continuar?",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        dangerMode: true,
    }).then((result) => {
        if (result.isConfirmed) {
            socket.emit('deleteProduct', productId);
            Swal.fire({
                icon: "success",
                title: "Éxito",
                text: "Producto eliminado con exito",
            });
            document.getElementById("pid").value = "";
        }
    });
});

// Escuchar el evento de agregar un nuevo producto
socket.on('newProductAdded', (newProduct) => {
    const tableBody = document.querySelector('#productsTable tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${newProduct._id}</td>
    <td>${newProduct.title}</td>
    <td>${newProduct.description}</td>
    <td>${newProduct.price}</td>
    <td>${newProduct.code}</td>
    <td>${newProduct.stock}</td>
    <td>${newProduct.status}</td>
    <td>${newProduct.category}</td>
    `;
    tableBody.appendChild(row);
});

// Escuchar el evento de eliminar un producto
socket.on("productDeleted", (productId) => {
    const tableBody = document.querySelector("#productsTable tbody");
    const rows = tableBody.querySelectorAll("tr");
    for (const row of rows) {
        const idCell = row.querySelector("td");
        if (idCell && idCell.textContent === String(productId)) {
            row.remove();
            break;
        }
    }
});