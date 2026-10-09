'use client';

import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, DIAGRAM_LABELS, type DiagramId } from './constants';

interface DiagramProps {
    id: DiagramId;
}

/**
 * 原本 HTML (Devnet-associate-guide.html) に完全準拠したライトテーマ設定。
 * 淡いパステル調の円グラフ配色、インディゴ境界線、白背景カードを正確に再現します。
 */
const DEVNET_THEME_DIRECTIVE = `%%{init: {
  'theme': 'base',
  'themeVariables': {
    'fontFamily': 'var(--font-sans), sans-serif',
    'fontSize': '16px',
    'background': '#FFFFFF',
    'primaryColor': '#EEF1F8',
    'primaryBorderColor': '#2E3F72',
    'primaryTextColor': '#161B26',
    'secondaryColor': '#FAF1DF',
    'tertiaryColor': '#EAF4EC',
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
    'actorLineColor': '#8A93A8',
    'signalColor': '#2E3F72',
    'signalTextColor': '#161B26',
    'labelBoxBkgColor': '#FAF1DF',
    'labelBoxBorderColor': '#B8802A',
    'labelTextColor': '#161B26',
    'loopTextColor': '#161B26',
    'noteBkgColor': '#FAF1DF',
    'noteBorderColor': '#B8802A',
    'noteTextColor': '#161B26',
    'activationBkgColor': '#EEF1F8',
    'sequenceNumberColor': '#F6F7F9',
    'pie1': '#C9D3EA',
    'pie2': '#F1DDAE',
    'pie3': '#BFE0DB',
    'pie4': '#E8C7D6',
    'pie5': '#D5DEC4',
    'pie6': '#D9D2E9',
    'pieStrokeColor': '#F6F7F9',
    'pieOuterStrokeColor': '#F6F7F9',
    'pieStrokeWidth': '2px',
    'pieOpacity': '1',
    'pieSectionTextColor': '#161B26',
    'pieLegendTextColor': '#161B26',
    'pieTitleTextColor': '#161B26',
    'git0': '#2E3F72',
    'git1': '#B8802A',
    'git2': '#1B6E6A',
    'git3': '#8C3A5C',
    'gitBranchLabel0': '#FFFFFF',
    'gitBranchLabel1': '#FFFFFF',
    'gitBranchLabel2': '#FFFFFF',
    'gitBranchLabel3': '#FFFFFF',
    'commitLabelColor': '#161B26',
    'commitLabelBackground': '#EEF1F8'
  },
  'flowchart': { 'useMaxWidth': false, 'htmlLabels': true, 'curve': 'basis' },
  'sequence': { 'useMaxWidth': false, 'actorMargin': 60, 'mirrorActors': true },
  'gitGraph': { 'useMaxWidth': false },
  'pie': { 'useMaxWidth': false }
}}%%`;

/**
 * DevNet Associate ガイド用のメモ化ダイアグラムコンポーネント。
 * 原本準拠のライトテーマ、自然スケール（preserveNaturalScale）およびアクセシビリティラベルを保証します。
 */
export const Diagram = memo(function Diagram({ id }: DiagramProps) {
    const rawChart = DIAGRAMS[id];
    const label = DIAGRAM_LABELS[id];
    if (!rawChart) return null;

    const chart = `${DEVNET_THEME_DIRECTIVE}\n${rawChart}`;

    return (
        <div id={id} className="mermaid-wrap">
            <MermaidDiagram
                chart={chart}
                ariaLabel={label}
                preserveNaturalScale
                preserveChartTheme
                theme="light"
            />
        </div>
    );
});
