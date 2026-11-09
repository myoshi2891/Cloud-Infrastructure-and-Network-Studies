// __tests__/cisco/ccnp-service-provider/sections/herointro.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import HeroIntro from '@/app/cisco/ccnp-service-provider/sections/HeroIntro';
import { defineCcnpServiceProviderSectionSuite, expectedStructures } from '@/__tests__/helpers/ccnp-sp-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCNP Service Provider — HeroIntro セクション', () => {
    it('全1個のテーブルが存在し、すべて thead と th[scope="col"] を持つ', () => {
        const { container } = render(<HeroIntro />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(1);

        tables.forEach((table, tableIndex) => {
            const thead = table.querySelector('thead');
            expect(thead).not.toBeNull();
            const ths = table.querySelectorAll('th[scope="col"]');
            expect(ths.length).toBe(expectedStructures(HeroIntro).tableColumnHeaders[tableIndex]);
        });
    });

    it('h1 と h2 見出しが存在する', () => {
        const { container } = render(<HeroIntro />);
        const h1 = container.querySelector('h1');
        expect(h1?.textContent?.trim()).toBe('CCNP Service Provider 認定 初学者向けステップバイステップ完全ガイド');
        const h2 = container.querySelector('h2');
        expect(h2?.textContent?.trim()).toBe('1. このガイドの使い方');
    });
});

defineCcnpServiceProviderSectionSuite(HeroIntro);
