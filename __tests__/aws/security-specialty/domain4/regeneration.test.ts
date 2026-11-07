import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { DIAGRAM_DESCRIPTIONS } from '@/app/aws/security-specialty/domain4/constants';

const scriptPath = 'scripts/migrate-scs-domain4.mjs';
const script = readFileSync(scriptPath, 'utf8');
const css = readFileSync('app/aws/security-specialty/domain4/page.css', 'utf8');

describe('SCS Domain 4 再生成の整合性', () => {
    it('全図の説明を生成スクリプトの descriptions と同期する', () => {
        Object.values(DIAGRAM_DESCRIPTIONS).forEach((description) => {
            expect(script).toContain(description);
        });
    });

    it('additionalCss の全ブロックが page.css の末尾と完全に一致する', () => {
        const block = script.match(/const additionalCss = `([\s\S]*?)`;\n/)?.[1];
        expect(block, 'additionalCss が生成スクリプトに見つからない').toBeDefined();
        const expected = (block ?? '').replaceAll('${scope}', '.scs-domain4-page');
        const anchor = expected.slice(0, expected.indexOf('}') + 1);
        const start = css.lastIndexOf(anchor);

        expect(anchor).toContain('color-scheme: light;');
        expect(start).toBeGreaterThanOrEqual(0);
        expect(css.slice(start)).toBe(expected);
        ['.main ul {', '.sidebar {', '[data-part="examprep"] > details {', '.hljs-keyword', 'pre.code.code-block'].forEach(
            (rule) => expect(expected).toContain(rule),
        );
    });

    it('ガイド本体を Server Component に保ち、生成テンプレートも同じにする', () => {
        const guide = readFileSync('app/aws/security-specialty/domain4/ScsDomain4Guide.tsx', 'utf8');
        const template = script.slice(script.indexOf('const guideComponent ='));

        expect(guide).not.toContain('use client');
        expect(template.slice(0, template.indexOf('import NavBar'))).not.toContain('use client');
    });

    it('Page コンポーネントを Server Component に保つ', () => {
        const page = readFileSync('app/aws/security-specialty/domain4/page.tsx', 'utf8');
        expect(page).not.toContain('use client');
    });
});
