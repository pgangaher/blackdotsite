(function () {
  'use strict';

  var hamburger  = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', isOpen);
      document.getElementById('site-header').classList.toggle('menu-open', !isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        document.getElementById('site-header').classList.remove('menu-open');
      });
    });
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
