//añadimos a variables los elementos que vallamos a utilizar
// const bloque = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

//cuando escribamos ejecuta el codigo
searchInput.addEventListener("keyup", function (event) {
    event.preventDefault();     //evita que se haga submit cada vez que se ejecuta la funcion
    searchResults.innerHTML = "";
    if (searchInput.value == 0) {
        searchResults.style.visibility = "hidden";
    } else {
        searchResults.style.visibility = "";
        const keyWord = searchInput.value.toLowerCase(); //recoje lo que hay escrito en la barra de busqueda
        const menuItems = document.querySelectorAll(".menu-item");  //recoje todos los items con la clase "menu-item"
        const results = [];

        //por cada elemento de menuItems...
        menuItems.forEach(function (menuItem) {
            const menuItemText = menuItem.textContent.toLowerCase();
            if (menuItemText.indexOf(keyWord) !== -1) {
                results.push(menuItem.parentNode);
            }
        });
        if(results.length == 0){
            searchResults.innerHTML = "No coincide ningun elemento"
        }else{
            displayResults(results);
        }
    }


});

function displayResults(results) {
    results.forEach(function (result) {
        const clon = result.cloneNode(true);
        searchResults.appendChild(clon);
    });
}