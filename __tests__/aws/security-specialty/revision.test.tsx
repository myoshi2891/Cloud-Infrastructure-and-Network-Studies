import { vi } from 'vitest';
import Revision from '@/app/aws/security-specialty/sections/Revision';
import { QuizProvider } from '@/app/aws/security-specialty/Quiz';
import { scsPart } from '@/__tests__/helpers/scs-fixture';
import { defineGuidePartSuite } from '@/__tests__/helpers/guide-fidelity-suite';
vi.mock('@/components/MermaidDiagram', async () => ({ MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock }));
const Guide = () => <QuizProvider><Revision /></QuizProvider>;
defineGuidePartSuite(Guide, 'revision', scsPart('revision'), true);
