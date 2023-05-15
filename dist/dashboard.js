import { logJSONData } from "./login.js";
var usuarios;
var products;
var categorias;
var lista_content = document.querySelector(".dashboard_list");
var cabecera = document.querySelector(".dashboard_cabecera");
var edit_users = document.querySelector(".edit_users");
var edit_products = document.querySelector(".edit_products");
var edit_categories = document.querySelector(".edit_categories");

addEventListener("load", () => {
    clearScreen();
});

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

edit_categories.addEventListener("click", () =>{
    clearScreen();
    cabeceraCategories();
    renderCategories();
})

function clearScreen() {
    lista_content = document.querySelector(".dashboard_list");
    cabecera = document.querySelector(".dashboard_cabecera");
    cabecera.innerHTML = "";
    lista_content.innerHTML = "";
}

function cabeceraCategories(){
    cabecera.innerHTML = `
    <li>Category ID</li>
    <li>Name</li>`
}

function cabeceraUsers() {
    cabecera.innerHTML = `
        <li>User ID</li>
        <li>Name</li>
        <li>Surname</li>
        <li>Email</li>`
}

function cabeceraProductos() {
    cabecera.innerHTML = `
        <li>Product ID</li>
        <li>Name</li>
        <li>Description</li>
        <li>Price</li>`
}

async function renderCategories(){
    categorias = await logJSONData("categorias/consultar");
    lista_content = document.querySelector(".dashboard_list");
    for (let index = 0; index < categorias.length; index++) {
        lista_content.innerHTML += `
            <li class="dashboard_grid">
                <p>${categorias[index]["category_id"]}</p>
                <p>${categorias[index]["category_name"]}</p>
                <button>Edit</button>
            </li>`
    }
}

async function renderUsers() {
    usuarios = await logJSONData("usuarios/consultar");
    lista_content = document.querySelector(".dashboard_list");
    for (let index = 0; index < usuarios.length; index++) {
        lista_content.innerHTML += `
            <li class="dashboard_grid">
                <p>${usuarios[index]["user_id"]}</p>
                <p>${usuarios[index]["user_name"]}</p>
                <p>${usuarios[index]["user_surname"]}</p>
                <p>${usuarios[index]["email"]}</p>
                <button>Edit</button>
            </li>`
    }
}

async function renderProducts() {
    products = await logJSONData("products/consultar");
    lista_content = document.querySelector(".dashboard_list")
    for (let index = 0; index < products.length; index++) {
        lista_content.innerHTML += `
            <li class="dashboard_grid">
                <p>${products[index]["products_id"]}</p>
                <p>${products[index]["product_name"]}</p>
                <p>${products[index]["product_description"]}</p>
                <p>${products[index]["price"]}</p>
                <button>Edit</button>
            </li>`
    }
}