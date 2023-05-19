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
      localStorage.setItem("login", "true")
      alert("sesion iniciada")
      document.getElementById("formLogin").submit();
    } else {
      localStorage.setItem("login", "false")
      alert("datos incorrectos");
    }
  } else {
    localStorage.setItem("login", "false")
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


//-----------------------------Cambiar Loging------------------------------//

function cambiarIconoLogin() {
  if (localStorage.getItem("login") == "false" || localStorage.getItem("login") == null) {
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
    // login = true;
    // cambiarIconoLogin()
    localStorage.clear()
    localStorage.setItem("idToken", token())

  } else {
    console.log("ya existe")
  }

  console.log(conexion("usuarios/consultar"))

}
