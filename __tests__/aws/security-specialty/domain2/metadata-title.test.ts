import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const extractTitle = (relativePath: string): string => {
    const source = readFileSync(resolve(process.cwd(), relativePath), 'utf-8');
    const match = source.match(/^\s*title: '(.+)',$/m);
    if (!match?.[1]) {
        throw new Error(`metadata.title が見つかりません: ${relativePath}`);
    }
    return match[1];
};

describe('SCS-C03 Domain 2 metadata.title', () => {
    const ROOT_TEMPLATE_SUFFIX = '| Cloud Infrastructure Studies';

    it.each([
        ['ページ', 'app/aws/security-specialty/domain2/page.tsx'],
        ['scaffold 生成器', 'scripts/scaffold-scs-domain2.mjs'],
    ])('%s の title はルート template が付ける接尾辞を重複させない', (_label, relativePath) => {
        const title = extractTitle(relativePath);

        expect(title).toContain('Incident Response');
        expect(title).not.toContain(ROOT_TEMPLATE_SUFFIX);
    });

    it('ページと scaffold 生成器の title が一致する', () => {
        const pageTitle = extractTitle('app/aws/security-specialty/domain2/page.tsx');
        const scaffoldTitle = extractTitle('scripts/scaffold-scs-domain2.mjs');

        expect(scaffoldTitle).toBe(pageTitle);
    });
});
