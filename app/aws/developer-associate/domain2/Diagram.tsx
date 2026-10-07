'use client';
import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import sourceTheme from './mermaid-theme.json';
/** 原本の配置順と自然倍率を維持し、チェック操作による再描画を防ぐ図。 */
const SOURCE_THEME_DIRECTIVE = `%%{init: ${JSON.stringify({ ...sourceTheme, themeVariables: { ...sourceTheme.themeVariables, fontFamily: '"Noto Sans JP Variable","Noto Sans JP",sans-serif', fontSize: '14px' } })}}%%\n`;
export const Diagram = memo(function Diagram({ index, label }: { index: number; label: string }) {
    const chart = DIAGRAMS[index];
    if (!chart) return null;
    return <div className="diagram-wrap" data-diagram={index} tabIndex={0} role="region" aria-label={`${label}（図${index + 1}）`}>
        <MermaidDiagram chart={SOURCE_THEME_DIRECTIVE + chart} theme="light" preserveChartTheme={true} ariaLabel={label} preserveNaturalScale={true} />
    </div>;
});
