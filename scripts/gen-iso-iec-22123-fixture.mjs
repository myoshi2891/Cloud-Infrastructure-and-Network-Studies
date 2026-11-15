import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import { snapshotGuidePart, snapshotGuideParts } from './guide-fidelity-extraction.mjs';
import { snapshotGuideChecks } from './guide-interaction-extraction.mjs';
import { snapshotSvgDiagrams } from './svg-fidelity-extraction.mjs';
import { normalize } from './inventory-extraction.mjs';
import { SOURCE, SOURCE_COMMIT, PARTS } from './iso-iec-22123-profile.mjs';

// 原本の訂正後は --working-tree で再生成し、コミットの代わりに内容のハッシュを記録する。
const repositoryRoot = fileURLToPath(new URL('../', import.meta.url));
const workingTree = process.argv.includes('--working-tree');
const sourceCommit = workingTree ? null : execFileSync('git', ['rev-parse', SOURCE_COMMIT], { cwd: repositoryRoot, encoding: 'utf8' }).trim();
const candidates = [resolve(repositoryRoot, SOURCE), resolve(repositoryRoot, 'archive/Standards/html/iso-iec-22123-1-2023', SOURCE)];
const sourcePath = candidates.find(p => existsSync(p)) ?? resolve(repositoryRoot, SOURCE);
if (workingTree && sourcePath === candidates[1]) {
    const metadata = JSON.parse(readFileSync(resolve(repositoryRoot, 'docs/migration-inventory/iso-iec-22123-1-2023.archive.json'), 'utf8'));
    const checksum = createHash('sha256').update(readFileSync(sourcePath)).digest('hex');
    if (checksum !== metadata.html.sha256) {
        throw new Error('Archived Part 1 HTML checksum does not match current metadata. Refresh the archive before regenerating the fixture.');
    }
}
const html = workingTree ? readFileSync(sourcePath, 'utf8') : execFileSync('git', ['show', `${sourceCommit}:${SOURCE}`], { cwd: repositoryRoot, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
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
writeFileSync(resolve(repositoryRoot, 'docs/migration-inventory/iso-iec-22123-1-2023.fidelity.json'), JSON.stringify(fixture, null, 2) + '\n');
console.log('Source HTML, all six parts, 15 SVG trees, CSS and checklist captured.');
