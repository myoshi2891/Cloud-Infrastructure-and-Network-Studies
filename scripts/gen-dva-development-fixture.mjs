import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import JSON5 from 'json5';
import mermaid from 'mermaid';
import { FIDELITY_PAGES } from './archive-fidelity-config.mjs';
import { snapshotCssRules } from './tanenbaum-fidelity.mjs';
import { snapshotDvaDevelopment, extractDevelopmentDiagrams } from './dva-development-fidelity.mjs';

const config = FIDELITY_PAGES['aws-dva-domain1-development'];
const html = execFileSync('git', ['show', `${config.sourceCommit}:${config.source}`], {encoding:'utf8', maxBuffer:8*1024*1024});
const doc = new JSDOM(html).window.document;
writeFileSync('docs/migration-inventory/aws-dva-domain1-development.design.json', JSON.stringify({source:config.source,sourceCommit:config.sourceCommit,structure:snapshotDvaDevelopment(doc),charts:extractDevelopmentDiagrams(html),rules:snapshotCssRules(doc.querySelector('style').textContent)},null,2)+'\n');
// 独立プロセスの原本設定から派生値も記録し、共通ダーク既定値の混入を防ぐ。
const source = JSON5.parse(html.match(/mermaid\.initialize\((\{[\s\S]*?\})\);/)[1]);
mermaid.initialize(source);
const {theme,themeVariables,flowchart,sequence,state} = mermaid.mermaidAPI.getConfig();
writeFileSync('docs/migration-inventory/aws-dva-domain1-development.mermaid.json', JSON.stringify({sourceCommit:config.sourceCommit,source,resolved:{theme,themeVariables,flowchart,sequence,state}},null,2)+'\n');
