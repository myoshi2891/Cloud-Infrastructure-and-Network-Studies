import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('DevNet Expert 原本アーカイブ', () => {
    it('HTMLとMarkdownを直下から退避し固定した復元情報を残す', () => {
        const manifest = JSON.parse(readFileSync('docs/migration-inventory/devnet-expert.archive.json', 'utf8'));
        expect(manifest.sourceCommit).toBe('cf3d30636c7136f722a1422587ceae87aa165aa5');
        expect(manifest.html).toEqual({ originalPath: 'Devnet-expert-guide.html', archivePath: 'archive/Cisco/html/devnet-expert/Devnet-expert-guide.html', bytes: 245701, sha256: '83c72254e7902f21b735cbe5bf0bce47dadf489e277f054bd6c8d5be08a6d02a' });
        expect(manifest.markdown).toEqual({ originalPath: 'Devnet-expert-guide.md', archivePath: 'archive/Cisco/md/devnet-expert/Devnet-expert-guide.md', bytes: 100276, sha256: 'd48bd162761d71859712e3cb47152be894bcf94ee8528ebd64f6663a1d56428b' });
        expect(existsSync(manifest.html.originalPath)).toBe(false);
        expect(existsSync(manifest.markdown.originalPath)).toBe(false);
    });
});
