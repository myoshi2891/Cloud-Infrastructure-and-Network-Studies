'use client';
import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';
import sourceTheme from './mermaid-theme.json';
const SOURCE_THEME_FRONTMATTER = `---\nconfig: ${JSON.stringify({ ...sourceTheme, themeVariables: { ...sourceTheme.themeVariables, fontFamily: '\"Noto Sans JP Variable\",\"Noto Sans JP\",sans-serif', fontSize: '14px' } })}\n---\n`;
/** 原本のDSL・淡色ノード・自然倍率を保持する図。 */
export const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return <div className="diagram-wrap" data-diagram-id={id} tabIndex={0} role="region" aria-label={label}>
        <MermaidDiagram chart={SOURCE_THEME_FRONTMATTER + chart} theme="light" preserveChartTheme={true} ariaLabel={label} preserveNaturalScale={true} />
    </div>;
});
