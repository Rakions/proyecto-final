async function agregarCarrito(product_id) {
  var result = await conexion("products/buscar", ("id="+product_id))
  const li = document.createElement("li");
  const divProduct = document.createElement("div");
  const divPrice = document.createElement("div");
  const divTotal = document.createElement("div");

  divProduct.classList.add("flex items-center");
  divPrice.classList.add("flex items-center justify-evenly");
  divTotal.classList.add("flex items-center justify-evenly");
  console.log(result)
  // divProduct.insertAdjacentElement(
  //   "afterbegin",
  //   "img src=" + result[""]
  // )
  
}



// function displayResults(results) {
//   results.forEach(function (result) {

//     var div = document.createElement("div");
//     div.innerHTML = result["product_name"];
//     div.innerHTML += "<p>" + result["price"] + "€</p>"
//     div.insertAdjacentHTML(
//       "afterbegin",
//       '<img src="' + result["image_url"] + '"/>'
//     );
//     div.classList.add("searchResult");
//     div.insertAdjacentHTML(
//       "beforeend",
//       '<img src="../resources/cart-plus-solid.svg" alt="" class="btnAddCesta" onclick="agregarCarrito(result[\"product_id\"])"/>'
//     );
//     tablaOpciones.appendChild(div)
//   });
// }



{/* <li class="grid grid-cols-3 w-full px-4 cart_item list1">
  <div class="flex items-center">
    <img src="../resources/cafe-con-leche.jpg">
      <p class="max-w-[100px] ml-4 product_name">Lorem, ipsum dolor.</p>
  </div>
  <div class="flex items-center justify-evenly">
    <h1 class="item_price1">2,50€</h1>
    <div>
      <button class="w-4">+</button>
      <span class="product_amount1">1</span>
      <button class="w-4">-</button>
    </div>
  </div>
  <div class="flex items-center justify-evenly">
    <div id="precio-total" class="text-center">0.00€</div>
    <button>X</button>
  </div>
</li> */}