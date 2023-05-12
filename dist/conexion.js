// ------------------Conexion Omar--------------------//
async function conexion(ruta, datos) {

    let rutaFinal = ("http://localhost:4000/API/" + ruta + "?" + datos)

    const response = await fetch(rutaFinal, { method: 'GET' }, { mode: 'no-cors' });
    const jsonData = await response.json();
    console.log(jsonData);
}

// function conexion(ruta, datos, callback) {
//     try {
//         let rutaFinal = ("http://localhost:4000/API/" + ruta + "?" + datos)

//         const xhr = new XMLHttpRequest();
//         xhr.open("GET", rutaFinal);
//         xhr.send();
//         xhr.responseType = "json";
//         xhr.onload = () => {
//             if (xhr.readyState == 4 && xhr.status == 200) {
//                 const data = xhr.response;
//                 response = data
//                 // console.log(data)
//                 // console.log("conexion")
//                 callback(data);
//             } else {
//                 console.log(`Error: ${xhr.status}`);
//             }
//         };
//     } catch (error) {
//         console.log("NO VA")
//     }
// }


