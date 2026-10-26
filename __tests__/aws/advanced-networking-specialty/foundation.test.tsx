import {vi} from 'vitest';
import Guide from '@/app/aws/advanced-networking-specialty/sections/Foundation';
import {ansGuidePart} from '@/__tests__/helpers/ans-guide-fixture';
import {defineGuidePartSuite} from '@/__tests__/helpers/guide-fidelity-suite';
vi.mock('@/components/MermaidDiagram',async()=>({MermaidDiagram:(await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock}));
defineGuidePartSuite(Guide,'foundation',ansGuidePart('foundation'),true);
