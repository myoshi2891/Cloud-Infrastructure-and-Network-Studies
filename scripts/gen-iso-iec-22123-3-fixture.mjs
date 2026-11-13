import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { JSDOM } from 'jsdom';
import { snapshotGuidePart } from './guide-fidelity-extraction.mjs';
import { snapshotSvgDiagrams } from './svg-fidelity-extraction.mjs';
const source = 'Iso-iec-22123-3-2023-guide.html';
const html = readFileSync(source, 'utf8');
const doc = new JSDOM(html).window.document;
const main = doc.querySelector('main');
const parts = Object.fromEntries([...main.children].map((node, index) => [index === 0 ? 'Intro' : node.matches('footer') ? 'Appendix' : 'Section' + index, snapshotGuidePart(node)]));
const fixture = {
    source, sourceSha256: createHash('sha256').update(html).digest('hex'),
    main: snapshotGuidePart(main), parts, svg: snapshotSvgDiagrams(doc),
    nav: doc.querySelector('.sidebar').outerHTML, css: doc.querySelector('head style').textContent,
};
writeFileSync('docs/migration-inventory/iso-iec-22123-3-2023.fidelity.json', JSON.stringify(fixture, null, 2) + '\n');
console.log({ parts: Object.keys(parts), headings: fixture.main.headings.length, tables: fixture.main.tables.length, svg: fixture.svg.length });
