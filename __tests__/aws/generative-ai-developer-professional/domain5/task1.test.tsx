import {vi} from 'vitest';
import Guide from '@/app/aws/generative-ai-developer-professional/domain5/AipDomain5Guide';
import {aipDomain5Part} from '@/__tests__/helpers/aip-domain5-fixture';
import {defineGuidePartSuite} from '@/__tests__/helpers/guide-fidelity-suite';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
defineGuidePartSuite(Guide,'task1',aipDomain5Part('task1'));
