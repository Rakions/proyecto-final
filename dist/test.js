var category_id;
var json = '{"category_id":"John", "age":30, "city":"New York"}';

function getIdCategoria(id){
    category_id = id;
}

function toggleModal(){
    modal = document.querySelector(".modal");
    modal.classList.toggle("hidden");
}

function updateCategory(){
    logJSONData("categorias/modificar/nombre?id=" + category_id);
}

async function logJSONData(funcion){
    let url = "http://localhost:4000/API/" + funcion;
    const response = await fetch(url,{method: 'POST'},{cors: "no-cors"});
    const jsonData = await response.json();
    return jsonData;
}