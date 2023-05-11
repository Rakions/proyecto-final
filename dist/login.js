const regexMain = "/^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/";

const login = document.querySelector(".login-sign-in");
const register = document.querySelector(".login-register");

function switchRegister(){
  login.classList.toggle("hidden")
  register.classList.toggle("hidden")
}

async function logJSONData(){
  const response = await fetch("http://localhost:4000/API/cafeusuarios/consultar",{method: 'GET'},{mode: 'no-cors'});
  const jsonData = await response.json();
  console.log(jsonData[0]['user_name']);
}

