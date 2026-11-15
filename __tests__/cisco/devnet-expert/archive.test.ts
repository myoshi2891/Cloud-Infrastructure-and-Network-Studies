import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('DevNet Expert 原本アーカイブ', () => {
    it('HTMLとMarkdownを直下から退避し固定した復元情報を残す', () => {
        const manifest = JSON.parse(readFileSync('docs/migration-inventory/devnet-expert.archive.json', 'utf8'));
        expect(manifest.sourceCommit).toBe('cf3d30636c7136f722a1422587ceae87aa165aa5');
        expect(manifest.html).toEqual({ originalPath: 'Devnet-expert-guide.html', archivePath: 'archive/Cisco/html/devnet-expert/Devnet-expert-guide.html', bytes: 245701, sha256: '83c72254e7902f21b735cbe5bf0bce47dadf489e277f054bd6c8d5be08a6d02a' });
        expect(manifest.markdown).toEqual({ originalPath: 'Devnet-expert-guide.md', archivePath: 'archive/Cisco/md/devnet-expert/Devnet-expert-guide.md', bytes: 100276, sha256: 'd48bd162761d71859712e3cb47152be894bcf94ee8528ebd64f6663a1d56428b' });
        expect(existsSync(manifest.html.originalPath)).toBe(false);
        expect(existsSync(manifest.markdown.originalPath)).toBe(false);
        for (const entry of [manifest.html, manifest.markdown]) {
            // archive/ is ignored: clean checkouts restore missing files from the
            // pinned Git revision. Use a full-history checkout (CI fetch-depth: 0).
            if (!existsSync(entry.archivePath)) {
                let source: Buffer;
                try {
                    source = execFileSync('git', ['show', `${manifest.sourceCommit}:${entry.originalPath}`]);
                } catch (cause) {
                    throw new Error(`Missing archive ${entry.archivePath}; restore it or fetch full Git history including ${manifest.sourceCommit}.`, { cause });
                }
                expect(source.byteLength).toBe(entry.bytes);
                expect(createHash('sha256').update(source).digest('hex')).toBe(entry.sha256);
                mkdirSync(dirname(entry.archivePath), { recursive: true });
                writeFileSync(entry.archivePath, source);
            }
            expect(existsSync(entry.archivePath)).toBe(true);
            const archived = readFileSync(entry.archivePath);
            expect(archived.byteLength).toBe(entry.bytes);
            expect(createHash('sha256').update(archived).digest('hex')).toBe(entry.sha256);
        }
    });
});
