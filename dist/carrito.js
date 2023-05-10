let contador = 1;

function incrementar(amount,price){
  let cantidad = document.querySelector(amount);
  let precio = document.querySelector(price);
  let precio_total = parseFloat(cantidad.innerHTML) * parseFloat(precio.innerHTML.replace(',', '.'));
  contador++;
  cantidad.innerHTML = contador;
  if (price == '.item_price1') {
    let precio_final1 = document.querySelector('.item_totalprice1');
    precio_final1.innerHTML = precio_total + "€";
  } else{
    let precio_final2 = document.querySelector('.item_totalprice2');
    precio_final2.innerHTML = precio_total + "€";
  }
}

function restar(list,price){
  if (contador > 1){
    let cantidad = document.querySelector(list);
  contador--;
  cantidad.innerHTML = contador;
  }
}

function eliminar(list){
  let cart_item = document.querySelector(list);
  console.log(cart_item);
  cart_item.classList.add("delete");
}