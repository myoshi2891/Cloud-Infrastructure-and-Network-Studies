import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, MERMAID_CONFIG, type DiagramId } from './constants';

const init = `%%{init: ${JSON.stringify(MERMAID_CONFIG)}}%%`;

/** 原本のライト配色・配置設定と自然倍率を保持する図。 */
export const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return <div className="mermaid-wrap" role="region" tabIndex={0} aria-label={label}>
        <MermaidDiagram chart={`${init}\n${chart}`} ariaLabel={label} theme="light" preserveChartTheme preserveNaturalScale={true} />
    </div>;
});
