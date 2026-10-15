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

interface DiagramA11y {
    /** 図の内容を表す名前（aria-label） */
    label: string;
    /** フローチャートの関係を文章化した説明（aria-describedby） */
    description: string;
}

const DIAGRAM_A11Y: Record<DiagramId, DiagramA11y> = {
    d0: {
        label: '図 1: Domain 2 の 3 つのタスクと 14 のスキルの構成',
        description:
            'Domain 2 AI 戦略と価値創出は 3 つのタスクに分かれる。Task 2.1 戦略をビジネス目標に整合させるは、2.1.1 ユースケースと成果の対応づけ、2.1.2 Build Buy Partner、2.1.3 優先順位付けと拡大停止の判断、2.1.4 AI を使わない判断、2.1.5 移行時の検討事項を含む。Task 2.2 価値を測定し実証するは、2.2.1 KPI、2.2.2 ベースライン、2.2.3 ROI、2.2.4 先行指標、2.2.5 コスト管理を含む。Task 2.3 競争優位のために位置づけるは、2.3.1 競争環境の評価、2.3.2 ビジネスモデル変革、2.3.3 持続的な競争優位、2.3.4 投資水準の決定を含む。',
    },
    d1: {
        label: '図 2: Domain 2 で考える問いの流れ',
        description:
            '何の課題を解くか、どう調達するか、どれを先にやるか、本当に AI が必要か、どう測るか、いくら使いどう守るか、競争上どう位置づけるか、の順に問いを進める。',
    },
    d2: {
        label: '図 3: Task 2.1 のスキルをつなぐ意思決定の流れ',
        description:
            'ビジネス目標から 2.1.1 でユースケースを見つけて成果に対応づけ、2.1.4 で AI が本当に必要かを確認する。不要なら別の解決策を採用する。必要なら 2.1.2 で作る、買う、組むを決め、2.1.3 で優先順位をつけ、拡大、一時停止、終了を判断し、2.1.5 で移行を計画して実行する。',
    },
    d3: {
        label: '図 4: ビジネス課題からユースケース案を導く流れ',
        description:
            'ビジネス課題から、達成したい成果と指標、必要な AI の能力、使えるデータ、ユースケース案の順に整理し、優先順位付けへ進む。',
    },
    d4: {
        label: '図 5: Build、Buy、Partner の判断フロー',
        description:
            'ユースケースが決まったら、一般的な課題で既製品で足りるかを問う。はいなら Buy として既製品や SaaS を検討する。いいえなら差別化の源泉か、独自データを活かせるかを問い、いいえなら Buy か Partner を検討する。はいなら社内に人材と時間があるかを問い、あれば Build で自社開発、なければ Partner と共同開発する。いずれも最後に規制、予算、ベンダー提案で最終確認する。',
    },
    d5: {
        label: '図 6: 節目のレビューでの拡大、一時停止、終了の判断フロー',
        description:
            '節目のレビューで目標指標を達成したかを問う。達成していれば、拡大しても採算と体制が持つかを問い、持つなら拡大し、持たないなら一時停止して体制とコストを見直す。未達なら原因を解決できるかを問い、できるなら一時停止して改善後に再評価し、できないなら終了して学びを記録する。',
    },
    d6: {
        label: '図 7: AI を使うべきでない場面を見分ける判断フロー',
        description:
            '解きたい課題について、決まったルールで書けるならルールベース自動化を採用する。書けない場合、十分な品質のデータがなければまずデータ整備やプロセス改善を行う。データがあっても誤りの許容度が低ければ人の判断を中心にし AI は補助に限定する。許容度が高くても費用に見合う価値がなければ導入を見送り、価値があれば AI の活用を進める。',
    },
    d7: {
        label: '図 8: AI ソリューションへの段階的な移行の流れ',
        description:
            '現状の評価とベースライン取得、移行計画とリスクの洗い出し、小規模での試験導入、新旧の並行運用と比較、基準を満たしたら段階的に切り替え、旧環境を停止して効果を検証、の順に進める。',
    },
    d8: {
        label: '図 9: Task 2.2 の価値測定のサイクル',
        description:
            '2.2.1 で KPI を決め、2.2.2 で導入前のベースラインを取り、導入して測定する。2.2.4 の先行指標で早めに軌道を確認し、2.2.3 で ROI を算出し、2.2.5 でコストを管理、最適化して、拡大、改善、終了の判断へ進む。',
    },
    d9: {
        label: '図 10: ビジネス目標から KPI を設定する流れ',
        description:
            'ビジネス目標から期待する成果を定め、有形の KPI と無形の KPI に分ける。両方に目標値と期限を設定し、担当者とデータの取得方法を決める。',
    },
    d10: {
        label: '図 11: ベースラインを取る手順',
        description:
            '測る KPI を決め、現在の値を測り、定義と計測方法を文書化する。季節や繁閑の影響を考慮して期間を決め、導入後も同じ方法で測り、その差を効果として評価する。',
    },
    d11: {
        label: '図 12: ROI を算出する手順',
        description:
            '便益を洗い出して金額に換算し実現率を反映する流れと、コストを洗い出して初期費用と運用費を分けて集計する流れが、期間ごとの純便益の計算で合流する。そこから ROI と回収期間を算出し、感度分析で前提を変えて確認する。',
    },
    d12: {
        label: '図 13: 先行指標から成果までのつながり',
        description:
            '教育と周知が利用率の上昇につながり、作業時間の短縮、コスト削減と生産性の向上を経て ROI の改善に至る。左側の教育と利用率が先行指標、右側のコスト削減と ROI が遅行指標。',
    },
    d13: {
        label: '図 14: コスト管理のサイクル',
        description:
            'Pricing Calculator で事前に見積もり、予算とアラートを設定し、利用開始時にタグで費用を配分する。Cost Explorer で実績を分析し、見積もりや予算と乖離があれば原因を調べて最適化を実施して見積もりに戻る。乖離がなければ継続して監視し、再び実績を分析する。',
    },
    d14: {
        label: '図 15: Task 2.3 のスキルの流れ',
        description:
            '2.3.1 で競争環境を見て、2.3.2 でビジネスモデル変革の機会を探り、2.3.3 で持続する優位の源泉を築き、2.3.4 で投資の水準を決める。',
    },
    d15: {
        label: '図 16: 競争環境を評価して投資の方向を決める流れ',
        description:
            '競合と業界の AI 活用を調べ、顧客の期待の変化を把握し、自社の強みと使える資産を整理して、差が生まれる領域を特定する。優位を築ける領域なら攻めの投資を、遅れている領域なら最低限の水準に追いつく投資を検討する。',
    },
    d16: {
        label: '図 17: ビジネスモデル変革の機会を探る流れ',
        description:
            '既存事業の価値提供を分解し、AI で変えられる箇所を探す。効率化にとどまるなら業務改善として実施し ROI で評価する。新しい価値を生むなら新サービスや収益モデルを構想し、小さく検証して市場の反応を見て、有望なら投資を拡大する。',
    },
    d17: {
        label: '図 18: 持続的な競争優位を生む循環',
        description:
            'AI を業務で使うと利用データと成果が蓄積し、評価と改善を繰り返すことで品質と体験が向上し、顧客と利用者が増え、さらに AI の利用が進むという循環になる。',
    },
    d18: {
        label: '図 19: AI への投資水準を決める判断フロー',
        description:
            '業界の成熟度と競争動向を評価する。競合が先行し顧客の期待が変化していれば、積極的に投資し優先領域に集中する。そうでなくても AI で市場が変わる兆しがあれば、段階的に投資し実験と学習を重視する。兆しがなければ小規模に維持して動向を監視する。いずれもステージゲートで見直す。',
    },
    d19: {
        label: '図 20: Domain 2 全体の意思決定パターン',
        description:
            'ビジネス課題と目標からユースケースと成果を定義し、AI が適切かを問う。適切でなければ非 AI の解決策を採用する。適切なら Build Buy Partner を決定し、価値と実現可能性などで優先順位をつけ、KPI とベースラインを設定する。段階的に導入して先行指標を確認し、ROI とコストを評価する。目標を達成していれば拡大して競争優位へつなげ、改善の余地があれば一時停止して改善し段階的導入に戻り、見込みがなければ終了して学びを活かす。',
    },
};

/**
 * AIB-C01 Domain 2 の Mermaid ダイアグラム表示用コンポーネント。
 * 原本ライト配色（淡色ノード・自然スケール）を保持し、再レンダリングによる縮小を防ぐため memo 化。
 */
export const Diagram = memo(function Diagram({ id, label }: DiagramProps) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;

    const a11y = DIAGRAM_A11Y[id];
    const ariaLabel = label || a11y.label;
    const descriptionId = `aib-domain2-diagram-desc-${id}`;

    return (
        <div className="diagram-card">
            <div
                className="diagram-canvas"
                data-diagram-id={id}
                role="img"
                aria-label={ariaLabel}
                aria-describedby={descriptionId}
                data-preserve-natural-scale="true"
            >
                <MermaidDiagram
                    chart={SOURCE_THEME_DIRECTIVE + chart}
                    theme="light"
                    preserveChartTheme={true}
                    ariaLabel={ariaLabel}
                    preserveNaturalScale={true}
                    focusable={true}
                />
            </div>
            {/* 図の関係を支援技術へ伝える説明。本文抽出の対象外にするため p ではなく span を使う */}
            <span id={descriptionId} className="sr-only">
                {a11y.description}
            </span>
        </div>
    );
});
