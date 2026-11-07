// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/aws/security-specialty/domain6/page';
import Task61 from '@/app/aws/security-specialty/domain6/sections/Task61';
import Task62 from '@/app/aws/security-specialty/domain6/sections/Task62';
import inventory from '@/docs/migration-inventory/aws-scs-c03-domain6-guide.json';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

/** 言語ごとのコードブロック内で、指定クラスのトークン文字列を出現順に返す。 */
const tokensOf = (container: HTMLElement, language: string, cls: string): string[] =>
    [...container.querySelectorAll(`pre.code-block[aria-label="${language} コード例"]`)].flatMap((block) =>
        [...block.querySelectorAll(`.hljs-${cls}`)].map((token) => token.textContent ?? ''),
    );

describe('SCS-C03 Domain 6 — コードブロック構造と構文ハイライト', () => {
    it('全19コード例が pre.code.code-block 要素で描画され、focusable かつ適切な言語ラベルと構文トークンを持つ', () => {
        const { container } = render(<Page />);
        const blocks = [...container.querySelectorAll('pre.code.code-block')];
        expect(blocks).toHaveLength(inventory.counts.codeBlock);
        blocks.forEach((block, index) => {
            expect(block).toHaveAttribute('tabindex', '0');
            expect(block).toHaveAttribute('role', 'group');
            const label = block.getAttribute('aria-label') ?? '';
            expect(label).toMatch(/^(json|bash|yaml|ruby) コード例$/);
            // 直下は .code-line だけとし、素の改行テキストに依存する行を残さない
            expect([...block.childNodes].filter((node) => !(node as Element).matches?.('.code-line'))).toEqual([]);
            expect(block.children).toHaveLength(inventory.structures.codeLines[index]!);
            expect([...block.children].filter((line) => line.textContent?.includes('\n'))).toEqual([]);
            expect(block.querySelector('span[class^="hljs-"]')).not.toBeNull();
        });
    });

    it('JSON では引用符付きキーだけを attr とし、文字列値や数値を正しく分類する', () => {
        const { container } = render(<Task61 />);
        const attrs = tokensOf(container, 'json', 'attr');
        expect(attrs).toContain('"Version"');
        expect(attrs).toContain('"Statement"');
        expect(attrs).toContain('"Effect"');
        expect(tokensOf(container, 'json', 'string')).toContain('"2012-10-17"');
    });

    it('Bash ではコマンドや制御構文・オプションを構文色付けする', () => {
        const { container } = render(<Task61 />);
        const builtins = tokensOf(container, 'bash', 'built_in');
        expect(builtins).toContain('aws');
    });

    it('Ruby / cfn-guard では rule や when などのキーワードを構文色付けする', () => {
        const { container } = render(<Task62 />);
        const keywords = tokensOf(container, 'ruby', 'keyword');
        expect(keywords).toContain('let');
        expect(keywords).toContain('rule');
        expect(keywords).toContain('when');
    });
});
