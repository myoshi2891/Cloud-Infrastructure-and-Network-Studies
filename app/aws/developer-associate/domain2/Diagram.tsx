'use client';
import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
/** 原本の配置順と自然倍率を維持し、チェック操作による再描画を防ぐ図。 */
export const Diagram = memo(function Diagram({ index, label }: { index: number; label: string }) {
    const chart = DIAGRAMS[index];
    if (!chart) return null;
    return <div className="diagram-wrap" data-diagram={index} tabIndex={0} role="region" aria-label={label}>
        <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale={true} />
    </div>;
});
