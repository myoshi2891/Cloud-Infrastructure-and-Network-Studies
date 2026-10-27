import { vi } from 'vitest';
import Task13 from '@/app/aws/security-specialty/domain1/sections/Task13';
import { defineGuidePartSuite } from '@/__tests__/helpers/guide-fidelity-suite';
import { scsDomain1Part } from '@/__tests__/helpers/scs-domain1-fixture';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

defineGuidePartSuite(Task13, 'task13', scsDomain1Part('task13'));
