// const regexMain = "/^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/";
var login = false;

function switchRegister() {
  const login = document.querySelector(".login-sign-in");
  const register = document.querySelector(".login-register");
  login.classList.toggle("hidden")
  register.classList.toggle("hidden")
}

//-----------------------------Loging------------------------------//
async function comprobarLogin(email, password) {
  var data = await conexion("usuarios/buscarEmail", ("email=" + email));
  if (data.length > 0) {
    if (data[0]["password"] == password) {
      alert("iniciada sesion")
      // login = true;
      // cambiarIconoLogin()
    } else {
      console.log("contraseña incorrecta");
    }
  } else {
    console.log("no existo");
  }

}
var rand = function () {
  return Math.random().toString(36).substr(2);
};

var token = function () {
  return rand() + rand();
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
