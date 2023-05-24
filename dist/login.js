function switchRegister() {
  const login = document.querySelector(".login-sign-in");
  const register = document.querySelector(".login-register");
  login.classList.toggle("hidden")
  register.classList.toggle("hidden")
}

async function comprobarLogin(email, password) {

  var data = await conexion("usuarios/buscarEmail", ("email=" + email));
  if (data.length > 0) {
    if (data[0]["password"] == password) {
      alert("sesion iniciada")
      localStorage.setItem("idToken", ((await conexion("sessions/buscar", "user_id=" + data[0]["user_id"]))[0]["token"])) 
      document.getElementById("formLogin").submit();
      var last_connection = getDate();
      let conexionJson = {
        "last_connection": last_connection
      }
      conexionPut("usuarios/modificar/conexion",conexionJson);
    } else {
      alert("datos incorrectos");
    }
  } else {
    alert("no existo")
    console.log("no existo");
  }
  cambiarIconoLogin();
}
var rand = function () {
  return Math.random().toString(36).substr(2);
};

var token = function () {
  return rand() + rand();
}


function submit() {
  window.location.href = "index.html"
}


//-----------------------------Cambiar Login------------------------------//

async function cambiarIconoLogin() {
  if ((await conexion("sessions/buscarToken", "token=" + localStorage.getItem("idToken"))).length == 0) {
    document.getElementById("botonLogin").style.display = "block"
  } else {
    document.getElementById("cartIcon").style.display = "block"
    document.getElementById("userIcon").style.display = "block"
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

  var comprobarCorreo = await conexion("usuarios/buscarEmail", "email=" + email)

  if (comprobarCorreo.length == 0) {
    await conexionPost("usuarios/crear", datos);
    let user = await conexion("usuarios/buscarEmail", "email=" + email);
    // login = true;
    // cambiarIconoLogin()
    localStorage.clear()
    localStorage.setItem("idToken", token())
    let tokenKey = localStorage.getItem("idToken");
    let datosToken = {
      "user_id": user[0]["user_id"],
      "token": tokenKey
    }
    await conexionPost("sessions/crear", datosToken)
    comprobarLogin(email, password);

  } else {
    alert.log("este correo ya existe")
  }
}

function getDate(){
  var last_connection = new Date();
  var year = last_connection.getFullYear();
  var month = last_connection.getMonth();
  var day = last_connection.getDate();
  last_connection = year + "-" + month + "-" + day;
  return last_connection;
}
