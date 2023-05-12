// const regexMain = "/^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/";


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
      localStorage.clear()
      localStorage.setItem("idToken", token())
      alert("iniciada sesion")
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
  console.log(datos);

  if(conexion("usuarios/buscarEmail", "email=" + email).length = 0){
    var data = await conexion("usuarios/crear", datos, "POST");
  }else{
    console.log("ya existe")
  }

  console.log(conexion("usuarios/consultar"))

}