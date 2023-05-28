document.addEventListener("DOMContentLoaded", async () => {
    var top_products_content = document.querySelector(".top_products_content");
    var products = await conexion("products/consultar");
    for (let index = 0; index < 4; index++) {
        top_products_content.innerHTML +=
            `
        <div class="shadow-lg">
            <div class="flex items-center justify-center h-2/3 w-full flex-col">
                <img class="" src="${products[index]['image_url']}" />
                <h1 class="menu-item">${products[index]["product_name"]}</h1>
                <p>${products[index]['price']}$</p>
            </div>
        </div>  
        `

    }
})