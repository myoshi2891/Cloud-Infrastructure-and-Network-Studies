import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, DIAGRAM_LABELS, type DiagramId } from './constants';
import sourceTheme from './mermaid-theme.json';

const SOURCE_THEME_DIRECTIVE = `%%{init: ${JSON.stringify({
    ...sourceTheme,
    themeVariables: {
        ...sourceTheme.themeVariables,
        fontFamily: '"Noto Sans JP Variable","Noto Sans JP",sans-serif',
    },
})}}%%\n`;

interface DiagramProps {
    id: DiagramId;
    label?: string;
}

/**
 * AIB-C01 完全ガイドの Mermaid ダイアグラム表示用コンポーネント。
 * 原本ライト配色（淡紫ノード・インディゴ枠線・白背景）を保持し、再レンダリングによる縮小を防ぐため memo 化。
 */
export const Diagram = memo(function Diagram({ id, label }: DiagramProps) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;

    const ariaLabel = label || DIAGRAM_LABELS[id] || `図 ${id}`;

    return (
        <figure
            className="diagram"
            data-mermaid-id={id}
            aria-label={ariaLabel}
            data-preserve-natural-scale="true"
        >
            <MermaidDiagram
                chart={SOURCE_THEME_DIRECTIVE + chart}
                theme="light"
                preserveChartTheme={true}
                ariaLabel={ariaLabel}
                preserveNaturalScale={true}
            />
        </figure>
    );
});
