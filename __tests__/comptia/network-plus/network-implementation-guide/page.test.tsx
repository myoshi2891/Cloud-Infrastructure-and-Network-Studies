// __tests__/comptia/network-plus/network-implementation-guide/page.test.tsx
// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import inventory from '@/docs/migration-inventory/comptia-network-plus-network-implementation-guide.json';
import Page from '@/app/comptia/network-plus/network-implementation-guide/page';
import { defineMigrationSuite } from '@/__tests__/gcl/agwa/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'CompTIA Network+ Domain 2.0 Network Implementation Guide — 全量移行検証',
    Page,
    inventory,
);

describe('CompTIA Network+ Domain 2.0 追加検証 (リスト構造・スタイリング・重要ブロック)', () => {
    it('参考文献リストが ul.refs 配下の li として正しくマークアップされている', () => {
        const { container } = render(<Page />);
        const refsList = container.querySelector('ul.refs');
        expect(refsList).not.toBeNull();
        const items = refsList?.querySelectorAll('li');
        expect(items?.length).toBe(4);
    });

    it('出題比率統計カード (20%) が表示されている', () => {
        const { container } = render(<Page />);
        const statValue = container.querySelector('.hero-stat-value');
        expect(statValue?.textContent?.trim()).toContain('20%');
    });

    it('4本柱カード (.pillars) が4つ存在し、各サブ領域のアイコンとタイトルを含んでいる', () => {
        const { container } = render(<Page />);
        const pillars = container.querySelectorAll('.pillar');
        expect(pillars.length).toBe(4);
        expect(screen.getByText('2.1 ルーティング技術')).toBeInTheDocument();
        expect(screen.getByText('2.2 スイッチング技術')).toBeInTheDocument();
        expect(screen.getByText('2.3 ワイヤレス機器')).toBeInTheDocument();
        expect(screen.getByText('2.4 物理インストレーション')).toBeInTheDocument();
    });

    it('コールアウト注記が5件存在し、適切なクラスを持っている', () => {
        const { container } = render(<Page />);
        const callouts = container.querySelectorAll('.callout');
        expect(callouts.length).toBe(5);
        expect(container.querySelectorAll('.callout-info').length).toBe(4);
        expect(container.querySelectorAll('.callout-warning').length).toBe(1);
    });
});
