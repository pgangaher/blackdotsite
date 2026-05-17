(function () {
  'use strict';

  /* ─────────────────────────────────────
     Nav: transparent ↔ solid on scroll
  ───────────────────────────────────── */
  var header = document.getElementById('site-header');
  var heroEl = document.querySelector('.service-hero');

  function updateNav() {
    var scrollY = window.scrollY;
    var threshold = heroEl ? heroEl.offsetHeight - header.offsetHeight : 80;

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
  var hamburger  = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', isOpen);
      header.classList.toggle('menu-open', !isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        header.classList.remove('menu-open');
      });
    });
  }

  /* ─────────────────────────────────────
     Cursor trail — spawn black dots under mouse
  ───────────────────────────────────── */
  var supportsHover = window.matchMedia('(hover: hover)').matches;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (supportsHover && !reducedMotion) {
    var lastSpawn = 0;
    var SPAWN_INTERVAL = 35;
    var DOT_LIFETIME   = 700;

    window.addEventListener('mousemove', function (e) {
      var now = performance.now();
      if (now - lastSpawn < SPAWN_INTERVAL) return;
      lastSpawn = now;

      var dot = document.createElement('div');
      dot.className = 'cursor-dot';
      dot.style.left = e.clientX + 'px';
      dot.style.top  = e.clientY + 'px';
      document.body.appendChild(dot);

      setTimeout(function () { dot.remove(); }, DOT_LIFETIME);
    }, { passive: true });
  }


  var revealEls = document.querySelectorAll('.reveal');
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(function (el) { revealObserver.observe(el); });
})();
