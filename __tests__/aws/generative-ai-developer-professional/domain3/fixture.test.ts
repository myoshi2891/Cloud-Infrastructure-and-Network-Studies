import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import fixture from '@/docs/migration-inventory/aws-aip-c01-domain3-guide.fidelity.json';

let hasSource = false;
try { execFileSync('git', ['cat-file', '-e', `${fixture.sourceCommit}^{commit}`], { stdio: 'ignore' }); hasSource = true; } catch { /* Shallow CI history can omit the source commit. */ }

describe('AIP domain3 source-independent fixture', () => {
    it.skipIf(!hasSource)('regenerates byte-for-byte with neither root HTML nor archive in the working directory', () => {
        const sandbox = mkdtempSync(join(tmpdir(), 'aip-domain3-fixture-'));
        try {
            mkdirSync(join(sandbox, 'docs/migration-inventory'), { recursive: true });
            const gitDir = execFileSync('git', ['rev-parse', '--absolute-git-dir'], { encoding: 'utf8' }).trim();
            execFileSync('bun', [resolve('scripts/gen-fidelity-fixture.mjs'), 'aws-aip-c01-domain3-guide'], { cwd: sandbox, env: { ...process.env, GIT_DIR: gitDir } });
            const file = 'docs/migration-inventory/aws-aip-c01-domain3-guide.fidelity.json';
            expect(readFileSync(join(sandbox, file), 'utf8')).toBe(readFileSync(file, 'utf8'));
        } finally { rmSync(sandbox, { recursive: true, force: true }); }
    });
});

// CIの浅い履歴では再生成を省略し、通常の本文テストはfixtureだけで実行する。
it.skipIf(!hasSource)('records the exact archived source bytes without reading a local archive', () => {
    const manifest = JSON.parse(readFileSync('docs/migration-inventory/aws-aip-c01-domain3-guide.archive.json', 'utf8')) as { source: string; sourceCommit: string; sha256: string; bytes: number; rootRetained: boolean };
    const original = execFileSync('git', ['show', `${fixture.sourceCommit}:${fixture.source}`]);
    expect(manifest.source).toBe(fixture.source);
    expect(manifest.sourceCommit).toBe(fixture.sourceCommit);
    expect(manifest.bytes).toBe(original.length);
    expect(manifest.sha256).toBe(createHash('sha256').update(original).digest('hex'));
    expect(manifest.rootRetained).toBe(false);
});
