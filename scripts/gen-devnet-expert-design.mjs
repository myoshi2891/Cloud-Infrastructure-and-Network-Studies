import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { snapshotGuideDesign } from './guide-fidelity-extraction.mjs';
import { extractDiagramsDefinition } from '../.agents/skills/fix-mermaid/scripts/restore_diagrams.mjs';
import { FIDELITY_PAGES } from './archive-fidelity-config.mjs';

// Fixed Git input: expectations never depend on the migrated implementation.
const config = FIDELITY_PAGES['devnet-expert'];
const html = execFileSync('git', ['show', `${config.sourceCommit}:${config.source}`], { encoding: 'utf8' });
const doc = new JSDOM(html).window.document;
const fixture = {
    sourceCommit: config.sourceCommit,
    rules: snapshotGuideDesign(doc).rules,
    diagrams: extractDiagramsDefinition(html.replace('window.DIAGRAMS =', 'const DIAGRAMS =')).diagrams,
    nav: [...doc.querySelectorAll('nav a')].map(a => ({ id: a.hash.slice(1), label: a.textContent, level: a.classList.contains('l3') ? 3 : 2 })),
    sections: [...doc.querySelectorAll('main > section')].map(s => ({ id: s.id, text: s.textContent.replace(/\s/g, '') })),
    lists: [...doc.querySelectorAll('main ul, main ol')].map(l => ({ tag: l.tagName, html: l.innerHTML.replace(/\s+/g, ' ').trim() })),
    tokens: [...doc.querySelectorAll('pre span')].map(s => ({ className: s.className, text: s.textContent })),
};
writeFileSync('docs/migration-inventory/devnet-expert.design.json', JSON.stringify(fixture, null, 2) + '\n');
