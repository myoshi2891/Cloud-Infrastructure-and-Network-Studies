// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/aws/security-specialty/domain3/page';
import Task31 from '@/app/aws/security-specialty/domain3/sections/Task31';
import Task32 from '@/app/aws/security-specialty/domain3/sections/Task32';
import Task33 from '@/app/aws/security-specialty/domain3/sections/Task33';
import inventory from '@/docs/migration-inventory/aws-scs-c03-domain3-guide.json';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

/** 言語ごとのコードブロック内で、指定クラスのトークン文字列を出現順に返す。 */
const tokensOf = (container: HTMLElement, language: string, cls: string): string[] =>
    [...container.querySelectorAll(`pre.code-block[aria-label="${language} コード例"]`)].flatMap((block) =>
        [...block.querySelectorAll(`.hljs-${cls}`)].map((token) => token.textContent ?? ''),
    );

describe('SCS-C03 Domain 3 — コードブロック構造と構文ハイライト', () => {
    it('全14コード例が pre.code.code-block 要素で描画され、focusable かつ適切な言語ラベルと構文トークンを持つ', () => {
        const { container } = render(<Page />);
        const blocks = [...container.querySelectorAll('pre.code.code-block')];
        expect(blocks).toHaveLength(inventory.counts.codeBlock);
        blocks.forEach((block) => {
            expect(block).toHaveAttribute('tabindex', '0');
            expect(block).toHaveAttribute('role', 'group');
            const label = block.getAttribute('aria-label') ?? '';
            expect(label).toMatch(/^(json|yaml|dockerfile|bash|python) コード例$/);
            expect(block.querySelector(':scope > .code-line')).not.toBeNull();
            expect(block.querySelector('span[class^="hljs-"]')).not.toBeNull();
        });
    });

    it('JSON では引用符付きキーだけを attr とし、文字列値や数値・真偽値を正しく分類する', () => {
        const { container } = render(<Task31 />);
        const attrs = tokensOf(container, 'json', 'attr');
        expect(attrs).toContain('"AllowedOrigins"');
        expect(attrs).toContain('"RateBasedStatement"');
        expect(attrs).not.toContain('"https://app.example.com"');
        expect(tokensOf(container, 'json', 'string')).toContain('"https://app.example.com"');
        expect(tokensOf(container, 'json', 'number')).toContain('3000');
        expect(tokensOf(container, 'json', 'literal')).toContain('true');
    });

    it('YAML では行頭キー位置だけを attr とし、コメントや単一引用符文字列を分類する', () => {
        const { container } = render(<Task32 />);
        const attrs = tokensOf(container, 'yaml', 'attr');
        expect(attrs).toContain('name');
        expect(attrs).toContain('schemaVersion');
        expect(attrs).toContain('commands');
        expect(tokensOf(container, 'yaml', 'string')).toContain("'s/^#\\?PasswordAuthentication.*/PasswordAuthentication no/'");
    });

    it('Dockerfile では命令（FROM, RUN, USER, CMD 等）を keyword、コメントを comment とする', () => {
        const { container } = render(<Task32 />);
        const keywords = tokensOf(container, 'dockerfile', 'keyword');
        expect(keywords).toEqual(['FROM', 'RUN', 'WORKDIR', 'COPY', 'RUN', 'COPY', 'USER', 'CMD']);
        expect(tokensOf(container, 'dockerfile', 'comment')).toContain('# 最小権限で動かすコンテナの例');
        expect(tokensOf(container, 'dockerfile', 'string')).toContain('"python"');
    });

    it('Python では import / if / else を keyword、print を built_in、コメントを comment とする', () => {
        const { container } = render(<Task32 />);
        expect(tokensOf(container, 'python', 'keyword')).toEqual(['import', 'if', 'else']);
        expect(tokensOf(container, 'python', 'built_in')).toEqual(['print', 'print']);
        expect(tokensOf(container, 'python', 'comment')).toContain('# 出力側をチェックするときは "OUTPUT"');
        expect(tokensOf(container, 'python', 'string')).toContain('"bedrock-runtime"');
    });

    it('bash では aws コマンドを built_in、オプションフラグを keyword、Suricata 変数を variable とする', () => {
        const { container } = render(<><Task32 /><Task33 /></>);
        expect(new Set(tokensOf(container, 'bash', 'built_in'))).toEqual(new Set(['aws']));
        expect(tokensOf(container, 'bash', 'keyword')).toContain('--http-tokens');
        expect(tokensOf(container, 'bash', 'variable')).toContain('$HOME_NET');
        expect(tokensOf(container, 'bash', 'variable')).toContain('$EXTERNAL_NET');
    });
});

