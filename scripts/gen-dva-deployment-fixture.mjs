/** 固定Git原本から全文・CSS・図・設定fixtureを生成する。 */
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { FIDELITY_PAGES } from './archive-fidelity-config.mjs';
import { snapshotCssRules } from './tanenbaum-fidelity.mjs';
import { extractDevelopmentDiagrams } from './dva-development-fidelity.mjs';
import { snapshotDvaDeployment, extractDeploymentTheme } from './dva-deployment-fidelity.mjs';

const config = FIDELITY_PAGES['aws-dva-domain3-deployment'];
const html = execFileSync('git', ['show', `${config.sourceCommit}:${config.source}`], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
const doc = new JSDOM(html).window.document;
const write = (suffix, value) => writeFileSync(`docs/migration-inventory/aws-dva-domain3-deployment.${suffix}.json`, JSON.stringify(value, null, 2) + '\n');
write('design', {
    source: config.source, sourceCommit: config.sourceCommit,
    structure: snapshotDvaDeployment(doc), charts: extractDevelopmentDiagrams(html),
    rules: snapshotCssRules(doc.querySelector('style').textContent),
    navClasses: [...doc.querySelectorAll('.sidebar a')].map(el => el.className),
    languages: [...doc.querySelectorAll('pre code')].map(el => el.className.replace('language-', '')),
});
write('mermaid', { source: extractDeploymentTheme(html) });
console.log('Deployment design and Mermaid fixtures generated from fixed Git source');
