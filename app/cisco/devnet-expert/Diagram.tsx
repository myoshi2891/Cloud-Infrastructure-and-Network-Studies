import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';

const frontmatter = `---\nconfig: ${JSON.stringify({
    flowchart: { useMaxWidth: false, htmlLabels: true, nodeSpacing: 45, rankSpacing: 45 },
    sequence: { useMaxWidth: false }, pie: { useMaxWidth: false },
})}\n---\n`;

/** Render an original diagram at natural scale using the shared rendering pipeline. */
export const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return <MermaidDiagram chart={frontmatter + chart} ariaLabel={label} preserveNaturalScale />;
});
