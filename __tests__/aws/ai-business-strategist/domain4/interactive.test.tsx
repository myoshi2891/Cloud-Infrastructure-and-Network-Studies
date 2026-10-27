// @vitest-environment jsdom
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/aws/ai-business-strategist/domain4/page';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

const DOMAIN4_DIR = resolve(process.cwd(), 'app/aws/ai-business-strategist/domain4');
const readSource = (file: string) => readFileSync(resolve(DOMAIN4_DIR, file), 'utf8');

describe('aws-ai-business-strategist-domain4 — チェックリスト進捗バー・ナビ・Client 境界', () => {
    it('直前チェックリスト (#s10) に .chk-count と .chk-bar > i が存在し、チェック操作に応じて完了数とバー幅が更新される', () => {
        const { container } = render(<Page />);
        const s10 = container.querySelector('#s10');
        expect(s10).not.toBeNull();

        const countEl = s10?.querySelector('.chk-count');
        const barFill = s10?.querySelector<HTMLElement>('.chk-bar > i');
        const checkboxes = [...(s10?.querySelectorAll<HTMLInputElement>('ul.checklist input[type="checkbox"]') ?? [])];

        expect(checkboxes).toHaveLength(22);
        expect(countEl?.textContent).toBe('0 / 22 完了');
        expect(barFill?.style.width).toBe('0%');

        // 1つ目をクリック
        fireEvent.click(checkboxes[0]!);
        expect(checkboxes[0]?.checked).toBe(true);
        expect(countEl?.textContent).toBe('1 / 22 完了');
        expect(barFill?.style.width).toBe(`${(100 * 1) / 22}%`);

        // 2つ目をクリック
        fireEvent.click(checkboxes[1]!);
        expect(countEl?.textContent).toBe('2 / 22 完了');
        expect(barFill?.style.width).toBe(`${(100 * 2) / 22}%`);

        // 1つ目を解除
        fireEvent.click(checkboxes[0]!);
        expect(checkboxes[0]?.checked).toBe(false);
        expect(countEl?.textContent).toBe('1 / 22 完了');
    });

    it('モバイル目次ボタンの開閉、aria-expanded / aria-label の切替、および Escape キーでのクローズが機能する', () => {
        const { container } = render(<Page />);
        const pageRoot = container.querySelector('.aib-domain4-page');
        const menuBtn = screen.getByRole('button', { name: '目次を開く' });

        expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
        expect(pageRoot?.classList.contains('menu-open')).toBe(false);

        fireEvent.click(menuBtn);
        expect(menuBtn).toHaveAttribute('aria-expanded', 'true');
        expect(menuBtn).toHaveAttribute('aria-label', '目次を閉じる');
        expect(pageRoot?.classList.contains('menu-open')).toBe(true);

        fireEvent.keyDown(window, { key: 'Escape' });
        expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
        expect(menuBtn).toHaveAttribute('aria-label', '目次を開く');
        expect(pageRoot?.classList.contains('menu-open')).toBe(false);
    });

    it('サイドバーの全 32 件の目次リンクが対応する ID の要素へ解決でき、クリックで URL ハッシュとフォーカスを更新する', () => {
        Element.prototype.scrollIntoView = vi.fn();
        const { container } = render(<Page />);
        const navLinks = [...container.querySelectorAll<HTMLAnchorElement>('#sidebar a[href^="#"]')];

        expect(navLinks).toHaveLength(32);
        navLinks.forEach((link) => {
            const href = link.getAttribute('href') ?? '';
            const targetId = href.slice(1);
            const target = container.querySelector<HTMLElement>(`#${CSS.escape(targetId)}`);
            expect(target).not.toBeNull();
        });

        const targetLink = navLinks.find((a) => a.getAttribute('href') === '#k4-2-1')!;
        fireEvent.click(targetLink);
        expect(window.location.hash).toBe('#k4-2-1');
        const targetEl = container.querySelector<HTMLElement>('#k4-2-1');
        expect(targetEl?.getAttribute('tabindex')).toBe('-1');
    });

    it('目次は #sidebar 内の nav ランドマークとして公開され、全目次リンクを含む', () => {
        const { container } = render(<Page />);
        const nav = screen.getByRole('navigation', { name: '目次ナビゲーション' });
        expect(nav.tagName).toBe('NAV');
        expect(nav.closest('#sidebar.sidebar')).not.toBeNull();
        expect(nav.querySelectorAll('a[href^="#"]')).toHaveLength(
            container.querySelectorAll('#sidebar a[href^="#"]').length,
        );
    });

    it('モバイル目次が開いている間は Tab / Shift+Tab のフォーカスを目次リンクと閉じるボタン内で循環させ、閉じるとボタンへ戻す', () => {
        const { container } = render(<Page />);
        const menuBtn = screen.getByRole('button', { name: '目次を開く' });
        fireEvent.click(menuBtn);

        const links = [...container.querySelectorAll<HTMLAnchorElement>('#sidebar a')];
        const first = links[0]!;
        const last = links[links.length - 1]!;
        expect(document.activeElement).toBe(first);

        // 先頭で Shift+Tab → 閉じるボタンへ循環
        fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
        expect(document.activeElement).toBe(menuBtn);

        // 閉じるボタンで Tab → 先頭リンクへ循環
        fireEvent.keyDown(window, { key: 'Tab' });
        expect(document.activeElement).toBe(first);

        // 最後のリンクでの Tab は既定動作（DOM 順で閉じるボタン）に任せ、横取りしない
        last.focus();
        const tabFromLast = new KeyboardEvent('keydown', { key: 'Tab', cancelable: true });
        window.dispatchEvent(tabFromLast);
        expect(tabFromLast.defaultPrevented).toBe(false);

        // 背面の要素へフォーカスが逃げた場合は先頭リンクへ引き戻す
        const outside = container.querySelector<HTMLInputElement>('#s10 input[type="checkbox"]')!;
        outside.focus();
        fireEvent.keyDown(window, { key: 'Tab' });
        expect(document.activeElement).toBe(first);

        fireEvent.keyDown(window, { key: 'Escape' });
        expect(document.activeElement).toBe(menuBtn);
    });

    it('Client シェルは静的セクションを import せず、Server ページ (page.tsx) から children として受け取る', () => {
        const guideSource = readSource('AiBusinessStrategistDomain4Guide.tsx');
        const pageSource = readSource('page.tsx');

        expect(guideSource).toMatch(/^'use client';/);
        expect(guideSource).not.toMatch(/from '\.\/sections\//);
        expect(pageSource).not.toMatch(/'use client'/);
        expect(pageSource).toMatch(/from '\.\/sections\/Sec3_Task41'/);
    });
});
