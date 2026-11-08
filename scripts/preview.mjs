// Builds dist/preview/: a self-contained copy of the site that opens straight from the
// file system (double-click index.html). No dependencies. Usage: npm run preview
//
// - copies only the site (root *.html + assets/), never customer-assets/, docs or credentials
// - rewrites root-absolute ("/assets/x.css") and directory ("foo/") links to relative file links
// - fails if any local link or asset reference does not resolve in the output
import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join, posix, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
// Output folder: dist/preview by default; `--out <dir>` (relative to the repo) for the production artifact.
const outArg = process.argv.indexOf('--out');
const out = join(root, outArg > -1 ? process.argv[outArg + 1] : join('dist', 'preview'));

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

const pages = (await readdir(root)).filter((f) => f.endsWith('.html'));
await cp(join(root, 'assets'), join(out, 'assets'), { recursive: true });

const attr = /\b(href|src)="([^"]*)"/g;
const isLocal = (u) => u !== '' && !/^(#|[a-z][a-z0-9+.-]*:|\/\/)/i.test(u);
const problems = [];
const jobs = [];

async function exists(p) { try { await stat(p); return true; } catch { return false; } }

for (const page of pages) {
  const dir = posix.dirname(page); // pages live at the root today; kept general
  let html = await readFile(join(root, page), 'utf8');
  html = html.replace(attr, (m, name, url) => {
    if (/^\/(?!\/)/.test(url)) {
      // root-absolute -> relative to this page
      url = posix.relative(dir, url.slice(1)) || 'index.html';
    }
    if (isLocal(url)) {
      const p = url.split(/[?#]/)[0];
      const rest = url.slice(p.length);
      const file = p === '' ? '' : p.endsWith('/') ? p + 'index.html' : p;
      if (file) { url = file + rest; jobs.push({ page, url: file }); }
    }
    return `${name}="${url}"`;
  });
  await writeFile(join(out, page), html);
}
// Check after all pages exist, so links between pages resolve.
for (const j of jobs) {
  if (!(await exists(join(out, dirname(j.page), j.url)))) problems.push(`${j.page}: missing ${j.url}`);
}

// CSS url(...) references must resolve too.
async function* walk(d) {
  for (const e of await readdir(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) yield* walk(p); else yield p;
  }
}
for await (const f of walk(join(out, 'assets'))) {
  if (!f.endsWith('.css')) continue;
  const css = await readFile(f, 'utf8');
  for (const m of css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) {
    const u = m[1];
    if (!isLocal(u) || u.startsWith('data:')) continue;
    if (u.startsWith('/')) problems.push(`${relative(out, f)}: root-absolute url(${u}) – use a relative path`);
    else if (!(await exists(join(dirname(f), u.split(/[?#]/)[0])))) problems.push(`${relative(out, f)}: missing ${u}`);
  }
}

if (problems.length) {
  console.error('Preview build FAILED:\n  ' + problems.join('\n  '));
  process.exit(1);
}
let n = 0, bytes = 0;
for await (const f of walk(out)) { n++; bytes += (await stat(f)).size; }
console.log(`Preview built: ${relative(root, out).split(sep).join('/')}/  (${n} files, ${(bytes / 1e6).toFixed(1)} MB)`);
console.log('Zip that folder for the customer; they open index.html directly.');
