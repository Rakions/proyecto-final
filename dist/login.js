const regexMain = "/^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/";

const login = document.querySelector(".login-sign-in");
const register = document.querySelector(".login-register");

function switchRegister(){
  login.classList.toggle("hidden")
  register.classList.toggle("hidden")
}

