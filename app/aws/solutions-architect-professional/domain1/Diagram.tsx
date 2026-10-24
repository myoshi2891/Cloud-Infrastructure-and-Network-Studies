import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';
import sourceTheme from './mermaid-theme.json';

const {
    primaryColor: p,
    primaryBorderColor: b,
    primaryTextColor: t,
    lineColor: l,
    background: bg,
    secondaryColor: s,
} = sourceTheme.themeVariables;

const renderConfig = {
    ...sourceTheme,
    themeVariables: {
        ...sourceTheme.themeVariables,
        fontFamily: '"Noto Sans JP Variable","Noto Sans JP",sans-serif',
        mainBkg: p,
        actorBkg: p,
        stateBkg: p,
        activationBkgColor: p,
        actorBorder: b,
        stateBorder: b,
        activationBorderColor: b,
        actorTextColor: t,
        stateLabelColor: t,
        signalTextColor: t,
        labelTextColor: t,
        titleColor: t,
        actorLineColor: l,
        signalColor: l,
        labelBoxBkgColor: bg,
        labelBoxBorderColor: b,
        noteBkgColor: s,
        noteTextColor: t,
        noteBorderColor: b,
    },
};

const SOURCE_THEME_FRONTMATTER = `---\nconfig: ${JSON.stringify(renderConfig)}\n---\n`;

type DiagramProps = {
    id: DiagramId;
    label: string;
};

/**
 * SAP-C02 Domain 1 の Mermaid 図を描画するコンポーネント。
 * 原本のライト配色・フォント・自然スケールを保持し、再レンダリング時のチラつきを防ぐためメモ化。
 */
export const Diagram = memo(function Diagram({ id, label }: DiagramProps) {
    const chart = DIAGRAMS[id];
    const accessibleLabel = `${label}（図${id.slice(5)}）`;
    if (!chart) return null;
    return (
        <div
            className="mermaid-wrap"
            role="region"
            tabIndex={0}
            aria-label={accessibleLabel}
            data-mermaid-id={id}
            data-preserve-natural-scale="true"
        >
            <MermaidDiagram
                chart={SOURCE_THEME_FRONTMATTER + chart}
                theme="light"
                preserveChartTheme={true}
                ariaLabel={accessibleLabel}
                preserveNaturalScale={true}
            />
        </div>
    );
});
