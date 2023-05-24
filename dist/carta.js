let carta_content = document.querySelector(".carta-content");
let cafes = document.querySelector(".cafes");
let bebidas_frias = document.querySelector(".bebidas-frias");
let te = document.querySelector(".te");

let producto;
let content;

//Hace una consulta a la base de datos lo primero de todo
addEventListener("load", () => {
  getProducto();
});

//Event listeners para cuando se hace click en los iconos de la barra izquierda
cafes.addEventListener("click",() =>{
  cafes = document.querySelector(".cafes");
  limpiarCarta();
  renderContent(1);  
});
bebidas_frias.addEventListener("click",() =>{
  bebidas_frias = document.querySelector(".bebidas");
  limpiarCarta();
  renderContent(2);  
});
te.addEventListener("click",() =>{
  te = document.querySelector(".te");
  limpiarCarta();
  renderContent(3);  
});

//Funcion para limpiar la carta
function limpiarCarta(){
  carta_content.innerHTML = "";
}

//Consulta que devuelve todos los productos
async function getProducto() {
  producto = await conexion("products/consultar");
}

//Renderiza los elementos dependiendo de la categoria a la que pertenezcan
async function renderContent(category_id) {
  for (let index = 0; index < producto.length; index++) {
    renderCafes(index,category_id);
  }
}

//Renderiza solo los productos con el id de la categoria que se le pasa en la variable 'categoria'
function renderCafes(index,categoria){
  if (producto[index]["category_id"] == categoria) {
    carta_content.innerHTML += `<a href="#" onclick="agregarCarrito(${producto[index]["products_id"]})" <div class="h-[300px] w-[300px] flex items-center justify-center flex-col shadow-lg rounded-xl bg-[var(--color-oscuro)] text-[var(--color-texto)]">
    <img src="${producto[index]["image_url"]}" alt=""
      class="h-2/3 mb-4" />
    <p>${producto[index]["product_name"]}</p>
    <p>${producto[index]["price"] + "€"}</p>
    </div></a>`;
  }
}



