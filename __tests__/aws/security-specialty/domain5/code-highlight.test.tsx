// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/aws/security-specialty/domain5/page';
import Task51 from '@/app/aws/security-specialty/domain5/sections/Task51';
import Task53 from '@/app/aws/security-specialty/domain5/sections/Task53';
import inventory from '@/docs/migration-inventory/aws-scs-c03-domain5-guide.json';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

/** 言語ごとのコードブロック内で、指定クラスのトークン文字列を出現順に返す。 */
const tokensOf = (container: HTMLElement, language: string, cls: string): string[] =>
    [...container.querySelectorAll(`pre.code-block[aria-label="${language} コード例"]`)].flatMap((block) =>
        [...block.querySelectorAll(`.hljs-${cls}`)].map((token) => token.textContent ?? ''),
    );

describe('SCS-C03 Domain 5 — コードブロック構造と構文ハイライト', () => {
    it('全21コード例が pre.code.code-block 要素で描画され、focusable かつ適切な言語ラベルと構文トークンを持つ', () => {
        const { container } = render(<Page />);
        const blocks = [...container.querySelectorAll('pre.code.code-block')];
        expect(blocks).toHaveLength(inventory.counts.codeBlock);
        blocks.forEach((block, index) => {
            expect(block).toHaveAttribute('tabindex', '0');
            expect(block).toHaveAttribute('role', 'group');
            const label = block.getAttribute('aria-label') ?? '';
            expect(label).toMatch(/^(json|bash|python) コード例$/);
            // 直下は .code-line だけとし、素の改行テキストに依存する行を残さない
            expect([...block.childNodes].filter((node) => !(node as Element).matches?.('.code-line'))).toEqual([]);
            expect(block.children).toHaveLength(inventory.structures.codeLines[index]!);
            expect([...block.children].filter((line) => line.textContent?.includes('\n'))).toEqual([]);
            expect(block.querySelector('span[class^="hljs-"]')).not.toBeNull();
        });
    });

    it('JSON では引用符付きキーだけを attr とし、文字列値や数値を正しく分類する', () => {
        const { container } = render(<Task51 />);
        const attrs = tokensOf(container, 'json', 'attr');
        expect(attrs).toContain('"Version"');
        expect(attrs).toContain('"Statement"');
        expect(attrs).toContain('"Effect"');
        expect(tokensOf(container, 'json', 'string')).toContain('"2012-10-17"');
    });

    it('Bash ではコマンドや制御構文・オプションを構文色付けする', () => {
        const { container } = render(<Task51 />);
        const builtins = tokensOf(container, 'bash', 'built_in');
        expect(builtins).toContain('aws');
    });

    it('Bash のハイフン・コロンで連結された語の一部を keyword / number と誤判定しない', () => {
        const { container } = render(<Page />);
        const embedded = [
            ...container.querySelectorAll('pre.code-block[aria-label="bash コード例"] :is(.hljs-keyword, .hljs-number)'),
        ].flatMap((token) => {
            const before = token.previousSibling?.textContent ?? '';
            const after = token.nextSibling?.textContent ?? '';
            return /[\w:-]$/.test(before) || /^[\w:-]/.test(after) ? [token.parentElement?.textContent ?? ''] : [];
        });
        expect(embedded).toEqual([]);
        // 独立した数値は引き続き number として色付けする
        expect(tokensOf(container, 'bash', 'number')).toEqual(expect.arrayContaining(['32', '180', '365']));
    });

    it('Python では import / from / def / return 等のキーワードを keyword とする', () => {
        const { container } = render(<Task53 />);
        const keywords = tokensOf(container, 'python', 'keyword');
        expect(keywords).toContain('import');
        expect(keywords).toContain('def');
        expect(keywords).toContain('return');
    });
});

