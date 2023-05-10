const regexMain = "/^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/";

const login = document.querySelector(".login-sign-in");
const register = document.querySelector(".login-register");

function switchRegister(){
  login.classList.toggle("hidden")
  register.classList.toggle("hidden")
}





function pruebaConexion(){
  
  const xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:4000/API/cafeusuarios/consultar");
xhr.send();
xhr.responseType = "json";
xhr.onload = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    const data = xhr.response;
    console.log(data);
    var imprimir = JSON.stringify(data)
    alert(imprimir)
  } else {
    console.log(`Error: ${xhr.status}`);
  }
};
}