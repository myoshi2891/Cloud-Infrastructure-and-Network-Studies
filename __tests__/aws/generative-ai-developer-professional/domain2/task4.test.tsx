import {vi} from 'vitest';
import Guide from '@/app/aws/generative-ai-developer-professional/domain2/AipDomain2Guide';
import {aipDomain2Part} from '@/__tests__/helpers/aip-domain2-fixture';
import {defineGuidePartSuite} from '@/__tests__/helpers/guide-fidelity-suite';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
defineGuidePartSuite(Guide,'task4',aipDomain2Part('task4'));
