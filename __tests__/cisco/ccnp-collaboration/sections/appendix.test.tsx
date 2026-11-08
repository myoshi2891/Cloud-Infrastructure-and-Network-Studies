// __tests__/cisco/ccnp-collaboration/sections/appendix.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Appendix from '@/app/cisco/ccnp-collaboration/sections/Appendix';
import { defineCcnpCollabSectionSuite } from '@/__tests__/helpers/ccnp-collab-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCNP Collaboration — Appendix セクション', () => {
    it('外部リンクがレンダリングされている', () => {
        const { container } = render(<Appendix />);
        const links = container.querySelectorAll('a[href^="http"]');
        expect(links.length).toBeGreaterThan(0);
    });

    it('原本の注釈フッターが含まれている', () => {
        const { container } = render(<Appendix />);
        const footer = container.querySelector('footer');
        expect(footer).not.toBeNull();
        expect(footer?.textContent).toContain('出題範囲と製品仕様は変更されることがあります');
    });
});

defineCcnpCollabSectionSuite(Appendix);

