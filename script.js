//scroll transition
const mainNavLinks = document.querySelectorAll('.main-menu__item a');
const headerHeight = document.querySelector('.header').offsetHeight;

window.addEventListener('scroll', event => {
  let fromTop = window.scrollY + headerHeight;

  mainNavLinks.forEach(link => {
    let section = document.querySelector(link.hash);

    if(section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
      link.classList.add('active');
      link.classList.contains('active')
    } else {
      link.classList.remove('active')
    }
  })
});

// fade mobile screen

const SLIDER = document.getElementById('slider');

SLIDER.addEventListener('click', event => {
  let classes = event.target.classList;

  if (classes.contains('mobile__screen')) {
    classes.toggle('mobile__screen--fade')
  }
});

// slider
function Slider (setting) {
  let privates = {}

  privates.setting = setting;

  privates.sel = {
    'main': document.querySelector(privates.setting.main),
    'wrap': document.querySelector(privates.setting.wrap),
    'children': document.querySelector(privates.setting.wrap).children,
    'prev': document.querySelector(privates.setting.prev),
    'next': document.querySelector(privates.setting.next),
  }

  privates.opt = {
    'position': 0,
    'max_position': document.querySelector(privates.setting.wrap).children.length,
  }

  privates.sel.wrap.appendChild(privates.sel.children[0].cloneNode(true))

  if(privates.sel.prev !== null) {
    privates.sel.prev.addEventListener('click', () => {
      this.prev_slide();
    })
  }

  if(privates.sel.next !== null) {
    privates.sel.next.addEventListener('click', () => {
      this.next_slide();
    })
  }

  this.prev_slide = () => {
    --privates.opt.position;

    if(privates.opt.position < 0) {
      privates.sel.wrap.classList.add('s-notransition')
      privates.sel.wrap.style['transform'] = `translateX(-${privates.opt.max_position}00%)`
      privates.opt.position = privates.opt.max_position - 1
    }

    setTimeout(() => {
      privates.sel.wrap.classList.remove('s-notransition')
      privates.sel.wrap.style['transform'] = `translateX(-${privates.opt.position}00%)`
    }, 10)

  }

  this.next_slide = () => {
    if(privates.opt.position < privates.opt.max_position) {
      ++privates.opt.position;
    }

    privates.sel.wrap.classList.remove('s-notransition');
    privates.sel.wrap.style['transform'] = `translateX(-${privates.opt.position}00%)`

    privates.sel.wrap.addEventListener('webkitTransitionEnd', () => {
      if(privates.opt.position >= privates.opt.max_position) {
        privates.sel.wrap.classList.add('s-notransition');
        privates.sel.wrap.style['transform'] = 'translateX(0)';
        privates.opt.position = 0;
      }
    })
  }
}

new Slider({
  "main": ".js-carousel",
  "wrap": ".js-carousel__wrap",
  "prev": ".js-carousel__prev",
  "next": ".js-carousel__next"
});

// portfolio

const TABS = document.getElementById('tabs');
const IMAGES = document.getElementById('portfolio-img-id');

TABS.addEventListener('click', event => {
  TABS.querySelectorAll('button').forEach(item => {
    item.classList.remove('tags__btn--active')
  });

  if (event.target.value) {
    event.target.classList.add('tags__btn--active');
    mixImage();
  }
});

function mixImage() {
  for(let i = IMAGES.children.length; i > 0; i--) {
    IMAGES.appendChild(IMAGES.children[Math.random() * i | 0]);
  }
}

IMAGES.addEventListener('click', event => {
  IMAGES.querySelectorAll('.portfolio-img__item').forEach(item => {
    item.classList.remove('portfolio-img__item--active')
  });
  if (event.target.classList.contains('portfolio-img__item')){
    event.target.classList.add('portfolio-img__item--active');
  }
});

// modal

const FORM = document.getElementById('form-id');
const MODAL = document.getElementById('modal-id');
const MODAL_CONTENT = document.getElementsByClassName('modal__info')[0];
const CLOSE = document.getElementsByClassName("close")[0];
const FORM_INPUTS = document.querySelectorAll('.form__item');
const MODAL_INPUTS = document.querySelectorAll('.form__item--modal');

FORM.addEventListener('submit', event => {
  event.preventDefault();
  MODAL.style.display = 'flex';

  const defaultSubject = `<p>Without subject</p>`;
  const defaultDescription = `<p>Without description</p>`;
  const content = Array.from(MODAL_INPUTS).map(item => {
    if(item.value) {
      return `<p><span class="modal__subtitle">${item.name}</span>: ${item.value}</p>`
    }
    if(item.name === 'subject') {
      return defaultSubject;
    }
    return defaultDescription;
  }).join('');

  MODAL_CONTENT.innerHTML = content;

  FORM_INPUTS.forEach(item => item.value = '');
});

CLOSE.addEventListener('click', () => {
  MODAL.style.display = 'none'
});

window.addEventListener('click', event => {
  if (event.target === MODAL) {
    MODAL.style.display = 'none'
  }
});

// burger-menu
const HEADER = document.getElementById('header-id');
const BURGER_BUTTON = document.querySelector('.burger-menu__button');
const NAVIGATION = document.getElementById('navigation-id');

HEADER.addEventListener('click', (event) => {
  if(event.target.parentElement === BURGER_BUTTON) {
    event.preventDefault();
    NAVIGATION.classList.toggle('burger-menu--active');
  } else {
    NAVIGATION.classList.remove('burger-menu--active');
  }
})
