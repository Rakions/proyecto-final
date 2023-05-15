import { logJSONData } from "./login.js";
var usuarios;
var products;
var edit_users = document.querySelector(".edit_users");
var edit_products = document.querySelector(".edit_products");
var cabecera = document.querySelector(".dashboard_cabecera");
var lista_content = document.querySelector(".dashboard_user_list");

addEventListener("load", () => {
    clearScreen();
});

edit_products.addEventListener("click", () => {
    clearScreen();
    renderProducts();
});

edit_users.addEventListener("click", () => {
    clearScreen();
    renderUsers();
});

function clearScreen() {
    cabecera = document.querySelector(".dashboard_cabecera");
    lista_content = document.querySelector(".dashboard_user_list");
    lista_content.innerHTML = "";
    cabecera.innerHTML = "";
}

async function renderUsers() {
    usuarios = await logJSONData("usuarios/consultar");
    lista_content = document.querySelector(".dashboard_user_list");
    cabecera = document.querySelector(".dashboard_cabecera");
    cabecera.innerHTML = `
            <ul class="dashboard_grid uppercase">
                <li>User ID</li>
                <li>Name</li>
                <li>Surname</li>
                <li>Email</li>
            </ul>`
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
    lista_content = document.querySelector(".dashboard_user_list");
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