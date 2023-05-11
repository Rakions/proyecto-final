const regexMain = "/^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/";

const login = document.querySelector(".login-sign-in");
const register = document.querySelector(".login-register");

function switchRegister(){
  login.classList.toggle("hidden")
  register.classList.toggle("hidden")
}

async function logJSONData(funcion){
  let url = "http://localhost:4000/API/" + funcion;
  console.log(url);
  const response = await fetch(url,{method: 'GET'},{mode: 'no-cors'});
  const jsonData = await response.json();
  return jsonData;
}

async function requestBDD(){
  let email = document.getElementById('form_email');
  let password = document.getElementById('form_password');
  let respuestaEmail = await logJSONData("usuarios/buscarEmail?email=" + email.value);
  if (respuestaEmail != null) {
    alert('logged in');
    console.log(respuestaEmail);
  }
}

