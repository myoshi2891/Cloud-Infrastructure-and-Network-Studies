import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const scriptPath = resolve('scripts/migrate-ccnp-collaboration.mjs');

describe('CCNP Collaboration 移行の要素数検証', () => {
    it.each([42, 44])('main が %i 要素の場合は生成前に停止する', (count) => {
        const directory = mkdtempSync(join(tmpdir(), 'ccnp-collaboration-boundaries-'));
        try {
            writeFileSync(
                join(directory, 'Ccnp-collaboration-guide.html'),
                `<main>${'<p>section</p>'.repeat(count)}</main>`,
            );
            const result = spawnSync(process.execPath, [scriptPath, 'all'], {
                cwd: directory,
                encoding: 'utf8',
            });

            expect(result.status).toBe(1);
            expect(result.stderr).toContain(`expected: 43, actual: ${count}`);
            expect(existsSync(join(directory, 'app'))).toBe(false);
        } finally {
            rmSync(directory, { recursive: true, force: true });
        }
    });
});
