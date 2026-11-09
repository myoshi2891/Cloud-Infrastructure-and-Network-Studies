import { spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const scriptPath = resolve('scripts/migrate-ccnp-enterprise.mjs');

function createRepository(directory: string) {
    mkdirSync(join(directory, 'scripts'));
    copyFileSync(scriptPath, join(directory, 'scripts/migrate-ccnp-enterprise.mjs'));
    symlinkSync(resolve('node_modules'), join(directory, 'node_modules'), 'dir');
    mkdirSync(join(directory, 'working-directory'));
}

describe('CCNP Enterprise 移行の要素数検証', () => {
    it.each([41, 43])('main が %i 要素の場合は生成前に停止する', (count) => {
        const directory = mkdtempSync(join(tmpdir(), 'ccnp-enterprise-boundaries-'));
        try {
            createRepository(directory);
            writeFileSync(
                join(directory, 'Ccnp-enterprise-guide.html'),
                `<main>${'<p>section</p>'.repeat(count)}</main>`,
            );
            const result = spawnSync(process.execPath, [join(directory, 'scripts/migrate-ccnp-enterprise.mjs'), 'all'], {
                cwd: join(directory, 'working-directory'),
                encoding: 'utf8',
            });

            expect(result.status).toBe(1);
            expect(result.stderr).toContain(`expected: 42, actual: ${count}`);
            expect(existsSync(join(directory, 'app'))).toBe(false);
        } finally {
            rmSync(directory, { recursive: true, force: true });
        }
    });

    it.each(['primary', 'archive'])('%s の原本をリポジトリ直下から解決し、別の作業ディレクトリでも同じ場所へ生成する', (source) => {
        const directory = mkdtempSync(join(tmpdir(), 'ccnp-enterprise-paths-'));
        try {
            createRepository(directory);
            const archiveDirectory = join(directory, 'archive/Cisco/html/ccnp-enterprise');
            mkdirSync(archiveDirectory, { recursive: true });
            const html = `<main>${'<p>repository-source</p>'.repeat(42)}</main>`;
            writeFileSync(join(archiveDirectory, 'Ccnp-enterprise-guide.html'), source === 'archive' ? html : '<main>unused archive</main>');
            if (source === 'primary') {
                writeFileSync(join(directory, 'Ccnp-enterprise-guide.html'), html);
            }
            const workingDirectory = join(directory, 'working-directory');
            writeFileSync(join(workingDirectory, 'Ccnp-enterprise-guide.html'), '<main>unused cwd source</main>');

            const result = spawnSync(process.execPath, [join(directory, 'scripts/migrate-ccnp-enterprise.mjs'), 'all'], {
                cwd: workingDirectory,
                encoding: 'utf8',
            });

            expect(result.stderr).toBe('');
            expect(result.status).toBe(0);
            for (const section of ['HeroIntro', 'Chapter2', 'Chapter3', 'Chapter4', 'Chapter5', 'Chapter6', 'Chapter7']) {
                expect(readFileSync(join(directory, `app/cisco/ccnp-enterprise/sections/${section}.tsx`), 'utf8')).toContain('repository-source');
            }
            expect(existsSync(join(workingDirectory, 'app'))).toBe(false);
        } finally {
            rmSync(directory, { recursive: true, force: true });
        }
    });
});
