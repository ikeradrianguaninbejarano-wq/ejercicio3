import { readFile } from 'node:fs/promises';

const html = await readFile('index.html', 'utf8');
const requiredElements = ['header', 'main', 'article', 'footer'];

for (const element of requiredElements) {
  if (!new RegExp(`<${element}(?:\\s|>)`, 'i').test(html)) {
    throw new Error(`Falta el elemento semántico <${element}>`);
  }
}

if (!/<h1(?:\\s|>)/i.test(html) || (html.match(/<h1(?:\\s|>)/gi) ?? []).length !== 1) {
  throw new Error('Debe existir exactamente un <h1>');
}

if (!/<html[^>]+lang="[a-z]{2}"/i.test(html)) {
  throw new Error('El documento debe declarar un idioma válido');
}

console.log('Semántica HTML verificada');