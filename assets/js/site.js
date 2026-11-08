// Figure half-moon + subtle scroll reveal. The language switch is plain links
// (index.html / index.ru.html); the figure cards stay readable without JavaScript.
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var orbs = document.querySelectorAll('.orb[data-fig]');
  var cards = document.querySelectorAll('.fig');
  if (orbs.length && cards.length) {
    document.documentElement.classList.add('js-tabs');
    var show = function (id) {
      cards.forEach(function (c) { c.classList.toggle('is-active', c.id === 'fig-' + id); });
      orbs.forEach(function (o) {
        if (o.getAttribute('data-fig') === id) o.setAttribute('aria-current', 'true');
        else o.removeAttribute('aria-current');
      });
    };
    orbs.forEach(function (o) {
      o.addEventListener('click', function (e) { e.preventDefault(); show(o.getAttribute('data-fig')); });
    });
    show(orbs[0].getAttribute('data-fig'));
  }

  var items = document.querySelectorAll('.reveal');
  if (!items.length || reduce || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('js');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  items.forEach(function (el) { io.observe(el); });
})();
