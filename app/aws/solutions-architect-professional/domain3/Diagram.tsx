'use client';
import { memo, useId } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import { DIAGRAM_DESCRIPTIONS } from './diagram-descriptions';
import theme from './render-theme.json';
const config = '---\nconfig: ' + JSON.stringify(theme) + '\n---\n';
/** 原本の配色・自然倍率で図を描画し、図の構成と流れを説明するテキスト代替を関連付ける。 */
export const Diagram = memo(function Diagram({ id, label }: {
    id: string;
    label: string;
}) { const descriptionId = useId(); const chart = DIAGRAMS[id]; const description = DIAGRAM_DESCRIPTIONS[id]; if (!chart)
    throw new Error('Missing diagram: ' + id); if (!description)
    throw new Error('Missing diagram description: ' + id); return <div className="mermaid-wrap">
<MermaidDiagram chart={config + chart} theme="light" preserveChartTheme ariaLabel={label} ariaDescribedBy={descriptionId} preserveNaturalScale focusable/>
<span id={descriptionId} className="sr-only">
{description}
</span>
</div>; });
