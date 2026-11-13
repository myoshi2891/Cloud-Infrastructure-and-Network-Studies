import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { JSDOM } from 'jsdom';
import { snapshotGuidePart } from './guide-fidelity-extraction.mjs';
import { snapshotGuideChecks } from './guide-interaction-extraction.mjs';
import { snapshotSvgDiagrams } from './svg-fidelity-extraction.mjs';
const source = 'Iso-iec-22123-2-guide.html';
const repositoryRoot = fileURLToPath(new URL('../', import.meta.url));
const candidates = [resolve(repositoryRoot, source), resolve(repositoryRoot, 'archive/Standards/html/iso-iec-22123-2-2023', source)];
const sourcePath = candidates.find(p => existsSync(p)) ?? resolve(repositoryRoot, source);
const html = readFileSync(sourcePath, 'utf8');
const doc = new JSDOM(html).window.document;
const main = doc.querySelector('main');
const groups = {};
let key = 'Intro';
for (const node of main.childNodes) {
    if (node.nodeType === 1 && node.localName === 'h2') key = 'Section' + Object.keys(groups).length;
    (groups[key] ??= doc.createElement('div')).append(node.cloneNode(true));
}
const fixture = { source, sourceSha256: createHash('sha256').update(html).digest('hex'), main: snapshotGuidePart(main), parts: Object.fromEntries(Object.entries(groups).map(([key, root]) => [key, snapshotGuidePart(root)])), svg: snapshotSvgDiagrams(doc), checks: snapshotGuideChecks(doc), nav: doc.querySelector('.sidebar').outerHTML, css: doc.querySelector('head style').textContent };
writeFileSync('docs/migration-inventory/iso-iec-22123-2-2023.fidelity.json', JSON.stringify(fixture, null, 2) + '\n');
console.log({ parts: Object.keys(groups), svg: fixture.svg.length, checks: fixture.checks.length, headings: fixture.main.headings.length, tables: fixture.main.tables.length });
