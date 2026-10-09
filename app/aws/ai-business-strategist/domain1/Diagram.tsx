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
    d0: '図 1 Domain 1 の構造を示す図',
    d1: '図 2 学習から予測までの流れを示す図',
    d2: '図 3 AI・ML・ディープラーニング・生成 AI の関係を示す図',
    d3: '図 4 構造化データと非構造化データの活用を示す図',
    d4: '図 5 データ品質が成果に効く流れを示す図',
    d5: '図 6 学習の基本サイクルを示す図',
    d6: '図 7 ISO/IEC 規格の体系を示す図',
    d7: '図 8 ルールベース自動化と AI の判断フローを示す図',
    d8: '図 9 エージェントの知覚・推論・行動ループを示す図',
    d9: '図 10 オーケストレーション戦略の構成を示す図',
    d10: '図 11 監視と是正のループを示す図',
    d11: '図 12 新しい AI ツールの受付フローを示す図',
    d12: '図 13 プロンプト改善のサイクルを示す図',
    d13: '図 14 コンテキストウィンドウに入る要素を示す図',
    d14: '図 15 RAG の流れを示す図',
    d15: '図 16 モデル適応の判断フローを示す図',
};

/**
 * AIB-C01 Domain 1 の Mermaid ダイアグラム表示用コンポーネント。
 * 原本ライト配色（薄紫ノード・インディゴ枠線・白背景）を保持し、再レンダリングによる縮小を防ぐため memo 化。
 */
export const Diagram = memo(function Diagram({ id, label }: DiagramProps) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;

    const ariaLabel = label || DEFAULT_LABELS[id] || `図 ${id}`;

    return (
        <div
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
        </div>
    );
});
