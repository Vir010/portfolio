
const burger = document.querySelector('#burger');
const nav = document.querySelector('#nav');
const contactForm = document.querySelector('#contactForm');
const year = document.querySelector('#year');

if (burger && nav) {
  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';

    burger.setAttribute('aria-expanded', String(!isOpen));
    burger.setAttribute(
      'aria-label',
      isOpen ? 'Открыть меню' : 'Закрыть меню'
    );

    nav.classList.toggle('is-open', !isOpen);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Открыть меню');
    });
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!name || !email || !message) {
      return;
    }

    alert('Спасибо! Мы свяжемся с вами.');
    contactForm.reset();
  });
}

if (year) {
  year.textContent = new Date().getFullYear();
}