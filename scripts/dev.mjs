// Tiny static dev server. No dependencies. Usage: npm run dev [-- --port 4321]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const portArg = process.argv.indexOf('--port');
const port = Number(portArg > -1 ? process.argv[portArg + 1] : process.env.PORT) || 4321;

const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.json': 'application/json',
};

// Only the site itself is served: never customer-assets/, scripts/, .git or docs.
const allowed = (rel) =>
  /^(index(\.ru)?|impressum|datenschutz)\.html$/.test(rel) || rel.startsWith('assets' + sep);

createServer(async (req, res) => {
  try {
    let rel = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^[\\/]+/, '');
    if (rel === '') rel = 'index.html';
    const file = join(root, rel);
    if (!file.startsWith(root + sep) || !allowed(rel)) throw Object.assign(new Error('nope'), { code: 'ENOENT' });
    if ((await stat(file)).isDirectory()) throw Object.assign(new Error('dir'), { code: 'ENOENT' });
    res.writeHead(200, { 'Content-Type': types[extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not found');
  }
}).listen(port, '127.0.0.1', () => console.log(`Dev server: http://127.0.0.1:${port}/  (Ctrl+C to stop)`));

// Watch mode: rebuild the pages whenever the customer text file, a template or the build
// script changes. Watches the folders (not the files) so editors that save by replacing
// the file are still noticed. A failed build is reported; the server keeps running.
import { watch } from 'node:fs';
import { spawn } from 'node:child_process';
const watched = [
  [root, (f) => f === 'Texte-und-Kontaktdaten.txt'],
  [join(root, 'templates'), (f) => f.endsWith('.tpl.html')],
  [join(root, 'scripts'), (f) => f === 'build.mjs'],
];
let timer = null;
const rebuild = (why) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    console.log(`\n[watch] ${why} geändert – baue Seiten neu ...`);
    spawn(process.execPath, [join(root, 'scripts', 'build.mjs')], { stdio: 'inherit' })
      .on('exit', (code) => console.log(code === 0 ? '[watch] fertig – Seite im Browser neu laden.' : '[watch] Build fehlgeschlagen (siehe FEHLER oben).'));
  }, 150);
};
for (const [dir, match] of watched) {
  watch(dir, (_event, name) => { if (name && match(String(name))) rebuild(String(name)); });
}
console.log('[watch] beobachte Texte-und-Kontaktdaten.txt, templates/ und scripts/build.mjs');
