import {vi} from 'vitest';
import Guide from '@/app/aws/generative-ai-developer-professional/domain2/AipDomain2Guide';
import fixture from '@/docs/migration-inventory/aws-aip-c01-domain2-guide.fidelity.json';
import {defineGuidePartSuite} from '@/__tests__/helpers/guide-fidelity-suite';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
const part=fixture.guideParts.revision;
defineGuidePartSuite(Guide,'revision',{...part,diagrams:part.diagrams.map(chart=>`%%{init: ${JSON.stringify(fixture.guideInteractions.mermaidConfig)}}%%\n${chart}`)});
