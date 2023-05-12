const navbarMovil = document.querySelector(".header-movil");
const header = document.querySelector(".header");

function navbarMobile() {
  navbarMovil.classList.toggle("active");
}

function renderHeader() {
  let render = `<header class='bg-[var(--color-oscuro)] w-full h-24 flex items-center p-4 justify-between'>
  <div class='w-[150px] h-full ml-[10px] flex items-center justify-center'>
    <a href='index.html'><img src='../resources/logo.png' alt='' class='logo' /></a>
  </div>
  <div class='flex items-center'>
    <nav>
      <ul class='flex text-[var(--color-texto)]'>
        <a href='index.html'>
          <li class='inline-block mx-4 links'>INICIO</li>
        </a>
        <a href='carta.html'>
          <li class='inline-block mx-4 links'>CARTA</li>
        </a>
        <a href='contact.html'>
          <li class='inline-block mx-4 links'>CONTACTO</li>
        </a>
        <li class='mx-4 hidden menu w-6 h-6 cursor-pointer'>
          <img src='../resources/bars-solid.svg' onclick='navbarMobile()' alt='' />
        </li>
      </ul>
    </nav>
    <a href='login.html'>
      <button
        class='bg-[var(--color-secundario)]  w-full h-full border-black border-2 rounded-md px-4 transition-all flex items-center justify-center'>LOGIN</button>
    </a>
  </div>
</header>
<div class='w-full py-4 bg-[var(--color-oscuro)] flex flex-col items-center justify-center header-movil md:hidden'>
  <ul class='flex flex-col gap-[2rem] text-[var(--color-texto)]'>
    <a href='index.html'>
      <li class='inline-block movil-links'>INICIO</li>
    </a>
    <a href='carta.html'>
      <li class='inline-block movil-links'>CARTA</li>
    </a>
    <a href='contact.html'>
      <li class='inline-block movil-links'>CONTACTO</li>
    </a>
  </ul>
</div>`

header.innerHTML = render;
}