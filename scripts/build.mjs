import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const out = resolve(root, 'www');

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

const files = [
  'index.html',
  'manifest.webmanifest',
  'sw.js'
];
const directories = [
  'assets',
  'icons',
  'fonts'
];

for (const file of files) {
  await cp(resolve(root, file), resolve(out, file));
}
for (const directory of directories) {
  await cp(resolve(root, directory), resolve(out, directory), { recursive: true });
}

console.log(`SIDE OF DEATH pronto em ${out}`);
