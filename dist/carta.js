let carta_content = document.querySelector(".carta-content");
let cafes = document.querySelector(".cafes");
let bebidas_frias = document.querySelector(".bebidas_frias");
let te = document.querySelector(".te");
let bocadillos = document.querySelector(".bocadillos");

let producto;
let content;

//Hace una consulta a la base de datos lo primero de todo
addEventListener("load", async() => {
  await getProducto();
  renderContent(1);
  renderContent(2);
  renderContent(3);
});

//Funcion para limpiar la carta
function limpiarCarta(){
  cafes.innerHTML = "";
  bebidas_frias.innerHTML = "";
  te.innerHTML = "";
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
  switch (categoria) {
    case 1:
      if (producto[index]["category_id"] == 1) {
        cafes.innerHTML += `<a href="#" onclick="agregarCarrito(${producto[index]["products_id"]})" <div class="h-[300px] w-[300px] flex items-center justify-center flex-col rounded-xl text-[var(--color-oscuro)] producto shadow-xl">
        <img src="${producto[index]["image_url"]}" alt=""
          class="h-2/3 mb-4" />
        <p>${producto[index]["product_name"]}</p>
        <p>${producto[index]["price"] + "€"}</p>
        </div></a>`;
      }
      break;
      case 2:
        if (producto[index]["category_id"] == 2) {
          bebidas_frias.innerHTML += `<a href="#" onclick="agregarCarrito(${producto[index]["products_id"]})" <div class="h-[300px] w-[300px] flex items-center justify-center flex-col rounded-xl text-[var(--color-oscuro)] producto shadow-xl">
          <img src="${producto[index]["image_url"]}" alt=""
            class="h-2/3 mb-4" />
          <p>${producto[index]["product_name"]}</p>
          <p>${producto[index]["price"] + "€"}</p>
          </div></a>`;
        }
      break;
      case 3:
        if (producto[index]["category_id"] == 3) {
          te.innerHTML += `<a href="#" onclick="agregarCarrito(${producto[index]["products_id"]})" <div class="h-[300px] w-[300px] flex items-center justify-center flex-col rounded-xl text-[var(--color-oscuro)] producto shadow-xl">
          <img src="${producto[index]["image_url"]}" alt=""
            class="h-2/3 mb-4" />
          <p>${producto[index]["product_name"]}</p>
          <p>${producto[index]["price"] + "€"}</p>
          </div></a>`;
        }
      break;
   
  }
  
}



