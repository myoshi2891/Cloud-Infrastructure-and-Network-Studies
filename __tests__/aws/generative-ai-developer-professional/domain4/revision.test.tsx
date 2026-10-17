import {vi} from 'vitest';
import Guide from '@/app/aws/generative-ai-developer-professional/domain4/AipDomain4Guide';
import {aipDomain4Part} from '@/__tests__/helpers/aip-domain4-fixture';
import {defineGuidePartSuite} from '@/__tests__/helpers/guide-fidelity-suite';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
defineGuidePartSuite(Guide,'revision',aipDomain4Part('revision'));
