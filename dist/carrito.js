// Función asincrónica para agregar un producto al carrito
async function agregarCarrito(product_id) {
  // Obtener información del usuario actual
  var user = await conexion("sessions/buscarToken", "token=" + localStorage.getItem("idToken"))

  // Verificar si el usuario está registrado
  if (user.length > 0) {
    // Buscar una orden abierta para el usuario
    var order = await buscarOrderAbierta(user[0]["user_id"]);

    // Si no hay una orden abierta, crear una nueva
    if (order == "close") {
      var data = {
        "user_id": user[0]["user_id"],
        "shop_id": 1,
        "order_date": "",
        "address": "",
        "order_name": "",
        "order_surname": "",
        "total_price": "",
        "order_state": "open"
      }

      await conexionPost("orders/crear", data)
      order = await buscarOrderAbierta(user[0]["user_id"])
    }

    var orderPrecioTotal = order["total_price"];
    var orderDetails = await conexion("orders_details/buscarOrderProduct", "orders_id=" + order["orders_id"] + "&product_id=" + product_id);
    var product = await conexion("products/buscar", "id=" + product_id);

    // Verificar si el producto ya está en los detalles de la orden
    if (orderDetails.length > 0) {
      var dataDetails = {
        "orders_id": order["orders_id"],
        "product_id": product_id,
        "quantity": (orderDetails[0]["quantity"]) + 1
      }

      await conexionPut("orders_details/modificar/quantity", dataDetails);
    } else {
      var dataDetails = {
        "orders_id": order["orders_id"],
        "product_id": product_id,
        "quantity": 1
      }

      await conexionPost("orders_details/crear", dataDetails)
    }

    // Actualizar el precio total de la orden
    var orderTotal = {
      "orders_id": order["orders_id"],
      "total_price": orderPrecioTotal + (product[0]["price"])
    }
    await conexionPut("orders/modificar/total_price", orderTotal);
  } else {
    alert("Tienes que estar registrado para añadir productos al carrito")
  }
}

// Función asincrónica para buscar una orden abierta para un usuario específico
async function buscarOrderAbierta(user_id) {
  // Buscar todas las órdenes del usuario
  var orders = await conexion("orders/buscarUser_id", "id=" + user_id);
  var estado = "close";
  var i = 0;

  // Buscar la primera orden abierta
  while (i < orders.length && estado != "open") {
    if (orders[i]["order_state"] == "open") {
      estado = orders[i]["order_state"];
    }
    i++;
  }

  // Si se encontró una orden abierta, devolverla
  if (estado == "open") {
    i--;
    estado = orders[i];
  }

  return estado;
}


// Función asincrónica para construir el carrito
async function construirCarrito() {
  // Obtener información del usuario actual
  var user = await conexion("sessions/buscarToken", "token=" + localStorage.getItem("idToken"))
  var order = await buscarOrderAbierta(user[0]["user_id"]);

  // Verificar si hay una ordenabierta para el usuario actual
if (order != "close") {
  // Buscar los productos en los detalles de la orden
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



}


async function precioTotal(precio, cantidad) {
  if (cantidad == undefined) {
    document.getElementById("subtotal").innerHTML = parseFloat(document.getElementById("subtotal").innerHTML) + precio + "€";
  } else {
    document.getElementById("subtotal").innerHTML = parseFloat(document.getElementById("subtotal").innerHTML) + (precio * cantidad) + "€";
  }
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

    var productInfo = await conexion("products/buscar", "id=" + product["product_id"])

    var cantidad = product["quantity"]
    var total = productInfo[0]["price"] * cantidad;
    order = (await conexion("orders/buscar", "id=" + order))[0]
    var orderTotal = {
      "orders_id": product["orders_id"],
      "total_price": order["total_price"] - (total)
    }
    await conexionPut("orders/modificar/total_price", orderTotal);

    precioTotal(productInfo[0]["price"] * -1, cantidad)

    await eliminarCarrito(product, true);
  }

  if (action != 0) {
    product = (await conexion("orders_details/buscarOrderProduct", "orders_id=" + order + "&product_id=" + product["product_id"]))[0];

    var productInfo = await conexion("products/buscar", "id=" + product["product_id"])

    var cantidad = product["quantity"]
    var total = productInfo[0]["price"] * cantidad;

    document.getElementById("cantidad" + [product["product_id"]]).innerHTML = cantidad
    document.getElementById("precio-total" + [product["product_id"]]).innerHTML = total + "€"

    precioTotal(productInfo[0]["price"] * action)

  }

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

    var order = await conexion("orders/buscar", "id=" + product["orders_id"]);
    var productData = await conexion("products/buscar", "id=" + product["product_id"])
    var orderTotal = {
      "orders_id": product["orders_id"],
      "total_price": order[0]["total_price"] - (productData[0]["price"])
    }
    await conexionPut("orders/modificar/total_price", orderTotal);

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

async function irCheckout() {
  window.location.href = "./checkout.html";
}

async function getPrecio() {
  var user = await conexion("sessions/buscarToken", "token=" + localStorage.getItem("idToken"));
  var order = await buscarOrderAbierta(user[0]["user_id"]);
  var precioTotal = order["total_price"]
  document.getElementById("precioTotal_checkout").innerHTML += " " + precioTotal;
}

async function pagar() {

  var user = await conexion("sessions/buscarToken", "token=" + localStorage.getItem("idToken"))
  var order = await buscarOrderAbierta(user[0]["user_id"]);


  var direccion = document.getElementById("address").value;
  direccion += ", " + document.getElementById("city").value;
  direccion += ", " + document.getElementById("floor").value;
  direccion += ", " + document.getElementById("zip").value;

  var fecha;
  var date = new Date();

  var fecha;
  var date = new Date();
  fecha = date.getFullYear();
  fecha += "-" + (date.getUTCMonth() < 10 ? "0" + date.getUTCMonth() : date.getUTCMonth())
  fecha += "-" + date.getDate();

  console.log(fecha)

  var name = document.getElementById("name").value;
  var lastName = document.getElementById("l-name").value;

  dataAddress = {
    "orders_id": order["orders_id"],
    "address": direccion
  }

  dataFecha = {
    "orders_id": order["orders_id"],
    "order_date": fecha
  }

  dataName = {
    "orders_id": order["orders_id"],
    "order_name": name
  }

  dataSurname = {
    "orders_id": order["orders_id"],
    "order_surname": lastName
  }

  dataState = {
    "orders_id": order["orders_id"],
    "order_state": "completed"
  }

  console.log(dataAddress)
  await conexionPut("orders/modificar/address", dataAddress)
  await conexionPut("orders/modificar/order_date", dataFecha)
  await conexionPut("orders/modificar/order_name", dataName)
  await conexionPut("orders/modificar/order_surname", dataSurname)
  await conexionPut("orders/modificar/order_state", dataState)

  document.getElementById("checkoutForm").submit();
}


