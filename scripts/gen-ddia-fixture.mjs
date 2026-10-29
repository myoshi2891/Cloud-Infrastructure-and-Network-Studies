import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import { JSDOM } from 'jsdom';
import { snapshotDdia, snapshotCssRules } from './ddia-fidelity.mjs';
const source='Designing-data-intensive-applications-guide.html';
const sourceCommit='064b32b16779f5da0fdf7b73aa14859112fc97ed';
const doc=new JSDOM(execFileSync('git',['show',`${sourceCommit}:${source}`],{encoding:'utf8'})).window.document;
fs.writeFileSync('docs/migration-inventory/designing-data-intensive-applications.fidelity.json',JSON.stringify({source,sourceCommit,structure:snapshotDdia(doc),css:snapshotCssRules(doc.querySelector('style').textContent),charts:[...doc.querySelectorAll('pre.mermaid')].map(e=>e.textContent.trim()),nav:[...doc.querySelectorAll('nav a')].map(e=>({id:decodeURIComponent(e.hash.slice(1)),label:e.textContent.replace(/\s+/g,' ').trim()}))},null,2)+'\n');
