const burger = document.querySelector('#burger');
const nav = document.querySelector('#nav');
const contactForm = document.querySelector('#contactForm');
const year = document.querySelector('#year');

if (burger && nav) {
  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';

    burger.setAttribute('aria-expanded', String(!isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Открыть меню' : 'Закрыть меню');

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

window.addEventListener('load', () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true
    });
  }

  if (typeof gsap !== 'undefined' && typeof SplitText !== 'undefined') {
    const title = document.getElementById("mainTitle");
    if (title) {
      const split = new SplitText(title, { type: "chars" });

      gsap.from(split.chars, {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.02,
        ease: "back.out(1.7)",
        delay: 0.2
      });
    }
  }

  const revealText = document.querySelector('.reveal-text');
  if (revealText) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(revealText);
  }

  const lottieContainer = document.getElementById('lottie-animation');
  if (lottieContainer && typeof lottie !== 'undefined') {
    lottie.loadAnimation({
      container: lottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets9.lottiefiles.com/packages/lf20_myejiggj.json'
    });
  }
});