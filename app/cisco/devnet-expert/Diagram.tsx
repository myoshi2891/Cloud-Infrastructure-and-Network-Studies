import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';
import sourceTheme from './mermaid-theme.json';

const frontmatter = `---\nconfig: ${JSON.stringify({
    ...sourceTheme,
    // Mermaid merges chart settings into the shared initialization. Reset the
    // derived colors explicitly so shared dark defaults cannot leak into nodes.
    themeVariables: {
        ...sourceTheme.themeVariables,
        mainBkg: sourceTheme.themeVariables.primaryColor,
        nodeBorder: sourceTheme.themeVariables.primaryBorderColor,
        titleColor: sourceTheme.themeVariables.textColor,
    },
})}\n---\n`;

/** Render an original diagram at natural scale using the shared rendering pipeline. */
export const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return <MermaidDiagram chart={frontmatter + chart} ariaLabel={label} theme="light" preserveChartTheme preserveNaturalScale />;
});
