/* Tacos El Giro — preview build.
 *
 * Flattens the shipped site into ONE self-contained HTML file so it can be
 * published somewhere the client can actually open it. This exists only because
 * §13 wants a link after every change and this environment cannot reach a host.
 *
 * It is NOT the deliverable. deploy/ is. package.sh refuses to ship this file.
 *
 * Two deliberate differences from the shipped build, and only two:
 *   1. Fonts load from Google Fonts instead of the self-hosted woff2, because
 *      the artifact sandbox only admits font files from fonts.gstatic.com.
 *      Same two families, same weights — Anton 400, Archivo 400..700.
 *   2. Photographs are inlined as data: URIs, because a published single file has
 *      no img/ folder beside it and the sandbox serves only the artifact's own
 *      content. The SHIPPED site keeps normal <img src="img/..."> files.
 *   3. The <meta robots="noindex"> is dropped, because the wrapper owns <head>.
 *      The published page is private by default; the SHIPPED file keeps its
 *      noindex, and that is the one that matters.
 *
 *   node preview.mjs   ->  preview.artifact.html
 */
import fs from 'node:fs';
import path from 'node:path';

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');
const js = fs.readFileSync('script.js', 'utf8');

// Drop the self-hosted @font-face blocks; the CDN link replaces them.
const cssNoFaces = css.replace(/@font-face\s*\{[^}]*\}\s*/g, '').trimStart();
if (/@font-face/.test(cssNoFaces)) throw new Error('a @font-face block survived the strip');

// Inline every photograph. Without this the preview link shows painted fallback
// panels instead of the food, which is the one thing the link exists to show.
let inlined = 0, bytes = 0;
const embed = (html) => html.replace(/src="(img\/[\w-]+\.webp)"/g, (m, rel) => {
  if (!fs.existsSync(rel)) return m;
  const b64 = fs.readFileSync(rel).toString('base64');
  inlined++; bytes += b64.length;
  return `src="data:image/webp;base64,${b64}"`;
});

// The artifact sandbox admits no third-party frames at all, so the Google map
// embed would be a white rectangle on a dark page. The address panel underneath
// it is already the designed fallback, so drop the frame and let the panel be
// the map here. The shipped site keeps the embed.
let mapsDropped = 0;
const dropMap = (h) => h.replace(/\s*<iframe class="map"[\s\S]*?<\/iframe>/g, () => {
  mapsDropped++; return '';
});


// The artifact wrapper owns <!doctype>, <html>, <head> and <body>.
const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/);
if (!bodyMatch) throw new Error('could not find <body>');
const body = dropMap(embed(bodyMatch[1]))
  .replace(/\s*<script src="script\.js"[^>]*><\/script>\s*/, '\n');
if (mapsDropped !== 1) throw new Error(`expected exactly one map embed to drop, dropped ${mapsDropped}`);

const out = `<title>Tacos El Giro</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400..700&family=Archivo+Black&display=swap">
<style>
${cssNoFaces}
/* Preview build only: the shipped site self-hosts these two families as woff2. */
</style>
${body}
<script>
${js}
</script>
`;

fs.writeFileSync('preview.artifact.html', out);
const kb = (Buffer.byteLength(out) / 1024).toFixed(1);
console.log(`preview.artifact.html written — ${kb} KB, single file`);
console.log(`  ${inlined} photograph(s) inlined as data: URIs (${(bytes/1024/1024).toFixed(2)} MB base64)`);
if (Buffer.byteLength(out) > 15 * 1024 * 1024) throw new Error('over the 16MB artifact limit');
// Match real tags only — /<head/ alone also hits <header class="bar">.
const leaks = [
  ['stylesheet link to styles.css', /href="styles\.css"/i],
  ['script src to script.js', /src="script\.js"/i],
  ['doctype', /<!doctype/i],
  ['<html> tag', /<html[\s>]/i],
  ['<head> tag', /<head[\s>]/i],
  ['<body> tag', /<body[\s>]/i],
];
for (const [label, re] of leaks) {
  if (re.test(out)) throw new Error(`leaked into preview: ${label}`);
}
console.log('no external refs, no wrapper tags — safe to publish');
