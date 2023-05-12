// import { async } from "postcss-js";

function conexion(ruta, datos) {

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:4000/API/" + ruta + "?" + datos);
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = xhr.response;
            console.log(data)
            return data;
        } else {
            console.log(`Error: ${xhr.status}`);
        }
    };
}


