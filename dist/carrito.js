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
      await conexionPut("orders_details/modificar/quantity", dataDetails)
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


      var productInfo = await conexion("products/buscar", ("id=" + product["product_id"]));

      const carrito = document.getElementById("carrito-container");

      carrito.innerHTML +=
        `
          <li class="grid grid-cols-3 w-full px-4 cart_item list1" id= product${product["product_id"]}>
            <div class="flex items-center">
              <img src=" ${productInfo[0]["image_url"]}">
              <p class="max-w-[100px] ml-4 product_name">${productInfo[0]["product_name"]}</p>
            </div>
            <div class="flex items-center justify-evenly">
              <h1 class="item_price">${productInfo[0]["price"]}€</h1>
              <div>
                <button class="w-4 text-xl" onclick="modificarCantidad(${product["orders_id"]}, ${product["product_id"]}, 1)">+</button>
                <span class="product_amount1" id="cantidad${product["product_id"]}">${product["quantity"]}</span>
                <button class="w-4 text-xl" onclick="modificarCantidad(${product["orders_id"]}, ${product["product_id"]}, (-1))">-</button>
              </div>
            </div>
            <div class="flex items-center justify-evenly">
              <div id="precio-total${product["product_id"]}" class="text-center">${productInfo[0]["price"] * product["quantity"]}€</div>
              <button onclick="modificarCantidad(${product["orders_id"]}, ${product["product_id"]}, 0)">X</button>
            </div>
          </li>
          `

      precioTotal(productInfo[0]["price"] * product["quantity"]);
    });
  }



}
function precioTotal(precio) {
  document.getElementById("subtotal").innerHTML = parseInt(document.getElementById("subtotal").innerHTML) + precio + "€";
  document.getElementById("Total").innerHTML = document.getElementById("subtotal").innerHTML
}


async function modificarCantidad(order, product, action) {

  product = (await conexion("orders_details/buscarOrderProduct", "orders_id=" + order + "&product_id=" + product))[0];

  action = (action == undefined ? 1 : action);

  if (action > 0) {
    await agregarCarrito(product["product_id"]);
  } else if (action < 0) {
    await eliminarCarrito(product, false);
  } else {
    await eliminarCarrito(product, true);
  }

  product = (await conexion("orders_details/buscarOrderProduct", "orders_id=" + order + "&product_id=" + product["product_id"]))[0];

  var productInfo = await conexion("products/buscar", "id=" + product["product_id"])

  var cantidad = product["quantity"]
  var total = productInfo[0]["price"] * cantidad;

  document.getElementById("cantidad" + [product["product_id"]]).innerHTML = cantidad
  document.getElementById("precio-total" + [product["product_id"]]).innerHTML = total + "€"
  precioTotal(productInfo[0]["price"] * action)
}

async function eliminarCarrito(product, todo) {


  if (todo) {
    var data = {
      "orders_id": product["orders_id"],
      "product_id": product["product_id"]
    }
    await conexionDelete("orders_details/eliminar", data);
    document.getElementById("product" + product["product_id"]).style.display = "none"
  } else {
    var dataDetails = {
      "orders_id": product["orders_id"],
      "product_id": product["product_id"],
      "quantity": (product["quantity"]) - 1
    }
    conexionPut("orders_details/modificar/quantity", dataDetails);
    var productInfo = await conexion("products/buscar", "id=" + product["product_id"])

    document.getElementById("cantidad" + [product["product_id"]]).innerHTML = product["quantity"] - 1
    document.getElementById("precio-total" + [product["product_id"]]).innerHTML = productInfo[0]["price"] * product["quantity"];
    if (product["quantity"] - 1 <= 0) {
      var data = {
        "orders_id": product["orders_id"],
        "product_id": product["product_id"]
      }
      await conexionDelete("orders_details/eliminar", data);
      document.getElementById("product" + product["product_id"]).style.display = "none"
    }
  }
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


