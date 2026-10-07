import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';
import sourceTheme from './mermaid-theme.json';

const SOURCE_THEME_DIRECTIVE = `%%{init: ${JSON.stringify({
    ...sourceTheme,
    themeVariables: {
        ...sourceTheme.themeVariables,
        fontFamily: '"Noto Sans JP Variable","Noto Sans JP",sans-serif',
        fontSize: '14px',
    },
})}}%%\n`;

/** 原本の図配色を保ち、目次の更新で描画倍率を変えない。 */
export const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return <div className="diagram-wrap" data-diagram-id={id} role="region" tabIndex={0} aria-label={label}>
        <MermaidDiagram chart={SOURCE_THEME_DIRECTIVE + chart} theme="light" preserveChartTheme={true} ariaLabel={label} preserveNaturalScale={true} />
    </div>;
});
