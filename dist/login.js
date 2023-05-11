import { Axios } from "axios";
const { default: axios } = require("axios");

const regexMain = "/^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/";

const login = document.querySelector(".login-sign-in");
const register = document.querySelector(".login-register");

function switchRegister() {
  login.classList.toggle("hidden")
  register.classList.toggle("hidden")
}

function comprobarLogin(email, password) {

  Axios.get(conexion("usuarios/buscar", ("id=" + email)).then(Response => {
    alert(Response)
    if (Response != null) {
      console.log("existe")
    } else {
      console.log("no existe")
    }
  }))

  // var query = await conexion("usuarios/buscar", ("id="+email));

}


