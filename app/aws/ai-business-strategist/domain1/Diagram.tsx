import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';

interface DiagramProps {
    id: DiagramId;
    label: string;
}

/**
 * AIB-C01 Domain 1 の Mermaid ダイアグラム表示用コンポーネント。
 * 親コンポーネントのスクロール等による再レンダリングで SVG が縮むのを防ぐため memo 化。
 */
export const Diagram = memo(function Diagram({ id, label }: DiagramProps) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;

    return (
        <div className="diagram" data-mermaid-id={id}>
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale={true} />
        </div>
    );
});
