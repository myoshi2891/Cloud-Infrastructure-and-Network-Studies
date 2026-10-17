import { vi } from 'vitest';
import Guide from '@/app/aws/generative-ai-developer-professional/domain1/AipDomain1Guide';
import { defineGuidePartSuite } from '@/__tests__/helpers/guide-fidelity-suite';
import { aipDomain1Part } from '@/__tests__/helpers/aip-domain1-fixture';
vi.mock('@/components/MermaidDiagram', async () => ({ MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock }));
defineGuidePartSuite(Guide, 'task14', aipDomain1Part('task14'));
