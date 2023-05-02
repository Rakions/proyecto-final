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
            if (menuItemText.indexOf(palabraClave) !== -1) { //comprueba si la palabra clave es un elemento del menu, si no lo es la funcion devuelve -1
                divResult = menuItem.parentNode;
                results.push(divResult);
            }
        });
        if (results.length == 0) {
            tablaOpciones.innerHTML = "No coincide ningun elemento"
        } else {
            displayResults(results);
        }
    }


});

function displayResults(results) {
    results.forEach(function (result) {
        const clon = result.cloneNode(true); //clona los divs que le mada la funcion anterior
        clon.classList.add("searchResult") //les añade la clase
        clon.insertAdjacentHTML('beforeend', '<button class="btnAddCesta" onclick="">Añadir al carrito</button>') //añade un boton
        tablaOpciones.appendChild(clon);
    });
}