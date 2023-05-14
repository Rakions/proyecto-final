import { logJSONData } from "./login.js";
let usuarios;
let lista_usuarios;

addEventListener("load", () => {
    renderUsers();
});


async function renderUsers() {
    usuarios = await logJSONData("usuarios/consultar");
    lista_usuarios = document.querySelector(".dashboard_user_list");
    for (let index = 0; index < usuarios.length; index++) {
        lista_usuarios.innerHTML += `
            <li class="dashboard_grid">
                <p>${usuarios[index]["user_id"]}</p>
                <p>${usuarios[index]["user_name"]}</p>
                <p>${usuarios[index]["user_surname"]}</p>
                <p>${usuarios[index]["email"]}</p>
            </li>` 
    }
    
}