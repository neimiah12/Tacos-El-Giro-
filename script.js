/* Tacos El Giro
 *
 * The menu board runs on radio inputs and :checked, so the architecture needs no
 * JavaScript. This file does four small things:
 *   - hides a photograph that fails to load, so the lit panel behind it becomes
 *     the picture rather than a broken-image icon
 *   - the sticky bar's solid state
 *   - the mobile menu
 *   - which nav link is current
 *
 * There is deliberately no scroll-reveal observer. The page has one authored
 * moment, the service light coming up on load, and it is done in CSS.
 */
(function () {
  'use strict';

  /* ------------------------------------------- photography, failing safe */
  function markMissing(img) {
    var shot = img.closest('.shot');
    if (shot) shot.classList.add('is-missing');
  }
  Array.prototype.forEach.call(document.querySelectorAll('.shot img'), function (img) {
    if (img.complete && img.naturalWidth === 0) markMissing(img);
    img.addEventListener('error', function () { markMissing(img); });
  });

  /* ------------------------------------------------------------- header */
  var bar = document.getElementById('bar');
  function syncBarHeight() {
    if (bar) document.documentElement.style.setProperty('--bar-h', bar.offsetHeight + 'px');
  }
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      if (bar) bar.classList.toggle('is-stuck', (window.scrollY || window.pageYOffset) > 30);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', syncBarHeight);
  syncBarHeight();
  onScroll();

  /* -------------------------------------------------------- mobile menu */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  function setMenu(open) {
    if (!burger || !nav) return;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('is-locked', open);
  }
  function menuOpen() { return !!burger && burger.getAttribute('aria-expanded') === 'true'; }
  if (burger && nav) {
    burger.addEventListener('click', function () { setMenu(!menuOpen()); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuOpen()) { setMenu(false); burger.focus(); }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && menuOpen()) setMenu(false);
    });
  }

  /* --------------------------------------------------------- active nav */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);
  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-on', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = String(new Date().getFullYear());
  window.addEventListener('load', syncBarHeight);
})();
