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
    'diag-1': 'CloudTrail・VPC Flow Logs・DNS・アプリのログを収集し、S3・CloudWatch Logs・Security Lake に保管して Logs Insights・Athena・OpenSearch で分析する。収集から分岐する GuardDuty・Macie・Inspector・Config の検出結果と分析結果を Security Hub に集約し、EventBridge・Lambda・SSM Automation で通知と自動対応につなげる。',
    'diag-2': '守る対象（データ・資格情報・サーバー・API）を洗い出し、想定する脅威を決め、必要なログ、検出サービス、通知先と対応担当の順に決める。',
    'diag-3': '管理アカウントがセキュリティアカウントを委任管理者に指定し、組織トレイルを作成する。メンバーアカウントの API ログはログアーカイブアカウントの S3 に、GuardDuty・Config・Inspector・Macie の検出結果はセキュリティアカウントに集める。検出結果を Security Hub に集約し、EventBridge で通知と自動対応につなげる。',
    'diag-4': '目的を順に判定し、該当すればサービスを選び、該当しなければ次へ進む。不審な挙動は GuardDuty、S3 の機密データは Macie、脆弱性は Inspector、設定の準拠は Config と Security Hub CSPM、原因調査は Detective、ログの標準形式での一元保管は Security Lake。それ以外は Security Hub で検出結果を集約する。',
    'diag-5': 'リソースの設定変更を Config が記録し、Config ルールで準拠なら COMPLIANT、非準拠なら NON_COMPLIANT と評価する。非準拠から EventBridge の通知と SSM Automation の自動修復に分岐する。変更記録はアグリゲーターで組織全体に集約する。',
    'diag-6': '管理アカウントまたは委任管理者が全リージョン対象の組織トレイルを作成する。ログをログアーカイブアカウントの S3 に配信し、SSE-KMS 暗号化とログファイル整合性検証に分岐する。全リージョンのログは CloudWatch Logs にも送信し、メトリクスフィルターとアラームにつなげる。',
    'diag-7': 'サーバー内のログファイルとメトリクスを CloudWatch エージェントが収集し、ログは IAM ロールの権限で CloudWatch Logs に、メトリクスは CloudWatch メトリクスに送信する。JSON 設定ファイルは SSM Parameter Store や State Manager でエージェントに配布する。',
    'diag-8': 'CloudTrail・フローログ・アプリログを CloudWatch Logs のサブスクリプションフィルターに送り、Firehose または Lambda で変換・整形して OpenSearch Service に格納する。そこからダッシュボードと検索、および Managed Grafana による可視化に分岐する。',
    'diag-9': 'ログが届かない場合は、ログ出力設定、送信側の権限、宛先の権限、ネットワーク経路、エージェントやサービスの稼働を順に確認する。各確認で問題があれば、ログ出力の有効化、IAM ロールの修正、S3・KMS ポリシーの修正、VPC エンドポイントや NAT 経路の追加、エージェント設定・ログの確認と再起動をそれぞれ行う。すべて正常ならリージョン・保持期間・フィルター条件を確認する。',
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
            <span id={descriptionId} className="sr-only">{descriptions[id]}</span>
        </div>
    );
});
