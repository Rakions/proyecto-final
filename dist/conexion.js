// ------------------Conexion Omar--------------------//
async function conexion(ruta, datos, method) {

    method = (method == null ? "GET" : method)



    if (method != "POST") {
        var rutaFinal = ("http://localhost:4000/API/" + ruta + "?" + datos);

        const response = await fetch(rutaFinal, {
            method: method,
        }, { mode: 'no-cors' });
        const jsonData = await response.json();
        return jsonData;

    } else {
        var rutaFinal = ("http://localhost:4000/API/" + ruta);

        const response = await fetch(rutaFinal, {
            method: method,
            headers: {
                'Content-Type': 'application/json'},
            body: JSON.stringify(datos)
        }, { mode: 'no-cors' });
        const jsonData = await response;
        return jsonData;
    }


}




