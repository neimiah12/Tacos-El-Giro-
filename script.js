/* Tacos El Giro — script.js
 *
 * The menu matrix runs on radio inputs and :checked, so the architecture needs
 * no JavaScript. This file adds the sticky-bar state, the mobile menu, scroll
 * reveals, and one thing that matters more than any of them:
 *
 *   A photograph that fails to load must never render as a broken-image icon.
 *   Every photo sits on a painted .shot panel; if the image errors we hide it
 *   and the panel becomes the picture. That keeps the page whole when it is
 *   opened somewhere the image host is unreachable.
 */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------ photography, failing safe */
  function markMissing(img) {
    var shot = img.closest('.shot');
    if (shot) shot.classList.add('is-missing');
  }
  Array.prototype.forEach.call(document.querySelectorAll('.shot img'), function (img) {
    // A deferred script can run after an image has already failed, so check the
    // settled state as well as listening for future errors.
    if (img.complete && img.naturalWidth === 0) markMissing(img);
    img.addEventListener('error', function () { markMissing(img); });
  });

  /* ------------------------------------------------------------------- header */
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

  /* -------------------------------------------------------------- mobile menu */
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

  /* ------------------------------------------------------------ scroll reveal */
  var reveals = document.querySelectorAll('[data-r]');
  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add('seen'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('seen');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });
  }

  /* --------------------------------------------------------------- active nav */
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
