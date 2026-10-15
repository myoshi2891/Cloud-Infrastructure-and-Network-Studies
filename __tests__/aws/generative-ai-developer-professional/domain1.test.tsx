import { vi } from 'vitest';
import Guide from '@/app/aws/generative-ai-developer-professional/AipGuide';
import fixture from '@/docs/migration-inventory/aws-aip-c01-guide.fidelity.json';
import { defineGuidePartSuite } from '@/__tests__/helpers/guide-fidelity-suite';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});
defineGuidePartSuite(Guide, 'domain1', fixture.guideParts.domain1);
