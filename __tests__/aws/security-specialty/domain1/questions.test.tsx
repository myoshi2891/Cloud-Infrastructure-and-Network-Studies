import { render } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import Questions from '@/app/aws/security-specialty/domain1/sections/Questions';
import { defineGuidePartSuite } from '@/__tests__/helpers/guide-fidelity-suite';
import { scsDomain1Part } from '@/__tests__/helpers/scs-domain1-fixture';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

defineGuidePartSuite(Questions, 'questions', scsDomain1Part('questions'));

it('retains all 8 review questions with collapsed details disclosures by default', () => {
    const { container } = render(<Questions />);
    expect(container.querySelectorAll('h3[id^="問題-"]')).toHaveLength(8);
    expect(container.querySelectorAll('details:not([open])')).toHaveLength(8);
});
