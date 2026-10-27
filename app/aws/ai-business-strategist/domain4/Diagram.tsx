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

/** スクリーンリーダー向けに、図番号と各図が示す関係性を要約した一意のラベル */
const DEFAULT_LABELS: Record<DiagramId, string> = {
    d0: '図 1: Domain 4 の全体像として、4.1 現在地（準備度と成熟度）、4.2 土台（データと基盤）、4.3 人と文化（変革リーダーシップ）、4.4 拡大（パイロットから全社展開）が循環する流れ',
    d1: '図 2: AI 変革の開始にあたり、リーダー合意・データ品質・組織文化・技術基盤・ガバナンスから成熟度モデルで現在地を確認し能力ギャップと優先順位を決める流れ',
    d2: '図 3: Level 1 Envision から Level 2 Experiment、Level 3 Launch、Level 4 Scale へと進む生成 AI 成熟度モデルの 4 段階',
    d3: '図 4: 特定したギャップに対し、戦略目標への直結性と現在の成熟度で着手可能かを判定し、最優先投資・前提能力整備・後回しに分岐する判断フロー',
    d4: '図 5: 高品質なデータから AI モデルの調整、予測・生成結果、業務成果、新しいデータと学びへと循環する AI フライホイール',
    d5: '図 6: ユースケース候補に対し、データ特定・品質鮮度・安全なアクセスを順次判定し、棚卸し・品質改善・サイロ解消を経てパイロットへ着手するデータ準備度フロー',
    d6: '図 7: 経営層スポンサーシップから AI チャンピオン、部門横断チーム、透明な対話、文化介入、リテラシー向上を経て人の役割を監督・協働へ移行させる変革の道筋',
    d7: '図 8: 手作業中心の業務から、AI による支援、人間の確認承認、AI 実行と人間の監視、例外・高リスクのエスカレーションへと進む人の役割の移行段階',
    d8: '図 9: Envision（機会発見）から Experiment（小さく検証）、Launch（本番投入）、Scale（全社拡大と再利用）へと反復し学びを次の用途へ循環させるアプローチ',
    d9: '図 10: AI COE がガイダンス、再利用可能な能力、教育、倫理・ガバナンス支援を通じて事業部門と定期的に連携する支援体制',
    d10: '図 11: Value（解く価値）、Visualize（成功の測定）、Validate（現実条件での検証）、Verify（本番での大規模運用）、Venture（資金確保）の 5 つの V によるスケール評価',
    d11: '図 12: パイロット成功後、本番受け入れ基準・運用体制・ガバナンス監視・単位コストを判定し、ギャップ解消を経て本番へ移行する判定フロー',
};

/**
 * AIB-C01 Domain 4 の Mermaid ダイアグラム表示用コンポーネント。
 * 原本ライト配色（淡色ノード・自然スケール）を保持し、再レンダリングによる縮小を防ぐため memo 化。
 */
export const Diagram = memo(function Diagram({ id, label }: DiagramProps) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;

    const ariaLabel = label || DEFAULT_LABELS[id] || `図 ${id}`;
    const descriptionId = `aib-domain4-diagram-desc-${id}`;

    return (
        <figure className="diagram-card">
            <div className="diagram-wrap">
                <div
                    className="diagram-canvas"
                    data-diagram-id={id}
                    aria-label={ariaLabel}
                    data-preserve-natural-scale="true"
                >
                    <MermaidDiagram
                        chart={SOURCE_THEME_DIRECTIVE + chart}
                        theme="light"
                        preserveChartTheme={true}
                        ariaLabel={ariaLabel}
                        ariaDescribedBy={descriptionId}
                        preserveNaturalScale={true}
                        focusable={true}
                    />
                </div>
            </div>
            {/* 図の関係を支援技術へ伝える説明。本文抽出の対象外にするため p ではなく span を使う */}
            <span id={descriptionId} className="sr-only">
                {ariaLabel}
            </span>
        </figure>
    );
});
