import { describe, it, expect } from 'vitest';
import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { FIDELITY_PAGES } from '../../scripts/archive-fidelity-config.mjs';

const REPOSITORY_ROOT = process.cwd();
const GENERATOR = resolve(REPOSITORY_ROOT, 'scripts/gen-fidelity-fixture.mjs');
const FIXTURE_DIR = resolve(REPOSITORY_ROOT, 'docs/migration-inventory');

/** 移行元を細工したことが一目で分かる番兵文字列。 */
const TAMPER_MARK = 'TAMPERED';

const TAMPERED_HTML = '<html><body>'
    + `<div class="doc-header"><p class="subtitle">${TAMPER_MARK}</p></div>`
    + `<script type="text/mermaid">graph TD; ${TAMPER_MARK} --> NODE;</script>`
    + '</body></html>';

describe('gen-fidelity-fixture / 固定リビジョンからの読み出し', () => {
    // 最小の設定（introduction + mermaidCharts）を持つページで代表させる。
    const slug = 'comptia-network-plus-guide';
    const config = FIDELITY_PAGES[slug]!;

    it('should ignore a tampered working-tree copy and regenerate from sourceCommit', () => {
        const committedFixture = readFileSync(resolve(FIXTURE_DIR, `${slug}.fidelity.json`), 'utf8');
        // 生成器は process.cwd() を基準に「出力先」と「移行元の作業ツリー」を決める。
        // 使い捨てディレクトリを cwd にすることで、リポジトリの共有ファイルを一切変更しない
        // （並列実行される他テストとの干渉を防ぐ）。git 操作は GIT_DIR で実リポジトリへ向ける。
        const sandbox = mkdtempSync(join(tmpdir(), 'gen-fidelity-'));

        try {
            mkdirSync(join(sandbox, 'docs', 'migration-inventory'), { recursive: true });
            const tamperedSource = join(sandbox, config.source);
            mkdirSync(dirname(tamperedSource), { recursive: true });
            writeFileSync(tamperedSource, TAMPERED_HTML, 'utf8');

            execFileSync(process.execPath, [GENERATOR, slug], {
                cwd: sandbox,
                encoding: 'utf8',
                env: { ...process.env, GIT_DIR: resolve(REPOSITORY_ROOT, '.git') },
            });

            const regenerated = readFileSync(
                join(sandbox, 'docs', 'migration-inventory', `${slug}.fidelity.json`),
                'utf8',
            );
            expect(regenerated).not.toContain(TAMPER_MARK);
            expect(regenerated).toBe(committedFixture);
        } finally {
            rmSync(sandbox, { recursive: true, force: true });
        }
    }, 60_000);

    it('should record a resolved 40-hex SHA whose tree contains the source blob', () => {
        for (const [pageSlug, pageConfig] of Object.entries(FIDELITY_PAGES)) {
            const fixture = JSON.parse(
                readFileSync(resolve(FIXTURE_DIR, `${pageSlug}.fidelity.json`), 'utf8'),
            ) as { source: string; sourceCommit: string };

            expect(fixture.sourceCommit).toMatch(/^[0-9a-f]{40}$/);
            expect(fixture.source).toBe(pageConfig.source);
            // 記録された SHA から移行元を実際に取り出せること（= 内容と出所が対応しうること）。
            expect(() => {
                execFileSync('git', ['cat-file', '-e', `${fixture.sourceCommit}:${fixture.source}`], {
                    cwd: REPOSITORY_ROOT,
                    stdio: 'ignore',
                });
            }).not.toThrow();
        }
    }, 30_000);
});


describe('Part 1 working-tree archive fallback', () => {
    it.each([false, true])('checks the archive checksum before writing (stale=%s)', stale => {
        const sandbox = mkdtempSync(join(tmpdir(), 'iso-fixture-'));
        try {
            cpSync(resolve(REPOSITORY_ROOT, 'scripts'), join(sandbox, 'scripts'), { recursive: true });
            symlinkSync(resolve(REPOSITORY_ROOT, 'node_modules'), join(sandbox, 'node_modules'), 'dir');
            const metadataPath = 'docs/migration-inventory/iso-iec-22123-1-2023.archive.json';
            const fixturePath = 'docs/migration-inventory/iso-iec-22123-1-2023.fidelity.json';
            const metadata = JSON.parse(readFileSync(metadataPath, 'utf8'));
            const html = execFileSync('git', ['show', `${metadata.sourceCommit}:${metadata.html.sourcePath}`], {
                cwd: REPOSITORY_ROOT, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024,
            });
            mkdirSync(dirname(join(sandbox, metadataPath)), { recursive: true });
            writeFileSync(join(sandbox, metadataPath), JSON.stringify(metadata));
            mkdirSync(dirname(join(sandbox, metadata.html.archivePath)), { recursive: true });
            writeFileSync(join(sandbox, metadata.html.archivePath), html + (stale ? '<!-- stale -->' : ''));
            writeFileSync(join(sandbox, fixturePath), 'unchanged');
            const run = () => execFileSync(process.execPath, [join(sandbox, 'scripts/gen-iso-iec-22123-fixture.mjs'), '--working-tree'], {
                cwd: sandbox, encoding: 'utf8',
                stdio: ['ignore', 'pipe', 'pipe'],
            });
            if (stale) {
                expect(run).toThrow(/Refresh the archive/);
                expect(readFileSync(join(sandbox, fixturePath), 'utf8')).toBe('unchanged');
            } else {
                run();
                expect(readFileSync(join(sandbox, fixturePath), 'utf8')).toBe(readFileSync(fixturePath, 'utf8'));
            }
        } finally {
            rmSync(sandbox, { recursive: true, force: true });
        }
    });
});
