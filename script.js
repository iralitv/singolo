const MENU = document.getElementById('menu');

MENU.addEventListener('click', (event) => {
  MENU.querySelectorAll('.main-menu__item a').forEach(item =>
    item.classList.remove('active')
  );

  event.target.classList.add('active');
});

// fade mobile screen

const SLIDER = document.getElementById('slider');

SLIDER.addEventListener('click', (event) => {
  let classes = Array.from(event.target.classList);

  if (classes.includes('slide__btn')) {
    classes.includes('next') ? plusSlides(1) : plusSlides(-1);
  }

  if (classes.includes('mobile__screen')) {
    event.target.classList.toggle('mobile__screen--fade')
  }
})

// carousel

let slideIndex = 1;
let slides = document.getElementsByClassName('slide');

showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n)
}

function showSlides(index) {
  if (index > slides.length) slideIndex = 1;
  if (index < 1) slideIndex = slides.length;

  Array.from(slides).forEach(item => item.style.display = 'none');
  slides[slideIndex-1].style.display = 'flex';
}