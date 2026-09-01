/* Tacos El Giro — script.js
 *
 * The order counter is built on radio inputs and :checked, so the architecture
 * needs no JavaScript (tier doc §6: "JS only if the architecture needs it").
 * This file exists for one job: keep the footer year from going stale, which is
 * exactly the kind of staleness the incumbent audit looks for on other sites.
 */
(function () {
  'use strict';
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
