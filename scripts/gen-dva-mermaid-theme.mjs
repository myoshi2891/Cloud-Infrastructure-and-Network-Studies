/** 固定Git原本のMermaid設定を、独立した初期化でデフォルト値まで記録する。 */
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import mermaid from 'mermaid';
import JSON5 from 'json5';
const html = execFileSync('git', ['show', 'fe948bdc47ca5e8e433b8c917d93d3457d2ba173:Aws-dva-c02-domain2-security-guide.html'], {encoding:'utf8',maxBuffer:8*1024*1024});
const match = html.match(/mermaid\.initialize\((\{[\s\S]*?\})\);/);
if (!match) throw new Error('Original Mermaid initialization missing');
const source = JSON5.parse(match[1]);
mermaid.initialize(source);
const { theme, themeVariables, flowchart, sequence } = mermaid.mermaidAPI.getConfig();
const resolved = {theme,themeVariables,flowchart,sequence};
writeFileSync('docs/migration-inventory/aws-dva-domain2-security.mermaid.json', JSON.stringify({sourceCommit:'fe948bdc47ca5e8e433b8c917d93d3457d2ba173',source,resolved},null,2)+'\n');
