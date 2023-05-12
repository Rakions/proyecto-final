// const regexMain = "/^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/";

const login = document.querySelector(".login-sign-in");
const register = document.querySelector(".login-register");

function switchRegister() {
  login.classList.toggle("hidden")
  register.classList.toggle("hidden")
}




async function comprobarLogin(email, password) {
  var data = await conexion("usuarios/buscarEmail", ("email=" + email));
    if(data.length > 0) {
    if (data[0]["password"] == password) {
      console.log("contraseña correcta");
    } else {
      console.log("contraseña incorrecta");
    }
  } else {
    console.log("no existo");
  }

}





