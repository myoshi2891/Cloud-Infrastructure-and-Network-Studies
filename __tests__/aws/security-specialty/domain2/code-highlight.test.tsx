// __tests__/aws/security-specialty/domain2/code-highlight.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Task21 from '@/app/aws/security-specialty/domain2/sections/Task21';
import Task22 from '@/app/aws/security-specialty/domain2/sections/Task22';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

/** 言語ごとのコードブロック内で、指定クラスのトークン文字列を出現順に返す。 */
const tokensOf = (container: HTMLElement, language: string, cls: string): string[] =>
    [...container.querySelectorAll(`.code-block[aria-label="${language} コード例"]`)].flatMap((block) =>
        [...block.querySelectorAll(`.hljs-${cls}`)].map((token) => token.textContent ?? ''),
    );

describe('SCS-C03 Domain 2 — コードの構文色分類', () => {
    it('YAML ではキー位置だけを attr とし、コロンを含む値は attr にしない', () => {
        const { container } = render(<Task21 />);
        const attrs = tokensOf(container, 'yaml', 'attr');
        expect(attrs).toContain('mainSteps');
        expect(attrs).toContain('action');
        expect(attrs).not.toContain('aws');
    });

    it('Python では数値を attr にせず、辞書のキーも含めて引用符付きトークンを string とする', () => {
        const { container } = render(<Task21 />);
        expect(tokensOf(container, 'python', 'attr')).toEqual([]);
        expect(tokensOf(container, 'python', 'number')).toContain('7');
        expect(tokensOf(container, 'python', 'string')).toContain('"action"');
    });

    it('SQL ではシングルクォートの文字列を string とし、日時の一部を attr / number にしない', () => {
        const { container } = render(<Task22 />);
        expect(tokensOf(container, 'sql', 'attr')).toEqual([]);
        const strings = tokensOf(container, 'sql', 'string');
        expect(strings).toContain("'AKIAEXAMPLEEXAMPLE'");
        expect(strings).toContain("'2026-10-10T00:00:00Z'");
        expect(strings).toContain("'ACCEPT'");
        expect(tokensOf(container, 'sql', 'number')).toEqual(['20']);
    });

    it('JSON では引用符付きキーだけを attr とし、値は string のまま保つ', () => {
        const { container } = render(<Task22 />);
        expect(tokensOf(container, 'json', 'attr')).toContain('"aws:TokenIssueTime"');
        expect(tokensOf(container, 'json', 'string')).toContain('"2026-10-17T00:00:00Z"');
    });
});
