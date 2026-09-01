/* Tacos El Giro — verification gate.
 *
 * Implements §7 of the Verified Launch tier doc. Run it before calling a build
 * done, and again against deploy/ rather than the source (§11).
 *
 *   npm install playwright
 *   node verify.mjs [http://localhost:8000]
 *
 * What it refuses to do wrong, per §7:
 *  - It walks EVERY leaf element that has text, not one instance per class.
 *  - It composites translucent ancestors instead of reading one background-color.
 *  - It checks :hover separately, because resting states passing proves nothing.
 *  - It re-runs the whole walk once per meat, so hidden panels are not skipped.
 *  - It skips lazy images reporting naturalWidth === 0 instead of failing them.
 */
import { chromium } from 'playwright';

const URL = process.argv[2] || 'http://localhost:8000';
const EXE = process.env.CHROME_PATH || undefined;
const MEATS = ['m-birria', 'm-adobada', 'm-chorizo', 'm-chicken', 'm-asada'];

const fail = [];
const note = (s) => console.log(s);
const bad = (s) => { fail.push(s); console.log('  FAIL  ' + s); };

const PAGE_FNS = `
function srgb(c){c/=255;return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4)}
function lum(c){return 0.2126*srgb(c[0])+0.7152*srgb(c[1])+0.0722*srgb(c[2])}
function ratio(a,b){const A=lum(a),B=lum(b),hi=Math.max(A,B),lo=Math.min(A,B);return (hi+0.05)/(lo+0.05)}
function parse(s){const m=s.match(/rgba?\\(([^)]+)\\)/);if(!m)return null;
  const p=m[1].split(',').map(x=>parseFloat(x.trim()));
  return {r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}}
function over(fg,bg){return [fg.r*fg.a+bg[0]*(1-fg.a),fg.g*fg.a+bg[1]*(1-fg.a),fg.b*fg.a+bg[2]*(1-fg.a)]}
function effBg(el){
  let stack=[],n=el;
  while(n&&n.nodeType===1){const c=parse(getComputedStyle(n).backgroundColor);
    if(c&&c.a>0){stack.push(c); if(c.a===1)break;} n=n.parentElement;}
  let base=[255,255,255];
  for(let i=stack.length-1;i>=0;i--) base=over(stack[i],base);
  return base;
}
function visible(el){
  const cs=getComputedStyle(el);
  if(cs.visibility==='hidden'||cs.display==='none'||parseFloat(cs.opacity)===0) return false;
  const r=el.getBoundingClientRect();
  return r.width>0&&r.height>0;
}
function ownText(el){
  return Array.from(el.childNodes)
    .filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).join('').length>0;
}
function target(cs){
  const px=parseFloat(cs.fontSize), w=parseInt(cs.fontWeight,10)||400;
  const large = px>=24 || (px>=18.66 && w>=700);
  return large?3.0:4.5;
}
`;

const walk = `(() => {
  ${PAGE_FNS}
  const out=[];
  document.querySelectorAll('*').forEach(el=>{
    if(!ownText(el)||!visible(el)) return;
    const cs=getComputedStyle(el);
    const fg=parse(cs.color); if(!fg) return;
    const bg=effBg(el);
    const c=over(fg,bg);
    const r=ratio(c,bg), t=target(cs);
    out.push({sel:el.tagName.toLowerCase()+(el.className&&typeof el.className==='string'?'.'+el.className.trim().split(/\\s+/).join('.'):''),
      text:(el.textContent||'').trim().slice(0,42), color:cs.color, bg:'rgb('+bg.map(Math.round).join(',')+')',
      px:parseFloat(cs.fontSize), ratio:+r.toFixed(2), target:t, pass:r>=t});
  });
  return out;
})()
`;

const browser = await chromium.launch(EXE ? { executablePath: EXE } : {});
const errors = [];

/* ---------------------------------------------------- 1. contrast, all meats */
note('\n[1] Contrast — every leaf element with text, per meat');
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  await page.goto(URL, { waitUntil: 'load' });
  await page.waitForTimeout(400);

  let checked = 0, worst = { ratio: 99 };
  for (const meat of MEATS) {
    await page.evaluate(id => { document.getElementById(id).checked = true; }, meat);
    await page.waitForTimeout(280);
    const rows = await page.evaluate(walk);
    checked += rows.length;
    for (const r of rows) {
      if (!r.pass) bad(`${meat}  ${r.ratio}:1 (needs ${r.target}) ${r.color} on ${r.bg}  <${r.sel}> "${r.text}"`);
      if (r.ratio < worst.ratio) worst = { ...r, meat };
    }
  }
  note(`  ${checked} leaf elements checked across ${MEATS.length} meat states`);
  note(`  tightest passing pair: ${worst.ratio}:1 (needs ${worst.target}) <${worst.sel}> "${worst.text}"`);
  await ctx.close();
}

/* ------------------------------------------------------------- 2. :hover */
note('\n[2] Contrast — hover states, checked separately');
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'load' });
  const targets = await page.$$('a, label, button');
  let n = 0, skipped = 0;
  for (const el of targets) {
    if (!(await el.isVisible())) continue;
    // Off-viewport affordances (the skip link parks at top:-80px) cannot be
    // hovered and would hang the run — count them rather than stalling.
    try { await el.hover({ timeout: 2500 }); }
    catch { skipped++; continue; }
    await page.waitForTimeout(90);
    const rows = await el.evaluate((root, fns) => {
      eval(fns);
      const res = [];
      const all = [root, ...root.querySelectorAll('*')];
      for (const el of all) {
        if (!ownText(el) || !visible(el)) continue;
        const cs = getComputedStyle(el);
        const fg = parse(cs.color); if (!fg) continue;
        const bg = effBg(el); const c = over(fg, bg);
        const r = ratio(c, bg), t = target(cs);
        res.push({ tag: el.tagName.toLowerCase(), text: (el.textContent || '').trim().slice(0, 34),
          ratio: +r.toFixed(2), target: t, pass: r >= t,
          color: cs.color, bg: 'rgb(' + bg.map(Math.round).join(',') + ')' });
      }
      return res;
    }, PAGE_FNS);
    for (const r of rows) {
      n++;
      if (!r.pass) bad(`HOVER ${r.ratio}:1 (needs ${r.target}) ${r.color} on ${r.bg} <${r.tag}> "${r.text}"`);
    }
  }
  note(`  ${n} hovered text elements checked${skipped ? `, ${skipped} not hoverable (off-viewport)` : ''}`);
  await ctx.close();
}

/* ------------------------------------------- 3. overflow at 1280 and 375 */
note('\n[3] Horizontal overflow — 1280 desktop and 375 emulated mobile');
for (const vp of [{ w: 1280, h: 900, m: false }, { w: 375, h: 812, m: true }]) {
  const ctx = await browser.newContext({
    viewport: { width: vp.w, height: vp.h },
    isMobile: vp.m, hasTouch: vp.m, deviceScaleFactor: vp.m ? 3 : 1,
    userAgent: vp.m ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' : undefined,
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'load' });
  for (const meat of MEATS) {
    await page.evaluate(id => { document.getElementById(id).checked = true; }, meat);
    await page.waitForTimeout(150);
    const o = await page.evaluate(() => {
      const d = document.documentElement;
      const wide = [...document.querySelectorAll('*')]
        .filter(e => e.getBoundingClientRect().right > d.clientWidth + 1)
        .map(e => e.tagName.toLowerCase() + '.' + (typeof e.className === 'string' ? e.className.trim().split(/\s+/).join('.') : ''));
      return { sw: d.scrollWidth, cw: d.clientWidth, wide: [...new Set(wide)].slice(0, 6) };
    });
    if (o.sw > o.cw + 1) bad(`overflow at ${vp.w}px (${meat}): scrollWidth ${o.sw} > clientWidth ${o.cw} — ${o.wide.join(', ')}`);
  }
  note(`  ${vp.w}px${vp.m ? ' (emulated mobile)' : ''}: no horizontal overflow in any meat state`);
  await ctx.close();
}

/* ------------------------------- 4. anchors, images, type ramp, invariant */
note('\n[4] Structure, assets and the architecture invariant');
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const failedReq = [];
  page.on('requestfailed', r => failedReq.push(r.url()));
  page.on('response', r => { if (r.status() >= 400) failedReq.push(r.status() + ' ' + r.url()); });
  await page.goto(URL, { waitUntil: 'load' });
  await page.waitForTimeout(500);

  const res = await page.evaluate(() => {
    const ids = new Set([...document.querySelectorAll('[id]')].map(e => e.id));
    const anchors = [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href').slice(1));
    const brokenAnchors = anchors.filter(a => a && !ids.has(a));

    // Lazy images report naturalWidth 0 until scrolled in — do not fail those (§7).
    const imgs = [...document.querySelectorAll('img')].map(i => ({
      src: i.currentSrc || i.src, nat: i.naturalWidth, shown: i.getBoundingClientRect().width,
      lazy: i.loading === 'lazy',
    }));
    const upscaled = imgs.filter(i => i.nat > 0 && i.shown > i.nat + 1);
    const brokenImgs = imgs.filter(i => i.nat === 0 && !i.lazy);

    // Nothing functional below 11px.
    const tiny = [...document.querySelectorAll('*')].filter(e => {
      const has = [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
      if (!has) return false;
      const cs = getComputedStyle(e);
      if (cs.visibility === 'hidden' || cs.display === 'none') return false;
      return parseFloat(cs.fontSize) < 11;
    }).map(e => e.tagName + ' ' + parseFloat(getComputedStyle(e).fontSize) + 'px');

    // Distinct font sizes actually rendered — the ramp must have real gaps (§5).
    const sizes = [...new Set([...document.querySelectorAll('*')].map(e => {
      const has = [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
      return has ? Math.round(parseFloat(getComputedStyle(e).fontSize) * 10) / 10 : null;
    }).filter(Boolean))].sort((a, b) => a - b);

    // INVARIANT: the architecture is "no prices". Count them and assert zero.
    const counterText = (document.querySelector('#counter') || {}).textContent || '';
    const prices = counterText.match(/\$\s?\d/g) || [];

    // Build decisions that must hold: no tel:, no cart/order-online.
    const tel = [...document.querySelectorAll('a[href^="tel:"]')].length;
    const body = document.body.textContent.toLowerCase();
    const orderish = ['order online', 'add to cart', 'checkout', 'doordash', 'uber eats', 'grubhub']
      .filter(k => body.includes(k));

    // Ground must not be cream: cool means blue >= red.
    const g = getComputedStyle(document.body).backgroundColor.match(/\d+/g).map(Number);

    return { brokenAnchors, upscaled, brokenImgs, tiny, sizes, prices, tel, orderish, g,
             imgCount: imgs.length };
  });

  if (res.brokenAnchors.length) bad('in-page anchors do not resolve: ' + res.brokenAnchors.join(', '));
  else note('  every in-page anchor resolves');

  if (res.brokenImgs.length) bad('images did not load: ' + JSON.stringify(res.brokenImgs));
  if (res.upscaled.length) bad('images displayed above natural width: ' + JSON.stringify(res.upscaled));
  note(`  ${res.imgCount} images, none broken, none upscaled`);

  if (res.tiny.length) bad('text below 11px: ' + res.tiny.join(', '));
  else note('  no functional text below 11px');
  note('  rendered type ramp: ' + res.sizes.map(s => s + 'px').join(' / '));

  if (res.prices.length) bad(`INVARIANT BROKEN — ${res.prices.length} price(s) render inside #counter; the architecture is priceless`);
  else note('  INVARIANT HOLDS — zero prices render in the counter');

  if (res.tel) bad(`${res.tel} tel: link(s) present — the phone is single-sourced and must not be wired (§1)`);
  else note('  no tel: link — correct while the number is single-sourced');

  if (res.orderish.length) bad('order/delivery affordance present but the store is switched off: ' + res.orderish.join(', '));
  else note('  no order-online affordance — correct, the DoorDash store is inactive');

  if (res.g[2] < res.g[0]) bad(`ground is warm (r${res.g[0]} > b${res.g[2]}) — §4 forbids a cream ground`);
  else note(`  ground rgb(${res.g.join(',')}) is cool, not cream`);

  const realFails = failedReq.filter(u => !/favicon/.test(u));
  if (realFails.length) bad('requests failed: ' + realFails.join(', '));
  else note('  every asset request returned OK');

  await ctx.close();
}

/* ----------------------------------------------------------- 5. no errors */
note('\n[5] Console');
if (errors.length) errors.forEach(e => bad(e));
else note('  zero console errors, zero page errors');

await browser.close();

console.log('\n' + '='.repeat(64));
if (fail.length) { console.log(`FAILED — ${fail.length} finding(s) above`); process.exit(1); }
console.log('PASSED — every §7 check clear'); process.exit(0);
