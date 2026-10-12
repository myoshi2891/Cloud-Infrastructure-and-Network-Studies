/** 本文・表行・図・点・継続番号の欠落を実テストで検出し、必ず元に戻す。 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const directory = 'app/aws/developer-associate/domain3';
const testFile = '__tests__/aws/developer-associate/domain3/page.test.tsx';
const mutations = [
    { name: 'paragraph', path: `${directory}/sections/S1.tsx`, pattern: /<p>[\s\S]*?<\/p>/, replacement: '', test: '本文・注釈・コード全文' },
    { name: 'table-row', path: `${directory}/sections/S1.tsx`, pattern: /<tr>\s*<td>[\s\S]*?<\/tr>/, replacement: '', test: 'td の全文' },
    { name: 'diagram', path: `${directory}/sections/S1.tsx`, pattern: /<Diagram id="d0"[^>]*\/>/, replacement: '', test: '全39図のDSL' },
    { name: 'list-marker', path: `${directory}/page.css`, pattern: /list-style-type: disc/, replacement: 'list-style-type: none', test: '通常リストの点・番号' },
    { name: 'ordered-list-start', path: `${directory}/sections/S30.tsx`, pattern: / start=\{4\}/, replacement: '', test: '番号再開 start=4' },
];

for (const mutation of mutations) {
    const original = readFileSync(mutation.path, 'utf8');
    const changed = original.replace(mutation.pattern, mutation.replacement);
    if (changed === original) throw new Error(`Mutation missed: ${mutation.name}`);
    try {
        writeFileSync(mutation.path, changed);
        let detected = false;
        try {
            execFileSync('bun', ['run', 'test', '--', testFile, '-t', mutation.test], { encoding: 'utf8', stdio: 'pipe' });
        } catch (error) {
            const output = String(error.stdout) + String(error.stderr);
            if (!output.includes('AssertionError') || !output.includes('1 failed')) throw error;
            detected = true;
        }
        if (!detected) throw new Error(`Undetected omission: ${mutation.name}`);
        console.log(`Detected: ${mutation.name}`);
    } finally {
        writeFileSync(mutation.path, original);
    }
}
