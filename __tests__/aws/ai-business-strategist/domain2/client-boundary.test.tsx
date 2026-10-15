// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/aws/ai-business-strategist/domain2/page';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

const DOMAIN2_DIR = resolve(process.cwd(), 'app/aws/ai-business-strategist/domain2');
const readSource = (file: string) => readFileSync(resolve(DOMAIN2_DIR, file), 'utf8');

describe('aws-ai-business-strategist-domain2 — Client 境界とインタラクション', () => {
    it('メニューボタンの aria-label が開閉状態に応じた操作を表す', () => {
        // Arrange
        render(<Page />);
        const button = screen.getByRole('button', { name: 'メニューを開く' });

        // Act
        fireEvent.click(button);

        // Assert
        expect(button).toHaveAttribute('aria-expanded', 'true');
        expect(button).toHaveAttribute('aria-label', 'メニューを閉じる');

        fireEvent.click(button);
        expect(button).toHaveAttribute('aria-expanded', 'false');
        expect(button).toHaveAttribute('aria-label', 'メニューを開く');
    });

    it('Client シェルは静的セクションを import せず、Server ページから描画内容を受け取る', () => {
        const guideSource = readSource('AiBusinessStrategistDomain2Guide.tsx');
        const pageSource = readSource('page.tsx');

        expect(guideSource).toMatch(/^'use client';/);
        expect(guideSource).not.toMatch(/from '\.\/sections\//);
        expect(pageSource).not.toMatch(/'use client'/);
        expect(pageSource).toMatch(/from '\.\/sections\/Sec1'/);
    });

    it('チェックリストは自身の状態を持つ小さな Client コンポーネントである', () => {
        // Arrange
        expect(readSource('sections/Sec9_Checklist.tsx')).toMatch(/^'use client';/);
        const { container } = render(<Page />);
        const counter = container.querySelector('#s9 .chk-counter');
        const checkbox = container.querySelector<HTMLInputElement>('#chk-1');
        expect(counter?.textContent).toBe('進捗: 0 / 18 完了');

        // Act
        if (!checkbox) throw new Error('#chk-1 が見つかりません');
        fireEvent.click(checkbox);

        // Assert
        expect(checkbox.checked).toBe(true);
        expect(counter?.textContent).toBe('進捗: 1 / 18 完了');
    });
});
