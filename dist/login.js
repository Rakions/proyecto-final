const regexMain = "/^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/";

const login = document.querySelector(".login-sign-in");
const register = document.querySelector(".login-register");

function switchRegister(){
  login.classList.toggle("hidden")
  register.classList.toggle("hidden")
}

function comprobarLoging(email, password){
  var query = conexion("usuarios/buscar", ("id="+email));
  alert(query)
  if(query != null){
    console.log("existe")
  }else{
    console.log("no existe")  
  }
}


