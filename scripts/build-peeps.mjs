// Prepares Open Peeps characters (CC0, https://www.openpeeps.com) for the site.
//
// Usage: node scripts/build-peeps.mjs <folder with the downloaded peep-*.svg files>
//
// For each character listed below it writes a minified, recoloured copy (ink lines on warm paper) into
// public/peeps/ and records its viewBox in components/illustrations/peeps.json so scenes can size it.
import fs from 'node:fs';
import path from 'node:path';

const PEEPS = [
  // The protagonist (hero, about, contact) — dark wavy hair, beard, glasses.
  'peep-8',
  // Close-ups for the project panels, chosen for their gestures.
  'peep-2',
  'peep-10',
  'peep-24',
  'peep-25',
  'peep-39',
  'peep-42',
  'peep-46',
  'peep-59',
  'peep-79',
];

const INK = '#1F1D2B';
const PAPER = '#FFFAF3';

const src = process.argv[2];
if (!src) throw new Error('Pass the folder that contains the downloaded Open Peeps SVGs.');
const outDir = path.join(process.cwd(), 'public/peeps');
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const minify = (svg) =>
  svg
    .replace(/<\?xml[^>]*>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<title>[\s\S]*?<\/title>/g, '')
    .replace(/<desc>[\s\S]*?<\/desc>/g, '')
    .replace(/\s(id|xmlns:xlink|version)="[^"]*"/g, '')
    .replace(/(\d+\.\d{2,})/g, (n) => String(Math.round(Number(n) * 10) / 10))
    .replace(/>\s+</g, '><')
    .trim();

const sizes = {};
for (const name of PEEPS) {
  const raw = fs.readFileSync(path.join(src, `${name}.svg`), 'utf8');
  const [, w, h] = raw.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/) ?? [];
  if (!w) throw new Error(`No viewBox in ${name}`);
  sizes[name] = { w: Number(w), h: Number(h) };
  const base = minify(raw);
  const ink = base
    .replace(/#000000/gi, INK)
    .replace(/#FFFFFF/gi, PAPER)
    .replace(/#4F66AF/gi, '#5B8DEF');
  fs.writeFileSync(path.join(outDir, `${name}.svg`), ink);
}
fs.writeFileSync(
  path.join(process.cwd(), 'components/illustrations/peeps.json'),
  `${JSON.stringify(sizes, null, 2)}\n`,
);
fs.writeFileSync(
  path.join(outDir, 'LICENSE.txt'),
  'Characters from Open Peeps by Pablo Stanley (https://www.openpeeps.com), released into the public domain under CC0 1.0.\nRecoloured and minified by scripts/build-peeps.mjs.\n',
);
console.log(`Wrote ${PEEPS.length} characters to public/peeps`);
