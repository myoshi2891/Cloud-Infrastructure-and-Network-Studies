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
