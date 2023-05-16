function agregarCarrito(product_id) {
  var productos = new Array();
  if (localStorage.getItem('carrito') != null) {
    productos = JSON.parse(localStorage.getItem('carrito'));
    productos = productos;
    productos.push(product_id);
  } else {
    productos[0] = product_id
  }
  localStorage.setItem('carrito', JSON.stringify(productos));
}

function eliminarCarrito(product_id, todo) {
  var productos = new Array();
  productos = JSON.parse(localStorage.getItem('carrito'));
  if (!todo) {
    let eliminado = false;
    productos.splice(productos.indexOf(product_id), 1);
  }else{
    productos = productos.filter(product => product != product_id);
  }
  if(productos.indexOf(product_id) == -1){
    document.getElementById("product" + product_id).style.display = "none"
  }
  localStorage.setItem('carrito', JSON.stringify(productos));
}


async function construirCarrito() {

  var productos = localStorage.getItem('carrito');
  productos = JSON.parse(productos);

  if (productos != null) {
    productos.forEach(async function (product_id) {

      var result = await conexion("products/buscar", ("id=" + product_id));
      const carrito = document.getElementById("carrito-container");
      const divId = "product" + product_id;

      if (document.getElementById(divId) == null) {
        carrito.innerHTML +=
          `
          <li class="grid grid-cols-3 w-full px-4 cart_item list1" id="${divId}">
            <div class="flex items-center">
              <img src=" ${result[0]["image_url"]}">
              <p class="max-w-[100px] ml-4 product_name">${result[0]["product_name"]}</p>
            </div>
            <div class="flex items-center justify-evenly">
              <h1 class="item_price1">${result[0]["price"]}€</h1>
              <div>
                <button class="w-4 text-xl" onclick="modificarCantidad(${product_id}, 1)">+</button>
                <span class="product_amount1" id="cantidad${product_id}">1</span>
                <button class="w-4 text-xl" onclick="modificarCantidad(${product_id}, (-1))">-</button>
              </div>
            </div>
            <div class="flex items-center justify-evenly">
              <div id="precio-total${product_id}" class="text-center">${result[0]["price"]}€</div>
              <button onclick="modificarCantidad(${product_id}, 0)">X</button>
            </div>
          </li>
          `

        document.getElementById("precio-total" + product_id).innerHTML = result[0]["price"] * document.getElementById("cantidad" + product_id).innerHTML
      } else {
        document.getElementById("cantidad" + product_id).innerHTML = parseInt(document.getElementById("cantidad" + product_id).innerHTML) + 1;
        document.getElementById("precio-total" + product_id).innerHTML = result[0]["price"] * document.getElementById("cantidad" + product_id).innerHTML
      }
      document.getElementById("subtotal").innerHTML = parseInt(document.getElementById("subtotal").innerHTML) + result[0]["price"] + "€";
      document.getElementById("Total").innerHTML = document.getElementById("subtotal").innerHTML
    });
  }
}


function modificarCantidad(product, action) {
  var cantidad = document.getElementById("cantidad" + product);
  if(action > 0){
    agregarCarrito(product);
  }else if(action < 0){
    eliminarCarrito(product, false)
  }else{
    eliminarCarrito(product, true)
  }
  cantidad.innerHTML = parseInt(cantidad.innerHTML) + action;
}




