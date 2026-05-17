(function () {
  'use strict';

  /* ─────────────────────────────────────
     Nav: transparent ↔ solid on scroll
  ───────────────────────────────────── */
  const header  = document.getElementById('site-header');
  const heroEl  = document.getElementById('hero');

  function updateNav() {
    const scrollY = window.scrollY;
    const threshold = heroEl ? heroEl.offsetHeight - header.offsetHeight : 80;

    if (scrollY > threshold) {
      header.classList.remove('nav-transparent');
      header.classList.add('nav-solid');
    } else {
      header.classList.remove('nav-solid');
      header.classList.add('nav-transparent');
    }
  }

  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });


  /* ─────────────────────────────────────
     Hamburger / mobile menu
  ───────────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden', isOpen);
    header.classList.toggle('menu-open', !isOpen);
  });

  // Close mobile menu when a link is tapped
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      header.classList.remove('menu-open');
    });
  });


  /* ─────────────────────────────────────
     Scroll-reveal via IntersectionObserver
  ───────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => revealObserver.observe(el));


  /* ─────────────────────────────────────
     Smooth scroll for anchor links
  ───────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset = header.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ─────────────────────────────────────
     Cursor trail — spawn black dots under mouse
  ───────────────────────────────────── */
  const supportsHover = window.matchMedia('(hover: hover)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (supportsHover && !reducedMotion) {
    let lastSpawn = 0;
    const SPAWN_INTERVAL = 35; // ms between dots
    const DOT_LIFETIME   = 700;

    window.addEventListener('mousemove', (e) => {
      const now = performance.now();
      if (now - lastSpawn < SPAWN_INTERVAL) return;
      lastSpawn = now;

      const dot = document.createElement('div');
      dot.className = 'cursor-dot';
      dot.style.left = e.clientX + 'px';
      dot.style.top  = e.clientY + 'px';
      document.body.appendChild(dot);

      setTimeout(() => dot.remove(), DOT_LIFETIME);
    }, { passive: true });
  }


  /* ─────────────────────────────────────
     Contact form (front-end only)
  ───────────────────────────────────── */
  const form       = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('.form-submit');
    submitBtn.textContent = 'Sending…';
    submitBtn.classList.add('submitting');
    submitBtn.disabled = true;

    // Simulate sending (replace with real endpoint / Formspree / EmailJS)
    setTimeout(() => {
      form.reset();
      submitBtn.textContent = 'Send Message';
      submitBtn.classList.remove('submitting');
      submitBtn.disabled = false;

      formStatus.textContent = 'Thanks! We\'ll be in touch shortly.';
      formStatus.classList.remove('hidden', 'text-red-400');
      formStatus.classList.add('text-green-400');

      setTimeout(() => formStatus.classList.add('hidden'), 5000);
    }, 1200);
  });

})();
