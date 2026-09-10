const navbar = document.querySelector('.navbar');

let scrollTimer;

window.addEventListener('scroll', () => {

  // Contraer navbar mientras hay movimiento
  navbar.classList.add('is-scrolling');

  // Reiniciar contador
  clearTimeout(scrollTimer);

  // Cuando el usuario deja de hacer scroll
  scrollTimer = setTimeout(() => {
    navbar.classList.remove('is-scrolling');
  }, 500);

});





/* =========================
   HERO 7 - CARRUSEL
========================= */

const hero7Track = document.querySelector('.hero7__slider-track');
const hero7Slides = document.querySelectorAll('.hero7__slide');

const hero7Prev = document.querySelector('.hero7__arrow--prev');
const hero7Next = document.querySelector('.hero7__arrow--next');

const hero7DotsContainer = document.querySelector('.hero7__dots');


let hero7CurrentSlide = 0;


/* Crear indicadores automáticamente */

hero7Slides.forEach((slide, index) => {

  const dot = document.createElement('button');

  dot.classList.add('hero7__dot');

  dot.setAttribute(
    'aria-label',
    `Ir a imagen ${index + 1}`
  );


  if (index === 0) {
    dot.classList.add('is-active');
  }


  dot.addEventListener('click', () => {

    hero7CurrentSlide = index;

    updateHero7Slider();

  });


  hero7DotsContainer.appendChild(dot);

});


const hero7Dots = document.querySelectorAll('.hero7__dot');


/* Actualizar carrusel */

function updateHero7Slider() {

  hero7Track.style.transform =
    `translateX(-${hero7CurrentSlide * 100}%)`;


  hero7Dots.forEach((dot, index) => {

    dot.classList.toggle(
      'is-active',
      index === hero7CurrentSlide
    );

  });

}


/* Flecha siguiente */

hero7Next.addEventListener('click', () => {

  hero7CurrentSlide++;


  if (hero7CurrentSlide >= hero7Slides.length) {
    hero7CurrentSlide = 0;
  }


  updateHero7Slider();

});


/* Flecha anterior */

hero7Prev.addEventListener('click', () => {

  hero7CurrentSlide--;


  if (hero7CurrentSlide < 0) {
    hero7CurrentSlide = hero7Slides.length - 1;
  }


  updateHero7Slider();

});