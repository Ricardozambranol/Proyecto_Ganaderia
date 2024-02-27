const nav = document.querySelector("#nav");

const onScroll = (event) => {
  const scrollPosition = event.target.scrollingElement.scrollTop;

  nav.classList.toggle("scrolled-down", scrollPosition > 56);
};

document.addEventListener("scroll", onScroll, { passive: true });

document.querySelector('.menu-icon').addEventListener('click', function() {
  document.querySelector('.links').classList.toggle('show-links');
});


const titles = ["Ganado", "Porcinos", "Ovinos", "Mascotas"];
let currentIndex = 0;
const titleElement = document.getElementById("animal-title");

function animateTitle() {
  const currentTitle = titles[currentIndex];
  let index = 0;
  const intervalWrite = setInterval(() => {
    if (index <= currentTitle.length) {
      titleElement.textContent = currentTitle.slice(0, index);
      index++;
    } else {
      clearInterval(intervalWrite);
      setTimeout(() => {
        let newIndex = currentTitle.length;
        const intervalDelete = setInterval(() => {
          if (newIndex >= 0) {
            titleElement.textContent = currentTitle.slice(0, newIndex);
            newIndex--;
          } else {
            clearInterval(intervalDelete);
            currentIndex = (currentIndex + 1) % titles.length;
            setTimeout(() => {
              animateTitle();
            }, 500); // Espera 1.5 segundos antes de iniciar la próxima animación
          }
        }, 100); // Borra las letras cada 100 milisegundos
      }, 1500); // Espera 1.5 segundos después de escribir la palabra
    }
  }, 100); // Escribe las letras cada 100 milisegundos
}

animateTitle(); // Inicia la animación cuando se carga la página


