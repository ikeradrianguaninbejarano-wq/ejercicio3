import { readFile } from 'node:fs/promises';

const html = await readFile('index.html', 'utf8');
const links = [...html.matchAll(/<a\b([^>]*)>/gi)];

for (const [, attributes] of links) {
  const href = attributes.match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1];
  if (!href) throw new Error('Cada enlace debe tener href');

  if (/^https?:\/\//i.test(href) && !/^https:\/\//i.test(href)) {
    throw new Error(`Enlace externo inseguro: ${href}`);
  }

  if (/target\s*=\s*["']_blank["']/i.test(attributes) &&
      !/rel\s*=\s*["'][^"']*\bnoopener\b/i.test(attributes)) {
    throw new Error(`El enlace ${href} debe incluir rel="noopener"`);
  }
}

console.log(`Seguridad de enlaces verificada (${links.length} enlaces)`);