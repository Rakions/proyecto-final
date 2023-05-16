var category_id;
var user_id;
var product_id;
var modal = document.querySelector(".modal");
var category_name = document.querySelector(".category_name");


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
                    <button onclick="updateCategory()">UPDATE</button>
                </div>
            </div>
            `
            break;
        // case "usuarios":
        //     modal.innerHTML = `
        //     <div class="relative w-[500px] bg-green-300 flex flex-col justify-center items-center">
        //         <button class="absolute top-0 right-0 mt-4 mr-4" onclick="toggleModal()">
        //             X
        //         </button>
        //         <div class="w-[80%] flex flex-col h-full items-center">
        //             <label for="user_name">User name: </label>
        //             <input type="text" name="user_name" class="p-2 rounded-md user_name">
        //             <label for="user_surname">User surname: </label>
        //             <input type="text" name="user_surname" class="p-2 rounded-md user_surname">
        //             <label for="email">Email: </label>
        //             <input type="text" name="user_email" class="p-2 rounded-md email">
        //             <label for="password">Password: </label>
        //             <input type="text" name="password" class="p-2 rounded-md email">
        //             <label for="username">Username: </label>
        //             <input type="text" name="username" class="p-2 rounded-md username">
        //             <label for="phone">Phone: </label>
        //             <input type="text" name="phone" class="p-2 rounded-md phone">
        //             <button onclick="updateCategory()">UPDATE</button>
        //         </div>
        //     </div>
        //         `
            
        //     break;
        // case "productos":
        //     modal.innerHTML = `
        //     <div class="relative w-[500px] bg-green-300 flex flex-col justify-center items-center">
        //         <button class="absolute top-0 right-0 mt-4 mr-4" onclick="toggleModal()">
        //             X
        //         </button>
        //         <div class="w-[80%] flex flex-col h-full items-center">
        //             <label for="product_name">Product name: </label>
        //             <input type="text" name="product_name" class="p-2 rounded-md category_name">
        //             <label for="user_surname">User surname: </label>
        //             <input type="text" name="user_surname" class="p-2 rounded-md category_name">
        //             <label for="email">Email: </label>
        //             <input type="text" name="user_email" class="p-2 rounded-md category_name">
        //             <label for="username">Username: </label>
        //             <input type="text" name="username" class="p-2 rounded-md category_name">
        //             <label for="phone">Phone: </label>
        //             <input type="text" name="phone" class="p-2 rounded-md category_name">
        //             <button onclick="updateCategory()">UPDATE</button>
        //         </div>
        //     </div>
        //     `
            
        //     break;
    }
}

async function updateCategory() {
    category_name = document.querySelector(".category_name");
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

// async function updateUser() {
//     var user_name = document.querySelector(".user_name")
//     var user_surname = document.querySelector(".user_surname")
//     var email = document.querySelector(".email")
//     var password = document.querySelector(".password")
//     var username = document.querySelector(".username")
//     var phone = document.querySelector(".phone")
//     category_name = document.querySelector(".category_name");
//     var nombrefinal = category_name.value;
//     console.log(nombrefinal);
//     var json = {
//         "user_id": user_id,
//         "user_name": user_name,
//         "user_surname": user_surname,
//         "email": email,
//         "password": password,
//         "username": username,
//         "phone": phone
//     };
//     clearScreen();
//     cabeceraCategories();
//     renderCategories();
//     toggleModal();
// }

