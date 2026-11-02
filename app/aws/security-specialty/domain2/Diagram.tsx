import { memo, useId } from 'react';
import sourceTheme from './mermaid-theme.json';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';

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

const descriptions: Record<string, string> = {
    'diag-0': 'Task 2.1 備える と Task 2.2 対応する の各スキル構成と、自動修復と封じ込め、事前構成とログ保全の連動関係を表すサービス地図。',
    'diag-1': '準備から検出、分析、封じ込め・根絶・復旧、そして事後対応に至るインシデントレスポンスのライフサイクルフロー。',
    'diag-2': 'ワークロードアカウント群からログアーカイブアカウントへログを配信し、セキュリティ・監査アカウントで集約・分析を行うIR向けマルチアカウント構成。',
    'diag-3': 'GuardDutyのFindingやアラームからEventBridgeを経由してOpsCenter、Automation、Incident Managerへと通知・対応をつなげるフロー。',
    'diag-4': 'アクセス権限の事前用意、セキュリティサービスの事前有効化、被害範囲の事前極小化、連絡先・エスカレーションの事前設定の4つの備え。',
    'diag-5': 'Shield Advancedの購読から保護対象リソースの指定、SRTサポート有効化とRoute 53自動緩和の設定フロー。',
    'diag-6': '定常状態の定義から仮説の立案、FIS実験の実行、CloudWatchアラームによる停止条件の監視と実験結果の分析フロー。',
    'diag-7': '耐障害性ポリシーの定義からアプリケーション評価、復旧ギャップの特定と修正、テスト実施のResilience Hubサイクル。',
    'diag-8': 'GuardDutyやConfig、Inspectorによる検出からEventBridge、Lambda・SSM Automationによる自動修復、SNS通知の流れ。',
    'diag-9': 'ConfigとGuardDutyの検出からStep Functionsが起動し、メモリダンプやEBSスナップショットを取得してフォレンジックアカウントへ転送するフロー。',
    'diag-10': '2.2.1 ログ保全から 2.2.2 ログ検索、2.2.3 検出結果検証、2.2.4 封じ込め・復旧、2.2.5 根本原因分析に至る対応フェーズの流れ。',
    'diag-11': '不審なEC2を特定後、保護タグ付与、EBSスナップショット取得、メモリ保全、隔離SG適用の順序で証拠を取得するフロー。',
    'diag-12': '起点となるGuardDuty検出結果から主体・対象リソース・タイムラインを特定し、CloudTrail・VPC Flow Logs・DNSログと照合する相関分析の流れ。',
    'diag-13': '検出結果の受領から重大度確認、誤検知判定、影響範囲評価、インシデント宣言に至る検証手順。',
    'diag-14': 'EC2、IAMアクセスキー、S3バケット、RDS、コンテナそれぞれの封じ込め手法の選択肢。',
    'diag-15': '封じ込め完了から根絶（足場と脆弱性の除去）、安全な復旧ポイントの選択、段階的な本番復旧、事後レビューに至る復旧フロー。',
    'diag-16': '高重大度のGuardDuty検出結果からDetectiveが自動でエンティティグラフを生成し、関連する検出結果をグループ化して表示する流れ。',
    'diag-17': 'GuardDutyによるUnauthorizedAccess検出から、インスタンスメタデータ記録、EBSスナップショット取得、隔離SG変更、ロールセッション失効に至るシナリオAの対応フロー。',
};

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
                {descriptions[id] ?? label}
            </span>
        </div>
    );
});
