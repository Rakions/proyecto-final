// Función asincrónica para agregar un producto al carrito
async function agregarCarrito(products_id) {
  // Obtener información del usuario actual
  var user = await conexion("sessions/buscarToken", "token=" + localStorage.getItem("idToken"))

  // Verificar si el usuario está registrado
  if (user.length > 0) {
    // Buscar una orden abierta para el usuario
    var carrito = await buscarCarrito(user[0]["user_id"]);

    // Si no hay una orden abierta, crear una nueva
    if (carrito == "close") {
      var data = {
        "user_id": user[0]["user_id"],
        "total_price": 0
      }

      await conexionPost("carts/crear", data)
      carrito = await buscarCarrito(user[0]["user_id"])
    }

    var carritoPrecioTotal = carrito["total_price"];
    var carritoDetails = await conexion("carts_details/buscarCartProduct", "cart_id=" + carrito["cart_id"] + "&products_id=" + products_id);
    var product = await conexion("products/buscar", "id=" + products_id);

    // Verificar si el producto ya está en los detalles de la orden
    if (carritoDetails.length > 0) {
      var dataDetails = {
        "cart_id": carrito["cart_id"],
        "products_id": products_id,
        "quantity": (carritoDetails[0]["quantity"]) + 1
      }

      await conexionPut("carts_details/modificar/quantity", dataDetails);
    } else {
      var dataDetails = {
        "cart_id": carrito["cart_id"],
        "products_id": products_id,
        "quantity": 1
      }

      await conexionPost("carts_details/crear", dataDetails)
    }

    // Actualizar el precio total de la orden
    var cartTotal = {
      "cart_id": carrito["cart_id"],
      "total_price": carritoPrecioTotal + (product[0]["price"])
    }
    await conexionPut("carts/modificar/total_price", cartTotal);
  } else {
    alert("Tienes que estar registrado para añadir productos al carrito")
  }
}

// Función asincrónica para buscar una orden abierta para un usuario específico
async function buscarCarrito(user_id) {
  // Buscar todas las órdenes del usuario
  var carritos = await conexion("carts/buscarUser", "user_id=" + user_id);
  var estado = "close";

  if (carritos.length > 0) {
    estado = carritos[0]
  }

  return estado;
}


// Función asincrónica para construir el carrito
async function construirCarrito() {
  // Obtener información del usuario actual
  var user = await conexion("sessions/buscarToken", "token=" + localStorage.getItem("idToken"));
  var cart = await buscarCarrito(user[0]["user_id"]);

  // Verificar si hay una ordenabierta para el usuario actual
  if (cart != "close") {
    // Buscar los productos en los detalles de la orden
    var productos = await conexion("carts_details/buscar", "id=" + cart["cart_id"])
    if (productos.length > 0) {
      productos.forEach(async function (product) {


        var productInfo = await conexion("products/buscar", ("id=" + product["products_id"]));

        const carrito = document.getElementById("carrito-container");

        carrito.innerHTML +=
          `
          <li class="grid grid-cols-3 w-full px-4 cart_item list1" id= product${product["products_id"]}>
            <div class="flex items-center">
              <img src=" ${productInfo[0]["image_url"]}">
              <p class="max-w-[100px] ml-4 product_name">${productInfo[0]["product_name"]}</p>
            </div>
            <div class="flex items-center justify-evenly">
              <h1 class="item_price">${productInfo[0]["price"]}€</h1>
              <div>
                <button class="w-4 text-xl" onclick="modificarCantidad(${product["cart_id"]}, ${product["products_id"]}, 1)">+</button>
                <span class="product_amount1" id="cantidad${product["products_id"]}">${product["quantity"]}</span>
                <button class="w-4 text-xl" onclick="modificarCantidad(${product["cart_id"]}, ${product["products_id"]}, (-1))">-</button>
              </div>
            </div>
            <div class="flex items-center justify-evenly">
              <div id="precio-total${product["products_id"]}" class="text-center">${Number((productInfo[0]["price"] * product["quantity"]).toFixed(2))}€</div>
              <button onclick="modificarCantidad(${product["cart_id"]}, ${product["products_id"]}, 0)">X</button>
            </div>
          </li>
          `

        precioTotal(productInfo[0]["price"] * product["quantity"]);
      });
    }
  }



}


async function precioTotal(precio, cantidad) {
  precio = Number(precio.toFixed(2));
  if (cantidad == undefined) {
    document.getElementById("subtotal").innerHTML = parseFloat(document.getElementById("subtotal").innerHTML) + precio + "€";
  } else {
    document.getElementById("subtotal").innerHTML = parseFloat(document.getElementById("subtotal").innerHTML) + (precio * cantidad) + "€";
  }
  document.getElementById("Total").innerHTML = document.getElementById("subtotal").innerHTML
}


async function modificarCantidad(cart, product, action) {

  product = (await conexion("carts_details/buscarCartProduct", "cart_id=" + cart + "&products_id=" + product))[0];

  action = (action == undefined ? 1 : action);

  if (action > 0) {
    await agregarCarrito(product["products_id"]);
  } else if (action < 0) {
    await eliminarCarrito(product, false);
  } else {

    var productInfo = await conexion("products/buscar", "id=" + product["products_id"])

    var cantidad = product["quantity"]
    var total = productInfo[0]["price"] * cantidad;
    cart = (await conexion("carts/buscar", "id=" + cart))[0]
    var cartTotal = {
      "cart_id": product["cart_id"],
      "total_price": cart["total_price"] - (total)
    }
    await conexionPut("carts/modificar/total_price", cartTotal);

    precioTotal(productInfo[0]["price"] * -1, cantidad)

    await eliminarCarrito(product, true);
  }

  if (action != 0) {
    product = (await conexion("carts_details/buscarCartProduct", "cart_id=" + cart + "&products_id=" + product["products_id"]))[0];

    var productInfo = await conexion("products/buscar", "id=" + product["products_id"])

    var cantidad = product["quantity"]
    var total = Number((productInfo[0]["price"] * cantidad).toFixed(2));

    document.getElementById("cantidad" + [product["products_id"]]).innerHTML = cantidad
    document.getElementById("precio-total" + [product["products_id"]]).innerHTML = total + "€"

    precioTotal(productInfo[0]["price"] * action)

  }

}

async function eliminarCarrito(product, todo) {

  if (todo) {
    var data = {
      "cart_id": product["cart_id"],
      "products_id": product["products_id"]
    }
    await conexionDelete("carts_details/eliminar", data);
    document.getElementById("product" + product["products_id"]).style.display = "none"
  } else {
    var dataDetails = {
      "cart_id": product["cart_id"],
      "products_id": product["products_id"],
      "quantity": (product["quantity"]) - 1
    }
    conexionPut("carts_details/modificar/quantity", dataDetails);
    var productInfo = await conexion("products/buscar", "id=" + product["products_id"])

    document.getElementById("cantidad" + [product["products_id"]]).innerHTML = product["quantity"] - 1
    document.getElementById("precio-total" + [product["products_id"]]).innerHTML = productInfo[0]["price"] * product["quantity"];

    var cart = await conexion("carts/buscar", "id=" + product["cart_id"]);
    var productData = await conexion("products/buscar", "id=" + product["products_id"])
    var cartTotal = {
      "cart_id": product["cart_id"],
      "total_price": cart[0]["total_price"] - (productData[0]["price"])
    }
    await conexionPut("carts/modificar/total_price", cartTotal);

    if (product["quantity"] - 1 <= 0) {
      var data = {
        "cart_id": product["cart_id"],
        "products_id": product["products_id"]
      }
      await conexionDelete("carts_details/eliminar", data);
      document.getElementById("product" + product["products_id"]).style.display = "none"
    }
  }
}

//-------------------------CHECKOUT----------------------//

async function irCheckout() {
  window.location.href = "./checkout.html";
}

async function getPrecio() {
  var user = await conexion("sessions/buscarToken", "token=" + localStorage.getItem("idToken"));
  var cart = await buscarCarrito(user[0]["user_id"]);
  var precioTotal = cart["total_price"]
  document.getElementById("precioTotal_checkout").innerHTML += " " + precioTotal;
}

async function pagar() {

  var user = await conexion("sessions/buscarToken", "token=" + localStorage.getItem("idToken"))
  var cart = await buscarCarrito(user[0]["user_id"]);


  var direccion = document.getElementById("address").value;
  direccion += ", " + document.getElementById("city").value;
  direccion += ", " + document.getElementById("floor").value;
  direccion += ", " + document.getElementById("zip").value;

  var fecha;
  var date = new Date();
  fecha = date.getFullYear();
  fecha += "-" + (date.getUTCMonth() < 10 ? "0" + date.getUTCMonth() : date.getUTCMonth())
  fecha += "-" + date.getDate();

  var name = document.getElementById("name").value;
  var lastName = document.getElementById("l-name").value;

  var data = {
    "USER_ID": user[0]["user_id"],
    "SHOP_ID": 1,
    "ORDER_DATE": fecha,
    "ADDRESS": direccion,
    "ORDER_NAME": name,
    "ORDER_SURNAME": lastName,
    "TOTAL_PRICE": cart["total_price"],
    "ORDER_STATE": "completed"
  }

  order_id = await conexionPost("orders/crear", data)

  console.log(order_id);


  cartDetails = await conexion("carts_details/buscar", "id=" + cart["cart_id"]);

  cartDetails.forEach(async function (product) {
    var dataDetails = {
      "orders_id": order_id,
      "product_id": product["products_id"],
      "quantity": product["quantity"]
    }

    await conexionPost("orders_details/crear", dataDetails);

    var dataDelete = {
      "orders_id": order_id,
      "product_id": product["products_id"]
    }

    await conexionDelete("carts_details/eliminar", dataDelete)
  });
  var deleteCarrito = {
    "cart_id": cart["cart_id"]
  }
  await conexionDelete("carts/eliminar", deleteCarrito)

  document.getElementById("checkoutForm").submit();
}


