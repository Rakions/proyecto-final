addEventListener("DOMContentLoaded", () => {
    renderUserDetails();
})

function renderUserDetails() {
    var info_user = document.querySelector(".info_obligatoria");
    info_user.innerHTML =
        `
    <div>
        <input type="text" name="nombre" placeholder="Name...">
        <button class="edit_info_obligatoria">EDIT</button>
    </div>
    <div>
        <input type="text" name="apellido" placeholder="Surname...">
        <button class="edit_info_obligatoria">EDIT</button>
    </div>
    <div>
        <input type="text" name="email" placeholder="Email...">
        <button class="edit_info_obligatoria">EDIT</button>
    </div>
    <div>
        <input type="password" placeholder="Password" name="password">
        <button class="edit_info_obligatoria">EDIT</button>
    </div>
    <div>
        <input type="text" name="username" placeholder="Username...">
        <button class="edit_info_obligatoria">EDIT</button>
    </div>
    <div>
        <input type="number" placeholder="Phone..." min="0">
        <button class="edit_info_obligatoria">EDIT</button>
    </div>
    `
}