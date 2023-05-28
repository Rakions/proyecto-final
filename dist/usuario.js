addEventListener("DOMContentLoaded", async () => {
    // Esperar a que se cargue el contenido
    // await getUser();
    await renderUserDetails();
})

async function getUser() {
    // Obtener el usuario actual basado en el token almacenado en localStorage
    var user = await conexion("sessions/buscarToken", "token=" + localStorage.getItem("idToken"));
    user = await conexion("usuarios/buscar", "id=" + user[0]["user_id"]);
    return user;
}

async function renderUserDetails() {
    // Renderizar los detalles del usuario en la página

    var user = await getUser();
    var info_user = document.querySelector(".info_obligatoria");
    var nombre_persona = document.querySelector(".nombre_persona");
    console.log(user[0]);
    nombre_persona.innerHTML = `Hola, ${user[0]["user_name"]}`;
    info_user.innerHTML =
        `
            <div>
                <input type="text" name="nombre" id="nombre" placeholder="${user[0]["user_name"]}">
                <button class="edit_info_obligatoria" onclick="editUserDetails('name')">EDITAR</button>
            </div>
            <div>
                <input type="text" name="apellido" id="apellido" placeholder="${user[0]["user_surname"]}">
                <button class="edit_info_obligatoria" onclick="editUserDetails('surname')">EDITAR</button>
            </div>
            <div>
                <input type="text" name="email" id="email" placeholder="${user[0]["email"]}">
                <button class="edit_info_obligatoria" onclick="editUserDetails('email')">EDITAR</button>
            </div>
            <div>
                <input type="password" id="contra" placeholder="●●●●●●●●●●" name="password">
                <button class="edit_info_obligatoria" onclick="editUserDetails('password')">EDITAR</button>
            </div>
            <div>
                <input type="text" name="username" id="username" placeholder="${user[0]["username"]}">
                <button class="edit_info_obligatoria" onclick="editUserDetails('username')">EDITAR</button>
            </div>
            <div>
                <input type="number" id="phone" placeholder="${user[0]["phone"]}" min="0">
                <button class="edit_info_obligatoria" onclick="editUserDetails('phone')">EDITAR</button>
            </div>
    `
}

async function editUserDetails(opcion) {
    // Editar los detalles del usuario según la opción seleccionada

    var user = await getUser();
    let datos;
    switch (opcion) {
        case "name":
            var nombre = document.getElementById("nombre").value;
            datos = {
                "user_id": user[0]["user_id"],
                "user_name": nombre
            }
            await conexionPut("usuarios/modificar/nombre", datos);
            break;
        case "surname":
            var apellido = document.getElementById("apellido").value;
            datos = {
                "user_id": user[0]["user_id"],
                "user_surname": apellido
            }
            await conexionPut("usuarios/modificar/apellido", datos);
            break;
        case "email":
            var email = document.getElementById("email").value;
            datos = {
                "user_id": user[0]["user_id"],
                "email": email
            }
            await conexionPut("usuarios/modificar/correo", datos);
            break;
        case "password":
            var password = document.getElementById("contra").value;
            datos = {
                "user_id": user[0]["user_id"],
                "password": password
            }
            await conexionPut("usuarios/modificar/contra", datos);
            break;
        case "username":
            var username = document.getElementById("username").value;
            datos = {
                "user_id": user[0]["user_id"],
                "username": username
            }
            await conexionPut("usuarios/modificar/username", datos);
            break;
        case "phone":
            var phone = document.getElementById("phone").value;
            datos = {
                "user_id": user[0]["user_id"],
                "phone": phone
            }
            await conexionPut("usuarios/modificar/telefono", datos);
            break;
    }
}