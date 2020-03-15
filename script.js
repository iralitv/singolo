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
  let classes = event.target.classList;

  if (classes.contains('slide__btn')) {
    classes.contains('next') ? plusSlides(1) : plusSlides(-1);
  }

  if (classes.contains('mobile__screen')) {
    classes.toggle('mobile__screen--fade')
  }
});

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

// portfolio

const TABS = document.getElementById('tabs');
const IMAGES = document.getElementById('portfolio-img-id');

TABS.addEventListener('click', (event) => {
  TABS.querySelectorAll('button').forEach(item => {
    item.classList.remove('tags__btn--active')
  });

  if (event.target.value) {
    event.target.classList.add('tags__btn--active');
    mixImage();
  }
});

let randomPosition = () => Math.floor(Math.random() * 12);

function mixImage() {
  IMAGES.querySelectorAll('.portfolio-img__item')
    .forEach(item => item.style.order = `${randomPosition()}`)
}

IMAGES.addEventListener('click', (event) => {
  IMAGES.querySelectorAll('.portfolio-img__item').forEach(item => {
    item.classList.remove('portfolio-img__item--active')
  });

  event.target.classList.add('portfolio-img__item--active');
});

// modal

const SUBMIT = document.getElementById('form-submit-id');
const MODAL = document.getElementById('modal-id');
const MODAL_CONTENT = document.getElementsByClassName('modal__info')[0];
const CLOSE = document.getElementsByClassName("close")[0];
const REQUIRED_INPUTS = document.querySelectorAll('.form input:required');
const INPUTS = document.querySelectorAll('.form__item--modal');

let isFilled = () => Array.from(REQUIRED_INPUTS).every(item => item.value);

SUBMIT.addEventListener('click', (event) => {

  if(!isFilled()) {
    return false
  }

  event.preventDefault();
  MODAL.style.display = 'flex';

  const defaultSubject = `<p>Without subject</p>`;
  const defaultDescription = `<p>Without description</p>`;
  const content = Array.from(INPUTS).map(item => {
    if(item.value) {
      return `<p><span class="modal__subtitle">${item.name}</span>: ${item.value}</p>`
    }
    if(item.name === 'subject') {
      return defaultSubject;
    }
    return defaultDescription;
  }).join('');

  MODAL_CONTENT.innerHTML = content;
});

CLOSE.addEventListener('click', () => {
  MODAL.style.display = 'none'
});

window.addEventListener('click', (event) => {
  if (event.target === MODAL) {
    MODAL.style.display = 'none'
  }
});




