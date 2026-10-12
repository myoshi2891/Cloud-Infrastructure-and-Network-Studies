/** 本文・表行・図・点・継続番号の欠落を実テストで検出し、必ず元に戻す。 */
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { constants } from 'node:os';

const directory = 'app/aws/developer-associate/domain3';
const testFile = '__tests__/aws/developer-associate/domain3/page.test.tsx';
const mutations = [
    { name: 'paragraph', path: `${directory}/sections/S1.tsx`, pattern: /<p>[\s\S]*?<\/p>/, replacement: '', test: '本文・注釈・コード全文' },
    { name: 'table-row', path: `${directory}/sections/S1.tsx`, pattern: /<tr>\s*<td>[\s\S]*?<\/tr>/, replacement: '', test: 'td の全文' },
    { name: 'diagram', path: `${directory}/sections/S1.tsx`, pattern: /<Diagram id="d0"[^>]*\/>/, replacement: '', test: '全39図のDSL' },
    { name: 'list-marker', path: `${directory}/page.css`, pattern: /list-style-type: disc/, replacement: 'list-style-type: none', test: '通常リストの点・番号' },
    { name: 'ordered-list-start', path: `${directory}/sections/S30.tsx`, pattern: / start=\{4\}/, replacement: '', test: '番号再開 start=4' },
];

// テスト実行中の SIGINT/SIGTERM でも変異を原状復元できるよう、非同期実行中の復元対象と子プロセスを保持する。
let pending = null;
let child = null;
for (const signal of ['SIGINT', 'SIGTERM']) {
    process.on(signal, () => {
        if (pending) writeFileSync(pending.path, pending.original);
        pending = null;
        child?.kill(signal);
        process.exit(128 + constants.signals[signal]);
    });
}

function runTest(name) {
    return new Promise((resolve, reject) => {
        child = spawn('bun', ['run', 'test', '--', testFile, '-t', name], { stdio: ['ignore', 'pipe', 'pipe'] });
        let stdout = '';
        let stderr = '';
        child.stdout.setEncoding('utf8').on('data', (chunk) => { stdout += chunk; });
        child.stderr.setEncoding('utf8').on('data', (chunk) => { stderr += chunk; });
        child.once('error', reject);
        child.once('close', (code, signal) => {
            child = null;
            resolve({ code, signal, output: stdout + stderr });
        });
    });
}

for (const mutation of mutations) {
    const original = readFileSync(mutation.path, 'utf8');
    const changed = original.replace(mutation.pattern, mutation.replacement);
    if (changed === original) throw new Error(`Mutation missed: ${mutation.name}`);
    pending = { path: mutation.path, original };
    try {
        writeFileSync(mutation.path, changed);
        const result = await runTest(mutation.test);
        if (result.code === 0) throw new Error(`Undetected omission: ${mutation.name}`);
        if (!result.output.includes('AssertionError') || !result.output.includes('1 failed')) {
            throw new Error(`Test command failed (${result.signal ?? result.code}): ${mutation.name}\n${result.output}`);
        }
        console.log(`Detected: ${mutation.name}`);
    } finally {
        writeFileSync(mutation.path, original);
        pending = null;
    }
}
