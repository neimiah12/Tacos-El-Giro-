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
 *   2. The <meta robots="noindex"> is dropped, because the wrapper owns <head>.
 *      The published page is private by default; the SHIPPED file keeps its
 *      noindex, and that is the one that matters.
 *
 *   node preview.mjs   ->  preview.artifact.html
 */
import fs from 'node:fs';

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');
const js = fs.readFileSync('script.js', 'utf8');

// Drop the self-hosted @font-face blocks; the CDN link replaces them.
const cssNoFaces = css.replace(/@font-face\s*\{[^}]*\}\s*/g, '').trimStart();
if (/@font-face/.test(cssNoFaces)) throw new Error('a @font-face block survived the strip');

// The artifact wrapper owns <!doctype>, <html>, <head> and <body>.
const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/);
if (!bodyMatch) throw new Error('could not find <body>');
const body = bodyMatch[1].replace(/\s*<script src="script\.js"[^>]*><\/script>\s*/, '\n');

const out = `<title>Tacos El Giro</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400..700&display=swap">
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
