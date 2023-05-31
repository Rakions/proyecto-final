function mandarNombre(){
    let nombre = document.querySelector(".nombreAutoria").value;
    let displayNombre = document.querySelector(".display_nombre");
    displayNombre.innerHTML = "Hola, " + nombre;
}