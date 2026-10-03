import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { FIDELITY_PAGES } from './archive-fidelity-config.mjs';
import { snapshotCssRules, snapshotTanenbaumDiagrams, snapshotTanenbaumStructure } from './tanenbaum-fidelity.mjs';

const config = FIDELITY_PAGES['computer-networks-tanenbaum'];
const sourceCommit = execFileSync('git', ['rev-parse', config.sourceCommit], { encoding: 'utf8' }).trim();
const source = execFileSync('git', ['show', `${sourceCommit}:${config.source}`], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
const doc = new JSDOM(source).window.document;
const fixture = {
    source: config.source, sourceCommit,
    structure: snapshotTanenbaumStructure(doc),
    diagrams: snapshotTanenbaumDiagrams(doc),
    diagramPredecessors: [...doc.querySelectorAll('pre.mermaid')].map(el => el.previousElementSibling?.textContent?.replace(/\s+/g, ' ').trim()),
    rules: snapshotCssRules(doc.querySelector('style').textContent),
};
writeFileSync('docs/migration-inventory/computer-networks-tanenbaum.design.json', `${JSON.stringify(fixture, null, 2)}\n`);
