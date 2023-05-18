var usuarios;
var products;
var categorias;
var boton = document.querySelector(".primary");
var modal = document.querySelector(".modal");
var lista_content = document.querySelector(".dashboard_list");
var cabecera = document.querySelector(".dashboard_cabecera");
var edit_users = document.querySelector(".edit_users");
var edit_products = document.querySelector(".edit_products");
var edit_categories = document.querySelector(".edit_categories");
var add_users = document.querySelector(".add_users");
var add_products = document.querySelector(".add_products");
var add_categories = document.querySelector(".add_categories");

addEventListener("load", () => {
    clearScreen();
});

add_users.addEventListener("click", () => {
    clearScreen();
    toggleModal("usuarios2");
})


add_products.addEventListener("click", () => {
    clearScreen();
    toggleModal("productos2");
})

add_categories.addEventListener("click", () => {
    clearScreen();
    toggleModal("categorias2");
})

edit_products.addEventListener("click", () => {
    clearScreen();
    cabeceraProductos();
    renderProducts();
});

edit_users.addEventListener("click", () => {
    clearScreen();
    cabeceraUsers();
    renderUsers();
});

function clearScreen() {
    lista_content = document.querySelector(".dashboard_list");
    cabecera = document.querySelector(".dashboard_cabecera");
    cabecera.innerHTML = "";
    lista_content.innerHTML = "";
}

function cabeceraCategories() {
    cabecera.innerHTML = `
    <th>Category ID</th>
    <th>Name</th>`
}

function cabeceraUsers() {
    cabecera.innerHTML = `
        <th>User ID</th>
        <th>Name</th>
        <th>Surname</th>
        <th>Email</th>
        <th>Password</th>
        <th>Username</th>
        <th>Phone</th>
        <th>Last connection</th>
        `
}

function cabeceraProductos() {
    cabecera.innerHTML = `
        <th>Product ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Stock</th>
        <th>Reviews</th>
        <th>Category ID</th>
        <th>Price</th>
        <th>Image URL</th>
        `
}

edit_categories.addEventListener("click", () => {
    clearScreen();
    cabeceraCategories();
    renderCategories();
});

async function renderCategories() {
    categorias = await conexion("categorias/consultar");
    lista_content = document.querySelector(".dashboard_list");
    for (let index = 0; index < categorias.length; index++) {
        lista_content.innerHTML += `
                <tr>
                <td>${categorias[index]["category_id"]}</td>
                <td>${categorias[index]["category_name"]}</td>
                <td><button onclick="getIdCategoria(${categorias[index]["category_id"]});toggleModal(\'categorias\')" id="primary">Edit</button></td>
                <td><button onclick="borrarCategories(${categorias[index]["category_id"]})">Delete</button></td>
                </tr>`
    }

}

async function renderUsers() {
    usuarios = await conexion("usuarios/consultar");
    lista_content = document.querySelector(".dashboard_list");
    for (let index = 0; index < usuarios.length; index++) {
        lista_content.innerHTML += `
                <tr>
                    <td>${usuarios[index]["user_id"]}</td>
                    <td>${usuarios[index]["user_name"]}</td>
                    <td>${usuarios[index]["user_surname"]}</td>
                    <td>${usuarios[index]["email"]}</td>
                    <td>${usuarios[index]["password"]}</td>
                    <td>${usuarios[index]["username"]}</td>
                    <td>${usuarios[index]["phone"]}</td>
                    <td>${usuarios[index]["last_connection"]}</td>
                    <td><button onclick="getIdUsuario(${usuarios[index]["user_id"]});toggleModal(\'usuarios\')">Edit</button></td>
                    <td><button onclick="borrarUsers(${usuarios[index]["user_id"]})">Delete</button></td>
                </tr>
                `
    }
}

async function renderProducts() {
    products = await conexion("products/consultar");
    lista_content = document.querySelector(".dashboard_list")
    for (let index = 0; index < products.length; index++) {
        lista_content.innerHTML += `
            <tr>
                <td>${products[index]["products_id"]}</td>
                <td>${products[index]["product_name"]}</td>
                <td>${products[index]["product_description"]}</td>
                <td>${products[index]["stock"]}</td>
                <td>${products[index]["reviews"]}</td>
                <td>${products[index]["category_id"]}</td>
                <td>${products[index]["price"]}</td>
                <td>${products[index]["image_url"]}</td>
                <td><button onclick="getIdProductos(${products[index]["products_id"]});toggleModal(\'productos\')">Edit</button></td>
                <td><button onclick="borrarProducts(${products[index]["products_id"]})">Delete</button></td>
            </tr>`
    }
}


//------------------------------Editar productos------------------------------\\
