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

const descriptions: Record<DiagramId, string> = {
    'diag-0': 'Task 2.1 備える と Task 2.2 対応する の各スキル構成と、自動修復と封じ込め、事前構成とログ保全の連動関係を表すサービス地図。',
    'diag-1': '準備から検出、分析、封じ込め・根絶・復旧、そして事後対応に至るインシデントレスポンスのライフサイクルフロー。',
    'diag-2': 'ワークロードアカウント群がログアーカイブアカウントへログを配信し、検出結果をセキュリティツールアカウントへ集約する。セキュリティツールアカウントは EventBridge で自動修復（Lambda と Step Functions）を起動し、自動修復がワークロードを封じ込めて証拠をフォレンジックアカウントへコピーし、セキュリティツールアカウントからフォレンジックアカウントで調査する IR 向けマルチアカウント構成。',
    'diag-3': 'GuardDuty の Finding や CloudWatch アラームから EventBridge ルールで OpsCenter に OpsItem を作成し、関連リソースと類似 OpsItem を確認して Automation ランブックを選択する。承認が必要なら担当者が承認してから、不要ならそのままランブックを実行し、結果を OpsItem に記録して解決するフロー。',
    'diag-4': '2.1.2 の備えとして、アクセスを事前に用意（調査用ロールと封じ込め用ロール）、セキュリティツールを有効化（GuardDuty、Security Hub、Detective、CloudTrail）、被害範囲を小さく設計（アカウント分離、SCP、最小権限）、DDoS 保護を設定（Shield Advanced と WAF）の 4 つ。',
    'diag-5': 'Shield Advanced の購読、保護対象リソースの追加、WAF の Web ACL の関連付け、アプリケーション層の自動緩和の有効化、Route 53 ヘルスチェックによるヘルスベース検出、SRT のアクセス許可ロールの設定、プロアクティブエンゲージメントの連絡先登録、CloudWatch による DDoS 検出の通知へと順に進む設定フロー。',
    'diag-6': '定常状態の定義から仮説の立案、FIS実験の実行、CloudWatchアラームによる停止条件の監視と実験結果の分析フロー。',
    'diag-7': '耐障害性ポリシーの定義からアプリケーション評価、復旧ギャップの特定と修正、テスト実施のResilience Hubサイクル。',
    'diag-8': 'GuardDuty・Config・Inspector の検出結果を Security Hub に集約し、EventBridge ルールから Lambda、Step Functions、Systems Manager Automation を起動して封じ込めなどのアクションを実行し、通知・OpsCenter・記録で締めくくる自動修復の流れ。',
    'diag-9': 'Config と GuardDuty が検出した不審な挙動を Security Hub に集約し、EventBridge がワークフローを起動して DynamoDB にトリアージ情報を保存する。続いて Step Functions のメモリ取得フローがメモリを S3 に保存してから SG で隔離し、ディスク取得フローが EBS スナップショットをフォレンジックアカウントに共有する。両フローの完了後にフォレンジック AMI で分析用 EC2 を起動し、SSM ドキュメントでディスクとメモリを分析して、SNS で通知し AppSync でタイムラインを照会するフォレンジック自動化フロー。',
    'diag-10': '2.2.1 ログ保全から 2.2.2 ログ検索、2.2.3 検出結果検証、2.2.4 封じ込め・復旧、2.2.5 根本原因分析に至る対応フェーズの流れ。',
    'diag-11': '不審な EC2 を特定してメタデータを記録し、終了保護とタグを設定する。次に EBS スナップショットとメモリイメージを順に取得してからセキュリティグループで隔離する。その後スナップショットを暗号化してフォレンジックアカウントへ共有し、ハッシュを記録して証拠を保管し、分析用インスタンスにボリュームをアタッチして調査する証拠保全の手順。',
    'diag-12': '起点となるGuardDuty検出結果から主体・対象リソース・タイムラインを特定し、CloudTrail・VPC Flow Logs・DNSログと照合する相関分析の流れ。',
    'diag-13': '検出結果を受領して重大度と対象リソースを確認し、想定内の活動かを判定する。想定内（例: IP が自社の拠点）なら誤検知として記録し抑制ルールを検討する。想定外または不明なら関連ログで裏付けを取り、裏付けがなければ同じく誤検知として記録する。裏付けがあればインシデントとして宣言し、影響範囲を評価して第 4.4 節の封じ込めへ進む検証手順。',
    'diag-14': 'インシデントと判断した後、対象リソースの種類で封じ込めを分岐する。EC2 はメモリとディスクの証拠を取得してから隔離 SG を付与し既存接続と DNS にも注意、IAM アクセスキーはキーを無効化して一時認証情報をトークン発行時刻で拒否、IAM ロールは Revoke active sessions、S3 バケットはパブリックアクセスをブロック、Web への攻撃は WAF で送信元 IP をブロックし、いずれも封じ込めの効果を分析で確認する。',
    'diag-15': '封じ込め完了から根絶（足場と脆弱性の除去）、安全なバックアップと AMI の選択、隔離環境で検証、本番へ復旧、強化した監視の継続へと進み、再発の兆候があれば根絶へ戻る復旧フロー。',
    'diag-16': '高重大度の GuardDuty 検出結果を起点に、Detective の検出結果グループを開いて関与するエンティティ（IAM・IP・EC2）とプロファイル上の平時との差を手動で調べ、最初の不審な活動、侵入経路、管理プロセスの欠陥まで掘り下げて再発防止策を決める根本原因分析の流れ。',
    'diag-17': 'GuardDuty の Finding を検出し、CloudTrail でロールの操作と送信元 IP を検証する。想定外の IP でなければ誤検知として記録し、想定外なら EBS スナップショットとメモリで証拠を保全、ロールのセッション失効と EC2 隔離で封じ込め、触れたリソースとデータの範囲評価、IMDSv2 強制・脆弱性修正・EC2 再作成による根絶、クリーンな AMI と IaC からの復旧、Detective による根本原因分析へ進むシナリオ A の対応フロー。',
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
                {descriptions[id]}
            </span>
        </div>
    );
});
