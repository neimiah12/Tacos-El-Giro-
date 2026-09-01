#!/usr/bin/env node
/**
 * hbt — hand-built tier checks.
 *
 * Implements the mechanical parts of docs/process/HAND-BUILT-TIER.md:
 *   css     section 6 — the recurring layout bugs
 *   copy    section 4 — the copy rules
 *   links   section 8 — all nav links resolve
 *   photos  section 5 — real dimensions, upscale traps
 *   counts  section 8 — every count consistent sitewide
 *
 * No dependencies. Node 18+.
 * Config: .hbtrc.json at the repo root (see .hbtrc.example.json).
 *
 * Exit code 1 if any ERROR is found. WARNs report but do not fail.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname, dirname, resolve, relative, sep } from 'node:path';

const ROOT = process.cwd();
const SKIP_DIRS = new Set([
  'node_modules', '.git', 'dist', 'build', '.netlify', '.next', 'vendor',
  'coverage', '.cache', 'scratchpad',
]);
// The kit's own template fragments are not site pages; never scan them as such.
const KIT_PATHS = [join('docs', 'templates')];
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg']);

const config = loadConfig();
const findings = [];
const rel = (p) => relative(ROOT, p) || p;

function loadConfig() {
  const path = join(ROOT, '.hbtrc.json');
  const defaults = {
    legalName: '',
    category: '',
    shorthand: [],
    counts: {},
    minPhotoWidth: 1200,
    maxPhotoBytes: 1_500_000,
    ignore: [],
  };
  if (!existsSync(path)) return defaults;
  try {
    return { ...defaults, ...JSON.parse(readFileSync(path, 'utf8')) };
  } catch (e) {
    console.error(`.hbtrc.json is not valid JSON: ${e.message}`);
    process.exit(2);
  }
}

function report(level, check, file, message, fix) {
  findings.push({ level, check, file, message, fix });
}

function walk(dir, out = []) {
  let entries;
  try { entries = readdirSync(dir); } catch { return out; }
  for (const name of entries) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    const r = rel(full);
    if (KIT_PATHS.some((pat) => r.startsWith(pat))) continue;
    if (config.ignore.some((pat) => r.includes(pat))) continue;
    let st;
    try { st = statSync(full); } catch { continue; }
    if (st.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const allFiles = walk(ROOT);
const byExt = (...exts) => allFiles.filter((f) => exts.includes(extname(f).toLowerCase()));
const htmlFiles = byExt('.html', '.htm');
const cssFiles = byExt('.css').filter((f) => !f.endsWith('hand-built-baseline.css'));
const imageFiles = allFiles.filter((f) => IMAGE_EXT.has(extname(f).toLowerCase()));

const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');
const lineOf = (text, index) => text.slice(0, index).split('\n').length;

function inlineStyles(html) {
  const out = [];
  const re = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
  let m;
  while ((m = re.exec(html))) {
    // Line of the <style> tag itself, so findings point at the real file line.
    const startLine = html.slice(0, m.index + m[0].indexOf('>') + 1).split('\n').length;
    out.push({ css: m[1], lineOffset: startLine - 1 });
  }
  return out;
}

function visibleText(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/[ \t]+/g, ' ');
}

/* ------------------------------------------------------------------ css --- */

function checkCss() {
  const sources = [
    ...cssFiles.map((f) => ({ file: f, css: readFileSync(f, 'utf8') })),
    ...htmlFiles.flatMap((f) =>
      inlineStyles(readFileSync(f, 'utf8'))
        .map((b) => ({ file: f, css: b.css, lineOffset: b.lineOffset }))),
  ];

  // If every page loads the baseline, its min-width:0 defaults are in force.
  const baselineExists = existsSync(join(ROOT, 'assets', 'css', 'hand-built-baseline.css'));
  const baselineEverywhere = baselineExists && htmlFiles.length > 0 &&
    htmlFiles.every((f) => readFileSync(f, 'utf8').includes('hand-built-baseline.css'));

  for (const { file, css: raw, lineOffset = 0 } of sources) {
    const css = stripComments(raw);
    const at = (i) => lineOf(css, i) + lineOffset;

    // Bug 1c — span:last-child also matches a lone span (first AND last child).
    for (const m of css.matchAll(/span:last-child/g)) {
      report('ERROR', 'css', `${rel(file)}:${at(m.index)}`,
        'span:last-child also matches a lone span, so the rule applies to plain text rows too.',
        'Use `span:first-child + span` to target the second of a pair.');
    }

    // Bug 2 — the 0fr -> 1fr accordion.
    for (const m of css.matchAll(/grid-template-rows\s*:\s*0fr/g)) {
      report('ERROR', 'css', `${rel(file)}:${at(m.index)}`,
        'The 0fr -> 1fr accordion opens to nothing when the inner wrapper has overflow:hidden — the fr track resolves to 0px and the content sits at zero height.',
        'Use the .reveal fade pattern from assets/css/hand-built-baseline.css.');
    }

    // Bug 3 — multi-column collapse.
    for (const m of css.matchAll(/(?:^|[;{\s])(columns|column-count)\s*:\s*(?!auto)/g)) {
      report('ERROR', 'css', `${rel(file)}:${at(m.index)}`,
        'CSS multi-column needs a definite height to balance against; inside an indefinite-height container it collapses to zero.',
        'Use a grid (.two-col in the baseline) instead.');
    }

    // Rule-level checks.
    for (const rule of css.matchAll(/([^{}]*)\{([^{}]*)\}/g)) {
      const selector = rule[1].trim().replace(/\s+/g, ' ');
      const body = rule[2];
      const line = at(rule.index + (rule[1].length - rule[1].trimStart().length));
      if (!selector || selector.startsWith('@')) continue;
      const has = (prop) => new RegExp(`(?:^|[;{\\s])${prop}\\s*:`).test(body);

      // Bug 1b — implicit single auto-sized column grows past its parent.
      if (/(?:^|[;\s])display\s*:\s*grid/.test(body) &&
          !has('grid-template-columns') && !has('grid-template') && !has('grid-auto-flow')) {
        report('ERROR', 'css', `${rel(file)}:${line}`,
          `\`${selector}\` is display:grid with no grid-template-columns — the implicit auto-sized column grows past its parent.`,
          'Add `grid-template-columns: minmax(0, 1fr);` (or the real columns).');
      }

      // Bug 1a — grid/flex items default to min-width:auto.
      if (!baselineEverywhere &&
          /(?:^|[;\s])display\s*:\s*(grid|flex)/.test(body) && !/\bmin-width\s*:/.test(css)) {
        report('WARN', 'css', `${rel(file)}:${line}`,
          `\`${selector}\` lays out children but nothing in this file sets min-width:0 — one long unbroken line will force a column wider than the page.`,
          'Set `min-width: 0` on the items, or load assets/css/hand-built-baseline.css.');
      }

      // Bug 4 — aspect-ratio losing to intrinsic size.
      if (has('aspect-ratio') && !has('height')) {
        report('WARN', 'css', `${rel(file)}:${line}`,
          `\`${selector}\` sets aspect-ratio with no height — with width/height HTML attributes present an image renders at its intrinsic height instead.`,
          'Add an explicit clamped height where the height must be deterministic.');
      }
    }
  }

  // Is the baseline actually loaded?
  if (baselineExists && htmlFiles.length) {
    const linked = htmlFiles.filter((f) =>
      readFileSync(f, 'utf8').includes('hand-built-baseline.css'));
    for (const f of htmlFiles) {
      if (!linked.includes(f)) {
        report('WARN', 'css', rel(f),
          'Does not load assets/css/hand-built-baseline.css, so none of the section 6 preventative fixes apply here.',
          'Add it before the site stylesheet.');
      }
    }
  }
}

/* ----------------------------------------------------------------- copy --- */

const FUTURE_TENSE = [
  /\bwill\s+(?:be|boast|feature|offer|open|have|include|serve|bring|host)\b/gi,
  /\bis\s+going\s+to\s+(?:be|open|feature)\b/gi,
  /\bcoming\s+soon\b/gi,
  /\bopening\s+soon\b/gi,
  /\bwhen\s+(?:we|it)\s+opens?\b/gi,
  /\bonce\s+(?:we|it)\s+opens?\b/gi,
];

const VENDOR_ATTACKS = [
  /\bripped?\s+off\b/gi,
  /\bscammed\b/gi,
  /\bovercharged\b/gi,
  /\bcheap(?:ly)?\s+(?:built|made|designed)\b/gi,
  /\bbadly\s+(?:built|designed)\b/gi,
  /\bamateur(?:ish)?\b/gi,
];

const LABEL_CAPTIONS = [
  /\bthe\s+whole\s+\w+,?\s+from\s+\w+\b/gi,
  /\ba\s+(?:photo|picture|shot)\s+of\b/gi,
];

function checkCopy() {
  let categorySeen = false;
  let shorthandSeen = [];
  let legalSeen = false;

  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    const text = visibleText(html);

    for (const re of FUTURE_TENSE) {
      for (const m of text.matchAll(re)) {
        report('ERROR', 'copy', rel(file),
          `Future tense: "${context(text, m.index, m[0])}"`,
          'Present tense, always. The thing exists now.');
      }
    }

    // "Real photo —" is internal sourcing discipline, never client-facing copy.
    for (const m of text.matchAll(/real\s+photo/gi)) {
      report('ERROR', 'copy', rel(file),
        `Client-facing copy contains "${m[0]}": "${context(text, m.index, m[0])}"`,
        'Cut it. Sourcing discipline belongs in PRODUCT.md, not in a caption.');
    }

    for (const re of VENDOR_ATTACKS) {
      for (const m of text.matchAll(re)) {
        report('ERROR', 'copy', rel(file),
          `Reads as an attack on the previous vendor: "${context(text, m.index, m[0])}"`,
          '"Your site hasn\'t kept up with how much you\'ve grown" lands better than blame.');
      }
    }

    for (const re of LABEL_CAPTIONS) {
      for (const m of text.matchAll(re)) {
        report('WARN', 'copy', rel(file),
          `Caption may be naming what is visible rather than carrying information: "${context(text, m.index, m[0])}"`,
          'Rewrite it to add a fact, or cut it.');
      }
    }

    for (const m of text.matchAll(/\b(lorem ipsum|TBD|TODO|FIXME|placeholder|xxx+|coming here)\b/gi)) {
      report('ERROR', 'copy', rel(file),
        `Placeholder left in copy: "${context(text, m.index, m[0])}"`,
        'Replace with a verified fact, or a visible "Note —" panel saying the data is not published yet.');
    }

    const lower = text.toLowerCase();
    if (config.category && lower.includes(config.category.toLowerCase())) categorySeen = true;
    for (const s of config.shorthand) {
      if (new RegExp(`\\b${escapeRe(s)}\\b`, 'i').test(text) && !shorthandSeen.includes(s)) {
        shorthandSeen.push(s);
      }
    }
    if (config.legalName && text.includes(config.legalName)) legalSeen = true;
  }

  if (config.category && shorthandSeen.length && !categorySeen) {
    report('ERROR', 'copy', 'site-wide',
      `The site uses the shorthand ${shorthandSeen.map((s) => `"${s}"`).join(', ')} but never says "${config.category}" plainly.`,
      'Say the plain category at least once before using shorthand.');
  }
  if (config.legalName && htmlFiles.length && !legalSeen) {
    report('ERROR', 'copy', 'site-wide',
      `The full legal business name "${config.legalName}" does not appear anywhere.`,
      'Use it verbatim in the header wordmark, hero, and footer.');
  }
  if (!config.category || !config.legalName) {
    report('WARN', 'copy', '.hbtrc.json',
      'legalName and/or category are not configured, so the plain-category and legal-name rules are not being enforced.',
      'Fill them in from PRODUCT.md.');
  }
}

function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function context(text, index, match) {
  const start = Math.max(0, index - 40);
  const end = Math.min(text.length, index + match.length + 40);
  return text.slice(start, end).trim().replace(/\s+/g, ' ');
}

/* ---------------------------------------------------------------- links --- */

function checkLinks() {
  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    const dir = dirname(file);

    for (const m of html.matchAll(/\b(?:href|src)\s*=\s*["']([^"']*)["']/gi)) {
      const raw = m[1].trim();
      if (!raw) {
        report('ERROR', 'links', rel(file), 'Empty href/src.', 'Point it somewhere or remove it.');
        continue;
      }
      if (raw === '#') {
        report('ERROR', 'links', rel(file),
          'href="#" — a dead-end journey.',
          'Link it to the real destination, or remove the link.');
        continue;
      }
      if (/^(https?:|mailto:|tel:|data:|javascript:|#|\/\/)/i.test(raw)) continue;

      const [pathPart] = raw.split(/[?#]/);
      if (!pathPart) continue;
      const target = pathPart.startsWith('/')
        ? join(ROOT, pathPart)
        : resolve(dir, pathPart);

      const candidates = [target, `${target}.html`, join(target, 'index.html')];
      if (!candidates.some((c) => existsSync(c))) {
        report('ERROR', 'links', rel(file),
          `Link does not resolve: ${raw}`,
          'Create the page or fix the path. Nav links come first, but they do not stay broken.');
      }
    }
  }
}

/* --------------------------------------------------------------- photos --- */

function imageSize(file) {
  let buf;
  try { buf = readFileSync(file); } catch { return null; }
  const ext = extname(file).toLowerCase();

  if (ext === '.png' && buf.length > 24 && buf.toString('ascii', 1, 4) === 'PNG') {
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  }
  if (ext === '.gif' && buf.length > 10) {
    return { w: buf.readUInt16LE(6), h: buf.readUInt16LE(8) };
  }
  if (ext === '.jpg' || ext === '.jpeg') {
    let i = 2;
    while (i < buf.length - 9) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { w: buf.readUInt16BE(i + 7), h: buf.readUInt16BE(i + 5) };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
    return null;
  }
  if (ext === '.webp' && buf.length > 30 && buf.toString('ascii', 8, 12) === 'WEBP') {
    const fmt = buf.toString('ascii', 12, 16);
    if (fmt === 'VP8X') {
      return {
        w: 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16)),
        h: 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16)),
      };
    }
    if (fmt === 'VP8 ') {
      return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
    }
    if (fmt === 'VP8L') {
      const b = buf.readUInt32LE(21);
      return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 };
    }
  }
  return null;
}

function checkPhotos() {
  const referenced = new Set();
  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    for (const m of html.matchAll(/\b(?:src|href)\s*=\s*["']([^"']+)["']/gi)) {
      if (IMAGE_EXT.has(extname(m[1].split(/[?#]/)[0]).toLowerCase())) {
        const p = m[1].split(/[?#]/)[0];
        referenced.add(p.startsWith('/') ? join(ROOT, p) : resolve(dirname(file), p));
      }
    }
  }

  if (!imageFiles.length) {
    report('WARN', 'photos', 'site-wide',
      'No images found. A venue landing page needs a photo of the venue in the first viewport.',
      'Stats build credibility; a photo builds desire.');
    return;
  }

  console.log('\n  Photo inventory — check each of these at full size, one at a time:\n');
  const rows = [];
  for (const file of imageFiles.sort()) {
    const ext = extname(file).toLowerCase();
    const bytes = statSync(file).size;
    if (ext === '.svg' || ext === '.avif') {
      rows.push([rel(file), ext === '.svg' ? 'vector' : 'avif (dims unread)', '—', kb(bytes)]);
      continue;
    }
    const size = imageSize(file);
    if (!size) {
      rows.push([rel(file), 'unreadable header', '—', kb(bytes)]);
      report('WARN', 'photos', rel(file), 'Could not read image dimensions.', 'Check the file is not corrupt or a renamed screenshot.');
      continue;
    }
    const ratio = (size.w / size.h);
    rows.push([rel(file), `${size.w}x${size.h}`, ratio.toFixed(2), kb(bytes)]);

    if (size.w < config.minPhotoWidth) {
      report('WARN', 'photos', rel(file),
        `${size.w}px wide — below the ${config.minPhotoWidth}px floor.`,
        'Ask for the original before upscaling. Never upscale dense small text (menu boards, tap handles) — upscalers invent fake text.');
    }
    if (bytes > config.maxPhotoBytes) {
      report('WARN', 'photos', rel(file), `${kb(bytes)} — heavy for the web.`, 'Re-export at the size it is actually displayed.');
    }
    if (referenced.size && !referenced.has(file)) {
      report('WARN', 'photos', rel(file), 'Not referenced by any HTML file.', 'Place it or remove it.');
    }
  }
  const w = rows.reduce((a, r) => Math.max(a, r[0].length), 0);
  for (const r of rows) {
    console.log(`    ${r[0].padEnd(w)}  ${r[1].padEnd(20)} aspect ${r[2].padEnd(6)} ${r[3]}`);
  }
  console.log(`\n    ${imageFiles.length} images. These checks cannot see platform chrome —`);
  console.log('    play buttons, share icons, profile bars, watermarks, edge UI, or the');
  console.log('    client\'s old logo. Open every one at full size. The last build shipped a');
  console.log('    play-button overlay that only the client caught.\n');
}

const kb = (b) => b > 1_000_000 ? `${(b / 1_000_000).toFixed(1)} MB` : `${Math.round(b / 1000)} kB`;

/* --------------------------------------------------------------- counts --- */

function checkCounts() {
  const nouns = Object.keys(config.counts);
  if (!nouns.length) {
    report('WARN', 'counts', '.hbtrc.json',
      'No counts configured, so sitewide count consistency is not being checked.',
      'List every number the site states more than once — vendor counts drifted across three files on the last build.');
    return;
  }
  for (const noun of nouns) {
    const expected = String(config.counts[noun]);
    const re = new RegExp(`(\\d[\\d,]*)\\s*(?:\\w+\\s+){0,2}${escapeRe(noun)}\\b`, 'gi');
    let found = 0;
    for (const file of htmlFiles) {
      const text = visibleText(readFileSync(file, 'utf8'));
      for (const m of text.matchAll(re)) {
        found++;
        if (m[1].replace(/,/g, '') !== expected) {
          report('ERROR', 'counts', rel(file),
            `Says "${m[0].trim()}" but ${noun} is ${expected} in .hbtrc.json.`,
            'One source of truth per count. Fix the page or fix the config.');
        }
      }
    }
    if (!found) {
      report('WARN', 'counts', 'site-wide', `The configured count "${noun}" (${expected}) never appears on the site.`, 'Remove it from config, or state it.');
    }
  }
}

/* ------------------------------------------------------------------ run --- */

const CHECKS = { css: checkCss, copy: checkCopy, links: checkLinks, photos: checkPhotos, counts: checkCounts };

const arg = (process.argv[2] || 'all').replace(/^--/, '');
const toRun = arg === 'all' ? Object.keys(CHECKS) : [arg];

for (const name of toRun) {
  if (!CHECKS[name]) {
    console.error(`Unknown check "${name}". Available: ${Object.keys(CHECKS).join(', ')}, all`);
    process.exit(2);
  }
  CHECKS[name]();
}

const errors = findings.filter((f) => f.level === 'ERROR');
const warns = findings.filter((f) => f.level === 'WARN');

if (findings.length) {
  console.log('');
  for (const group of [errors, warns]) {
    for (const f of group) {
      console.log(`  ${f.level === 'ERROR' ? 'ERROR' : ' WARN'}  [${f.check}] ${f.file}`);
      console.log(`         ${f.message}`);
      if (f.fix) console.log(`         → ${f.fix}`);
      console.log('');
    }
  }
}

console.log(`hbt ${toRun.join(', ')}: ${errors.length} error(s), ${warns.length} warning(s)`);
if (errors.length) {
  console.log('Fix findings rather than suppressing them. When a value is flagged, first ask');
  console.log('whether an existing documented step already covers the same role.');
}
process.exit(errors.length ? 1 : 0);
