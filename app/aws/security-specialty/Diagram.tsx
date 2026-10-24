import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, MERMAID_CONFIG, type DiagramId } from './constants';

// 共通のdark初期化値（mainBkg等）を明示的に置換する。原本設定は変更しない。
const {primaryColor,primaryBorderColor,primaryTextColor,lineColor,background,secondaryColor}=MERMAID_CONFIG.themeVariables;
const renderConfig={...MERMAID_CONFIG,themeVariables:{...MERMAID_CONFIG.themeVariables,
    mainBkg:primaryColor,actorBkg:primaryColor,stateBkg:primaryColor,activationBkgColor:primaryColor,
    actorBorder:primaryBorderColor,stateBorder:primaryBorderColor,activationBorderColor:primaryBorderColor,
    actorTextColor:primaryTextColor,stateLabelColor:primaryTextColor,signalTextColor:primaryTextColor,labelTextColor:primaryTextColor,titleColor:primaryTextColor,
    actorLineColor:lineColor,signalColor:lineColor,labelBoxBkgColor:background,labelBoxBorderColor:primaryBorderColor,
    noteBkgColor:secondaryColor,noteTextColor:primaryTextColor,noteBorderColor:primaryBorderColor,
}};
const themeFrontmatter=`---\nconfig: ${JSON.stringify(renderConfig)}\n---\n`;

/** 原本のライト配色・配置設定と自然倍率を保持する図。 */
export const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    const accessibleLabel = `${label}（図${id.slice(5)}）`;
    if (!chart) return null;
    return <div className="mermaid-wrap" role="region" tabIndex={0} aria-label={accessibleLabel}>
        <MermaidDiagram chart={themeFrontmatter+chart} ariaLabel={accessibleLabel} theme="light" preserveChartTheme preserveNaturalScale={true} />
    </div>;
});
