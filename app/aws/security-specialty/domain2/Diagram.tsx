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
    'diag-2': 'ワークロードアカウント群がログアーカイブアカウントへログを配信し、検出結果をセキュリティツールアカウントへ集約する。セキュリティツールアカウントは EventBridge で自動修復（Lambda と Step Functions）を起動し、自動修復がワークロードを封じ込めて証拠をフォレンジックアカウントへコピーし、セキュリティツールアカウントからフォレンジックアカウントで調査する IR 向けマルチアカウント構成。',
    'diag-3': 'GuardDuty の Finding や CloudWatch アラームから EventBridge ルールで OpsCenter に OpsItem を作成し、関連リソースと類似 OpsItem を確認して Automation ランブックを選択する。承認が必要なら担当者が承認してから、不要ならそのままランブックを実行し、結果を OpsItem に記録して解決するフロー。',
    'diag-4': '2.1.2 の備えとして、アクセスを事前に用意（調査用ロールと封じ込め用ロール）、セキュリティツールを有効化（GuardDuty、Security Hub、Detective、CloudTrail）、被害範囲を小さく設計（アカウント分離、SCP、最小権限）、DDoS 保護を設定（Shield Advanced と WAF）の 4 つ。',
    'diag-5': 'Shield Advanced の購読、保護対象リソースの追加、WAF の Web ACL の関連付け、アプリケーション層の自動緩和の有効化、Route 53 ヘルスチェックによるヘルスベース検出、SRT のアクセス許可ロールの設定、プロアクティブエンゲージメントの連絡先登録、CloudWatch による DDoS 検出の通知へと順に進む設定フロー。',
    'diag-6': '定常状態の定義から仮説の立案、FIS実験の実行、CloudWatchアラームによる停止条件の監視と実験結果の分析フロー。',
    'diag-7': '耐障害性ポリシーの定義からアプリケーション評価、復旧ギャップの特定と修正、テスト実施のResilience Hubサイクル。',
    'diag-8': 'GuardDutyやConfig、Inspectorによる検出からEventBridge、Lambda・SSM Automationによる自動修復、SNS通知の流れ。',
    'diag-9': 'ConfigとGuardDutyの検出からStep Functionsが起動し、メモリダンプやEBSスナップショットを取得してフォレンジックアカウントへ転送するフロー。',
    'diag-10': '2.2.1 ログ保全から 2.2.2 ログ検索、2.2.3 検出結果検証、2.2.4 封じ込め・復旧、2.2.5 根本原因分析に至る対応フェーズの流れ。',
    'diag-11': '不審なEC2を特定後、保護タグ付与、EBSスナップショット取得、メモリ保全、隔離SG適用の順序で証拠を取得するフロー。',
    'diag-12': '起点となるGuardDuty検出結果から主体・対象リソース・タイムラインを特定し、CloudTrail・VPC Flow Logs・DNSログと照合する相関分析の流れ。',
    'diag-13': '検出結果の受領から重大度確認、誤検知判定、影響範囲評価、インシデント宣言に至る検証手順。',
    'diag-14': 'インシデントと判断した後、対象リソースの種類で封じ込めを分岐する。EC2 はメモリとディスクの証拠を取得してから隔離 SG を付与し既存接続と DNS にも注意、IAM アクセスキーはキーを無効化して一時認証情報をトークン発行時刻で拒否、IAM ロールは Revoke active sessions、S3 バケットはパブリックアクセスをブロック、Web への攻撃は WAF で送信元 IP をブロックし、いずれも封じ込めの効果を分析で確認する。',
    'diag-15': '封じ込め完了から根絶（足場と脆弱性の除去）、安全なバックアップと AMI の選択、隔離環境で検証、本番へ復旧、強化した監視の継続へと進み、再発の兆候があれば根絶へ戻る復旧フロー。',
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
