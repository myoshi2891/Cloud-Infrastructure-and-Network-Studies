'use client';
import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import theme from './render-theme.json';
const config = '---\nconfig: ' + JSON.stringify(theme) + '\n---\n';
/** 原本の配色・自然倍率で図を描画する。 */
export const Diagram = memo(function Diagram({ id, label }: {
    id: string;
    label: string;
}) { const chart = DIAGRAMS[id]; if (!chart)
    throw new Error('Missing diagram: ' + id); return <div className="mermaid-wrap">
<MermaidDiagram chart={config + chart} theme="light" preserveChartTheme ariaLabel={label} preserveNaturalScale/>
</div>; });
