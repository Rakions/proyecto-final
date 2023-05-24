async function agregarCarrito(product_id) {
  var user = await conexion("sessions/buscarToken", "token=" + localStorage.getItem("idToken"))
  if (user.length > 0) {
    var order = await buscarOrderAbierta(user[0]["user_id"]);
    if (order == "close") {
      var data = {
        "user_id": user[0]["user_id"],
        "shop_id": 1,
        "order_date": "",
        "address": "",
        "total_price": "",
        "order_state": "open"
      }
      await conexionPost("orders/crear", data)
      order = await buscarOrderAbierta(user[0]["user_id"])
    }
    var orderDetails = await conexion("orders_details/buscarOrderProduct", "orders_id=" + order["orders_id"] + "&product_id=" + product_id);
    if (orderDetails.length > 0) {
      var dataDetails = {
        "orders_id": order["orders_id"],
        "product_id": product_id,
        "quantity": (orderDetails[0]["quantity"]) + 1
      }
      conexionPut("orders_details/modificar/quantity", dataDetails)
    } else {
      var dataDetails = {
        "orders_id": order["orders_id"],
        "product_id": product_id,
        "quantity": 1
      }
      conexionPost("orders_details/crear", dataDetails)
    }
  } else {
    alert("Tienes que estar registrado para añadir productos al carrito")
  }
}


async function buscarOrderAbierta(user_id) {
  var orders = await conexion("orders/buscarUser_id", "id=" + user_id);
  var estado = "close";
  var i = 0;
  while (i < orders.length && estado != "open") {
    if (orders[i]["order_state"] == "open") {
      estado = orders[i]["order_state"];
    }
    i++;
  }
  if (estado == "open") {
    i--;
    estado = orders[i];
  }
  return estado;
}


async function construirCarrito() {

  var user = await conexion("sessions/buscarToken", "token=" + localStorage.getItem("idToken"))
  var order = await buscarOrderAbierta(user[0]["user_id"]);
  var productos = await conexion("orders_details/buscar", "id=" + order["orders_id"])
  if (productos.length > 0) {
    productos.forEach(async function (product) {


      var result = await conexion("products/buscar", ("id=" + product["product_id"]));

      const carrito = document.getElementById("carrito-container");

      carrito.innerHTML +=
        `
          <li class="grid grid-cols-3 w-full px-4 cart_item list1" id= product"${product["product_id"]}">
            <div class="flex items-center">
              <img src=" ${result[0]["image_url"]}">
              <p class="max-w-[100px] ml-4 product_name">${result[0]["product_name"]}</p>
            </div>
            <div class="flex items-center justify-evenly">
              <h1 class="item_price1">${result[0]["price"]}€</h1>
              <div>
                <button class="w-4 text-xl" onclick="modificarCantidad(${product["product_id"]}, 1)">+</button>
                <span class="product_amount1" id="cantidad${product["product_id"]}">${product["quantity"]}</span>
                <button class="w-4 text-xl" onclick="modificarCantidad(${product["product_id"]}, (-1))">-</button>
              </div>
            </div>
            <div class="flex items-center justify-evenly">
              <div id="precio-total${product}" class="text-center">${result[0]["price"]}€</div>
              <button onclick="modificarCantidad(${product}, 0)">X</button>
            </div>
          </li>
          `

      // if (document.getElementById("product" + product["product_id"]) == null) {


      //   document.getElementById("precio-total").innerHTML = result[0]["price"] * document.getElementById("cantidad" + product["product_id"]).innerHTML
      // } else {
      //   document.getElementById("cantidad" + product["product_id"]).innerHTML = parseInt(document.getElementById("cantidad" + product_id).innerHTML) + 1;
      //   document.getElementById("precio-total" + product["product_id"]).innerHTML = result[0]["price"] * document.getElementById("cantidad" + product["product_id"]).innerHTML
      // }
      precioTotal(result[0]["price"] * product["quantity"]);
    });
  }



}
function precioTotal(precio, action) {
  document.getElementById("subtotal").innerHTML = parseInt(document.getElementById("subtotal").innerHTML) + precio + "€";
  document.getElementById("Total").innerHTML = document.getElementById("subtotal").innerHTML
}


async function modificarCantidad(product, action) {
  
  var result = await conexion("products/buscar", "id=" + product)
  action = (action == undefined ? 1 : action);
  var precio = result[0]["price"] * action;
  var cantidad = document.getElementById("cantidad" + product);
  var total = document.getElementById("precio-total" + product);
  if (action > 0) {
    agregarCarrito(product);
  } else if (action < 0) {
    eliminarCarrito(product, false);
  } else {
    eliminarCarrito(product, true);
  }
  cantidad.innerHTML = parseInt(cantidad.innerHTML) + precio;
  total.innerHTML = parseInt(total.innerHTML) + precio;
  precioTotal(precio, action)
}

function eliminarCarrito(product_id, todo) {
  var productos = new Array();
  productos = JSON.parse(localStorage.getItem('carrito'));
  if (!todo) {
    productos.splice(productos.indexOf(product_id), 1);
  } else {
    productos = productos.filter(product => product != product_id);
  }
  if (productos.indexOf(product_id) == -1) {
    document.getElementById("product" + product_id).style.display = "none"
  }
  localStorage.setItem('carrito', JSON.stringify(productos));
}

//-------------------------CHECKOUT----------------------//

function irCheckout() {

  window.location.href = "./checkout.html?precioTotal=" + encodeURIComponent(precio_Total);
}

function getPrecio() {
  var precioTotal = new URLSearchParams(window.location.search);
  precioTotal = precioTotal.get("precioTotal");
  console.log(precioTotal)
  document.getElementById("precioTotal_checkout").innerHTML += " " + precioTotal;
}


