import { vi } from 'vitest';
import Guide from '@/app/aws/security-specialty/sections/Domain5';
import { scsPart } from '@/__tests__/helpers/scs-fixture';
import { defineGuidePartSuite } from '@/__tests__/helpers/guide-fidelity-suite';
vi.mock('@/components/MermaidDiagram', async () => ({ MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock }));
defineGuidePartSuite(Guide, 'domain5', scsPart('domain5'), true);
