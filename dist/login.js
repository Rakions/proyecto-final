function switchRegister() {
  const login = document.querySelector(".login-sign-in");
  const register = document.querySelector(".login-register");
  login.classList.toggle("hidden"); // Alterna la clase "hidden" del elemento de inicio de sesión
  register.classList.toggle("hidden"); // Alterna la clase "hidden" del elemento de registro
}

async function comprobarLogin(email, password) {
  // Comprobar credenciales de inicio de sesión

  // Obtener los datos del usuario basados en el correo electrónico proporcionado
  var data = await conexion("usuarios/buscarEmail", ("email=" + email));

  if (data.length > 0) { // Si se encuentran datos del usuario para el correo electrónico proporcionado
    if (data[0]["password"] == password) { // Comprobar si la contraseña proporcionada coincide con la contraseña almacenada para el usuario

      if (email == "admin@gmail.com") {
        // Si el usuario que inició sesión es el administrador
        localStorage.setItem("idToken", ((await conexion("sessions/buscar", "user_id=" + data[0]["user_id"]))[0]["token"]));

        // Redireccionar a la página del panel de control
        window.location.href = "./dashboard.html";
      } else {
        // Si el usuario que inició sesión no es el administrador
        alert("sesion iniciada");

        localStorage.setItem("idToken", ((await conexion("sessions/buscar", "user_id=" + data[0]["user_id"]))[0]["token"]));

        // Comprobar la última conexión y actualizarla
        await comprobarLastConnection();

        document.getElementById("formLogin").submit(); // Enviar el formulario de inicio de sesión
      }

    } else {
      alert("datos incorrectos"); // Contraseña incorrecta
    }
  } else {
    alert("datos incorrectos"); // El usuario no existe
  }
  cambiarIconoLogin(); // Cambiar el ícono de inicio de sesión según el estado de inicio de sesión
}

var rand = function () {
  return Math.random().toString(36).substr(2);
};

var token = function () {
  return rand() + rand(); // Generar un token aleatorio
}

function submit() {
  window.location.href = "index.html"; // Redireccionar a la página de inicio
}

//-----------------------------Cambiar Login------------------------------//

async function cambiarIconoLogin() {
  // Cambiar el ícono de inicio de sesión según el token almacenado en localStorage

  if ((await conexion("sessions/buscarToken", "token=" + localStorage.getItem("idToken"))).length == 0) {
    document.getElementById("botonLogin").style.display = "block"; // Mostrar el botón de inicio de sesión
  } else {
    document.getElementById("cartIcon").style.display = "block"; // Mostrar el ícono del carrito
    document.getElementById("userIcon").style.display = "block"; // Mostrar el ícono de usuario
  }
}

async function comprobarLastConnection() {
  // Comprobar la última conexión y actualizarla

  if ((await conexion("sessions/buscarToken", "token=" + localStorage.getItem("idToken"))).length != 0) {
    var user = await conexion("sessions/buscarToken", "token=" + localStorage.getItem("idToken"));

    var last_connection;
    var date = new Date();
    last_connection = date.getFullYear();
    last_connection += "-" + (date.getUTCMonth() < 10 ? "0" + date.getUTCMonth() : date.getUTCMonth());
    last_connection += "-" + date.getDate();

    let conexionJson = {
      "user_id": user[0]["user_id"],
      "last_connection": last_connection
    }

    await conexionPut("usuarios/modificar/conexion", conexionJson); // Actualizar la última conexión del usuario
  }
}

//-----------------------------Register------------------------------//

async function register(name, surname, email, password) {
  let datos = {
    "user_name": name,
    "user_surname": surname,
    "email": email,
    "password": password,
    "username": name,
    "phone": "",
    "last_connection": ""
  };

  var comprobarCorreo = await conexion("usuarios/buscarEmail", "email=" + email);

  if (comprobarCorreo.length == 0) {
    await conexionPost("usuarios/crear", datos);
    let user = await conexion("usuarios/buscarEmail", "email=" + email);
    localStorage.clear()
    localStorage.setItem("idToken", token())
    let tokenKey = localStorage.getItem("idToken");
    let datosToken = {
      "user_id": user[0]["user_id"],
      "token": tokenKey
    }
    await conexionPost("sessions/crear", datosToken)
    comprobarLogin(email, password);

    document.getElementById("registerForm").submit();

  } else {
    alert("este correo ya existe")
  }
}

function getDate() {
  var last_connection = new Date();
  var year = last_connection.getFullYear();
  var month = last_connection.getMonth();
  var day = last_connection.getDate();
  last_connection = year + "-" + month + "-" + day;
  return last_connection;
}

function logOut(){
  localStorage.removeItem("idToken")
  location.reload();
}