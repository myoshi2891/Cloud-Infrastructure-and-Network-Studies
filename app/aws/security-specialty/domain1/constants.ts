/**
 * AWS Certified Security - Specialty (SCS-C03) Content Domain 1: Detection
 * ナビゲーションおよびダイアグラム定義定数
 */

export interface NavItem {
    id: string;
    label: string;
    level: 2 | 3;
}

export const NAV_ITEMS: readonly NavItem[] = [
    {
        "id": "0-このドメインの全体像と試験での位置づけ",
        "label": "0. このドメインの全体像と試験での位置づけ",
        "level": 2
    },
    {
        "id": "01-detection-とは何か-やさしい説明",
        "label": "0.1 Detection とは何か (やさしい説明)",
        "level": 3
    },
    {
        "id": "02-試験ガイド上の構造",
        "label": "0.2 試験ガイド上の構造",
        "level": 3
    },
    {
        "id": "03-skill-一覧-公式の記述と本ガイドでの対応章",
        "label": "0.3 Skill 一覧 (公式の記述と、本ガイドでの対応章)",
        "level": 3
    },
    {
        "id": "04-試験の形式-公式ガイドより",
        "label": "0.4 試験の形式 (公式ガイドより)",
        "level": 3
    },
    {
        "id": "1-検出の仕組みを-1-枚で理解する",
        "label": "1. 検出の仕組みを 1 枚で理解する",
        "level": 2
    },
    {
        "id": "11-3-つの言葉を区別する",
        "label": "1.1 3 つの言葉を区別する",
        "level": 3
    },
    {
        "id": "12-共通のベストプラクティス-まず覚える-5-か条",
        "label": "1.2 共通のベストプラクティス (まず覚える 5 か条)",
        "level": 3
    },
    {
        "id": "2-task-11-監視とアラートの設計実装",
        "label": "2. Task 1.1 監視とアラートの設計・実装",
        "level": 2
    },
    {
        "id": "21-skill-111-ワークロードを分析して監視要件を決める",
        "label": "2.1 Skill 1.1.1 ワークロードを分析して監視要件を決める",
        "level": 3
    },
    {
        "id": "22-skill-112-ワークロード監視戦略の設計と実装-ヘルスチェックなど",
        "label": "2.2 Skill 1.1.2 ワークロード監視戦略の設計と実装 (ヘルスチェックなど)",
        "level": 3
    },
    {
        "id": "23-skill-113-セキュリティイベントと監視イベントの集約",
        "label": "2.3 Skill 1.1.3 セキュリティイベントと監視イベントの集約",
        "level": 3
    },
    {
        "id": "24-skill-114-異常を検出するメトリクスアラートダッシュボード",
        "label": "2.4 Skill 1.1.4 異常を検出するメトリクス・アラート・ダッシュボード",
        "level": 3
    },
    {
        "id": "25-skill-115-定期的な評価と調査の自動化",
        "label": "2.5 Skill 1.1.5 定期的な評価と調査の自動化",
        "level": 3
    },
    {
        "id": "3-task-12-ログ収集保管分析の設計実装",
        "label": "3. Task 1.2 ログ収集・保管・分析の設計・実装",
        "level": 2
    },
    {
        "id": "31-skill-121-ログの取り込み元と保管先の特定",
        "label": "3.1 Skill 1.2.1 ログの取り込み元と保管先の特定",
        "level": 3
    },
    {
        "id": "32-skill-122-aws-サービスとアプリケーションのログ設定",
        "label": "3.2 Skill 1.2.2 AWS サービスとアプリケーションのログ設定",
        "level": 3
    },
    {
        "id": "33-skill-123-ログ保管とデータレイク-security-lake-とサードパーティ連携",
        "label": "3.3 Skill 1.2.3 ログ保管とデータレイク (Security Lake) とサードパーティ連携",
        "level": 3
    },
    {
        "id": "34-skill-124-ログの分析-logs-insightsathenasecurity-hub",
        "label": "3.4 Skill 1.2.4 ログの分析 (Logs Insights、Athena、Security Hub)",
        "level": 3
    },
    {
        "id": "35-skill-125-ログの正規化解析相関-opensearchlambdamanaged-grafana",
        "label": "3.5 Skill 1.2.5 ログの正規化・解析・相関 (OpenSearch、Lambda、Managed Grafana)",
        "level": 3
    },
    {
        "id": "36-skill-126-ネットワーク設計と脅威に合わせたログソースの選択",
        "label": "3.6 Skill 1.2.6 ネットワーク設計と脅威に合わせたログソースの選択",
        "level": 3
    },
    {
        "id": "4-task-13-監視ログアラートのトラブルシューティング",
        "label": "4. Task 1.3 監視・ログ・アラートのトラブルシューティング",
        "level": 2
    },
    {
        "id": "41-skill-131-リソースの機能権限設定の分析",
        "label": "4.1 Skill 1.3.1 リソースの機能・権限・設定の分析",
        "level": 3
    },
    {
        "id": "42-skill-132-設定ミスの是正-cloudwatch-エージェントログ欠落",
        "label": "4.2 Skill 1.3.2 設定ミスの是正 (CloudWatch エージェント、ログ欠落)",
        "level": 3
    },
    {
        "id": "5-頻出シナリオ早見表",
        "label": "5. 頻出シナリオ早見表",
        "level": 2
    },
    {
        "id": "6-ベストプラクティス総チェックリスト",
        "label": "6. ベストプラクティス総チェックリスト",
        "level": 2
    },
    {
        "id": "61-組織アカウント設計",
        "label": "6.1 組織・アカウント設計",
        "level": 3
    },
    {
        "id": "62-ログ",
        "label": "6.2 ログ",
        "level": 3
    },
    {
        "id": "63-検出",
        "label": "6.3 検出",
        "level": 3
    },
    {
        "id": "64-自動化運用",
        "label": "6.4 自動化・運用",
        "level": 3
    },
    {
        "id": "7-確認問題",
        "label": "7. 確認問題",
        "level": 2
    },
    {
        "id": "問題-1",
        "label": "問題 1",
        "level": 3
    },
    {
        "id": "問題-2",
        "label": "問題 2",
        "level": 3
    },
    {
        "id": "問題-3",
        "label": "問題 3",
        "level": 3
    },
    {
        "id": "問題-4",
        "label": "問題 4",
        "level": 3
    },
    {
        "id": "問題-5",
        "label": "問題 5",
        "level": 3
    },
    {
        "id": "問題-6",
        "label": "問題 6",
        "level": 3
    },
    {
        "id": "問題-7",
        "label": "問題 7",
        "level": 3
    },
    {
        "id": "問題-8",
        "label": "問題 8",
        "level": 3
    },
    {
        "id": "8-2026年時点で特に注意したい変更点",
        "label": "8. 2026年時点で特に注意したい変更点",
        "level": 2
    },
    {
        "id": "9-参考url-ソース一覧",
        "label": "9. 参考URL (ソース一覧)",
        "level": 2
    },
    {
        "id": "91-試験ガイド",
        "label": "9.1 試験ガイド",
        "level": 3
    },
    {
        "id": "92-検出サービス",
        "label": "9.2 検出サービス",
        "level": 3
    },
    {
        "id": "93-構成管理と自動化",
        "label": "9.3 構成管理と自動化",
        "level": 3
    },
    {
        "id": "94-ログとデータレイク",
        "label": "9.4 ログとデータレイク",
        "level": 3
    },
    {
        "id": "95-cloudwatch-とネットワークログ",
        "label": "9.5 CloudWatch とネットワークログ",
        "level": 3
    },
    {
        "id": "96-トラブルシューティング",
        "label": "9.6 トラブルシューティング",
        "level": 3
    },
    {
        "id": "補足-本ガイドの記述に関する注意",
        "label": "補足: 本ガイドの記述に関する注意",
        "level": 3
    }
] as const;

export type DiagramId =
    | "diag-1"
    | "diag-2"
    | "diag-3"
    | "diag-4"
    | "diag-5"
    | "diag-6"
    | "diag-7"
    | "diag-8"
    | "diag-9";

export const DIAGRAMS: Record<DiagramId, string> = {
    "diag-1": `flowchart LR
    A["1 収集 CloudTrail VPC Flow Logs DNS ログ アプリログ"] --> B["2 保管 S3 CloudWatch Logs Security Lake"]
    B --> C["3 分析 Logs Insights Athena OpenSearch"]
    A --> D["検出 GuardDuty Macie Inspector Config"]
    D --> E["集約 Security Hub"]
    C --> E
    E --> F["通知と自動対応 EventBridge Lambda SSM Automation"]`,
    "diag-2": `flowchart LR
    A["守る対象を洗い出す データ 資格情報 サーバー API"] --> B["想定する脅威を決める 不正ログイン 情報漏えい マルウェア 設定ミス"]
    B --> C["必要なログを決める"]
    C --> D["使う検出サービスを決める"]
    D --> E["通知先と対応担当を決める"]`,
    "diag-3": `flowchart TB
    M["管理アカウント"] -->|"委任管理者を指定"| S["セキュリティアカウント"]
    M -->|"組織トレイルを作成"| L["ログアーカイブアカウントのS3バケット"]
    W["メンバーアカウント群"] -->|"APIログは自動で対象"| L
    W -->|"GuardDuty の検出結果"| S
    W -->|"Config と Inspector と Macie の結果"| S
    S --> H["Security Hub で検出結果を集約"]
    H --> E["EventBridge で通知と自動対応"]`,
    "diag-4": `flowchart TD
    Q1{"不審な挙動や攻撃の兆候を見つけたい"} -->|"はい"| GD["GuardDuty"]
    Q1 -->|"いいえ"| Q2{"S3内の機密データを見つけたい"}
    Q2 -->|"はい"| MC["Macie"]
    Q2 -->|"いいえ"| Q3{"ソフトウェアの脆弱性を見つけたい"}
    Q3 -->|"はい"| IN["Inspector"]
    Q3 -->|"いいえ"| Q4{"設定がルールに準拠しているか知りたい"}
    Q4 -->|"はい"| CF["Config と Security Hub CSPM"]
    Q4 -->|"いいえ"| Q5{"検出結果の原因を調査したい"}
    Q5 -->|"はい"| DT["Detective"]
    Q5 -->|"いいえ"| Q6{"ログを標準形式で一元保管したい"}
    Q6 -->|"はい"| SL["Security Lake"]
    Q6 -->|"いいえ"| SH["Security Hub で検出結果を集約"]`,
    "diag-5": `flowchart TD
    A["リソースの設定が変更される"] --> B["Config が変更を記録"]
    B --> C{"Config ルールで評価"}
    C -->|"準拠"| D["COMPLIANT"]
    C -->|"非準拠"| E["NON_COMPLIANT"]
    E --> F["EventBridge で通知"]
    E --> G["SSM Automation で自動修復"]
    B --> H["アグリゲーターで組織全体に集約"]`,
    "diag-6": `flowchart TD
    A["管理アカウントまたは委任管理者で組織トレイルを作成"] --> B["全リージョンを対象にする"]
    B --> C["ログアーカイブアカウントのS3バケットへ配信"]
    C --> D["SSE-KMSで暗号化"]
    C --> E["ログファイル整合性検証を有効化"]
    B --> F["CloudWatch Logsにも送信"]
    F --> G["メトリクスフィルターとアラーム"]`,
    "diag-7": `flowchart LR
    A["サーバー内のログファイルとメトリクス"] --> B["CloudWatch エージェント"]
    B -->|"IAMロールの権限で送信"| C["CloudWatch Logs"]
    B --> D["CloudWatch メトリクス"]
    E["設定ファイル JSON"] -->|"SSM Parameter Store や State Manager で配布"| B`,
    "diag-8": `flowchart LR
    A["各種ログ CloudTrail フローログ アプリログ"] --> B["CloudWatch Logs サブスクリプションフィルター"]
    B --> C["Firehose または Lambda で変換と整形"]
    C --> D["OpenSearch Service に格納"]
    D --> E["ダッシュボードと検索"]
    D --> F["Managed Grafana で可視化"]`,
    "diag-9": `flowchart TD
    A["ログが届かない"] --> B{"ログ出力の設定は有効か"}
    B -->|"いいえ"| B1["ログ出力を有効化する"]
    B -->|"はい"| C{"送信側の権限は十分か"}
    C -->|"いいえ"| C1["IAMロールやサービス用ロールを修正する"]
    C -->|"はい"| D{"宛先の権限は十分か"}
    D -->|"いいえ"| D1["S3バケットポリシーやKMSキーポリシーを修正する"]
    D -->|"はい"| E{"ネットワーク経路はあるか"}
    E -->|"いいえ"| E1["VPCエンドポイントやNAT経路を追加する"]
    E -->|"はい"| F{"エージェントやサービスは稼働しているか"}
    F -->|"いいえ"| F1["エージェントの設定とログを確認して再起動する"]
    F -->|"はい"| G["リージョン 保持期間 フィルター条件を確認する"]`,
};
