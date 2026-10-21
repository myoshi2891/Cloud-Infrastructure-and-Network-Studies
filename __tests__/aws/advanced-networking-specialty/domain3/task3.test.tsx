import {vi} from 'vitest';
import Guide from '@/app/aws/advanced-networking-specialty/domain3/sections/Task33';
import {ansDomain3Part} from '@/__tests__/helpers/ans-domain3-fixture';
import {defineGuidePartSuite} from '@/__tests__/helpers/guide-fidelity-suite';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
defineGuidePartSuite(Guide,'task3',ansDomain3Part('task3'));
