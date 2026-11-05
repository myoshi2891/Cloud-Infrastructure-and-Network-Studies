import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import { JSDOM } from 'jsdom';
import ts from 'typescript';
import { FIDELITY_PAGES } from './archive-fidelity-config.mjs';

const dir = 'app/aws/security-specialty/domain2';
// 原本と区間境界は fidelity 設定を単一の正本とし、固定Gitリビジョンから読む
const config = FIDELITY_PAGES['aws-scs-c03-domain2-guide'];
const html = execFileSync('git', ['show', `${config.sourceCommit}:${config.source}`], {
    encoding: 'utf8',
    maxBuffer: 8 * 1024 * 1024,
});
const doc = new JSDOM(html).window.document;

const boundaries = config.guideBoundaries;

const phase = process.argv[2];
if (!phase || !Object.hasOwn(boundaries, phase)) {
    console.error('Specify one of: ' + Object.keys(boundaries).join(', '));
    process.exit(1);
}

const diagrams = [...doc.querySelectorAll('pre.mermaid')];
const tableScrolls = [...doc.querySelectorAll('.table-scroll')];

function tableLabel(n) {
    let heading = n.previousElementSibling;
    while (heading && !heading.matches('h2,h3,h4')) heading = heading.previousElementSibling;
    return `比較表 ${tableScrolls.indexOf(n) + 1}：` + (heading?.textContent ?? '学習資料').replace(/\s+/g, ' ').trim();
}

const DOUBLE_QUOTED = String.raw`"(?:\\.|[^"\\])*"`;
const SINGLE_QUOTED = String.raw`'(?:\\.|[^'\\])*'`;
const COMMON = String.raw`\b(?:true|false)\b|\b\d+\b`;
// 言語ごとの構文トークン。attr にするキーは名前付きグループ key で表す
const TOKEN_PATTERNS = {
    json: new RegExp(String.raw`(?<key>${DOUBLE_QUOTED}(?=\s*:))|${DOUBLE_QUOTED}|\b(?:true|false|null)\b|\b\d+\b`, 'g'),
    // YAML のキーは行頭（インデントと任意のリスト記号 "- " の直後）で、直後が ": " か行末の場合だけ
    yaml: new RegExp(String.raw`#.*$|${DOUBLE_QUOTED}|${SINGLE_QUOTED}|(?<key>(?<=^\s*(?:-\s+)?)[\w-]+(?=:(?:\s|$)))|${COMMON}|!Ref\b`, 'g'),
    python: new RegExp(String.raw`#.*$|${DOUBLE_QUOTED}|${SINGLE_QUOTED}|${COMMON}`, 'g'),
    sql: new RegExp(`${DOUBLE_QUOTED}|${SINGLE_QUOTED}|${COMMON}`, 'g'),
    default: new RegExp(String.raw`#.*$|${DOUBLE_QUOTED}|${COMMON}`, 'g'),
};

function tokens(line, language) {
    if (['bash', 'shell'].includes(language)) {
        let output = '', end = 0;
        // arn:aws:... や aws-cli のような語の一部は、単独の aws コマンドとして扱わない
        for (const m of line.matchAll(/(?<![\w:-])aws(?![\w:-])|--[\w-]+|\b(?:\$|export|echo)\b/g)) {
            output += '{' + JSON.stringify(line.slice(end, m.index)) + '}';
            output += '<span className="hljs-' + (m[0] === 'aws' ? 'built_in' : 'keyword') + '">{' + JSON.stringify(m[0]) + '}</span>';
            end = m.index + m[0].length;
        }
        return output + '{' + JSON.stringify(line.slice(end)) + '}';
    }
    const regex = TOKEN_PATTERNS[language] ?? TOKEN_PATTERNS.default;
    let out = '', end = 0;
    for (const m of line.matchAll(regex)) {
        out += '{' + JSON.stringify(line.slice(end, m.index)) + '}';
        const text = m[0];
        // attr は YAML / JSON のキー位置（名前付きグループ key）だけに限定する
        const cls = m.groups?.key !== undefined
            ? 'attr'
            : text.startsWith('#')
            ? 'comment'
            : /^["']/.test(text)
            ? 'string'
            : /^\d/.test(text)
            ? 'number'
            : 'literal';
        out += `<span className="hljs-${cls}">{${JSON.stringify(text)}}</span>`;
        end = m.index + text.length;
    }
    return out + '{' + JSON.stringify(line.slice(end)) + '}';
}

function jsx(n) {
    if (n.nodeType === 3) {
        if (['TABLE', 'THEAD', 'TBODY', 'TFOOT', 'TR'].includes(n.parentElement?.tagName) && !n.textContent.trim()) {
            return '';
        }
        return '{' + JSON.stringify(n.textContent) + '}';
    }
    if (n.nodeType !== 1) return '';

    if (n.matches('pre.mermaid')) {
        const i = diagrams.indexOf(n);
        let prev = n.previousElementSibling;
        while (prev && !prev.matches('h2,h3,h4,h5')) prev = prev.previousElementSibling;
        const label = prev?.textContent?.replace(/\s+/g, ' ').trim() ?? `図 ${i + 1}`;
        return `<Diagram id="diag-${i}" label={${JSON.stringify(label)}} />`;
    }

    if (n.matches('.code-block')) {
        const langEl = n.querySelector('.code-lang');
        const lang = langEl?.textContent?.trim().toLowerCase() ?? 'text';
        const pre = n.querySelector('pre');
        const code = pre?.querySelector('code');
        const codeText = code ? code.textContent : pre ? pre.textContent : '';
        const lines = codeText.replace(/^\n|\n$/g, '').split('\n');
        return `<div className="code-sample"><div className="code-lang">${langEl?.textContent?.trim() ?? ''}</div><div className="code-block" tabIndex={0} role="region" aria-label="${lang} コード例">${lines.map((line) => '<div className="code-line">' + tokens(line, lang) + '</div>').join('')}</div></div>`;
    }

    if (n.matches('.checklist-card')) {
        const title = n.querySelector('.title')?.textContent?.trim() ?? 'チェックリスト';
        const lis = [...n.querySelectorAll('li')];
        const items = lis.map((li, idx) => {
            const input = li.querySelector('input');
            const label = li.querySelector('label');
            const id = input?.id || `check-${phase}-${idx}`;
            return `{ id: ${JSON.stringify(id)}, label: <>${[...label.childNodes].map(jsx).join('')}</> }`;
        });
        return `<ChecklistCard title={${JSON.stringify(title)}} items={[${items.join(', ')}]} />`;
    }

    const attrs = [...n.attributes]
        .filter((a) => !['style'].includes(a.name))
        .map((a) => `${{ class: 'className', for: 'htmlFor' }[a.name] || a.name}={${JSON.stringify(a.value)}}`);

    if (n.matches('th')) attrs.push('scope="col"');
    if (n.matches('h2[id],h3[id],h4[id]')) attrs.push('tabIndex={-1}');
    if (n.matches('.table-scroll')) {
        attrs.push('tabIndex={0}', 'role="region"', `aria-label={${JSON.stringify(tableLabel(n))}}`);
    }

    const tag = n.tagName.toLowerCase();
    if (['input', 'br', 'hr', 'img'].includes(tag)) {
        return `<${tag} ${attrs.join(' ')} />`;
    }
    return `<${tag} ${attrs.join(' ')}>${[...n.childNodes].map(jsx).join('')}</${tag}>`;
}

const main = doc.querySelector('main');
const chunks = Object.fromEntries(Object.keys(boundaries).map((k) => [k, []]));
let current = 'hero';

for (const n of main.childNodes) {
    if (n.nodeType === 1) {
        const found = Object.entries(boundaries).find(([, id]) => id && n.id === id)?.[0];
        if (found) current = found;
    }
    chunks[current].push(n);
}

const body = chunks[phase].map(jsx).join('\n');
const componentName = {
    hero: 'Hero',
    task21: 'Task21',
    task22: 'Task22',
    scenarios: 'Scenarios',
    examprep: 'ExamPrep',
    checklist: 'ChecklistSection',
    appendix: 'Appendix',
}[phase];

const hasDiagram = body.includes('<Diagram ');
const hasChecklist = body.includes('<ChecklistCard ');

let output = '';
if (hasDiagram) output += `import { Diagram } from '../Diagram';\n`;
if (hasChecklist) output += `import { ChecklistCard } from '../Checklist';\n`;
output += `\n/** 原本の ${phase} セクション本文。 */\nexport default function ${componentName}() {\n    return (\n        <section className="guide-part" data-part="${phase}">\n${body}\n        </section>\n    );\n}\n`;

// TypeScript printer で構文検証とフォーマット
const sourceFile = ts.createSourceFile(
    `${componentName}.tsx`,
    output,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
);
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const formatted = printer.printFile(sourceFile);

fs.writeFileSync(`${dir}/sections/${componentName}.tsx`, formatted);
console.log(`Generated ${componentName}.tsx!`);
