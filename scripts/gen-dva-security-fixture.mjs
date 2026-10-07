import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { FIDELITY_PAGES } from './archive-fidelity-config.mjs';
import { snapshotCssRules } from './tanenbaum-fidelity.mjs';
import { snapshotDvaSecurity, extractDvaDiagrams } from './dva-security-fidelity.mjs';

const config = FIDELITY_PAGES['aws-dva-domain2-security'];
const html = execFileSync('git', ['show', `${config.sourceCommit}:${config.source}`], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
const doc = new JSDOM(html).window.document;
writeFileSync('docs/migration-inventory/aws-dva-domain2-security.design.json', JSON.stringify({
    source: config.source, sourceCommit: config.sourceCommit,
    structure: snapshotDvaSecurity(doc), charts: extractDvaDiagrams(html),
    rules: snapshotCssRules(doc.querySelector('style').textContent),
}, null, 2) + '\n');
