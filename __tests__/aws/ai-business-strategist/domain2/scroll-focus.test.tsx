// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/aws/ai-business-strategist/domain2/page';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

const pageCss = readFileSync(
    join(process.cwd(), 'app/aws/ai-business-strategist/domain2/page.css'),
    'utf8',
);

/** セレクタに完全一致するルールブロックの宣言部を返す */
const ruleBody = (selector: string): string | undefined => {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return pageCss.match(new RegExp(`(?:^|\\n)${escaped}\\s*\\{([^}]*)\\}`))?.[1];
};

describe('aws-ai-business-strategist-domain2 — 横スクロール領域のキーボード操作', () => {
    it('全テーブルの横スクロール wrapper が一意な名前付き region としてフォーカス可能', () => {
        // Arrange
        const { container } = render(<Page />);

        // Act
        const wrappers = [...container.querySelectorAll('.table-wrap')];
        const labels = wrappers.map((wrapper) => wrapper.getAttribute('aria-label')?.trim() ?? '');

        // Assert
        expect(wrappers.length).toBe(container.querySelectorAll('table').length);
        wrappers.forEach((wrapper) => {
            expect(wrapper.getAttribute('role')).toBe('region');
            expect(wrapper.getAttribute('tabindex')).toBe('0');
        });
        expect(labels.every((label) => label.startsWith('表: ') && label.length > 3)).toBe(true);
        expect(new Set(labels).size).toBe(labels.length);
    });

    it('図の実際の overflow 所有者（MermaidDiagram ルート）のみがフォーカス可能で、名前を重複追加しない', () => {
        // Arrange
        const { container } = render(<Page />);

        // Act
        const canvases = [...container.querySelectorAll('.diagram-canvas')];

        // Assert
        expect(canvases.length).toBeGreaterThan(0);
        canvases.forEach((canvas) => {
            expect(canvas.hasAttribute('tabindex')).toBe(false);
            const diagram = canvas.querySelector('[data-testid="mermaid-diagram"]');
            expect(diagram?.getAttribute('tabindex')).toBe('0');
            expect(diagram?.hasAttribute('aria-labelledby')).toBe(false);
        });
    });

    it('外側 canvas は画像セマンティクスを持たず、説明は内側の role="img" に関連付く', () => {
        // Arrange
        const { container } = render(<Page />);

        // Act
        const canvases = [...container.querySelectorAll('.diagram-canvas')];

        // Assert
        expect(canvases.length).toBeGreaterThan(0);
        canvases.forEach((canvas) => {
            expect(canvas.hasAttribute('role')).toBe(false);
            expect(canvas.hasAttribute('aria-label')).toBe(false);
            expect(canvas.hasAttribute('aria-describedby')).toBe(false);
            const diagram = canvas.querySelector('[data-testid="mermaid-diagram"]');
            expect(diagram?.getAttribute('role')).toBe('img');
            expect(diagram?.getAttribute('aria-label')?.trim()).toBeTruthy();
            const descriptionId = diagram?.getAttribute('aria-describedby') ?? '';
            expect(descriptionId).not.toBe('');
            expect(container.querySelector(`#${descriptionId}`)?.textContent?.trim()).toBeTruthy();
        });
    });

    it('.diagram-canvas は冗長な横スクロールを持たない', () => {
        expect(ruleBody('.aib-domain2-page .diagram-canvas')).toBeDefined();
        expect(ruleBody('.aib-domain2-page .diagram-canvas')).not.toMatch(/overflow(-x)?\s*:\s*(auto|scroll)/);
    });

    it('テーブル wrapper と図のフォーカス対象に可視の :focus-visible アウトラインがある', () => {
        const body = pageCss.match(
            /\.aib-domain2-page \.table-wrap:focus-visible,\s*\.aib-domain2-page \.diagram-canvas > \[role="img"\]:focus-visible\s*\{([^}]*)\}/,
        )?.[1];
        expect(body).toMatch(/outline:\s*\d+px solid/);
    });
});
