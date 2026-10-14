/* =========================
   NAVBAR
========================= */

const navbar = document.querySelector('.navbar');

let navbarCollapsed = false;


/* =========================
   SCROLL
========================= */

window.addEventListener('scroll', () => {

  /* Si volvemos arriba de la página */
  if (window.scrollY <= 5) {

    navbarCollapsed = false;

    navbar.classList.remove('is-collapsed');

    return;
  }


  /* Si empezamos a bajar */
  if (!navbarCollapsed) {

    navbarCollapsed = true;

    navbar.classList.add('is-collapsed');

  }

});


/* =========================
   HOVER
========================= */

/* Abrir cuando el cursor entra */

navbar.addEventListener('mouseenter', () => {

  if (navbarCollapsed) {

    navbar.classList.remove('is-collapsed');

  }

});


/* Cerrar cuando el cursor sale */

navbar.addEventListener('mouseleave', () => {

  if (navbarCollapsed) {

    navbar.classList.add('is-collapsed');

  }

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









/* ==========================================
   NAVBAR MÓVIL
========================================== */

const mobileNavbar = document.querySelector('.mobile-navbar');

const mobileMenuButton = document.querySelector('.mobile-navbar__menu');

const mobileNavbarLinks = document.querySelectorAll(
  '.mobile-navbar__links a'
);


/* ==========================================
   ABRIR / CERRAR
========================================== */

mobileMenuButton.addEventListener('click', () => {

  const isOpen = mobileNavbar.classList.toggle('is-open');

  mobileMenuButton.setAttribute(
    'aria-expanded',
    isOpen
  );

  mobileMenuButton.setAttribute(
    'aria-label',
    isOpen ? 'Cerrar menú' : 'Abrir menú'
  );

});


/* ==========================================
   CERRAR AL SELECCIONAR UN ENLACE
========================================== */

mobileNavbarLinks.forEach(link => {

  link.addEventListener('click', () => {

    mobileNavbar.classList.remove('is-open');

    mobileMenuButton.setAttribute('aria-expanded', 'false');

    mobileMenuButton.setAttribute('aria-label', 'Abrir menú');

  });

});


/* ==========================================
   CERRAR AL HACER CLIC FUERA
========================================== */

document.addEventListener('click', (event) => {

  if (
    mobileNavbar.classList.contains('is-open') &&
    !mobileNavbar.contains(event.target)
  ) {

    mobileNavbar.classList.remove('is-open');

    mobileMenuButton.setAttribute('aria-expanded', 'false');

    mobileMenuButton.setAttribute('aria-label', 'Abrir menú');

  }

});







/* ==========================================
   HERO 7 - SWIPE MÓVIL + CONTADOR
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const slider = document.querySelector(".hero7__slider");
  const sliderWindow = document.querySelector(".hero7__slider-window");
  const sliderTrack = document.querySelector(".hero7__slider-track");

  const slides = document.querySelectorAll(".hero7__slide");

  const counter = document.querySelector(".hero7__counter");
  const counterCurrent = document.querySelector(".hero7__counter-current");
  const counterTotal = document.querySelector(".hero7__counter-total");

  if (
    !slider ||
    !sliderWindow ||
    !sliderTrack ||
    !counter ||
    !counterCurrent ||
    !counterTotal ||
    !slides.length
  ) {
    return;
  }

  const mobileQuery = window.matchMedia("(max-width: 767px)");

  let touchStartX = 0;
  let touchStartY = 0;

  let hideCounterTimeout;

  const totalSlides = slides.length;

  counterTotal.textContent = totalSlides;


  /* =========================
     OBTENER IMAGEN ACTUAL
  ========================= */

  function getCurrentIndex() {

    const transform = window.getComputedStyle(sliderTrack).transform;

    if (transform === "none") {
      return 0;
    }

    const matrix = new DOMMatrixReadOnly(transform);

    const translateX = matrix.m41;

    const slideWidth = sliderWindow.clientWidth;

    if (!slideWidth) {
      return 0;
    }

    return Math.max(
      0,
      Math.min(
        totalSlides - 1,
        Math.round(Math.abs(translateX) / slideWidth)
      )
    );
  }


  /* =========================
     MOSTRAR CONTADOR
  ========================= */

  function showCounter() {

    if (!mobileQuery.matches) {
      return;
    }

    clearTimeout(hideCounterTimeout);

    counter.classList.remove("is-hidden");

    hideCounterTimeout = setTimeout(() => {
      counter.classList.add("is-hidden");
    }, 5000);
  }


  /* =========================
     ACTUALIZAR CONTADOR
  ========================= */

  function updateCounter() {

    if (!mobileQuery.matches) {
      return;
    }

    const currentIndex = getCurrentIndex();

    counterCurrent.textContent = currentIndex + 1;

    showCounter();
  }


  /* =========================
     CAMBIAR IMAGEN
  ========================= */

  function goToSlide(index) {

    const newIndex = Math.max(
      0,
      Math.min(totalSlides - 1, index)
    );

    sliderTrack.style.transform = `translateX(-${newIndex * 100}%)`;

    updateCounter();

    /* Actualizar indicadores existentes */

    const dots = document.querySelectorAll(".hero7__dot");

    dots.forEach((dot, i) => {

      dot.classList.toggle("active", i === newIndex);
      dot.classList.toggle("is-active", i === newIndex);

    });

  }


  /* =========================
     INICIO DEL TOQUE
  ========================= */

  sliderWindow.addEventListener("touchstart", (event) => {

    if (!mobileQuery.matches) {
      return;
    }

    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;

  }, { passive: true });


  /* =========================
     FINAL DEL TOQUE
  ========================= */

  sliderWindow.addEventListener("touchend", (event) => {

    if (!mobileQuery.matches) {
      return;
    }

    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    /* Ignorar desplazamientos verticales */

    if (Math.abs(diffY) > Math.abs(diffX)) {
      return;
    }

    /* Deslizamiento mínimo de 40px */

    if (Math.abs(diffX) < 40) {
      return;
    }

    const currentIndex = getCurrentIndex();

    if (diffX > 0) {

      /* Deslizar hacia la izquierda */
      goToSlide(currentIndex + 1);

    } else {

      /* Deslizar hacia la derecha */
      goToSlide(currentIndex - 1);

    }

  }, { passive: true });


  /* =========================
     ACTUALIZAR AL CAMBIAR TAMAÑO
  ========================= */

  window.addEventListener("resize", () => {

    if (mobileQuery.matches) {
      updateCounter();
    } else {
      clearTimeout(hideCounterTimeout);
      counter.classList.remove("is-hidden");
    }

  });


  /* =========================
     INICIALIZACIÓN
  ========================= */

  if (mobileQuery.matches) {
    updateCounter();
  }

});