// __tests__/cisco/ccnp-security/page.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render } from '@testing-library/react';
import inventory from '@/docs/migration-inventory/cisco-ccnp-security.json';
import CcnpSecurityGuide from '@/app/cisco/ccnp-security/CcnpSecurityGuide';
import { defineMigrationSuite, extractBodyContent } from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'CCNP Security 完全ガイド — 全量移行検証',
    CcnpSecurityGuide,
    inventory,
);

describe('CCNP Security ガイド — リスト・スタイリング・図解・コード検証', () => {
    it('スコープCSSに金色ドットリストと数字バッジ、Tabler Icons、図解ラッパー透過、リンク下線が定義されている', () => {
        const cssPath = resolve('app/cisco/ccnp-security/page.css');
        const css = readFileSync(cssPath, 'utf8').replace(/\s+/g, '');
        expect(css).toContain("@import'@tabler/icons-webfont/tabler-icons.min.css'");
        expect(css).toContain('.ccnp-security-page');
        expect(css).toContain('mainul>li::before');
        expect(css).toContain('mainol>li::before');
        expect(css).toContain('.srclistli::before');
        expect(css).toContain('.diagram.mm>[role="img"]{background:transparent');
        expect(css).toContain('.ccnp-security-pagea{color:var(--color-indigo);text-decoration:underline');
    });

    it('モバイルメニューボタンに Tabler Icon (.ti-menu-2) が使用され、コードブロックに原本の .tk-c / .tk-p / .hljs-subst が保持されている', () => {
        const { container } = render(<CcnpSecurityGuide />);
        expect(container.querySelector('#menuBtn i.ti.ti-menu-2')).not.toBeNull();
        expect(container.querySelectorAll('.code-block .tk-c').length).toBe(14);
        expect(container.querySelectorAll('.code-block .tk-p').length).toBe(8);
        expect(container.querySelectorAll('.code-block .hljs-subst').length).toBe(3);
    });

    it('Diagram コンポーネントが原本単体の全派生色を含む render-theme.json を使用している', () => {
        const themePath = resolve('app/cisco/ccnp-security/render-theme.json');
        const theme = JSON.parse(readFileSync(themePath, 'utf8'));
        expect(theme.theme).toBe('base');
        expect(theme.flowchart.padding).toBe(15);
        expect(theme.sequence.wrap).toBe(false);
        expect(theme.themeVariables.mainBkg).toBe('#EEF1F8');
        expect(theme.themeVariables.nodeBkg).toBe('#EEF1F8');
        expect(theme.themeVariables.clusterBkg).toBe('#F6F7F9');
    });
});
