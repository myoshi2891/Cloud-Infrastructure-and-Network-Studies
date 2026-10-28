'use client';
import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';
import theme from './mermaid-theme.json';
const prefix = `---\nconfig: ${JSON.stringify({...theme,themeVariables:{...theme.themeVariables,fontFamily:'"Noto Sans JP Variable",sans-serif'}})}\n---\n`;
/** 原本のテーマ・DSL・自然倍率を保持する。 */
export const Diagram = memo(function Diagram({id,label}:{id:DiagramId;label:string}) {
const chart = DIAGRAMS[id]; if(!chart) return null;
return <div className="diagram-wrap" data-diagram-id={id} tabIndex={0} role="region" aria-label={label}><MermaidDiagram chart={prefix+chart} theme="light" preserveChartTheme={true} ariaLabel={label} preserveNaturalScale={true}/></div>;
});
