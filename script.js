const MENU = document.getElementById('menu');

MENU.addEventListener('click', (event) => {
  MENU.querySelectorAll('.main-menu__item a').forEach(item =>
    item.classList.remove('active')
  );

  event.target.classList.add('active');
});

// carousel

let slideIndex = 1;
const NEXT_SLIDE_BTN = document.getElementById('next');
const PREV_SLIDE_BTN = document.getElementById('prev');
let slides = document.getElementsByClassName('slide');

showSlides(slideIndex);

NEXT_SLIDE_BTN.addEventListener('click', () => {plusSlides(1)});
PREV_SLIDE_BTN.addEventListener('click', () => {plusSlides(-1)});

function plusSlides(n) {
  showSlides(slideIndex += n)
}

function showSlides(index) {
  if (index > slides.length) slideIndex = 1;
  if (index < 1) slideIndex = slides.length;

  Array.from(slides).forEach(item => item.style.display = 'none');
  slides[slideIndex-1].style.display = 'flex';
}

// fade mobile screen

const MOBILE = document.getElementById('mobile');

MOBILE.addEventListener('click', (event) => {
  if (Array.from(event.target.classList).includes('mobile__screen')) {
    event.target.classList.toggle('mobile__screen--fade')
  }
})
