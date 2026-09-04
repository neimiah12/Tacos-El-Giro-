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

  /* ------------------------------------------- is the window open right now */
  /* Kennewick is Pacific, and most visitors are too — but not all, and a phone
     left on the wrong timezone should not decide this. The schedule is evaluated
     in the truck's own zone, never the reader's. Minutes from midnight, Sunday
     first; null is a closed day. Source for these hours: PRODUCT.md. */
  var TZ = 'America/Los_Angeles';
  var OPEN = [660, 1170];                       /* 11:00 -> 19:30 */
  var WEEK = [OPEN, null, OPEN, OPEN, OPEN, OPEN, OPEN];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function clockAt(tz) {
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: tz, weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
    }).formatToParts(new Date());
    var get = function (t) { for (var i = 0; i < parts.length; i++) if (parts[i].type === t) return parts[i].value; };
    var d = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    var h = parseInt(get('hour'), 10);
    if (h === 24) h = 0;                        /* some engines render midnight as 24 */
    return { day: d, min: h * 60 + parseInt(get('minute'), 10) };
  }

  function pretty(min) {
    var h = Math.floor(min / 60), m = min % 60, ap = h < 12 ? 'AM' : 'PM';
    h = h % 12 || 12;
    return h + (m ? ':' + (m < 10 ? '0' : '') + m : '') + '\u00A0' + ap;
  }

  var onair = document.getElementById('onair');
  if (onair && window.Intl && Intl.DateTimeFormat) {
    try {
      var now = clockAt(TZ), today = WEEK[now.day], label;
      if (today && now.min >= today[0] && now.min < today[1]) {
        onair.classList.add('is-open');
        label = 'Open now \u2014 until ' + pretty(today[1]);
      } else {
        var i = (today && now.min < today[0]) ? 0 : 1, d = now.day;
        while (i < 8) {                         /* eight, so a fully closed week cannot spin */
          d = (now.day + i) % 7;
          if (WEEK[d]) break;
          i++;
        }
        var slot = WEEK[d];
        label = slot
          ? 'Closed \u2014 opens ' + (i === 0 ? 'today' : i === 1 ? 'tomorrow' : DAYS[d])
            + ' at ' + pretty(slot[0])
          : 'Closed';
      }
      onair.querySelector('b').textContent = label;
      onair.hidden = false;
    } catch (e) { /* no reliable clock, so no claim — the table stands on its own */ }
  }

  /* ------------------------------------------- the map, failing visible */
  /* A blocked frame still fires load, with an empty same-origin about:blank
     behind it — which is exactly how we tell the two apart. A real Google
     document is cross-origin, so reading contentDocument throws, and that
     throw is the proof the embed is live. */
  Array.prototype.forEach.call(document.querySelectorAll('iframe.map'), function (f) {
    f.addEventListener('load', function () {
      var blank = false;
      try {
        var d = f.contentDocument;
        blank = !!d && (!d.body || d.body.childElementCount === 0);
      } catch (e) { blank = false; }
      if (!blank) f.classList.add('is-on');
    });
  });

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
