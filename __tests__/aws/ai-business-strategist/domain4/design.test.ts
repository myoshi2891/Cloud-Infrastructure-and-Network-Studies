import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import postcss from 'postcss';
import { describe, expect, it } from 'vitest';

const pageCss = readFileSync(resolve('app/aws/ai-business-strategist/domain4/page.css'), 'utf8');
const globalsCss = readFileSync(resolve('app/globals.css'), 'utf8');
const ast = postcss.parse(pageCss);

/** セレクタに一致するルール群（@media 外のトップレベル）の宣言マップを返す */
function getTopLevelRuleDecls(targetSelector: string): Record<string, string> {
    const decls: Record<string, string> = {};
    ast.walkRules((rule) => {
        if (rule.parent?.type === 'atrule') return;
        const selectors = rule.selector.split(',').map((s) => s.trim());
        if (selectors.includes(targetSelector)) {
            rule.walkDecls((decl) => {
                decls[decl.prop] = decl.value;
            });
        }
    });
    return decls;
}

describe('aws-ai-business-strategist-domain4 — 原本デザイン忠実性・全幅レイアウト・リスト装飾', () => {
    it('.main がサイドバー（302px）を除いた画面全幅に広がり、1050px 等の最大幅制限を持たない', () => {
        const mainDecls = getTopLevelRuleDecls('.aib-domain4-page .main');
        expect(mainDecls['margin-left']).toBe('302px');
        expect(mainDecls['width']).toBe('calc(100% - 302px)');
        expect(mainDecls['max-width']).toBe('none');
        expect(mainDecls['padding'] ?? '0').toBe('0');
        expect(pageCss).not.toMatch(/1050px/);
    });

    it('.hero、.section、.footer が元 HTML 通りの全幅パディング（左右 56px）を持つ', () => {
        const heroDecls = getTopLevelRuleDecls('.aib-domain4-page .hero');
        const sectionDecls = getTopLevelRuleDecls('.aib-domain4-page .section');
        const footerDecls = getTopLevelRuleDecls('.aib-domain4-page .footer');

        expect(heroDecls['padding']).toBe('64px 56px 56px');
        expect(sectionDecls['padding']).toBe('34px 56px');
        expect(footerDecls['padding']).toBe('28px 56px 56px');
    });

    it('.hero が元 HTML の濃紺グラデーション背景と白・ラベンダー文字色を復元している', () => {
        const heroDecls = getTopLevelRuleDecls('.aib-domain4-page .hero');
        const h1Decls = getTopLevelRuleDecls('.aib-domain4-page .hero h1');
        const eyebrowDecls = getTopLevelRuleDecls('.aib-domain4-page .eyebrow');

        expect(heroDecls['background']).toMatch(/linear-gradient\(135deg/);
        expect(heroDecls['color']).toBe('var(--color-aib-d4-hero-text)');
        expect(h1Decls['color']).toBe('var(--color-aib-d4-card)');
        expect(eyebrowDecls['color']).toBe('var(--color-aib-d4-eyebrow)');
    });

    it('テーブルヘッダー (thead th)、blockquote、h3 左ボーダーが元 HTML の配色・装飾を保持している', () => {
        const theadThDecls = getTopLevelRuleDecls('.aib-domain4-page thead th');
        const blockquoteDecls = getTopLevelRuleDecls('.aib-domain4-page blockquote');
        const h3Decls = getTopLevelRuleDecls('.aib-domain4-page h3');

        expect(theadThDecls['background']).toBe('var(--color-aib-d4-indigo)');
        expect(theadThDecls['color']).toBe('var(--color-aib-d4-card)');

        expect(blockquoteDecls['background']).toBe('var(--color-aib-d4-gold-s)');
        expect(blockquoteDecls['border-left']).toBe('5px solid var(--color-aib-d4-gold)');
        expect(blockquoteDecls['border-radius']).toBe('10px');

        expect(h3Decls['padding-left']).toBe('12px');
        expect(h3Decls['border-left']).toBe('5px solid var(--color-aib-d4-gold)');
    });

    it('Tailwind Preflight で消える ul / ol のリストマーカー（disc / decimal）が明示復元され、ul.checklist は none である', () => {
        const ulDecls = getTopLevelRuleDecls('.aib-domain4-page ul:not(.checklist)');
        const olDecls = getTopLevelRuleDecls('.aib-domain4-page ol');
        const checklistDecls = getTopLevelRuleDecls('.aib-domain4-page ul.checklist');

        expect(ulDecls['list-style-type'] ?? ulDecls['list-style']).toMatch(/\bdisc\b/);
        expect(olDecls['list-style-type'] ?? olDecls['list-style']).toMatch(/\bdecimal\b/);
        expect(checklistDecls['list-style-type'] ?? checklistDecls['list-style']).toBe('none');
    });

    it('page.css 内に生のカラーコード（#hex / rgb / hsl）やローカルカスタムプロパティ定義を含まず、すべて globals.css の @theme トークンを参照している', () => {
        ast.walkDecls((decl) => {
            expect(decl.prop.startsWith('--')).toBe(false);
            expect(decl.value).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
            expect(decl.value).not.toMatch(/\brgba?\s*\(/);
            expect(decl.value).not.toMatch(/\bhsla?\s*\(/);
        });
        expect(globalsCss).toMatch(/--color-aib-d4-paper:\s*#fbf8f1/);
        expect(globalsCss).toMatch(/--color-aib-d4-indigo:\s*#2f3f9e/);
        expect(globalsCss).toMatch(/--color-aib-d4-gold:\s*#7d5c14/);
        expect(globalsCss).toMatch(/--color-aib-d4-forest:\s*#2e6b3a/);
    });
});
