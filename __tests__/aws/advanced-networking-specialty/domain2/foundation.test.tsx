import {vi} from 'vitest';
import Guide from '@/app/aws/advanced-networking-specialty/domain2/sections/Foundation';
import {ansDomain2Part} from '@/__tests__/helpers/ans-domain2-fixture';
import {defineGuidePartSuite} from '@/__tests__/helpers/guide-fidelity-suite';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
defineGuidePartSuite(Guide,'foundation',ansDomain2Part('foundation'));
