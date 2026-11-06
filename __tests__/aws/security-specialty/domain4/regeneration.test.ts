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

    it('Mermaid・コードブロック・構文ハイライトの追加CSSを生成スクリプトが保持する', () => {
        const tailCss = css.slice(css.indexOf('.scs-domain4-page .mermaid-wrap > [role="img"]'));
        expect(tailCss).toContain('.hljs-keyword');
        expect(tailCss).toContain('pre.code.code-block');
        const normalizedScript = script.replaceAll('${scope}', '.scs-domain4-page');
        expect(normalizedScript).toContain(tailCss.trimEnd());
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
