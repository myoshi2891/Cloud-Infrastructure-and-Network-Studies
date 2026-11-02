'use client';

import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';

interface DiagramProps {
    id: string;
    label?: string;
}

/**
 * 原本 HTML (Ccnp-security-guide.html) に完全準拠したライトテーマ設定。
 * 淡いパステル調の円グラフ配色、インディゴ境界線、白背景カードを正確に再現します。
 */
const CCNP_SECURITY_THEME_DIRECTIVE = `%%{init: {
  'theme': 'base',
  'themeVariables': {
    'fontFamily': 'var(--font-sans), sans-serif',
    'fontSize': '16px',
    'background': '#FFFFFF',
    'primaryColor': '#EEF1F8',
    'primaryBorderColor': '#2E3F72',
    'primaryTextColor': '#161B26',
    'secondaryColor': '#FAF1DF',
    'secondaryBorderColor': '#B8802A',
    'secondaryTextColor': '#161B26',
    'tertiaryColor': '#EAF4EC',
    'tertiaryBorderColor': '#2F6B3D',
    'tertiaryTextColor': '#161B26',
    'lineColor': '#2E3F72',
    'textColor': '#161B26',
    'mainBkg': '#EEF1F8',
    'nodeBorder': '#2E3F72',
    'clusterBkg': '#F6F7F9',
    'clusterBorder': '#B8802A',
    'edgeLabelBackground': '#FFFFFF',
    'titleColor': '#161B26',
    'actorBkg': '#EEF1F8',
    'actorBorder': '#2E3F72',
    'actorTextColor': '#161B26',
    'actorLineColor': '#2E3F72',
    'signalColor': '#2E3F72',
    'signalTextColor': '#161B26',
    'labelBoxBkgColor': '#FAF1DF',
    'labelBoxBorderColor': '#B8802A',
    'labelTextColor': '#161B26',
    'noteBkgColor': '#FAF1DF',
    'noteBorderColor': '#B8802A',
    'noteTextColor': '#161B26',
    'activationBkgColor': '#EEF1F8',
    'activationBorderColor': '#2E3F72',
    'pie1': '#C9D3EA',
    'pie2': '#F1DDAE',
    'pie3': '#BFE0DB',
    'pie4': '#E8C7D6',
    'pie5': '#D9DEE8',
    'pie6': '#E3D8C3',
    'pie7': '#D3E3D0',
    'pieStrokeColor': '#FFFFFF',
    'pieOuterStrokeColor': '#FFFFFF',
    'pieSectionTextColor': '#161B26',
    'pieLegendTextColor': '#161B26',
    'pieTitleTextColor': '#161B26',
    'pieOpacity': '1',
    'pieSectionTextSize': '16px',
    'pieLegendTextSize': '16px',
    'pieTitleTextSize': '18px'
  },
  'flowchart': { 'useMaxWidth': false, 'htmlLabels': true, 'curve': 'basis', 'nodeSpacing': 40, 'rankSpacing': 45 },
  'sequence': { 'useMaxWidth': false, 'actorMargin': 90, 'width': 190, 'messageMargin': 38, 'boxMargin': 10 },
  'pie': { 'useMaxWidth': false }
}}%%`;

/**
 * CCNP Security ガイド用のメモ化ダイアグラムコンポーネント。
 * 原本準拠のライトテーマ、自然スケール（preserveNaturalScale）およびアクセシビリティラベルを保証します。
 */
export const Diagram = memo(function Diagram({ id, label }: DiagramProps) {
    const rawChart = DIAGRAMS[id];
    if (!rawChart) return null;

    const chart = `${CCNP_SECURITY_THEME_DIRECTIVE}\n${rawChart}`;
    const effectiveLabel = label || `図解 ${id}`;

    return (
        <div id={`diag-${id}`} className="diagram" data-testid="mermaid-diagram" aria-label={effectiveLabel}>
            <div className="mm">
                <MermaidDiagram
                    chart={chart}
                    ariaLabel={effectiveLabel}
                    preserveNaturalScale
                    preserveChartTheme
                    theme="light"
                />
            </div>
        </div>
    );
});
