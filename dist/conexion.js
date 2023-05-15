// ------------------Conexion Omar--------------------//
async function conexion(ruta, datos) {

    var rutaFinal = ("http://localhost:4000/API/" + ruta + "?" + datos);

    const response = await fetch(rutaFinal, {
        method: 'GET',
    }, { mode: 'no-cors' });
    const jsonData = await response.json();
    return jsonData;
}

async function conexionPost(ruta, datos) {
var rutaFinal = ("http://localhost:4000/API/" + ruta);

await fetch(rutaFinal, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
}, { mode: 'no-cors' });
}




