import {vi} from 'vitest';
import Guide from '@/app/aws/advanced-networking-specialty/domain4/sections/Task41';
import {ansDomain4Part} from '@/__tests__/helpers/ans-domain4-fixture';
import {defineGuidePartSuite} from '@/__tests__/helpers/guide-fidelity-suite';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
defineGuidePartSuite(Guide,'task1',ansDomain4Part('task1'),true);
