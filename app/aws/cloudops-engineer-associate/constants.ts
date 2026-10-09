/**
 * AWS Certified CloudOps Engineer - Associate (SOA-C03) 学習ガイド 定数定義
 */

export interface NavItem {
    href: string;
    label: string;
    level: 1 | 2 | 3;
}

export const NAV_ITEMS: NavItem[] = [
    {
        "href": "#s-h2-1",
        "label": "本書の読み方と表記ルール",
        "level": 2
    },
    {
        "href": "#s-h2-2",
        "label": "Step 0. 試験の全体像",
        "level": 2
    },
    {
        "href": "#s-h3-1",
        "label": "0-1. この試験は何を測るのか",
        "level": 3
    },
    {
        "href": "#s-h3-2",
        "label": "0-2. 試験フォーマット",
        "level": 3
    },
    {
        "href": "#s-h3-3",
        "label": "0-3. ドメイン配分",
        "level": 3
    },
    {
        "href": "#s-h3-4",
        "label": "0-4. 対象受験者像(公式ガイドより)",
        "level": 3
    },
    {
        "href": "#s-h3-5",
        "label": "0-5. 試験範囲外のタスク(公式ガイドより)",
        "level": 3
    },
    {
        "href": "#s-h3-6",
        "label": "0-6. SOA-C02 から SOA-C03 への変更点",
        "level": 3
    },
    {
        "href": "#s-h3-7",
        "label": "0-7. 学習ロードマップ",
        "level": 3
    },
    {
        "href": "#s-h3-8",
        "label": "0-8. 本書の構成(スキルと Step の対応)",
        "level": 3
    },
    {
        "href": "#s-h1-1",
        "label": "Domain 1: モニタリング、ログ、分析、修復、パフォーマンス最適化(22%)",
        "level": 1
    },
    {
        "href": "#s-h2-3",
        "label": "Step 1. Task 1.1 メトリクス・アラーム・フィルターの実装",
        "level": 2
    },
    {
        "href": "#s-h3-9",
        "label": "Skill 1.1.1 🔴 CloudWatch / CloudTrail / Managed Prometheus で監視とログを構成する",
        "level": 3
    },
    {
        "href": "#s-h3-10",
        "label": "Skill 1.1.2 🔴 CloudWatch エージェントの設定と管理",
        "level": 3
    },
    {
        "href": "#s-h3-11",
        "label": "Skill 1.1.3 🔴 CloudWatch アラームの設定・特定・トラブルシュート(複合アラーム含む)",
        "level": 3
    },
    {
        "href": "#s-h3-12",
        "label": "Skill 1.1.4 🟡 クロスアカウント / クロスリージョンのダッシュボード",
        "level": 3
    },
    {
        "href": "#s-h3-13",
        "label": "Skill 1.1.5 🔴 SNS への通知設定",
        "level": 3
    },
    {
        "href": "#s-h2-4",
        "label": "Step 2. Task 1.2 監視メトリクスによる問題の特定と修復",
        "level": 2
    },
    {
        "href": "#s-h3-14",
        "label": "Skill 1.2.1 🔴 パフォーマンスメトリクスの分析と自動修復",
        "level": 3
    },
    {
        "href": "#s-h3-15",
        "label": "Skill 1.2.2 🔴 EventBridge によるイベントのルーティング・拡充・配信とトラブルシュート",
        "level": 3
    },
    {
        "href": "#s-h3-16",
        "label": "Skill 1.2.3 🔴 Systems Manager Automation ランブックの作成と実行",
        "level": 3
    },
    {
        "href": "#s-h2-5",
        "label": "Step 3. Task 1.3 コンピュート・ストレージ・データベースの性能最適化",
        "level": 2
    },
    {
        "href": "#s-h3-17",
        "label": "Skill 1.3.1 🟡 コンピュートリソースの最適化と性能問題の修復",
        "level": 3
    },
    {
        "href": "#s-h3-18",
        "label": "Skill 1.3.2 🔴 EBS の性能メトリクス分析・トラブルシュート・ボリュームタイプ最適化",
        "level": 3
    },
    {
        "href": "#s-h3-19",
        "label": "Skill 1.3.3 🔴 S3 の性能戦略(DataSync / Transfer Acceleration / マルチパート / ライフサイクル)",
        "level": 3
    },
    {
        "href": "#s-h3-20",
        "label": "Skill 1.3.4 🟡 共有ストレージの選定と最適化(EFS / FSx / S3 Files)",
        "level": 3
    },
    {
        "href": "#s-h3-21",
        "label": "Skill 1.3.5 🔴 RDS の監視と性能向上(Performance Insights / RDS Proxy など)",
        "level": 3
    },
    {
        "href": "#s-h3-22",
        "label": "Skill 1.3.6 🟡 EC2 とその関連ストレージ・ネットワークの実装・監視・最適化(プレイスメントグループなど)",
        "level": 3
    },
    {
        "href": "#s-h1-2",
        "label": "Domain 2: 信頼性と事業継続(22%)",
        "level": 1
    },
    {
        "href": "#s-h2-6",
        "label": "Step 4. Task 2.1 スケーラビリティと弾力性の実装",
        "level": 2
    },
    {
        "href": "#s-h3-23",
        "label": "Skill 2.1.1 🔴 コンピュート環境のスケーリング機構の設定・管理",
        "level": 3
    },
    {
        "href": "#s-h3-24",
        "label": "Skill 2.1.2 🔴 キャッシュによる動的スケーラビリティの向上(CloudFront / ElastiCache)",
        "level": 3
    },
    {
        "href": "#s-h3-25",
        "label": "Skill 2.1.3 🔴 マネージドデータベースのスケーリング(RDS / DynamoDB など)",
        "level": 3
    },
    {
        "href": "#s-h2-7",
        "label": "Step 5. Task 2.2 高可用で回復力のある環境の実装",
        "level": 2
    },
    {
        "href": "#s-h3-26",
        "label": "Skill 2.2.1 🔴 ELB と Route 53 ヘルスチェックの設定・トラブルシュート",
        "level": 3
    },
    {
        "href": "#s-h3-27",
        "label": "Skill 2.2.2 🔴 耐障害システムの構成(Multi-AZ など)",
        "level": 3
    },
    {
        "href": "#s-h2-8",
        "label": "Step 6. Task 2.3 バックアップとリストア戦略の実装",
        "level": 2
    },
    {
        "href": "#s-h3-28",
        "label": "Skill 2.3.1 🔴 スナップショット・バックアップの自動化(AWS Backup など)",
        "level": 3
    },
    {
        "href": "#s-h3-29",
        "label": "Skill 2.3.2 🔴 データベースの復元方法(ポイントインタイムリストアなど)と RTO / RPO / コスト",
        "level": 3
    },
    {
        "href": "#s-h3-30",
        "label": "Skill 2.3.3 🟡 ストレージサービスのバージョニング(S3 / FSx など)",
        "level": 3
    },
    {
        "href": "#s-h3-31",
        "label": "Skill 2.3.4 🔴 災害復旧(DR)の手順とベストプラクティス",
        "level": 3
    },
    {
        "href": "#s-h1-3",
        "label": "Domain 3: デプロイ、プロビジョニング、自動化(22%)",
        "level": 1
    },
    {
        "href": "#s-h2-9",
        "label": "Step 7. Task 3.1 クラウドリソースのプロビジョニングと保守",
        "level": 2
    },
    {
        "href": "#s-h3-32",
        "label": "Skill 3.1.1 🟡 AMI とコンテナイメージの作成・管理(EC2 Image Builder)",
        "level": 3
    },
    {
        "href": "#s-h3-33",
        "label": "Skill 3.1.2 🔴 CloudFormation と AWS CDK によるリソース管理",
        "level": 3
    },
    {
        "href": "#s-h3-34",
        "label": "Skill 3.1.3 🔴 デプロイ問題の特定と修復(サブネットサイズ・CloudFormation エラー・権限)",
        "level": 3
    },
    {
        "href": "#s-h3-35",
        "label": "Skill 3.1.4 🟡 複数リージョン・アカウントへのプロビジョニングと共有(AWS RAM / StackSets)",
        "level": 3
    },
    {
        "href": "#s-h3-36",
        "label": "Skill 3.1.5 🔴 デプロイ戦略とサービスの実装",
        "level": 3
    },
    {
        "href": "#s-h3-37",
        "label": "Skill 3.1.6 🟡 サードパーティツール(Terraform / Git)によるデプロイ自動化",
        "level": 3
    },
    {
        "href": "#s-h2-10",
        "label": "Step 8. Task 3.2 既存リソース管理の自動化",
        "level": 2
    },
    {
        "href": "#s-h3-38",
        "label": "Skill 3.2.1 🔴 AWS サービスによる運用プロセスの自動化(Systems Manager)",
        "level": 3
    },
    {
        "href": "#s-h3-39",
        "label": "Skill 3.2.2 🔴 イベント駆動の自動化(Lambda / S3 イベント通知 / EventBridge / DevOps Agent)",
        "level": 3
    },
    {
        "href": "#s-h1-4",
        "label": "Domain 4: セキュリティとコンプライアンス(16%)",
        "level": 1
    },
    {
        "href": "#s-h2-11",
        "label": "Step 9. Task 4.1 セキュリティとコンプライアンスのツール・ポリシー",
        "level": 2
    },
    {
        "href": "#s-h3-40",
        "label": "Skill 4.1.1 🔴 IAM 機能の実装(パスワードポリシー・MFA・ロール・フェデレーション・リソースポリシー・条件)",
        "level": 3
    },
    {
        "href": "#s-h3-41",
        "label": "Skill 4.1.2 🔴 アクセス問題のトラブルシュートと監査(CloudTrail / Access Analyzer / ポリシーシミュレーター)",
        "level": 3
    },
    {
        "href": "#s-h3-42",
        "label": "Skill 4.1.3 🔴 マルチアカウント戦略の安全な実装(Organizations / SCP / IAM Identity Center)",
        "level": 3
    },
    {
        "href": "#s-h3-43",
        "label": "Skill 4.1.4 🟡 Trusted Advisor のセキュリティチェック結果に基づく修復",
        "level": 3
    },
    {
        "href": "#s-h3-44",
        "label": "Skill 4.1.5 🔴 コンプライアンス要件の強制と継続的モニタリング(リージョン・サービス選択 / AWS Config 適合パック)",
        "level": 3
    },
    {
        "href": "#s-h2-12",
        "label": "Step 10. Task 4.2 データとインフラを守る戦略",
        "level": 2
    },
    {
        "href": "#s-h3-45",
        "label": "Skill 4.2.1 🟡 データ分類スキームの実装と強制",
        "level": 3
    },
    {
        "href": "#s-h3-46",
        "label": "Skill 4.2.2 🔴 保管時の暗号化の実装・設定・トラブルシュート(AWS KMS)",
        "level": 3
    },
    {
        "href": "#s-h3-47",
        "label": "Skill 4.2.3 🔴 転送中の暗号化の実装・設定・トラブルシュート(AWS Certificate Manager)",
        "level": 3
    },
    {
        "href": "#s-h3-48",
        "label": "Skill 4.2.4 🔴 シークレットの安全な保管",
        "level": 3
    },
    {
        "href": "#s-h3-49",
        "label": "Skill 4.2.5 🔴 レポート設定と検出結果の修復(Security Hub / GuardDuty / Config / Inspector / Security Agent)",
        "level": 3
    },
    {
        "href": "#s-h1-5",
        "label": "Domain 5: ネットワークとコンテンツ配信(18%)",
        "level": 1
    },
    {
        "href": "#s-h2-13",
        "label": "Step 11. Task 5.1 ネットワーク機能と接続の実装・最適化",
        "level": 2
    },
    {
        "href": "#s-h3-50",
        "label": "Skill 5.1.1 🔴 VPC の構成(サブネット・ルートテーブル・NACL・SG・NAT・IGW・Egress-only IGW)",
        "level": 3
    },
    {
        "href": "#s-h3-51",
        "label": "Skill 5.1.2 🔴 プライベート接続の構成(VPC エンドポイント / PrivateLink / VPC ピアリング)",
        "level": 3
    },
    {
        "href": "#s-h3-52",
        "label": "Skill 5.1.3 🟡 ネットワーク保護サービスの監査(DNS Firewall / WAF / Shield / Network Firewall)",
        "level": 3
    },
    {
        "href": "#s-h3-53",
        "label": "Skill 5.1.4 🟡 ネットワークアーキテクチャのコスト最適化",
        "level": 3
    },
    {
        "href": "#s-h2-14",
        "label": "Step 12. Task 5.2 ドメイン・DNS・コンテンツ配信",
        "level": 2
    },
    {
        "href": "#s-h3-54",
        "label": "Skill 5.2.1 🔴 DNS の構成(Route 53 Resolver)",
        "level": 3
    },
    {
        "href": "#s-h3-55",
        "label": "Skill 5.2.2 🔴 Route 53 のルーティングポリシー・設定・クエリログ",
        "level": 3
    },
    {
        "href": "#s-h3-56",
        "label": "Skill 5.2.3 🔴 コンテンツ・サービスの配信(CloudFront / Global Accelerator)",
        "level": 3
    },
    {
        "href": "#s-h2-15",
        "label": "Step 13. Task 5.3 ネットワーク接続のトラブルシュート",
        "level": 2
    },
    {
        "href": "#s-h3-57",
        "label": "Skill 5.3.1 🔴 VPC 構成のトラブルシュート(サブネット・ルートテーブル・NACL・SG・Transit Gateway・NAT)",
        "level": 3
    },
    {
        "href": "#s-h3-58",
        "label": "Skill 5.3.2 🔴 ネットワークログの収集と解釈(VPC フローログ / ELB / WAF / CloudFront / コンテナ)",
        "level": 3
    },
    {
        "href": "#s-h3-59",
        "label": "Skill 5.3.3 🔴 CloudFront のキャッシュ問題の特定と修復",
        "level": 3
    },
    {
        "href": "#s-h3-60",
        "label": "Skill 5.3.4 🔴 ハイブリッド接続・プライベート接続のトラブルシュート",
        "level": 3
    },
    {
        "href": "#s-h3-61",
        "label": "Skill 5.3.5 🟡 CloudWatch ネットワークモニタリングサービスの設定と分析",
        "level": 3
    },
    {
        "href": "#s-h1-6",
        "label": "付録",
        "level": 1
    },
    {
        "href": "#s-h2-16",
        "label": "付録 A. 頻出トラップ早見表(「これを見たらこう答える」)",
        "level": 2
    },
    {
        "href": "#s-h2-17",
        "label": "付録 B. 練習問題(選択問題 + 解説)",
        "level": 2
    },
    {
        "href": "#s-h3-62",
        "label": "問題 1(Domain 1)",
        "level": 3
    },
    {
        "href": "#s-h3-63",
        "label": "問題 2(Domain 1)",
        "level": 3
    },
    {
        "href": "#s-h3-64",
        "label": "問題 3(Domain 1)",
        "level": 3
    },
    {
        "href": "#s-h3-65",
        "label": "問題 4(Domain 1)",
        "level": 3
    },
    {
        "href": "#s-h3-66",
        "label": "問題 5(Domain 1)",
        "level": 3
    },
    {
        "href": "#s-h3-67",
        "label": "問題 6(Domain 2)",
        "level": 3
    },
    {
        "href": "#s-h3-68",
        "label": "問題 7(Domain 2)",
        "level": 3
    },
    {
        "href": "#s-h3-69",
        "label": "問題 8(Domain 2)",
        "level": 3
    },
    {
        "href": "#s-h3-70",
        "label": "問題 9(Domain 2)",
        "level": 3
    },
    {
        "href": "#s-h3-71",
        "label": "問題 10(Domain 3)",
        "level": 3
    },
    {
        "href": "#s-h3-72",
        "label": "問題 11(Domain 3)",
        "level": 3
    },
    {
        "href": "#s-h3-73",
        "label": "問題 12(Domain 3)",
        "level": 3
    },
    {
        "href": "#s-h3-74",
        "label": "問題 13(Domain 4)",
        "level": 3
    },
    {
        "href": "#s-h3-75",
        "label": "問題 14(Domain 4)",
        "level": 3
    },
    {
        "href": "#s-h3-76",
        "label": "問題 15(Domain 4)",
        "level": 3
    },
    {
        "href": "#s-h3-77",
        "label": "問題 16(Domain 5)",
        "level": 3
    },
    {
        "href": "#s-h3-78",
        "label": "問題 17(Domain 5)",
        "level": 3
    },
    {
        "href": "#s-h3-79",
        "label": "問題 18(Domain 5)",
        "level": 3
    },
    {
        "href": "#s-h3-80",
        "label": "問題 19(Domain 5)",
        "level": 3
    },
    {
        "href": "#s-h3-81",
        "label": "問題 20(Domain 5)",
        "level": 3
    },
    {
        "href": "#s-h2-18",
        "label": "付録 C. サービス比較チートシート",
        "level": 2
    },
    {
        "href": "#s-h3-82",
        "label": "C-1. 監視・ログ・監査",
        "level": 3
    },
    {
        "href": "#s-h3-83",
        "label": "C-2. セキュリティ検出系",
        "level": 3
    },
    {
        "href": "#s-h3-84",
        "label": "C-3. ストレージ",
        "level": 3
    },
    {
        "href": "#s-h3-85",
        "label": "C-4. 負荷分散・配信",
        "level": 3
    },
    {
        "href": "#s-h3-86",
        "label": "C-5. バックアップ・DR",
        "level": 3
    },
    {
        "href": "#s-h2-19",
        "label": "付録 D. 4 週間の学習プラン(例)",
        "level": 2
    },
    {
        "href": "#s-h2-20",
        "label": "付録 E. 参考 URL 一覧",
        "level": 2
    },
    {
        "href": "#s-h3-87",
        "label": "E-1. 試験ガイド(根拠となる一次情報)",
        "level": 3
    },
    {
        "href": "#s-h3-88",
        "label": "E-2. 設計思想(Well-Architected)",
        "level": 3
    },
    {
        "href": "#s-h3-89",
        "label": "E-3. 新機能(試験ガイドで例示されているもの)",
        "level": 3
    },
    {
        "href": "#s-h2-21",
        "label": "付録 F. 本書の更新方針と留意点",
        "level": 2
    }
];

export type DiagramId =
    | 'dg0' | 'dg1' | 'dg2' | 'dg3' | 'dg4' | 'dg5' | 'dg6' | 'dg7' | 'dg8' | 'dg9'
    | 'dg10' | 'dg11' | 'dg12' | 'dg13' | 'dg14' | 'dg15' | 'dg16' | 'dg17' | 'dg18' | 'dg19'
    | 'dg20' | 'dg21' | 'dg22' | 'dg23' | 'dg24' | 'dg25' | 'dg26' | 'dg27' | 'dg28' | 'dg29'
    | 'dg30' | 'dg31' | 'dg32' | 'dg33' | 'dg34' | 'dg35' | 'dg36' | 'dg37' | 'dg38' | 'dg39'
    | 'dg40' | 'dg41' | 'dg42' | 'dg43' | 'dg44' | 'dg45' | 'dg46' | 'dg47' | 'dg48' | 'dg49'
    | 'dg50' | 'dg51' | 'dg52' | 'dg53' | 'dg54' | 'dg55' | 'dg56' | 'dg57' | 'dg58' | 'dg59'
    | 'dg60' | 'dg61' | 'dg62' | 'dg63' | 'dg64' | 'dg65' | 'dg66' | 'dg67';

export const DIAGRAM_LABELS: Record<DiagramId, string> = {
    "dg0": "ドメイン配分と出題比率",
    "dg1": "SOA-C03 学習ロードマップ (作る・見る・直す・守る・つなぐ)",
    "dg2": "Domain 1 全体像 (見える化・検知・自動対応・継続的改善)",
    "dg3": "CloudWatch の基本構造とデータ収集",
    "dg4": "CloudWatch Agent による EC2 メトリクス収集の流れ",
    "dg5": "ECS / EKS における Container Insights の収集構成",
    "dg6": "CloudWatch 複合アラーム (Composite Alarm) の構成",
    "dg7": "CloudWatch クロスアカウント・クロスリージョン監視の仕組み",
    "dg8": "Amazon SNS Pub/Sub モデルと通知パイプライン",
    "dg9": "検知から EventBridge 経由で Lambda・Systems Manager Automation・SNS へつなぐイベント駆動の自動修復パターン",
    "dg10": "Amazon EventBridge の構成要素とイベントルーティング",
    "dg11": "EventBridge ルールとデッドレターキューのトラブルシュート",
    "dg12": "AWS Systems Manager Automation の実行フロー",
    "dg13": "リソース最適化の考え方 (コスト・パフォーマンス・可用性)",
    "dg14": "EBS 性能問題の切り分けフロー (BurstBalance・キュー長・インスタンス帯域)",
    "dg15": "S3 の性能改善手段の選定 (マルチパート・Transfer Acceleration・DataSync など)",
    "dg16": "共有ストレージの選定 (EFS・FSx・S3 Files)",
    "dg17": "RDS 性能問題の切り分けと対処 (Performance Insights・RDS Proxy・リードレプリカ)",
    "dg18": "EC2 プレイスメントグループ (クラスター・スプレッド・パーティション)",
    "dg19": "Domain 2 全体像 (信頼性と事業継続性)",
    "dg20": "EC2 Auto Scaling のアーキテクチャとスケーリングポリシー",
    "dg21": "ElastiCache (Redis / Memcached) キャッシュアーキテクチャ",
    "dg22": "Amazon RDS / Aurora のスケーリング手段 (垂直・水平・リードレプリカ)",
    "dg23": "ELB ヘルスチェックとトラフィック分散の仕組み",
    "dg24": "AWS 主要サービスの Multi-AZ 可用性設計",
    "dg25": "AWS Backup による一元化バックアップアーキテクチャ",
    "dg26": "目標復旧時間 (RTO) と目標復旧時点 (RPO) の概念図",
    "dg27": "Amazon RDS ポイントインタイムリカバリとスナップショット復元",
    "dg28": "Amazon S3 バージョニングとライフサイクル管理",
    "dg29": "AWS 4つのディザスタリカバリ (DR) 戦略",
    "dg30": "RTO / RPO 要件に基づく DR 戦略の選定フロー",
    "dg31": "Domain 3 全体像 (デプロイ・プロビジョニング・自動化)",
    "dg32": "EC2 Image Builder によるゴールデン AMI 自動作成パイプライン",
    "dg33": "AWS CloudFormation スタック更新と変更セットの流れ",
    "dg34": "AWS CDK によるインフラストラクチャコード化 (IaC)",
    "dg35": "CloudFormation デプロイエラーとロールバックの切り分けフロー",
    "dg36": "複数アカウント展開の選択 (CloudFormation StackSets と AWS RAM)",
    "dg37": "主なデプロイ戦略の比較 (All-at-once, Rolling, Canary, Blue/Green)",
    "dg38": "要件に応じたデプロイ戦略の選定フロー",
    "dg39": "Terraform リモートステートとロック制御 (S3 暗号化 + バージョニング)",
    "dg40": "SSM 管理対象インスタンス (Managed Instance) の前提条件",
    "dg41": "AWS Systems Manager Patch Manager のパッチ適用フロー",
    "dg42": "イベント駆動型インフラ自動化の仕組み",
    "dg43": "Domain 4 全体像 (セキュリティとコンプライアンス)",
    "dg44": "AWS IAM ポリシー評価ロジック (明示的拒否・明示的許可・暗黙的拒否)",
    "dg45": "IAM AccessDenied エラーの体系的切り分けフロー",
    "dg46": "AWS Organizations とサービスコントロールポリシー (SCP) の階層構造",
    "dg47": "Trusted Advisor のチェック結果変化を EventBridge で検知し通知・自動修復するフロー",
    "dg48": "セキュリティの予防的統制と発見的統制の2本柱",
    "dg49": "AWS Config によるリソース設定履歴とコンプライアンス監査",
    "dg50": "Macie による機密データ分類とタグベースアクセス制御 (ABAC)",
    "dg51": "主要 AWS サービス別の保管時暗号化 (KMS)",
    "dg52": "HTTPS 通信と ACM 証明書の配置 (CloudFront・ALB)",
    "dg53": "AWS Secrets Manager と SSM Parameter Store の使い分け",
    "dg54": "セキュリティ脅威の検出から修復までのインシデント対応フロー",
    "dg55": "Domain 5 全体像 (ネットワークとコンテンツ配信)",
    "dg56": "Amazon VPC ネットワーク基本構成 (パブリック・プライベートサブネット)",
    "dg57": "VPC エンドポイント (Gateway 型と Interface 型) の選定フロー",
    "dg58": "AWS ネットワークセキュリティ多層防御 (Shield, WAF, Network Firewall, SG, NACL)",
    "dg59": "AWS データ転送コストの発生ポイントと最適化",
    "dg60": "Amazon Route 53 Resolver によるハイブリッド DNS 構成",
    "dg61": "Route 53 ルーティングポリシー (レイテンシー・位置情報・フェイルオーバー等)",
    "dg62": "Amazon CloudFront によるエッジキャッシュ配信アーキテクチャ",
    "dg63": "VPC 通信トラブルシュートの基本切り分けフロー",
    "dg64": "CloudFront キャッシュ問題のトラブルシューティング",
    "dg65": "AWS ハイブリッド接続オプション (VPN, Direct Connect)",
    "dg66": "AWS Site-to-Site VPN のトラブルシューティングフロー",
    "dg67": "Internet Monitor・Network Synthetic Monitor・Network Flow Monitor の使い分け"
};

export const DIAGRAMS: Record<DiagramId, string> = {
    "dg0": "flowchart LR\n    A[\"SOA-C03 合計 100%\"] --> D1[\"Domain 1: 22%<br/>監視と最適化\"]\n    A --> D2[\"Domain 2: 22%<br/>信頼性と BC\"]\n    A --> D3[\"Domain 3: 22%<br/>デプロイと自動化\"]\n    A --> D4[\"Domain 4: 16%<br/>セキュリティ\"]\n    A --> D5[\"Domain 5: 18%<br/>ネットワーク\"]",
    "dg1": "flowchart TD\n    S0[\"Step 0: 試験の全体像\"] --> S1\n    subgraph DOM3[\"作る (Domain 3)\"]\n        S1[\"IaC と AMI を理解する<br/>CloudFormation / CDK / Image Builder\"]\n    end\n    S1 --> S2\n    subgraph DOM1[\"見る・直す (Domain 1)\"]\n        S2[\"CloudWatch / CloudTrail / EventBridge<br/>Systems Manager Automation\"]\n    end\n    S2 --> S3\n    subgraph DOM2[\"止めない (Domain 2)\"]\n        S3[\"Auto Scaling / ELB / Multi-AZ<br/>Backup と DR\"]\n    end\n    S3 --> S4\n    subgraph DOM4[\"守る (Domain 4)\"]\n        S4[\"IAM / KMS / Config / Security Hub\"]\n    end\n    S4 --> S5\n    subgraph DOM5[\"つなぐ (Domain 5)\"]\n        S5[\"VPC / Route 53 / CloudFront<br/>ネットワークのトラブルシュート\"]\n    end\n    S5 --> S6[\"総仕上げ: 練習問題と頻出トラップ\"]",
    "dg2": "flowchart LR\n    R[\"リソース<br/>EC2 / Lambda / RDS など\"] --> M[\"メトリクス・ログ収集<br/>CloudWatch / CloudTrail\"]\n    M --> A[\"検知<br/>アラーム / メトリクスフィルター\"]\n    A --> N[\"通知<br/>SNS\"]\n    A --> E[\"EventBridge\"]\n    E --> F[\"自動修復<br/>Lambda / SSM Automation\"]\n    F --> R\n    N --> H[\"運用担当者\"]",
    "dg3": "flowchart TD\n    subgraph SRC[\"データの発生源\"]\n        S1[\"AWS サービスの標準メトリクス\"]\n        S2[\"CloudWatch エージェント<br/>(メモリ・ディスク・ログ)\"]\n        S3[\"カスタムメトリクス<br/>(PutMetricData)\"]\n        S4[\"アプリケーションログ\"]\n    end\n    S1 --> CWM[\"CloudWatch Metrics\"]\n    S2 --> CWM\n    S3 --> CWM\n    S2 --> CWL[\"CloudWatch Logs\"]\n    S4 --> CWL\n    CWL --> MF[\"メトリクスフィルター\"]\n    MF --> CWM\n    CWL --> LI[\"Logs Insights<br/>(クエリ分析)\"]\n    CWM --> AL[\"アラーム\"]\n    CWM --> DB[\"ダッシュボード\"]",
    "dg4": "flowchart TD\n    A[\"1. IAM ロールを作成<br/>CloudWatchAgentServerPolicy\"] --> B[\"2. インスタンスプロファイルとして EC2 にアタッチ\"]\n    B --> C[\"3. エージェントをインストール<br/>SSM Run Command / Distributor / AMI に組み込み\"]\n    C --> D[\"4. 設定ファイルを作成<br/>ウィザード or JSON を手書き\"]\n    D --> E[\"5. 設定を Parameter Store に保存<br/>(複数台へ共通配布)\"]\n    E --> F[\"6. エージェントを起動<br/>fetch-config で設定を読み込み\"]\n    F --> G[\"7. CloudWatch で確認<br/>名前空間 CWAgent / ロググループ\"]",
    "dg5": "flowchart LR\n    subgraph EC2[\"EC2 インスタンス\"]\n        A1[\"CloudWatch エージェント\"]\n    end\n    subgraph ECS[\"ECS クラスター\"]\n        A2[\"Container Insights<br/>(エージェント / Fluent Bit)\"]\n    end\n    subgraph EKS[\"EKS クラスター\"]\n        A3[\"CloudWatch Observability アドオン\"]\n    end\n    A1 --> CW[\"CloudWatch<br/>Metrics と Logs\"]\n    A2 --> CW\n    A3 --> CW",
    "dg6": "flowchart TD\n    A1[\"アラーム A<br/>CPU 高\"] --> C{\"複合アラーム<br/>A AND B\"}\n    A2[\"アラーム B<br/>レイテンシ高\"] --> C\n    C -->|\"両方 ALARM\"| N[\"SNS 通知 / OpsItem 作成\"]\n    C -->|\"どちらかが OK\"| Q[\"通知しない\"]",
    "dg7": "flowchart LR\n    S1[\"ソースアカウント A<br/>(リンク)\"] --> SINK[\"モニタリングアカウント<br/>(シンク)\"]\n    S2[\"ソースアカウント B<br/>(リンク)\"] --> SINK\n    S3[\"ソースアカウント C<br/>(リンク)\"] --> SINK\n    SINK --> DASH[\"統合ダッシュボード<br/>全アカウント・全リージョンを 1 画面で閲覧\"]",
    "dg8": "flowchart LR\n    CW[\"CloudWatch アラーム\"] --> T[\"SNS トピック\"]\n    S3[\"S3 イベント通知\"] --> T\n    ASG[\"Auto Scaling 通知\"] --> T\n    T --> M[\"メール\"]\n    T --> L[\"Lambda\"]\n    T --> Q[\"SQS キュー\"]\n    T --> H[\"HTTPS エンドポイント\"]",
    "dg9": "flowchart TD\n    D[\"検知<br/>CloudWatch アラーム / Config ルール / GuardDuty 等\"] --> EB[\"EventBridge<br/>イベントをルーティング\"]\n    EB --> T1[\"Lambda<br/>カスタムロジックを実行\"]\n    EB --> T2[\"Systems Manager Automation<br/>ランブックを実行\"]\n    EB --> T3[\"SNS<br/>人への通知\"]\n    T1 --> FIX[\"修復<br/>再起動 / スケール / 設定の戻し\"]\n    T2 --> FIX\n    FIX --> V[\"CloudWatch で正常化を確認\"]",
    "dg10": "flowchart LR\n    SRC[\"イベントの発生源<br/>AWS サービス / 自作アプリ / SaaS\"] --> BUS[\"イベントバス\"]\n    BUS --> R1[\"ルール 1<br/>イベントパターン\"]\n    BUS --> R2[\"ルール 2<br/>スケジュール\"]\n    R1 --> TR[\"入力トランスフォーマー<br/>(加工・拡充)\"]\n    TR --> TG1[\"Lambda\"]\n    R1 --> TG2[\"SNS\"]\n    R2 --> TG3[\"SSM Automation\"]\n    TG1 -. \"失敗時\" .-> DLQ[\"デッドレターキュー SQS\"]",
    "dg11": "flowchart TD\n    S[\"ルールがターゲットを呼ばない\"] --> Q1{\"イベントは<br/>想定のバスに届いているか\"}\n    Q1 -->|\"いいえ\"| A1[\"バスの指定違い / リージョン違い / 送信元を確認\"]\n    Q1 -->|\"はい\"| Q2{\"イベントパターンは<br/>一致しているか\"}\n    Q2 -->|\"いいえ\"| A2[\"大文字小文字・配列・フィールド名を確認<br/>テストイベントで検証\"]\n    Q2 -->|\"はい\"| Q3{\"ルールは有効か\"}\n    Q3 -->|\"いいえ\"| A3[\"ルールを有効化\"]\n    Q3 -->|\"はい\"| Q4{\"ターゲットへの<br/>権限はあるか\"}\n    Q4 -->|\"いいえ\"| A4[\"IAM ロール / ターゲットのリソースポリシーを修正\"]\n    Q4 -->|\"はい\"| A5[\"CloudWatch メトリクス<br/>FailedInvocations / ThrottledRules / DLQ を確認\"]",
    "dg12": "flowchart LR\n    T1[\"手動実行<br/>コンソール / CLI\"] --> A[\"Automation 実行\"]\n    T2[\"EventBridge<br/>アラーム・スケジュール\"] --> A\n    T3[\"AWS Config<br/>修復アクション\"] --> A\n    T4[\"Maintenance Window\"] --> A\n    T5[\"他の Automation / OpsCenter\"] --> A\n    A --> R[\"リソースに対する変更\"]",
    "dg13": "flowchart LR\n    A[\"計測<br/>メトリクスを収集\"] --> B[\"分析<br/>ボトルネックを特定\"]\n    B --> C[\"変更<br/>サイズ・種類・設定を調整\"]\n    C --> D[\"検証<br/>再計測して効果確認\"]\n    D --> A",
    "dg14": "flowchart TD\n    S[\"EBS の性能が出ない\"] --> Q1{\"gp2 / st1 / sc1 で<br/>BurstBalance が枯渇?\"}\n    Q1 -->|\"はい\"| A1[\"gp3 / io2 へ変更<br/>または容量・IOPS を増やす\"]\n    Q1 -->|\"いいえ\"| Q2{\"VolumeQueueLength が大きい?\"}\n    Q2 -->|\"はい\"| A2[\"IOPS / スループットを増やす<br/>(gp3 の追加設定や io2 へ)\"]\n    Q2 -->|\"いいえ\"| Q3{\"インスタンス側の<br/>EBS 帯域・IOPS 上限に達している?\"}\n    Q3 -->|\"はい\"| A3[\"EBS 最適化対応のより大きい<br/>インスタンスタイプへ\"]\n    Q3 -->|\"いいえ\"| A4[\"アプリの I/O パターン<br/>(ブロックサイズ・並列度)を確認\"]",
    "dg15": "flowchart TD\n    Q[\"S3 で何を改善したい?\"] --> A{\"課題\"}\n    A -->|\"大きいファイルのアップロードが遅い・失敗する\"| M[\"マルチパートアップロード\"]\n    A -->|\"遠いリージョンからのアップロードが遅い\"| T[\"Transfer Acceleration\"]\n    A -->|\"大量データの移行・定期同期\"| D[\"AWS DataSync\"]\n    A -->|\"古いデータのコストを下げたい\"| L[\"ライフサイクルポリシー\"]\n    A -->|\"読み取りリクエストが多い\"| C[\"プレフィックス分散 / CloudFront\"]\n    A -->|\"大きいファイルの一部だけ読みたい\"| R[\"バイトレンジフェッチ\"]",
    "dg16": "flowchart TD\n    Q[\"共有ストレージが必要\"] --> A{\"OS / プロトコル\"}\n    A -->|\"Linux・NFS\"| B{\"S3 のデータを<br/>ファイルとして使いたい?\"}\n    B -->|\"はい\"| S3F[\"Amazon S3 Files\"]\n    B -->|\"いいえ\"| EFS[\"Amazon EFS\"]\n    A -->|\"Windows・SMB・Active Directory\"| W[\"FSx for Windows File Server\"]\n    A -->|\"HPC・超高スループット\"| L[\"FSx for Lustre\"]\n    A -->|\"NFS / SMB / iSCSI 混在・NetApp 機能\"| N[\"FSx for NetApp ONTAP\"]\n    A -->|\"NFS・ZFS の機能(スナップショット等)\"| Z[\"FSx for OpenZFS\"]",
    "dg17": "flowchart TD\n    P[\"RDS の性能問題\"] --> Q1{\"原因は?\"}\n    Q1 -->|\"特定の SQL が重い\"| A1[\"Performance Insights で Top SQL を特定<br/>インデックス / クエリ改善\"]\n    Q1 -->|\"接続数が多すぎる<br/>Lambda など短命クライアント\"| A2[\"RDS Proxy で<br/>接続をプール\"]\n    Q1 -->|\"読み取りが多い\"| A3[\"リードレプリカ / キャッシュ(ElastiCache)\"]\n    Q1 -->|\"CPU・メモリ不足\"| A4[\"インスタンスクラスの変更\"]\n    Q1 -->|\"ストレージ I/O 不足\"| A5[\"gp3 の IOPS 追加 / io2 / ストレージ最適化\"]\n    Q1 -->|\"空き容量不足\"| A6[\"ストレージの自動スケーリングを有効化\"]",
    "dg18": "flowchart LR\n    subgraph CL[\"クラスター\"]\n        C1[\"近接配置<br/>低レイテンシ<br/>単一 AZ\"]\n    end\n    subgraph PA[\"パーティション\"]\n        P1[\"パーティション間で<br/>ハードウェア分離<br/>大規模分散向け\"]\n    end\n    subgraph SP[\"スプレッド\"]\n        S1[\"1 台ずつ分離<br/>少数の重要ノード向け\"]\n    end",
    "dg19": "flowchart LR\n    A[\"負荷が増えても耐える<br/>スケーラビリティ・弾力性<br/>Task 2.1\"] --> B[\"障害が起きても動き続ける<br/>高可用性・耐障害性<br/>Task 2.2\"]\n    B --> C[\"最悪でも元に戻せる<br/>バックアップ・DR<br/>Task 2.3\"]",
    "dg20": "flowchart TD\n    LT[\"起動テンプレート<br/>AMI / インスタンスタイプ / SG / IAM ロール\"] --> ASG[\"Auto Scaling グループ<br/>最小 / 希望 / 最大 / サブネット(複数 AZ)\"]\n    POL[\"スケーリングポリシー<br/>ターゲット追跡 / ステップ / スケジュール / 予測\"] --> ASG\n    CW[\"CloudWatch メトリクス・アラーム\"] --> POL\n    ASG --> EC2[\"EC2 インスタンス群\"]\n    ELB[\"ロードバランサー<br/>ターゲットグループ\"] <--> EC2",
    "dg21": "flowchart LR\n    U[\"ユーザー\"] --> CF[\"CloudFront<br/>エッジキャッシュ\"]\n    CF -->|\"ミス時のみ\"| ORI[\"オリジン<br/>ALB / S3\"]\n    ORI --> APP[\"アプリケーション\"]\n    APP --> EC[\"ElastiCache<br/>インメモリキャッシュ\"]\n    EC -->|\"ミス時のみ\"| DB[\"データベース\"]",
    "dg22": "flowchart TD\n    Q[\"DB のスケーリングが必要\"] --> A{\"ボトルネックは?\"}\n    A -->|\"読み取りが多い\"| R[\"リードレプリカ / Aurora レプリカ / キャッシュ\"]\n    A -->|\"書き込み・CPU・メモリ不足\"| W[\"インスタンスクラスのスケールアップ\"]\n    A -->|\"容量不足\"| S[\"ストレージの自動スケーリング\"]\n    A -->|\"負荷の変動が激しい\"| SV[\"Aurora Serverless v2\"]\n    A -->|\"接続数が多い\"| P[\"RDS Proxy\"]",
    "dg23": "flowchart LR\n    U[\"クライアント\"] --> LB[\"ALB\"]\n    LB -->|\"正常\"| T1[\"ターゲット 1\"]\n    LB -->|\"正常\"| T2[\"ターゲット 2\"]\n    LB -. \"ヘルスチェック失敗<br/>トラフィックを停止\" .-> T3[\"ターゲット 3 異常\"]\n    ASG[\"Auto Scaling<br/>(ELB ヘルスチェック有効時)\"] -->|\"異常を検知して置き換え\"| T3",
    "dg24": "flowchart TD\n    U[\"ユーザー\"] --> R53[\"Route 53\"]\n    R53 --> ALB[\"ALB<br/>(複数 AZ)\"]\n    subgraph AZ1[\"AZ-1a\"]\n        W1[\"EC2<br/>(ASG)\"]\n        DBP[\"RDS プライマリ\"]\n        N1[\"NAT ゲートウェイ\"]\n    end\n    subgraph AZ2[\"AZ-1c\"]\n        W2[\"EC2<br/>(ASG)\"]\n        DBS[\"RDS スタンバイ\"]\n        N2[\"NAT ゲートウェイ\"]\n    end\n    ALB --> W1\n    ALB --> W2\n    W1 --> DBP\n    W2 --> DBP\n    DBP -. \"同期レプリケーション\" .-> DBS",
    "dg25": "flowchart LR\n    P[\"バックアッププラン<br/>スケジュール / ライフサイクル\"] --> J[\"バックアップジョブ\"]\n    TAG[\"タグでリソースを自動選択<br/>EC2 / EBS / RDS / DynamoDB / EFS / S3 ほか\"] --> J\n    J --> V[\"バックアップボールト<br/>暗号化 + ボールトロック\"]\n    V --> X[\"別リージョン / 別アカウントへコピー\"]\n    ORG[\"Organizations<br/>バックアップポリシー\"] --> P",
    "dg26": "flowchart LR\n    A[\"最後の正常なバックアップ\"] -->|\"ここまでのデータ損失 = RPO\"| B[\"障害発生\"]\n    B -->|\"ここまでの停止時間 = RTO\"| C[\"サービス復旧\"]",
    "dg27": "flowchart TD\n    S[\"データ破損 / 誤削除を検知\"] --> Q1{\"戻したい時点は?\"}\n    Q1 -->|\"任意の時点<br/>(直前の誤操作の直前など)\"| PITR[\"PITR で新しいインスタンスへ復元\"]\n    Q1 -->|\"過去の特定のバックアップ時点\"| SNAP[\"スナップショットから復元\"]\n    Q1 -->|\"Aurora MySQL で即座に巻き戻したい\"| BT[\"バックトラック\"]\n    PITR --> SW[\"アプリの接続先を新エンドポイントへ切替<br/>または必要なデータだけ抽出して戻す\"]\n    SNAP --> SW",
    "dg28": "flowchart LR\n    A[\"オブジェクト v1\"] --> B[\"上書き: v2 が最新<br/>v1 は残る\"]\n    B --> C[\"削除: 削除マーカーが最新<br/>v1 と v2 は残る\"]\n    C --> D[\"削除マーカーを削除<br/>v2 が復活\"]",
    "dg29": "flowchart LR\n    A[\"バックアップと<br/>リストア<br/>RTO 長 / コスト 低\"] --> B[\"パイロットライト<br/>データ層のみ稼働\"]\n    B --> C[\"ウォームスタンバイ<br/>縮小版が稼働\"]\n    C --> D[\"アクティブ / アクティブ<br/>RTO 短 / コスト 高\"]",
    "dg30": "flowchart TD\n    Q[\"RTO / RPO の要件\"] --> A{\"許容できる停止は?\"}\n    A -->|\"時間-日\"| B1[\"バックアップとリストア\"]\n    A -->|\"数十分-数時間\"| B2[\"パイロットライト\"]\n    A -->|\"数分-数十分\"| B3[\"ウォームスタンバイ\"]\n    A -->|\"ほぼ無停止\"| B4[\"アクティブ / アクティブ\"]",
    "dg31": "flowchart LR\n    A[\"コードで定義<br/>CloudFormation / CDK / Terraform\"] --> B[\"イメージを標準化<br/>AMI / コンテナイメージ\"]\n    B --> C[\"安全にデプロイ<br/>ローリング / Blue-Green など\"]\n    C --> D[\"運用を自動化<br/>Systems Manager / EventBridge / Lambda\"]",
    "dg32": "flowchart LR\n    BASE[\"ベースイメージ<br/>(Amazon Linux など)\"] --> REC[\"イメージレシピ<br/>コンポーネントで構成\"]\n    REC --> BUILD[\"ビルド<br/>一時インスタンスで実行\"]\n    BUILD --> TEST[\"テスト<br/>コンポーネントで検証\"]\n    TEST --> DIST[\"配布<br/>複数リージョン / アカウントへ AMI を配布\"]\n    SCH[\"スケジュール / 依存イメージの更新\"] --> BUILD",
    "dg33": "flowchart TD\n    T[\"テンプレートを修正\"] --> CS[\"変更セットを作成\"]\n    CS --> R{\"差分を確認<br/>置換(Replacement)が<br/>含まれていないか\"}\n    R -->|\"問題あり\"| T\n    R -->|\"問題なし\"| EX[\"変更セットを実行\"]\n    EX --> OK{\"成功?\"}\n    OK -->|\"はい\"| DONE[\"UPDATE_COMPLETE\"]\n    OK -->|\"いいえ\"| RB[\"自動ロールバック\"]\n    RB --> RBOK{\"ロールバック成功?\"}\n    RBOK -->|\"はい\"| BACK[\"UPDATE_ROLLBACK_COMPLETE\"]\n    RBOK -->|\"いいえ\"| FAIL[\"UPDATE_ROLLBACK_FAILED<br/>原因を直して<br/>更新のロールバックを続行\"]",
    "dg34": "flowchart LR\n    CODE[\"CDK アプリ<br/>(TypeScript / Python など)\"] -->|\"cdk synth\"| TPL[\"CloudFormation テンプレート\"]\n    TPL -->|\"cdk deploy\"| STACK[\"CloudFormation スタック\"]\n    STACK --> RES[\"AWS リソース\"]",
    "dg35": "flowchart TD\n    S[\"デプロイが失敗\"] --> A{\"どこで失敗した?\"}\n    A -->|\"CloudFormation\"| CF[\"スタックイベントで<br/>最初の CREATE_FAILED を確認\"]\n    A -->|\"インスタンスが起動しない\"| EC[\"活動履歴 / エラーメッセージを確認\"]\n    A -->|\"アクセスが拒否される\"| IAM[\"権限の問題<br/>CloudTrail / ポリシーシミュレーター\"]\n    CF --> CF1[\"エラーの種類を判定\"]\n    EC --> EC1[\"容量 / IP 不足 / クォータ / 設定誤りを判定\"]",
    "dg36": "flowchart TD\n    Q[\"複数アカウントで使いたい\"] --> A{\"どちらの形?\"}\n    A -->|\"各アカウントに<br/>同じ構成を作りたい\"| SS[\"StackSets\"]\n    A -->|\"1 つのリソースを<br/>みんなで使いたい\"| RAM[\"AWS RAM\"]",
    "dg37": "flowchart LR\n    LB[\"ロードバランサー / Route 53 重み付け\"] -->|\"90%\"| B[\"Blue 現行バージョン\"]\n    LB -->|\"10%\"| G[\"Green 新バージョン\"]\n    G --> CHK{\"メトリクスは正常?\"}\n    CHK -->|\"はい\"| UP[\"割合を増やして全面切替\"]\n    CHK -->|\"いいえ\"| RB[\"Blue へ切り戻し\"]",
    "dg38": "flowchart TD\n    Q[\"デプロイ戦略の選択\"] --> A{\"ダウンタイムを許容できる?\"}\n    A -->|\"はい(開発環境など)\"| AAO[\"All-at-once\"]\n    A -->|\"いいえ\"| B{\"即座の切り戻しが必須?<br/>コストを許容できる?\"}\n    B -->|\"はい\"| BG[\"Blue/Green / イミュータブル\"]\n    B -->|\"いいえ\"| C{\"少数ユーザーで<br/>先に検証したい?\"}\n    C -->|\"はい\"| CAN[\"カナリア / リニア\"]\n    C -->|\"いいえ\"| ROLL[\"ローリング\"]",
    "dg39": "flowchart LR\n    DEV1[\"エンジニア A\"] --> LOCK[\"ロック制御\"]\n    DEV2[\"エンジニア B / CI\"] --> LOCK\n    LOCK --> STATE[\"リモートステート<br/>S3(暗号化 + バージョニング)\"]\n    LOCK --> AWS[\"AWS リソース\"]",
    "dg40": "flowchart TD\n    S[\"SSM でインスタンスを管理したい\"] --> A{\"SSM エージェントが<br/>導入・起動している?\"}\n    A -->|\"いいえ\"| A1[\"エージェントをインストール<br/>(Amazon Linux 等は標準搭載)\"]\n    A -->|\"はい\"| B{\"IAM ロール<br/>AmazonSSMManagedInstanceCore\"}\n    B -->|\"なし\"| B1[\"インスタンスプロファイルにアタッチ\"]\n    B -->|\"あり\"| C{\"SSM エンドポイントへの<br/>通信経路がある?\"}\n    C -->|\"なし\"| C1[\"NAT / IGW<br/>または VPC エンドポイント<br/>ssm / ssmmessages / ec2messages\"]\n    C -->|\"あり\"| OK[\"管理対象インスタンスとして表示\"]",
    "dg41": "flowchart LR\n    BL[\"パッチベースライン<br/>承認ルール(重要度・日数)\"] --> PG[\"パッチグループ<br/>(タグで対象を指定)\"]\n    PG --> MW[\"メンテナンスウィンドウ<br/>実行時間帯\"]\n    MW --> SC[\"Scan / Install\"]\n    SC --> CMP[\"コンプライアンス結果<br/>Systems Manager で確認\"]",
    "dg42": "flowchart LR\n    E1[\"S3 にファイルがアップロードされた\"] --> L[\"Lambda が実行\"]\n    E2[\"EC2 が停止した\"] --> EB[\"EventBridge ルール\"]\n    EB --> L2[\"Lambda / SSM Automation\"]\n    E3[\"アラームが ALARM になった\"] --> EB\n    L --> OUT[\"処理結果<br/>サムネイル生成 / タグ付け / 通知 / 修復\"]",
    "dg43": "flowchart LR\n    A[\"誰が何をできるか<br/>IAM / Organizations\"] --> B[\"守る<br/>暗号化 / シークレット\"]\n    B --> C[\"見張る<br/>CloudTrail / Config / GuardDuty\"]\n    C --> D[\"直す<br/>Security Hub / Inspector / 自動修復\"]",
    "dg44": "flowchart TD\n    R[\"リクエスト\"] --> D1{\"どこかに<br/>明示的な Deny がある?<br/>(SCP / 境界 / ID / リソース / セッション)\"}\n    D1 -->|\"はい\"| DENY[\"拒否\"]\n    D1 -->|\"いいえ\"| D2{\"Organizations の SCP が<br/>許可している?\"}\n    D2 -->|\"いいえ\"| DENY\n    D2 -->|\"はい\"| D3{\"権限境界 / セッションポリシーが<br/>ある場合、許可している?\"}\n    D3 -->|\"いいえ\"| DENY\n    D3 -->|\"はい\"| D4{\"ID ベースまたはリソースベースの<br/>ポリシーに Allow がある?\"}\n    D4 -->|\"はい\"| ALLOW[\"許可\"]\n    D4 -->|\"いいえ\"| DENY",
    "dg45": "flowchart TD\n    S[\"AccessDenied が発生\"] --> E[\"エラーメッセージを確認<br/>(拒否の種類・ポリシータイプが示される場合あり)\"]\n    E --> CT[\"CloudTrail で該当イベントを検索<br/>誰が / 何の API / どのリソース\"]\n    CT --> Q1{\"Organizations の SCP で<br/>拒否されていない?\"}\n    Q1 -->|\"拒否されている\"| F1[\"SCP を修正\"]\n    Q1 -->|\"いいえ\"| Q2{\"権限境界 / セッションポリシーで<br/>制限されていない?\"}\n    Q2 -->|\"制限されている\"| F2[\"境界を修正\"]\n    Q2 -->|\"いいえ\"| Q3{\"ID ポリシーに Allow がある?<br/>明示的 Deny はない?\"}\n    Q3 -->|\"ない\"| F3[\"ポリシーを追加\"]\n    Q3 -->|\"ある\"| Q4{\"リソースポリシー<br/>(S3 / KMS キーポリシー等)で<br/>拒否されていない?\"}\n    Q4 -->|\"拒否されている\"| F4[\"リソースポリシーを修正\"]\n    Q4 -->|\"いいえ\"| F5[\"条件(IP / MFA / VPC エンドポイント / タグ)<br/>VPC エンドポイントポリシーを確認\"]",
    "dg46": "flowchart TD\n    ROOT[\"組織のルート<br/>管理アカウント\"] --> OU1[\"OU: Security\"]\n    ROOT --> OU2[\"OU: Workloads\"]\n    ROOT --> OU3[\"OU: Sandbox\"]\n    OU1 --> A1[\"ログアーカイブ<br/>アカウント\"]\n    OU1 --> A2[\"セキュリティツール<br/>アカウント\"]\n    OU2 --> P1[\"本番アカウント\"]\n    OU2 --> P2[\"開発アカウント\"]\n    OU3 --> S1[\"サンドボックス<br/>アカウント\"]\n    SCP[\"SCP をルート / OU / アカウントに適用<br/>継承される\"] -.-> OU2",
    "dg47": "flowchart LR\n    TA[\"Trusted Advisor<br/>チェック結果が「警告 / エラー」に変化\"] --> EB[\"EventBridge<br/>ステータス変化イベント\"]\n    EB --> SNS[\"SNS 通知\"]\n    EB --> AUTO[\"Lambda / SSM Automation<br/>自動修復\"]\n    AUTO --> FIX[\"設定を是正\"]\n    FIX --> RF[\"チェックを更新(リフレッシュ)して確認\"]",
    "dg48": "flowchart LR\n    P[\"予防<br/>そもそもできなくする\"] --> D[\"検出<br/>違反を見つける\"]\n    D --> R[\"是正<br/>自動で直す\"]\n    P1[\"SCP: リージョン・サービスの制限<br/>IAM 条件キー\"] --> P\n    D1[\"AWS Config ルール / 適合パック<br/>Security Hub / Access Analyzer\"] --> D\n    R1[\"Config 修復アクション<br/>SSM Automation\"] --> R",
    "dg49": "flowchart TD\n    CHG[\"リソースの構成変更\"] --> REC[\"Config 構成レコーダーが記録\"]\n    REC --> RULE[\"Config ルールで評価\"]\n    RULE --> OK[\"COMPLIANT\"]\n    RULE --> NG[\"NON_COMPLIANT\"]\n    NG --> REM[\"修復アクション<br/>SSM Automation\"]\n    NG --> NT[\"EventBridge → SNS 通知\"]\n    REM --> RULE",
    "dg50": "flowchart TD\n    A[\"データの作成・保存\"] --> B[\"タグ付けを強制<br/>SCP / Config required-tags\"]\n    B --> C[\"Macie が S3 を走査し<br/>機密データを検出\"]\n    C --> D{\"機密データか?\"}\n    D -->|\"はい\"| E[\"分類タグを付与<br/>KMS CMK 暗号化 / アクセス制限 / ログ\"]\n    D -->|\"いいえ\"| F[\"標準の保護\"]\n    E --> G[\"ABAC で<br/>タグに基づきアクセス制御\"]",
    "dg51": "flowchart LR\n    A[\"暗号化なしの<br/>EBS / RDS\"] --> B[\"スナップショットを作成\"]\n    B --> C[\"暗号化を指定して<br/>スナップショットをコピー\"]\n    C --> D[\"暗号化済みスナップショットから<br/>新しいボリューム / DB を作成\"]",
    "dg52": "flowchart LR\n    C[\"クライアント\"] -->|\"HTTPS\"| CF[\"CloudFront<br/>証明書: us-east-1 の ACM\"]\n    CF -->|\"HTTPS\"| ALB[\"ALB<br/>リスナー 443 + ACM 証明書\"]\n    ALB -->|\"HTTPS または HTTP\"| T[\"ターゲット\"]",
    "dg53": "flowchart TD\n    Q[\"保管したい値\"] --> A{\"自動ローテーションが必要?<br/>DB 認証情報?\"}\n    A -->|\"はい\"| SM[\"Secrets Manager\"]\n    A -->|\"いいえ\"| B{\"コストを最小にしたい /<br/>設定値が中心?\"}\n    B -->|\"はい\"| PS[\"Parameter Store<br/>(標準 + SecureString)\"]\n    B -->|\"いいえ\"| SM",
    "dg54": "flowchart TD\n    G[\"GuardDuty<br/>脅威の検出\"] --> SH[\"Security Hub<br/>検出結果を集約\"]\n    I[\"Inspector<br/>脆弱性\"] --> SH\n    C[\"Config<br/>非準拠\"] --> SH\n    M[\"Macie / Access Analyzer\"] --> SH\n    SH --> AR[\"自動化ルール<br/>重要度の調整・抑制・通知\"]\n    SH --> EB[\"EventBridge\"]\n    EB --> N[\"SNS / チケット連携<br/>(Jira / ServiceNow 等)\"]\n    EB --> FIX[\"Lambda / SSM Automation<br/>自動修復\"]\n    FIX --> V[\"再評価して解消を確認\"]",
    "dg55": "flowchart LR\n    A[\"VPC を作る<br/>Task 5.1\"] --> B[\"DNS とコンテンツ配信<br/>Task 5.2\"]\n    B --> C[\"つながらないを直す<br/>Task 5.3\"]",
    "dg56": "flowchart TD\n    NET[\"インターネット\"] --> IGW[\"インターネットゲートウェイ IGW\"]\n    subgraph VPC[\"VPC 10.0.0.0/16\"]\n        subgraph PUB[\"パブリックサブネット<br/>ルート: 0.0.0.0/0 → IGW\"]\n            ALB[\"ALB\"]\n            NAT[\"NAT ゲートウェイ<br/>(Elastic IP)\"]\n        end\n        subgraph PRI[\"プライベートサブネット<br/>ルート: 0.0.0.0/0 → NAT\"]\n            APP[\"EC2 アプリ\"]\n        end\n        subgraph DBS[\"DB 用プライベートサブネット<br/>インターネットへのルートなし\"]\n            DB[\"RDS\"]\n        end\n    end\n    IGW --> ALB\n    ALB --> APP\n    APP --> DB\n    APP --> NAT\n    NAT --> IGW",
    "dg57": "flowchart TD\n    Q[\"プライベートに接続したい\"] --> A{\"相手は?\"}\n    A -->|\"S3 / DynamoDB\"| G[\"ゲートウェイエンドポイント<br/>無料・ルートテーブルに追加\"]\n    A -->|\"他の AWS サービス / 他社 SaaS /<br/>自社サービスを公開\"| I[\"インターフェイスエンドポイント<br/>PrivateLink\"]\n    A -->|\"別の VPC 全体と<br/>相互に通信\"| P{\"VPC の数は?\"}\n    P -->|\"少数\"| PEER[\"VPC ピアリング\"]\n    P -->|\"多数・ハブ&スポーク\"| TGW[\"Transit Gateway\"]",
    "dg58": "flowchart TD\n    NET[\"インターネット\"] --> SH[\"AWS Shield<br/>DDoS 対策 L3 / L4 / L7\"]\n    SH --> WAF[\"AWS WAF<br/>Web アプリ層 L7\"]\n    WAF --> RES[\"CloudFront / ALB / API Gateway\"]\n    subgraph VPC[\"VPC\"]\n        NFW[\"AWS Network Firewall<br/>VPC 内外の通信 L3-L7\"]\n        DNSF[\"Route 53 Resolver DNS Firewall<br/>DNS クエリの制御\"]\n        SGN[\"SG / NACL<br/>基本的な通信制御\"]\n    end\n    RES --> NFW\n    NFW --> SGN",
    "dg59": "flowchart TD\n    A[\"ネットワークコストが高い\"] --> B[\"Cost Explorer / CUR で<br/>使用タイプ別に内訳を確認<br/>(NatGateway-Bytes / DataTransfer-Regional など)\"]\n    B --> C{\"何が大きい?\"}\n    C -->|\"NAT のデータ処理\"| D[\"ゲートウェイエンドポイント / インターフェイスエンドポイントで<br/>NAT を経由させない\"]\n    C -->|\"インターネットへのデータ転送\"| E[\"CloudFront を前段に置く\"]\n    C -->|\"AZ 間転送\"| F[\"同一 AZ 内での通信に寄せる<br/>配置・ルーティング見直し\"]\n    C -->|\"パブリック IPv4\"| G[\"未使用 IP の解放 / 集約 / IPv6\"]",
    "dg60": "flowchart LR\n    subgraph ONP[\"オンプレミス\"]\n        OD[\"オンプレ DNS サーバー\"]\n    end\n    subgraph AWSV[\"AWS VPC\"]\n        IN[\"Resolver インバウンドエンドポイント\"]\n        OUT[\"Resolver アウトバウンドエンドポイント<br/>+ 転送ルール\"]\n        EC[\"EC2 / アプリ\"]\n    end\n    OD -->|\"AWS 内のホスト名を問い合わせ<br/>(example.aws.internal など)\"| IN\n    EC -->|\"オンプレのドメイン<br/>(corp.example.com)を問い合わせ\"| OUT\n    OUT --> OD",
    "dg61": "flowchart TD\n    Q[\"どう振り分けたい?\"] --> A{\"目的\"}\n    A -->|\"割合で段階移行\"| W[\"加重\"]\n    A -->|\"最も速いリージョン\"| L[\"レイテンシー\"]\n    A -->|\"障害時に切替\"| F[\"フェイルオーバー\"]\n    A -->|\"ユーザーの国・大陸\"| G[\"位置情報\"]\n    A -->|\"距離 + 偏りの調整\"| GP[\"地理的近接性\"]\n    A -->|\"クライアントの IP 範囲\"| IP[\"IP ベース\"]\n    A -->|\"正常な複数 IP を返す\"| MV[\"複数値回答\"]",
    "dg62": "flowchart LR\n    U[\"ユーザー\"] --> E[\"最寄りのエッジロケーション<br/>キャッシュ\"]\n    E -->|\"キャッシュヒット\"| U\n    E -->|\"ミス時のみ\"| RE[\"リージョナルエッジキャッシュ<br/>(Origin Shield 任意)\"]\n    RE --> O[\"オリジン<br/>S3 / ALB / カスタム\"]",
    "dg63": "flowchart TD\n    S[\"インスタンスに接続できない\"] --> A{\"1. ルートテーブル<br/>送信元・宛先の両方に<br/>正しいルートがある?\"}\n    A -->|\"いいえ\"| A1[\"ルートを追加<br/>(IGW / NAT / ピアリング / TGW)\"]\n    A -->|\"はい\"| B{\"2. パブリック接続の場合<br/>IGW + パブリック IP / EIP がある?\"}\n    B -->|\"いいえ\"| B1[\"IGW 接続・パブリック IP を設定\"]\n    B -->|\"はい\"| C{\"3. セキュリティグループ<br/>(受信側 インバウンド /<br/>送信側 アウトバウンド)で許可?\"}\n    C -->|\"いいえ\"| C1[\"SG ルールを追加\"]\n    C -->|\"はい\"| D{\"4. ネットワーク ACL<br/>往路・復路(エフェメラルポート)とも許可?\"}\n    D -->|\"いいえ\"| D1[\"NACL を修正\"]\n    D -->|\"はい\"| E{\"5. OS のファイアウォール /<br/>アプリが待ち受けているか?\"}\n    E -->|\"いいえ\"| E1[\"OS 設定・アプリを確認\"]\n    E -->|\"はい\"| F[\"6. DNS・MTU・非対称ルーティングなどを確認\"]",
    "dg64": "flowchart TD\n    S[\"CloudFront のキャッシュの問題\"] --> Q{\"症状は?\"}\n    Q -->|\"常に Miss<br/>ヒット率が低い\"| A[\"キャッシュキーが細かすぎる?<br/>(クエリ文字列・ヘッダー・Cookie)<br/>TTL が短すぎる?<br/>オリジンが Cache-Control: no-store / private を返している?\"]\n    Q -->|\"古いコンテンツが返る\"| B[\"TTL が長すぎる?<br/>無効化(Invalidation)を実行<br/>バージョン付きファイル名にする\"]\n    Q -->|\"ユーザーごとに異なる内容が<br/>混ざる / 他人の内容が見える\"| C[\"パーソナライズされた内容を<br/>共有キャッシュに載せていないか<br/>Cookie / ヘッダーをキャッシュキーに含める<br/>または キャッシュしない\"]\n    Q -->|\"403 / 404 / 5xx\"| D[\"オリジン設定・OAC・バケットポリシー<br/>Host ヘッダー・オリジンの正常性を確認\"]",
    "dg65": "flowchart LR\n    subgraph ONP[\"オンプレミス\"]\n        CGW[\"カスタマーゲートウェイ<br/>ルーター / ファイアウォール\"]\n    end\n    subgraph AWS[\"AWS\"]\n        VGW[\"VGW / Transit Gateway\"]\n        VPC[\"VPC\"]\n    end\n    CGW ---|\"トンネル 1 IPsec\"| VGW\n    CGW ---|\"トンネル 2 IPsec\"| VGW\n    VGW --> VPC\n    CGW -. \"Direct Connect<br/>(専用線)\" .-> VGW",
    "dg66": "flowchart TD\n    S[\"VPN でつながらない\"] --> A{\"トンネルの状態は?<br/>(CloudWatch TunnelState / コンソール)\"}\n    A -->|\"両方 DOWN\"| B[\"フェーズ 1 / 2 のネゴシエーション失敗<br/>事前共有キー・暗号化設定・IKE バージョン不一致<br/>カスタマー側のファイアウォールで<br/>UDP 500 / 4500 を許可しているか\"]\n    A -->|\"UP だが通信できない\"| C{\"ルーティング\"}\n    C --> C1[\"BGP が確立 / 経路が広告されているか<br/>VPC のルートテーブルにオンプレ向けルート<br/>(ルート伝播の有効化)があるか\"]\n    C --> C2[\"SG / NACL がオンプレ CIDR を許可しているか<br/>CIDR が重複していないか\"]\n    A -->|\"片方のトンネルだけ DOWN\"| D[\"冗長性が低下<br/>カスタマーゲートウェイ側の設定 / 障害を確認\"]",
    "dg67": "flowchart TD\n    Q[\"ネットワークの問題を調べたい\"] --> A{\"どこの問題?\"}\n    A -->|\"インターネット経由で<br/>エンドユーザーが遅い\"| IM[\"Internet Monitor\"]\n    A -->|\"オンプレ ⇔ AWS の<br/>Direct Connect / VPN が不安定\"| NSM[\"Network Synthetic Monitor\"]\n    A -->|\"AWS 内のワークロード同士・<br/>サービス間の通信が遅い\"| NFM[\"Network Flow Monitor\"]\n    A -->|\"エンドポイントの可用性・<br/>API のシナリオ監視\"| SYN[\"CloudWatch Synthetics カナリア\"]"
};

export interface CodeBlockData {
    index: number;
    head: string;
    firstLineRest: string;
    remainingLines: string[];
}

export const CODE_BLOCKS: CodeBlockData[] = [
    {
        "index": 0,
        "head": "plaintext",
        "firstLineRest": "fields @timestamp, @message",
        "remainingLines": [
            "| filter @message like /ERROR/",
            "| stats count() as errorCount by bin(5m) as timeWindow",
            "| sort timeWindow desc"
        ]
    },
    {
        "index": 1,
        "head": "json",
        "firstLineRest": "{",
        "remainingLines": [
            "  \"metrics\": {",
            "    \"append_dimensions\": { \"InstanceId\": \"${aws:InstanceId}\" },",
            "    \"metrics_collected\": {",
            "      \"mem\":  { \"measurement\": [\"mem_used_percent\"] },",
            "      \"disk\": { \"measurement\": [\"used_percent\"], \"resources\": [\"/\"] }",
            "    }",
            "  },",
            "  \"logs\": {",
            "    \"logs_collected\": {",
            "      \"files\": {",
            "        \"collect_list\": [",
            "          {",
            "            \"file_path\": \"/var/log/messages\",",
            "            \"log_group_name\": \"/ec2/messages\",",
            "            \"log_stream_name\": \"{instance_id}\"",
            "          }",
            "        ]",
            "      }",
            "    }",
            "  }",
            "}"
        ]
    },
    {
        "index": 2,
        "head": "json",
        "firstLineRest": "{",
        "remainingLines": [
            "  \"Version\": \"2012-10-17\",",
            "  \"Statement\": [{",
            "    \"Effect\": \"Allow\",",
            "    \"Principal\": { \"Service\": \"s3.amazonaws.com\" },",
            "    \"Action\": \"sns:Publish\",",
            "    \"Resource\": \"arn:aws:sns:ap-northeast-1:111122223333:my-topic\",",
            "    \"Condition\": {",
            "      \"ArnLike\": { \"aws:SourceArn\": \"arn:aws:s3:::my-bucket\" },",
            "      \"StringEquals\": { \"aws:SourceAccount\": \"111122223333\" }",
            "    }",
            "  }]",
            "}"
        ]
    },
    {
        "index": 3,
        "head": "json",
        "firstLineRest": "{",
        "remainingLines": [
            "  \"source\": [\"aws.ec2\"],",
            "  \"detail-type\": [\"EC2 Instance State-change Notification\"],",
            "  \"detail\": { \"state\": [\"stopped\", \"terminated\"] }",
            "}"
        ]
    },
    {
        "index": 4,
        "head": "yaml",
        "firstLineRest": "description: \"Restart an EC2 instance and wait until it is running\"",
        "remainingLines": [
            "schemaVersion: \"0.3\"",
            "assumeRole: \"{{ AutomationAssumeRole }}\"",
            "parameters:",
            "  InstanceId:",
            "    type: String",
            "  AutomationAssumeRole:",
            "    type: String",
            "mainSteps:",
            "  - name: restart",
            "    action: aws:executeAwsApi",
            "    inputs:",
            "      Service: ec2",
            "      Api: RebootInstances",
            "      InstanceIds:",
            "        - \"{{ InstanceId }}\""
        ]
    },
    {
        "index": 5,
        "head": "yaml",
        "firstLineRest": "AWSTemplateFormatVersion: \"2010-09-09\"",
        "remainingLines": [
            "Parameters:",
            "  Env:",
            "    Type: String",
            "    AllowedValues: [dev, prod]",
            "Resources:",
            "  LogBucket:",
            "    Type: AWS::S3::Bucket",
            "    DeletionPolicy: Retain",
            "    Properties:",
            "      VersioningConfiguration:",
            "        Status: Enabled",
            "Outputs:",
            "  BucketName:",
            "    Value: !Ref LogBucket"
        ]
    },
    {
        "index": 6,
        "head": "json",
        "firstLineRest": "{",
        "remainingLines": [
            "  \"Version\": \"2012-10-17\",",
            "  \"Statement\": [{",
            "    \"Effect\": \"Deny\",",
            "    \"Principal\": \"*\",",
            "    \"Action\": \"s3:*\",",
            "    \"Resource\": [\"arn:aws:s3:::my-bucket\", \"arn:aws:s3:::my-bucket/*\"],",
            "    \"Condition\": { \"Bool\": { \"aws:SecureTransport\": \"false\" } }",
            "  }]",
            "}"
        ]
    },
    {
        "index": 7,
        "head": "json",
        "firstLineRest": "{",
        "remainingLines": [
            "  \"Version\": \"2012-10-17\",",
            "  \"Statement\": [{",
            "    \"Effect\": \"Deny\",",
            "    \"NotAction\": [\"iam:*\", \"organizations:*\", \"route53:*\", \"cloudfront:*\", \"support:*\"],",
            "    \"Resource\": \"*\",",
            "    \"Condition\": {",
            "      \"StringNotEquals\": { \"aws:RequestedRegion\": [\"ap-northeast-1\", \"ap-northeast-3\"] }",
            "    }",
            "  }]",
            "}"
        ]
    },
    {
        "index": 8,
        "head": "plaintext",
        "firstLineRest": "2 123456789010 eni-0abc 203.0.113.12 10.0.1.5 49152 22 6 10 840 1700000000 1700000060 ACCEPT OK",
        "remainingLines": [
            "2 123456789010 eni-0abc 203.0.113.99 10.0.1.5 49153 22 6 4 240 1700000000 1700000060 REJECT OK"
        ]
    },
    {
        "index": 9,
        "head": "plaintext",
        "firstLineRest": "filter action = \"REJECT\"",
        "remainingLines": [
            "| stats count(*) as rejectCount by srcAddr, dstPort",
            "| sort rejectCount desc",
            "| limit 20"
        ]
    }
];
