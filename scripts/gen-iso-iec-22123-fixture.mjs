import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { snapshotGuidePart, snapshotGuideParts } from './guide-fidelity-extraction.mjs';
import { snapshotGuideChecks } from './guide-interaction-extraction.mjs';
import { snapshotSvgDiagrams } from './svg-fidelity-extraction.mjs';
import { normalize } from './inventory-extraction.mjs';
import { SOURCE, SOURCE_COMMIT, PARTS } from './iso-iec-22123-profile.mjs';

// 原本の訂正後は --working-tree で再生成し、コミットの代わりに内容のハッシュを記録する。
const workingTree = process.argv.includes('--working-tree');
const sourceCommit = workingTree ? null : execFileSync('git', ['rev-parse', SOURCE_COMMIT], { encoding: 'utf8' }).trim();
const html = workingTree ? readFileSync(SOURCE, 'utf8') : execFileSync('git', ['show', `${sourceCommit}:${SOURCE}`], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
const doc = new JSDOM(html).window.document;
const fixture = {
    source: SOURCE, sourceCommit,
    ...(workingTree ? { sourceSha256: createHash('sha256').update(html).digest('hex') } : {}),
    main: snapshotGuidePart(doc.querySelector('main')),
    parts: snapshotGuideParts(doc, PARTS),
    svg: snapshotSvgDiagrams(doc),
    checks: snapshotGuideChecks(doc),
    nav: [...doc.querySelectorAll('.sidebar a')].map(a => ({ href: a.getAttribute('href'), text: normalize(a.textContent) })),
    css: doc.querySelector('head style').textContent,
};
writeFileSync('docs/migration-inventory/iso-iec-22123-1-2023.fidelity.json', JSON.stringify(fixture, null, 2) + '\n');
console.log('Source HTML, all six parts, 15 SVG trees, CSS and checklist captured.');
