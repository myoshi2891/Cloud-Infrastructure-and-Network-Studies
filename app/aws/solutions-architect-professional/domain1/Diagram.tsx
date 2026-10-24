import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';
import sourceTheme from './mermaid-theme.json';

const SOURCE_THEME_FRONTMATTER = `---\nconfig: ${JSON.stringify({
    ...sourceTheme,
    themeVariables: {
        ...sourceTheme.themeVariables,
        fontFamily: '"Noto Sans JP Variable","Noto Sans JP",sans-serif',
    },
})}\n---\n`;

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
    if (!chart) return null;
    return (
        <div
            className="diagram"
            data-mermaid-id={id}
            aria-label={label}
            data-preserve-natural-scale="true"
        >
            <MermaidDiagram
                chart={SOURCE_THEME_FRONTMATTER + chart}
                theme="light"
                preserveChartTheme={true}
                ariaLabel={label}
                preserveNaturalScale={true}
            />
        </div>
    );
});
