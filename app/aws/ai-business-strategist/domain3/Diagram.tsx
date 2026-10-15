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

/** スクリーンリーダー向けに、図番号と各図が示す関係性を要約したラベル */
const DEFAULT_LABELS: Record<DiagramId, string> = {
    d0: '図 1: Domain 3 (24%) が Task 3.1 責任ある AI、3.2 ガバナンスと規制遵守、3.3 リスク軽減に分かれ、各 Task が 4 つの Skill を持つ構成',
    d1: '図 2: 事業目標と原則が衝突した際、影響の大きさで原則優先か軽減策付きで進めるかを分け、判断を記録して段階展開・監視し、許容水準超過なら縮小や停止へ進む判断フロー',
    d2: '図 3: 企画・設計・開発評価・展開・運用の 5 段階に、影響評価やデータ権利、公平性評価、承認ゲート、ドリフト監視を対応づけ、運用で検知した問題を企画へ戻すライフサイクル',
    d3: '図 4: AI の出力をガードレール抵触、高影響・取消不能、根拠の弱さの順に判定し、遮断・人間の承認・エスカレーション・自動提供に振り分け、事後分析でルールを改善するフロー',
    d4: '図 5: 経営層の下に AI ガバナンス委員会を置き、法務、セキュリティ、事業部門、技術、人事の各部門が連携して個別ユースケースのプロダクトオーナーの説明責任を支える体制',
    d5: '図 6: AI 利用業務の棚卸しから法令特定、要件のひもづけ、ギャップ評価、是正計画、証跡保存、定期見直しへ進み、再び棚卸しへ戻る規制遵守サイクル',
    d6: '図 7: ユースケースを影響・自律度・データ・誤りのコスト・規制で評価してリスクティアを高・中・低に分け、それぞれフルレビュー・標準レビュー・簡易チェックを適用し継続的に再分類する流れ',
    d7: '図 8: 本番運用を監視し、しきい値超過時にアラート、原因調査、是正、再評価と承認を経て運用へ戻るリスク統制ループ',
    d8: '図 9: データ収集、ラベル付け、モデル学習、評価、展開、運用フィードバックの各段階でバイアスが入り込み、Bias Drift の監視で収集段階へ戻るライフサイクル',
    d9: '図 10: 用途を絞る設計、RAG による根拠づけ、出力チェック、人間の監督、継続監視の 5 層で幻覚と品質劣化を防ぎ、是正と再評価で設計へ戻る多層防御',
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
