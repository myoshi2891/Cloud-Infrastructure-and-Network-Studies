import { readFileSync } from 'node:fs';
import { render } from '@testing-library/react';
import { JSDOM } from 'jsdom';
import { describe, expect, it, vi } from 'vitest';
import Page from '@/app/aws/solutions-architect-professional/domain1/page';
import sourceTheme from '@/app/aws/solutions-architect-professional/domain1/mermaid-theme.json';
import { snapshotGuidePart } from '@/scripts/guide-fidelity-extraction.mjs';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

const {
    primaryColor: p,
    primaryBorderColor: b,
    primaryTextColor: t,
    lineColor: l,
    background: bg,
    secondaryColor: s,
} = sourceTheme.themeVariables;
const renderConfig = {
    ...sourceTheme,
    themeVariables: {
        ...sourceTheme.themeVariables,
        fontFamily: '"Noto Sans JP Variable","Noto Sans JP",sans-serif',
        mainBkg: p,
        actorBkg: p,
        stateBkg: p,
        activationBkgColor: p,
        actorBorder: b,
        stateBorder: b,
        activationBorderColor: b,
        actorTextColor: t,
        stateLabelColor: t,
        signalTextColor: t,
        labelTextColor: t,
        titleColor: t,
        actorLineColor: l,
        signalColor: l,
        labelBoxBkgColor: bg,
        labelBoxBorderColor: b,
        noteBkgColor: s,
        noteTextColor: t,
        noteBorderColor: b,
    },
};
const prefix = `---\nconfig: ${JSON.stringify(renderConfig)}\n---\n`;

const html = readFileSync('Aws-sap-c02-domain1 organizational-complexity-guide.html', 'utf8');
const sourceMain = new JSDOM(html).window.document.querySelector('main')!;
const rawSnapshot = snapshotGuidePart(sourceMain);
const expectedSnapshot = {
    ...rawSnapshot,
    diagrams: rawSnapshot.diagrams.map((chart) => prefix + chart),
};

describe('SAP-C02 Domain 1 Full DOM Fidelity & Mutation Detection', () => {
    it('matches the source HTML <main> snapshot across text, headings, tables, lists (with depth), links, inline elements, diagrams, codes, and placement', () => {
        const { container } = render(<Page />);
        const actualMain = container.querySelector('main')!;
        const actualSnapshot = snapshotGuidePart(actualMain);

        expect(actualSnapshot.headings).toEqual(expectedSnapshot.headings);
        expect(actualSnapshot.tables).toEqual(expectedSnapshot.tables);
        expect(actualSnapshot.lists).toEqual(expectedSnapshot.lists);
        expect(actualSnapshot.links).toEqual(expectedSnapshot.links);
        expect(actualSnapshot.inline).toEqual(expectedSnapshot.inline);
        expect(actualSnapshot.body).toEqual(expectedSnapshot.body);
        expect(actualSnapshot.diagrams).toEqual(expectedSnapshot.diagrams);
        expect(actualSnapshot.codes).toEqual(expectedSnapshot.codes);
        expect(actualSnapshot.placement).toEqual(expectedSnapshot.placement);
        expect(actualSnapshot.text).toBe(expectedSnapshot.text);
    });

    it('assigns unique, non-empty accessible labels to all 69 scrollable regions (49 tables + 19 diagrams + 1 code block)', () => {
        const { container } = render(<Page />);
        const regions = [...container.querySelectorAll('main [role="region"]')];
        expect(regions).toHaveLength(69);
        const labels = regions.map((region) => {
            expect(region).toHaveAttribute('tabindex', '0');
            const label = region.getAttribute('aria-label')?.trim() ?? '';
            expect(label).not.toBe('');
            return label;
        });
        expect(new Set(labels).size).toBe(regions.length);
    });

    it.each([
        ['p', 'text'],
        ['tbody tr', 'tables'],
        ['li', 'lists'],
        ['a[href^="http"]', 'links'],
        ['.mermaid-wrap', 'diagrams'],
        ['.code-line', 'codes'],
        ['.quiz-answer-body p', 'text'],
    ] as const)('detects source loss when %s is removed (%s)', (selector, key) => {
        const { container } = render(<Page />);
        const original = container.querySelector('main')!;
        expect(snapshotGuidePart(original)[key]).toEqual(expectedSnapshot[key]);
        const clone = original.cloneNode(true) as HTMLElement;
        const target = clone.querySelector(selector);
        expect(target).not.toBeNull();
        target!.remove();
        expect(snapshotGuidePart(clone)[key]).not.toEqual(expectedSnapshot[key]);
    });
});
