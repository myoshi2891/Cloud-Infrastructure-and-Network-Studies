import {vi} from 'vitest';
import Guide from '@/app/aws/solutions-architect-professional/sections/Revision';
import {sapGuidePart} from '@/__tests__/helpers/sap-guide-fixture';
import {defineGuidePartSuite} from '@/__tests__/helpers/guide-fidelity-suite';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
defineGuidePartSuite(Guide,'revision',sapGuidePart('revision'),true);
