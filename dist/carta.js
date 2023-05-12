let carta_content = document.querySelector(".carta-content");

let content = `<div class="h-[300px] w-[300px] flex items-center justify-center flex-col">
<img src="../resources/vecteezy_a-cup-of-coffee-with-coffee-beans_10856650_366.png" alt=""
  class="h-2/3 mb-4" />
<p>Hola</p>
</div>`;



for (let index = 0; index < 10; index++) {
    carta_content.innerHTML += content;
}