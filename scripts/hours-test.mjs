/* The page makes a live claim — "Open now", "Closed, opens Tuesday" — and a wrong
 * one sends someone to a dark parking lot. So the claim is tested, not trusted.
 * Date is stubbed before script.js runs, then the rendered badge is read back;
 * the cases are the ones that actually break: the minute before close, the minute
 * of close, a closed Monday, a Sunday night with Monday dark behind it, midnight.
 *
 * The hours themselves are sourced in PRODUCT.md. Change them there and here.
 *
 *   node scripts/hours-test.mjs        (needs the site on :8000)
 */
import { chromium } from 'playwright';
const EXPECT = {
  '2026-09-08T15:00:00Z': [false, 'Closed \u2014 opens today at 11\u00A0AM'],
  '2026-09-08T20:00:00Z': [true,  'Open now \u2014 until 7:30\u00A0PM'],
  '2026-09-09T02:29:00Z': [true,  'Open now \u2014 until 7:30\u00A0PM'],
  '2026-09-09T02:30:00Z': [false, 'Closed \u2014 opens tomorrow at 11\u00A0AM'],
  '2026-09-07T20:00:00Z': [false, 'Closed \u2014 opens tomorrow at 11\u00A0AM'],
  '2026-09-14T04:00:00Z': [false, 'Closed \u2014 opens Tuesday at 11\u00A0AM'],
  '2026-09-08T07:00:00Z': [false, 'Closed \u2014 opens today at 11\u00A0AM'],
};
let failed = 0;
const CASES = [
  ['2026-09-08T15:00:00Z', 'Tue 08:00 PDT — before open'],
  ['2026-09-08T20:00:00Z', 'Tue 13:00 PDT — mid service'],
  ['2026-09-09T02:29:00Z', 'Tue 19:29 PDT — one minute left'],
  ['2026-09-09T02:30:00Z', 'Tue 19:30 PDT — the minute it closes'],
  ['2026-09-07T20:00:00Z', 'Mon 13:00 PDT — closed day'],
  ['2026-09-14T04:00:00Z', 'Sun 21:00 PDT — after close, Monday dark'],
  ['2026-09-08T07:00:00Z', 'Tue 00:00 PDT — midnight'],
];
const BASE = process.argv[2] || 'http://localhost:8000';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const [iso, label] of CASES) {
  const p = await b.newPage({ viewport:{width:1280,height:900} });
  await p.addInitScript(`(() => { const F = Date; const T = new F(${JSON.stringify(iso)}).getTime();
    class D extends F { constructor(...a){ if(!a.length) super(T); else super(...a); }
      static now(){ return T; } } window.Date = D; })()`);
  await p.goto(BASE, { waitUntil:'domcontentloaded' });
  await p.waitForTimeout(700);
  const r = await p.evaluate(`(() => { const e = document.getElementById('onair');
    return { hidden: e.hidden, open: e.classList.contains('is-open'), text: e.querySelector('b').textContent }; })()`);
  const [wantOpen, wantText] = EXPECT[iso];
  const ok = !r.hidden && r.open === wantOpen && r.text === wantText;
  if (!ok) failed++;
  console.log(`${ok ? '  ok  ' : '  FAIL'} ${label.padEnd(40)} ${r.hidden ? 'HIDDEN' : (r.open ? 'gold' : 'dim ')}  ${r.text}`);
  if (!ok) console.log(`       expected ${wantOpen ? 'gold' : 'dim '}  ${wantText}`);
  await p.close();
}
await b.close();
if (failed) { console.error(`\nFAILED — ${failed} of ${CASES.length} hour states wrong`); process.exit(1); }
console.log(`\nPASSED — ${CASES.length} hour states, all correct`);
