'use client';

import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, DIAGRAM_LABELS, type DiagramId } from './constants';

interface DiagramProps {
    id: DiagramId;
}

/**
 * DevNet Associate ガイド用のメモ化ダイアグラムコンポーネント。
 * 自然スケール（preserveNaturalScale）およびアクセシビリティラベルを保証します。
 */
export const Diagram = memo(function Diagram({ id }: DiagramProps) {
    const chart = DIAGRAMS[id];
    const label = DIAGRAM_LABELS[id];
    if (!chart) return null;

    return (
        <div id={id} className="mermaid-wrap">
            <MermaidDiagram
                chart={chart}
                ariaLabel={label}
                preserveNaturalScale
            />
        </div>
    );
});
