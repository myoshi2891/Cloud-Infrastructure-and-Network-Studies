'use client';

import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, DIAGRAM_LABELS, type DiagramId } from './constants';

interface DiagramProps {
    id: DiagramId;
}

/**
 * 原本 HTML (Aws-soa-c03-guide.html) に完全準拠したライトテーマ設定。
 * ウォームペーパー調・白背景カード・インディゴ境界線を正確に再現します。
 */
const CLOUDOPS_THEME_DIRECTIVE = `%%{init: {
  'theme': 'base',
  'themeVariables': {
    'fontFamily': 'var(--font-body), sans-serif',
    'fontSize': '16px',
    'background': '#FFFFFF',
    'primaryColor': '#E9EDF8',
    'primaryBorderColor': '#2E3F72',
    'primaryTextColor': '#2A2620',
    'secondaryColor': '#F6ECD2',
    'tertiaryColor': '#F3EEE3',
    'lineColor': '#6B6154',
    'textColor': '#2A2620',
    'mainBkg': '#E9EDF8',
    'nodeBorder': '#2E3F72',
    'clusterBkg': '#FBF8F1',
    'clusterBorder': '#B9AD94',
    'edgeLabelBackground': '#FFFFFF',
    'titleColor': '#2A2620',
    'nodeTextColor': '#2A2620'
  },
  'flowchart': { 'useMaxWidth': false, 'htmlLabels': true, 'curve': 'basis', 'nodeSpacing': 50, 'rankSpacing': 50 }
}}%%`;

/**
 * AWS CloudOps ガイド用のメモ化ダイアグラムコンポーネント。
 * 原本準拠のライトテーマ、自然スケール（preserveNaturalScale）およびアクセシビリティラベルを保証します。
 */
export const Diagram = memo(function Diagram({ id }: DiagramProps) {
    const rawChart = DIAGRAMS[id];
    const label = DIAGRAM_LABELS[id];
    if (!rawChart) return null;

    const chart = `${CLOUDOPS_THEME_DIRECTIVE}\n${rawChart}`;

    return (
        <div className="diagram-card">
            <div id={id} className="mermaid-wrap">
                <MermaidDiagram
                    chart={chart}
                    ariaLabel={label}
                    preserveNaturalScale
                    theme="light"
                />
            </div>
        </div>
    );
});
