import { vi } from 'vitest';
import Guide from '@/app/aws/generative-ai-developer-professional/AipGuide';
import fixture from '@/docs/migration-inventory/aws-aip-c01-guide.fidelity.json';
import { defineGuidePartSuite } from '@/__tests__/helpers/guide-fidelity-suite';
import { MermaidDiagramMock } from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', () => ({ MermaidDiagram: MermaidDiagramMock }));
defineGuidePartSuite(Guide, 'foundation', fixture.guideParts.foundation);
