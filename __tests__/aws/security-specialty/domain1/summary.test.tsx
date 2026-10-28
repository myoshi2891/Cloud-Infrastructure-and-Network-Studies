import { vi } from 'vitest';
import ScenarioSummary from '@/app/aws/security-specialty/domain1/sections/ScenarioSummary';
import { defineGuidePartSuite } from '@/__tests__/helpers/guide-fidelity-suite';
import { scsDomain1Part } from '@/__tests__/helpers/scs-domain1-fixture';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

defineGuidePartSuite(ScenarioSummary, 'summary', scsDomain1Part('summary'));
