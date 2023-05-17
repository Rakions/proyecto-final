//añadimos a variables los elementos que vallamos a utilizar
// const bloque = document.getElementById("search-form");
const barraBusqueda = document.getElementById("search-input");
const tablaOpciones = document.getElementById("search-results");

//cuando escribamos ejecuta el codigo
barraBusqueda.addEventListener("keyup", async function (event) {
  event.preventDefault(); //evita que se haga submit cada vez que se ejecuta la funcion
  tablaOpciones.innerHTML = "";
  if (barraBusqueda.value == 0) {
    tablaOpciones.style.visibility = "hidden";
  } else {
    tablaOpciones.style.visibility = "";
    const palabraClave = barraBusqueda.value.toLowerCase(); //recoje lo que hay escrito en la barra de busqueda
    const menuItems = await conexion("products/consultar") //recoje todos los items con la clase "menu-item"
    const results = [];

    //por cada elemento de menuItems...
    menuItems.forEach(function (menuItem) {
        const menuItemText = menuItem["product_name"]
        if (menuItemText.indexOf(palabraClave) !== -1) {
          //comprueba si la palabra clave es un elemento del menu, si no lo es la funcion devuelve -1
          results.push(menuItem);
        }
      });
    
    console.log(results)
    console.log(results.length)
    if (results.length == 0) {
      tablaOpciones.innerHTML = "No items found";
    } else {
      displayResults(results);
    }
  }
});

function displayResults(results) {
  results.forEach(function (result) {

    var div = document.createElement("div");
    div.innerHTML = result["product_name"];
    div.innerHTML += "<p>" + result["price"] + "€</p>"
    div.insertAdjacentHTML(
      "afterbegin",
      '<img src="' + result["image_url"] + '"/>'
    );
    div.classList.add("searchResult");
    div.insertAdjacentHTML(
      "beforeend",
      '<img src="../resources/cart-plus-solid.svg" alt="" class="btnAddCesta" onclick="agregarCarrito(result[\"product_id\"])"/>'
    );
    tablaOpciones.appendChild(div)
  });
}
