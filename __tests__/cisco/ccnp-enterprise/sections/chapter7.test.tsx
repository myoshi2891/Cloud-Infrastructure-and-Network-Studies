// __tests__/cisco/ccnp-enterprise/sections/chapter7.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Chapter7 from '@/app/cisco/ccnp-enterprise/sections/Chapter7';
import { defineCcnpEnterpriseSectionSuite } from '@/__tests__/helpers/ccnp-enterprise-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

describe('CCNP Enterprise — Chapter7 セクション', () => {
    it('正常にレンダリングされ、外部リンクが存在する', () => {
        const { container } = render(<Chapter7 />);
        expect(container).not.toBeNull();
        expect(container.querySelectorAll('a[href^="http"]').length).toBeGreaterThan(0);
    });
});

defineCcnpEnterpriseSectionSuite(Chapter7);
