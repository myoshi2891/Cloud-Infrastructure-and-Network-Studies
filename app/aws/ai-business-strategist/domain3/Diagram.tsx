import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';
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

const DEFAULT_LABELS: Record<DiagramId, string> = {
    d0: '図 1',
    d1: '図 2',
    d2: '図 3',
    d3: '図 4',
    d4: '図 5',
    d5: '図 6',
    d6: '図 7',
    d7: '図 8',
    d8: '図 9',
    d9: '図 10',
};

/**
 * AIB-C01 Domain 3 の Mermaid ダイアグラム表示用コンポーネント。
 * 原本ライト配色（淡色ノード・自然スケール）を保持し、再レンダリングによる縮小を防ぐため memo 化。
 */
export const Diagram = memo(function Diagram({ id, label }: DiagramProps) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;

    const ariaLabel = label || DEFAULT_LABELS[id] || `図 ${id}`;

    return (
        <div className="diagram-card">
            <div
                className="diagram-canvas"
                data-diagram-id={id}
                role="img"
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
            </div>
        </div>
    );
});
