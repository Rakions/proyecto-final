//añadimos a variables los elementos que vallamos a utilizar
// const bloque = document.getElementById("search-form");
const barraBusqueda = document.getElementById("search-input");
const tablaOpciones = document.getElementById("search-results");

//cuando escribamos ejecuta el codigo
barraBusqueda.addEventListener("keyup", function (event) {
    event.preventDefault();     //evita que se haga submit cada vez que se ejecuta la funcion
    tablaOpciones.innerHTML = "";
    if (barraBusqueda.value == 0) {
        tablaOpciones.style.visibility = "hidden";
    } else {
        tablaOpciones.style.visibility = "";
        const palabraClave = barraBusqueda.value.toLowerCase(); //recoje lo que hay escrito en la barra de busqueda
        const menuItems = document.querySelectorAll(".menu-item");  //recoje todos los items con la clase "menu-item"
        const results = [];

        //por cada elemento de menuItems...
        menuItems.forEach(function (menuItem) {
            const menuItemText = menuItem.textContent.toLowerCase();
            if (menuItemText.indexOf(palabraClave) !== -1) {
                divResult = menuItem.parentNode;
                divResult.style.width = "200px"
                divResult.style.height = "170px"
                results.push(menuItem.parentNode);
            }
        });
        if(results.length == 0){
            tablaOpciones.innerHTML = "No coincide ningun elemento"
        }else{
            displayResults(results);
        }
    }


});

function displayResults(results) {
    results.forEach(function (result) {
        const clon = result.cloneNode(true);
        tablaOpciones.appendChild(clon);
    });
}