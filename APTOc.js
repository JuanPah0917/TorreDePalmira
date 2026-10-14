/* =========================
   NAVBAR
========================= */

const navbar = document.querySelector('.navbar');

let navbarCollapsed = false;


/* =========================
   SCROLL
========================= */

window.addEventListener('scroll', () => {

  /* Al regresar arriba, abrir navbar */

  if (window.scrollY <= 5) {

    navbarCollapsed = false;

    navbar.classList.remove('is-collapsed');

    return;
  }


  /* Al bajar, recoger navbar */

  if (!navbarCollapsed) {

    navbarCollapsed = true;

    navbar.classList.add('is-collapsed');

  }

});


/* =========================
   HOVER
========================= */

navbar.addEventListener('mouseenter', () => {

  if (navbarCollapsed) {

    navbar.classList.remove('is-collapsed');

  }

});


navbar.addEventListener('mouseleave', () => {

  if (navbarCollapsed) {

    navbar.classList.add('is-collapsed');

  }

});





/* =========================
   HERO 3 - GALERÍA
========================= */

const galleryTrack = document.querySelector('.apto-gallery__track');
const gallerySlides = document.querySelectorAll('.apto-gallery__slide');
const galleryPrev = document.querySelector('.apto-gallery__arrow--prev');
const galleryNext = document.querySelector('.apto-gallery__arrow--next');
const galleryDotsContainer = document.querySelector('.apto-gallery__dots');

let galleryCurrentSlide = 0;


/* CREAR DOTS */

gallerySlides.forEach((slide, index) => {

  const dot = document.createElement('button');

  dot.classList.add('apto-gallery__dot');

  dot.setAttribute(
    'aria-label',
    `Ir a imagen ${index + 1}`
  );

  if (index === 0) {
    dot.classList.add('is-active');
  }

  dot.addEventListener('click', () => {

    galleryCurrentSlide = index;

    updateGallery();

  });

  galleryDotsContainer.appendChild(dot);

});


const galleryDots =
  document.querySelectorAll('.apto-gallery__dot');
  



/* ==========================================
   ACTUALIZAR GALERÍA
========================================== */

function updateGallery() {

  /* MOVER IMÁGENES */

  galleryTrack.style.transform =
    `translateX(-${galleryCurrentSlide * 100}%)`;


  /* ACTUALIZAR INDICADORES */

  galleryDots.forEach((dot, index) => {

    dot.classList.toggle(
      'is-active',
      index === galleryCurrentSlide
    );

  });


  /* ACTUALIZAR CONTADOR */

  const counterCurrent = document.querySelector(
    '.apto-gallery__counter-current'
  );

  if (counterCurrent) {
    counterCurrent.textContent = galleryCurrentSlide + 1;
  }


  /* MOSTRAR CONTADOR */

  showGalleryCounter();

}


/* SIGUIENTE */

galleryNext.addEventListener('click', () => {

  galleryCurrentSlide++;

  if (galleryCurrentSlide >= gallerySlides.length) {
    galleryCurrentSlide = 0;
  }

  updateGallery();

});


/* ANTERIOR */

galleryPrev.addEventListener('click', () => {

  galleryCurrentSlide--;

  if (galleryCurrentSlide < 0) {
    galleryCurrentSlide = gallerySlides.length - 1;
  }

  updateGallery();

});







/* ==========================================
   NAVBAR MÓVIL - APTO C
========================================== */

const mobileNavbar = document.querySelector('.mobile-navbar');

const mobileMenuButton = document.querySelector('.mobile-navbar__menu');

const mobileNavbarLinks = document.querySelectorAll(
  '.mobile-navbar__content a'
);


/* ABRIR Y CERRAR */

if (mobileNavbar && mobileMenuButton) {

  mobileMenuButton.addEventListener('click', () => {

    const isOpen = mobileNavbar.classList.toggle('is-open');

    mobileMenuButton.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

    mobileMenuButton.setAttribute(
      'aria-label',
      isOpen ? 'Cerrar menú' : 'Abrir menú'
    );

  });


  /* CERRAR AL SELECCIONAR UN ENLACE */

  mobileNavbarLinks.forEach(link => {

    link.addEventListener('click', () => {

      mobileNavbar.classList.remove('is-open');

      mobileMenuButton.setAttribute(
        'aria-expanded',
        'false'
      );

      mobileMenuButton.setAttribute(
        'aria-label',
        'Abrir menú'
      );

    });

  });

}






/* ==========================================
   HERO 3 - FUNCIONES MÓVILES
========================================== */


/* =========================
   CONTADOR
========================= */

const galleryCounter = document.querySelector(
  '.apto-gallery__counter'
);

const galleryCounterTotal = document.querySelector(
  '.apto-gallery__counter-total'
);

if (galleryCounterTotal) {
  galleryCounterTotal.textContent = gallerySlides.length;
}

let galleryCounterTimer;


/* MOSTRAR CONTADOR DURANTE 5 SEGUNDOS */

function showGalleryCounter() {

  if (!galleryCounter) return;

  galleryCounter.classList.remove('is-hidden');

  clearTimeout(galleryCounterTimer);

  galleryCounterTimer = setTimeout(() => {

    galleryCounter.classList.add('is-hidden');

  }, 5000);

}


/* =========================
   DESLIZAMIENTO TÁCTIL
========================= */

const galleryWindow = document.querySelector(
  '.apto-gallery__window'
);

let galleryTouchStartX = 0;
let galleryTouchStartY = 0;


if (galleryWindow) {

  galleryWindow.addEventListener('touchstart', (event) => {

    galleryTouchStartX = event.changedTouches[0].screenX;
    galleryTouchStartY = event.changedTouches[0].screenY;

  }, { passive: true });


  galleryWindow.addEventListener('touchend', (event) => {

    const touchEndX = event.changedTouches[0].screenX;
    const touchEndY = event.changedTouches[0].screenY;

    const differenceX = galleryTouchStartX - touchEndX;
    const differenceY = galleryTouchStartY - touchEndY;


    /* IGNORAR MOVIMIENTOS VERTICALES */

    if (Math.abs(differenceX) <= Math.abs(differenceY)) {
      return;
    }


    /* DISTANCIA MÍNIMA */

    if (Math.abs(differenceX) < 40) {
      return;
    }


    /* DESLIZAR A LA IZQUIERDA */

    if (differenceX > 0) {

      galleryCurrentSlide++;

      if (galleryCurrentSlide >= gallerySlides.length) {
        galleryCurrentSlide = 0;
      }

    }


    /* DESLIZAR A LA DERECHA */

    else {

      galleryCurrentSlide--;

      if (galleryCurrentSlide < 0) {
        galleryCurrentSlide = gallerySlides.length - 1;
      }

    }


    updateGallery();

  }, { passive: true });

}


/* =========================
   INICIAR CONTADOR
========================= */

showGalleryCounter();