// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/aws/security-specialty/domain4/page';
import Task41 from '@/app/aws/security-specialty/domain4/sections/Task41';
import Task42Authz from '@/app/aws/security-specialty/domain4/sections/Task42Authz';
import inventory from '@/docs/migration-inventory/aws-scs-c03-domain4-guide.json';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

/** 言語ごとのコードブロック内で、指定クラスのトークン文字列を出現順に返す。 */
const tokensOf = (container: HTMLElement, language: string, cls: string): string[] =>
    [...container.querySelectorAll(`pre.code-block[aria-label="${language} コード例"]`)].flatMap((block) =>
        [...block.querySelectorAll(`.hljs-${cls}`)].map((token) => token.textContent ?? ''),
    );

describe('SCS-C03 Domain 4 — コードブロック構造と構文ハイライト', () => {
    it('全16コード例が pre.code.code-block 要素で描画され、focusable かつ適切な言語ラベルと構文トークンを持つ', () => {
        const { container } = render(<Page />);
        const blocks = [...container.querySelectorAll('pre.code.code-block')];
        expect(blocks).toHaveLength(inventory.counts.codeBlock);
        blocks.forEach((block) => {
            expect(block).toHaveAttribute('tabindex', '0');
            expect(block).toHaveAttribute('role', 'group');
            const label = block.getAttribute('aria-label') ?? '';
            expect(label).toMatch(/^(json|bash|sql|rust) コード例$/);
            expect(block.querySelector(':scope > .code-line')).not.toBeNull();
            expect(block.querySelector('span[class^="hljs-"]')).not.toBeNull();
        });
    });

    it('JSON では引用符付きキーだけを attr とし、文字列値や数値を正しく分類する', () => {
        const { container } = render(<Task41 />);
        const attrs = tokensOf(container, 'json', 'attr');
        expect(attrs).toContain('"Version"');
        expect(attrs).toContain('"Statement"');
        expect(attrs).toContain('"Effect"');
        expect(tokensOf(container, 'json', 'string')).toContain('"2012-10-17"');
    });

    it('Bash ではコマンドや制御構文・オプションを構文色付けする', () => {
        const { container } = render(<Task41 />);
        const builtins = tokensOf(container, 'bash', 'built_in');
        expect(builtins).toContain('aws');
        expect(builtins).toContain('printf');
        const keywords = tokensOf(container, 'bash', 'keyword');
        expect(keywords).toContain('for');
        expect(keywords).toContain('case');
        expect(keywords).toContain('if');
    });

    it('SQL では SELECT / FROM / WHERE / ORDER BY / DESC などのキーワードを keyword とする', () => {
        const { container } = render(<Task41 />);
        const keywords = tokensOf(container, 'sql', 'keyword');
        expect(keywords).toContain('SELECT');
        expect(keywords).toContain('FROM');
        expect(keywords).toContain('WHERE');
        expect(keywords).toContain('ORDER');
        expect(keywords).toContain('BY');
        expect(keywords).toContain('DESC');
    });

    it('Cedar/Rust ではキーワード (permit, principal, action, resource) を keyword とする', () => {
        const { container } = render(<Task42Authz />);
        const keywords = tokensOf(container, 'rust', 'keyword');
        expect(keywords).toContain('permit');
        expect(keywords).toContain('principal');
        expect(keywords).toContain('action');
        expect(keywords).toContain('resource');
    });
});
