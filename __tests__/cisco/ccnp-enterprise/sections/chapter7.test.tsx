// __tests__/cisco/ccnp-enterprise/sections/chapter7.test.tsx
// @vitest-environment jsdom
import { vi } from 'vitest';
import Chapter7 from '@/app/cisco/ccnp-enterprise/sections/Chapter7';
import { defineCcnpEnterpriseSectionSuite } from '@/__tests__/helpers/ccnp-enterprise-section-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineCcnpEnterpriseSectionSuite(Chapter7);

