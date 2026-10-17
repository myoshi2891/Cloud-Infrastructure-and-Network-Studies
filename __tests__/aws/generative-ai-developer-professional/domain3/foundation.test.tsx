import {vi} from 'vitest';
import Guide from '@/app/aws/generative-ai-developer-professional/domain3/AipDomain3Guide';
import {aipDomain3Part} from '@/__tests__/helpers/aip-domain3-fixture';
import {defineGuidePartSuite} from '@/__tests__/helpers/guide-fidelity-suite';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
defineGuidePartSuite(Guide,'foundation',aipDomain3Part('foundation'));
