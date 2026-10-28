import { vi } from 'vitest';
import UpdatesAndReferences from '@/app/aws/security-specialty/domain1/sections/UpdatesAndReferences';
import { defineGuidePartSuite } from '@/__tests__/helpers/guide-fidelity-suite';
import { scsDomain1Part } from '@/__tests__/helpers/scs-domain1-fixture';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

defineGuidePartSuite(UpdatesAndReferences, 'updates', scsDomain1Part('updates'));
