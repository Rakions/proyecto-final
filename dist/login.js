// const regexMain = "/^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/";

const login = document.querySelector(".login-sign-in");
const register = document.querySelector(".login-register");

function switchRegister() {
  login.classList.toggle("hidden")
  register.classList.toggle("hidden")
}

function comprobarLogin(email, password) {

  axios.get(conexion("usuarios/buscar", ("id=" + email)).then(function (response){
    console.log(response.data);
  }).catch(function(error){
    console.log(error);
  }))

  // Axios.get(conexion("usuarios/buscar", ("id=" + email)).then(Response => {
  //   alert(Response)
  //   if (Response != null) {
  //     console.log("existe")
  //   } else {
  //     console.log("no existe")
  //   }
  // }))

  

}


