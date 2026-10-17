import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';

/** 自然倍率を維持し、スクロール連動による図の再描画を防ぐ。 */
export const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return <div className="mermaid-wrap" role="region" tabIndex={0} aria-label={label}><MermaidDiagram chart={chart} ariaLabel={label} theme="light" preserveNaturalScale={true} /></div>;
});
