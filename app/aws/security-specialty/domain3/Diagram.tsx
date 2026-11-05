import { memo, useId } from 'react';
import sourceTheme from './mermaid-theme.json';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, DIAGRAM_DESCRIPTIONS, type DiagramId } from './constants';

const { primaryColor, primaryBorderColor, primaryTextColor, lineColor, background, secondaryColor } =
    sourceTheme.themeVariables;

const renderConfig = {
    ...sourceTheme,
    themeVariables: {
        ...sourceTheme.themeVariables,
        mainBkg: primaryColor,
        actorBkg: primaryColor,
        stateBkg: primaryColor,
        activationBkgColor: primaryColor,
        actorBorder: primaryBorderColor,
        stateBorder: primaryBorderColor,
        activationBorderColor: primaryBorderColor,
        actorTextColor: primaryTextColor,
        stateLabelColor: primaryTextColor,
        signalTextColor: primaryTextColor,
        labelTextColor: primaryTextColor,
        titleColor: primaryTextColor,
        actorLineColor: lineColor,
        signalColor: lineColor,
        labelBoxBkgColor: background,
        labelBoxBorderColor: primaryBorderColor,
        noteBkgColor: secondaryColor,
        noteTextColor: primaryTextColor,
        noteBorderColor: primaryBorderColor,
    },
};

const themeFrontmatter = `---\nconfig: ${JSON.stringify(renderConfig)}\n---\n`;

/**
 * 原本のライト配色・配置設定と自然倍率を保持する図。
 */
export const Diagram = memo(function Diagram({
    id,
    label,
}: {
    id: DiagramId;
    label: string;
}) {
    const descriptionId = useId();
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap" role="region" tabIndex={0} aria-label={label}>
            <MermaidDiagram
                chart={themeFrontmatter + chart}
                ariaLabel={label}
                ariaDescribedBy={descriptionId}
                theme="light"
                preserveChartTheme
                preserveNaturalScale={true}
            />
            <span id={descriptionId} className="sr-only">
                {DIAGRAM_DESCRIPTIONS[id]}
            </span>
        </div>
    );
});
