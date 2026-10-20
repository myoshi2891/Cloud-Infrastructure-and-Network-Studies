import {vi} from 'vitest';
import Guide from '@/app/aws/advanced-networking-specialty/domain1/sections/Task14';
import {ansDomain1Part} from '@/__tests__/helpers/ans-domain1-fixture';
import {defineGuidePartSuite} from '@/__tests__/helpers/guide-fidelity-suite';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
defineGuidePartSuite(Guide,'task4',ansDomain1Part('task4'));
