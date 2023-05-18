var category_id;
var user_id;
var product_id;
var modal = document.querySelector(".modal");



function getIdUsuario(id){
    user_id = id;
}

function getIdProductos(id){
    product_id = id;
}

function getIdCategoria(id) {
    category_id = id;
}

function toggleModal(caso) {
    modal = document.querySelector(".modal");
    modal.classList.toggle("hidden");
    switch (caso) {
        case "categorias":
            modal.innerHTML = `
            <div class="relative w-[500px] h-[300px] bg-green-300 flex items-center justify-center flex-col">
                <button class="absolute top-0 right-0 mt-4 mr-4" onclick="toggleModal()">
                    X
                </button>
                <div class="flex items-center justify-around w-full">
                    <label for="category_name">Category name: </label>
                    <input type="text" name="category_name" class="p-2 rounded-md category_name">
                    <button onclick="updateCategory()" class="submit_cambios" >UPDATE</button>
                </div>
            </div>
            `
            break;
        case "categorias2":
            modal.innerHTML = `
            <div class="relative w-[500px] h-[300px] bg-green-300 flex items-center justify-center flex-col">
                <button class="absolute top-0 right-0 mt-4 mr-4" onclick="toggleModal()">
                    X
                </button>
                <div class="flex items-center justify-around w-full">
                    <label for="category_name">Category name: </label>
                    <input type="text" name="category_name" class="p-2 rounded-md category_name">
                    <button onclick="addCategory()" class="submit_cambios" >UPDATE</button>
                </div>
            </div>
            `
            break;
        case "usuarios":
            modal.innerHTML = `
            <div class="relative w-[500px] bg-green-300 flex flex-col justify-center items-center">
                <button class="absolute top-0 right-0 mt-4 mr-4" onclick="toggleModal()">
                    X
                </button>
                <div class="w-[80%] flex flex-col h-full items-center">
                    <label for="user_name">User name: </label>
                    <input type="text" name="user_name" class="p-2 rounded-md user_name">
                    <label for="user_surname">User surname: </label>
                    <input type="text" name="user_surname" class="p-2 rounded-md user_surname">
                    <label for="email">Email: </label>
                    <input type="text" name="user_email" class="p-2 rounded-md email">
                    <label for="password">Password: </label>
                    <input type="text" name="password" class="p-2 rounded-md password">
                    <label for="username">Username: </label>
                    <input type="text" name="username" class="p-2 rounded-md username">
                    <label for="phone">Phone: </label>
                    <input type="text" name="phone" class="p-2 rounded-md phone">
                    <button onclick="updateUser()" class="submit_cambios" >UPDATE</button>
                </div>
            </div>
                `            
            break;
        case "usuarios2":
            modal.innerHTML = `
            <div class="relative w-[500px] bg-green-300 flex flex-col justify-center items-center">
                <button class="absolute top-0 right-0 mt-4 mr-4" onclick="toggleModal()">
                    X
                </button>
                <div class="w-[80%] flex flex-col h-full items-center">
                    <label for="user_name">User name: </label>
                    <input type="text" name="user_name" class="p-2 rounded-md user_name">
                    <label for="user_surname">User surname: </label>
                    <input type="text" name="user_surname" class="p-2 rounded-md user_surname">
                    <label for="email">Email: </label>
                    <input type="text" name="user_email" class="p-2 rounded-md email">
                    <label for="password">Password: </label>
                    <input type="text" name="password" class="p-2 rounded-md password">
                    <label for="username">Username: </label>
                    <input type="text" name="username" class="p-2 rounded-md username">
                    <label for="phone">Phone: </label>
                    <input type="text" name="phone" class="p-2 rounded-md phone">
                    <button onclick="addUser()" class="submit_cambios" >ADD</button>
                </div>
            </div>
                `   
            break;
        case "productos":
            modal.innerHTML = `
            <div class="relative w-[500px] bg-green-300 flex flex-col justify-center items-center">
                <button class="absolute top-0 right-0 mt-4 mr-4" onclick="toggleModal()">
                    X
                </button>
                <div class="w-[80%] flex flex-col h-full items-center">
                    <label for="product_name">Product name: </label>
                    <input type="text" name="product_name" class="p-2 rounded-md product_name">
                    <label for="product_description">Product description: </label>
                    <input type="text" name="product_description" class="p-2 rounded-md product_description">
                    <label for="stock">Stock: </label>
                    <input type="text" name="stock" class="p-2 rounded-md stock">
                    <label for="reviews">Reviews: </label>
                    <input type="text" name="reviews" class="p-2 rounded-md reviews">
                    <label for="category_id">Category id: </label>
                    <input type="text" name="category_id" class="p-2 rounded-md category_id">
                    <label for="price">Price: </label>
                    <input type="text" name="price" class="p-2 rounded-md price">
                    <label for="image_url">Image url: </label>
                    <input type="text" name="image_url" class="p-2 rounded-md image_url">
                    <button onclick="updateProducts()" class="submit_cambios">UPDATE</button>
                </div>
            </div>
            `
            break;
            case "productos2":
                modal.innerHTML = `
                <div class="relative w-[500px] bg-green-300 flex flex-col justify-center items-center">
                    <button class="absolute top-0 right-0 mt-4 mr-4" onclick="toggleModal()">
                        X
                    </button>
                    <div class="w-[80%] flex flex-col h-full items-center">
                        <label for="product_name">Product name: </label>
                        <input type="text" name="product_name" class="p-2 rounded-md product_name">
                        <label for="product_description">Product description: </label>
                        <input type="text" name="product_description" class="p-2 rounded-md product_description">
                        <label for="stock">Stock: </label>
                        <input type="text" name="stock" class="p-2 rounded-md stock">
                        <label for="reviews">Reviews: </label>
                        <input type="text" name="reviews" class="p-2 rounded-md reviews">
                        <label for="category_id">Category id: </label>
                        <input type="text" name="category_id" class="p-2 rounded-md category_id">
                        <label for="price">Price: </label>
                        <input type="text" name="price" class="p-2 rounded-md price">
                        <label for="image_url">Image url: </label>
                        <input type="text" name="image_url" class="p-2 rounded-md image_url">
                        <button onclick="addProducts()" class="submit_cambios">ADD</button>
                    </div>
                </div>
                `
                break;
    }
}

async function updateCategory() {
    var category_name = document.querySelector(".category_name");
    var nombrefinal = category_name.value;
    console.log(nombrefinal);
    var json ={
        "category_id": category_id,
        "category_name": nombrefinal
    };
    await conexionPut("categorias/modificar/nombre",json);
    clearScreen();
    cabeceraCategories();
    renderCategories();
    toggleModal();
}

async function addCategory() {
    var category_name = document.querySelector(".category_name");
    var nombrefinal = category_name.value;
    var json ={
        "category_name": nombrefinal
    };
    await conexionPost("categorias/crear",json);
    toggleModal();
}

async function updateUser() {
    var user_name = document.querySelector(".user_name")
    var user_surname = document.querySelector(".user_surname")
    var email = document.querySelector(".email")
    var password = document.querySelector(".password")
    var username = document.querySelector(".username")
    var phone = document.querySelector(".phone")
    var json = {
        "user_id": user_id,
        "user_name": user_name.value,
        "user_surname": user_surname.value,
        "email": email.value,
        "password": password.value,
        "username": username.value,
        "phone": phone.value
    };
    await conexionPut("usuarios/modificar/todo",json);
    clearScreen();
    cabeceraUsers();
    renderUsers();
    toggleModal();
}

async function addUser() {
    var user_name = document.querySelector(".user_name")
    var user_surname = document.querySelector(".user_surname")
    var email = document.querySelector(".email")
    var password = document.querySelector(".password")
    var username = document.querySelector(".username")
    var phone = document.querySelector(".phone")
    var json = {
        "user_name": user_name.value,
        "user_surname": user_surname.value,
        "email": email.value,
        "password": password.value,
        "username": username.value,
        "phone": phone.value
    };
    await conexionPost("usuarios/crear",json);
    toggleModal();
}

async function updateProducts(){
    var product_name = document.querySelector(".product_name");
    var product_description = document.querySelector(".product_description");
    var stock = document.querySelector(".stock");
    var reviews = document.querySelector(".reviews");
    var category_id = document.querySelector(".category_id");
    var price = document.querySelector(".price");
    var image_url = document.querySelector(".image_url")
    var json = {
        "products_id": product_id,
        "product_name": product_name.value,
        "product_description": product_description.value,
        "stock": stock.value,
        "reviews": reviews.value,
        "category_id": category_id.value,
        "price": price.value,
        "image_url": image_url.value
    }
    await conexionPut("products/modificar/todo",json);
    toggleModal();
}

async function updateProducts(){
    var product_name = document.querySelector(".product_name");
    var product_description = document.querySelector(".product_description");
    var stock = document.querySelector(".stock");
    var reviews = document.querySelector(".reviews");
    var category_id = document.querySelector(".category_id");
    var price = document.querySelector(".price");
    var image_url = document.querySelector(".image_url")
    var json = {
        "product_name": product_name.value,
        "product_description": product_description.value,
        "stock": stock.value,
        "reviews": reviews.value,
        "category_id": category_id.value,
        "price": price.value,
        "image_url": image_url.value
    }
    await conexionPost("products/crear",json);
    clearScreen();
    cabeceraProductos();
    renderProducts();
    toggleModal();
}

async function borrarProducts(id){
    var datos = {
        "products_id": id
    }
    await conexionDelete("products/eliminar",datos);
    clearScreen();
    cabeceraProductos();
    renderProducts();
}

async function borrarUsers(id){
    var datos = {
        "user_id": id
    }

    await conexionDelete("usuarios/eliminar",datos)
    clearScreen();
    cabeceraUsers();
    renderUsers();
}

async function borrarCategories(id){
    var datos = {
        "category_id": id
    }

    await conexionDelete("categorias/eliminar",datos)
    clearScreen();
    cabeceraCategories();
    renderCategories();
}

