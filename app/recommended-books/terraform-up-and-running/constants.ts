// app/recommended-books/terraform-up-and-running/constants.ts

export interface NavItem {
    href: string;
    target: string;
    text: string;
    isH2: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    {
        "href": "#この記事について",
        "target": "この記事について",
        "text": "この記事について",
        "isH2": true
    },
    {
        "href": "#第0部-前提知識--devopsとinfrastructure-as-codeとは",
        "target": "第0部-前提知識--devopsとinfrastructure-as-codeとは",
        "text": "第0部: 前提知識 ― DevOpsとInfrastructure as Codeとは",
        "isH2": true
    },
    {
        "href": "#0-1-devopsとは何か",
        "target": "0-1-devopsとは何か",
        "text": "0-1. DevOpsとは何か",
        "isH2": false
    },
    {
        "href": "#0-2-infrastructure-as-codeiacとは",
        "target": "0-2-infrastructure-as-codeiacとは",
        "text": "0-2. Infrastructure as Code（IaC）とは",
        "isH2": false
    },
    {
        "href": "#0-3-iacの4つのメリット",
        "target": "0-3-iacの4つのメリット",
        "text": "0-3. IaCの4つのメリット",
        "isH2": false
    },
    {
        "href": "#第1部原著第1章対応-なぜterraformなのか",
        "target": "第1部原著第1章対応-なぜterraformなのか",
        "text": "第1部（原著第1章対応）: なぜTerraformなのか",
        "isH2": true
    },
    {
        "href": "#1-1-terraformの仕組み",
        "target": "1-1-terraformの仕組み",
        "text": "1-1. Terraformの仕組み",
        "isH2": false
    },
    {
        "href": "#1-2-比較-configuration-management-vs-provisioning",
        "target": "1-2-比較-configuration-management-vs-provisioning",
        "text": "1-2. 比較: Configuration Management vs Provisioning",
        "isH2": false
    },
    {
        "href": "#1-3-比較-mutable-infrastructure-vs-immutable-infrastructure",
        "target": "1-3-比較-mutable-infrastructure-vs-immutable-infrastructure",
        "text": "1-3. 比較: Mutable Infrastructure vs Immutable Infrastructure",
        "isH2": false
    },
    {
        "href": "#1-4-比較-procedural-language-vs-declarative-language",
        "target": "1-4-比較-procedural-language-vs-declarative-language",
        "text": "1-4. 比較: Procedural Language vs Declarative Language",
        "isH2": false
    },
    {
        "href": "#1-5-比較-主要iac構成管理ツールの全体像",
        "target": "1-5-比較-主要iac構成管理ツールの全体像",
        "text": "1-5. 比較: 主要IaC/構成管理ツールの全体像",
        "isH2": false
    },
    {
        "href": "#まとめ",
        "target": "まとめ",
        "text": "まとめ",
        "isH2": false
    },
    {
        "href": "#第2部原著第2章対応-terraformことはじめ",
        "target": "第2部原著第2章対応-terraformことはじめ",
        "text": "第2部（原著第2章対応）: Terraformことはじめ",
        "isH2": true
    },
    {
        "href": "#2-1-awsアカウントの準備ベストプラクティス",
        "target": "2-1-awsアカウントの準備ベストプラクティス",
        "text": "2-1. AWSアカウントの準備（ベストプラクティス）",
        "isH2": false
    },
    {
        "href": "#2-2-terraformのインストール",
        "target": "2-2-terraformのインストール",
        "text": "2-2. Terraformのインストール",
        "isH2": false
    },
    {
        "href": "#2-3-単一サーバーのデプロイ",
        "target": "2-3-単一サーバーのデプロイ",
        "text": "2-3. 単一サーバーのデプロイ",
        "isH2": false
    },
    {
        "href": "#2-4-単一webサーバーのデプロイ",
        "target": "2-4-単一webサーバーのデプロイ",
        "text": "2-4. 単一Webサーバーのデプロイ",
        "isH2": false
    },
    {
        "href": "#2-5-設定可能なwebサーバー変数の導入",
        "target": "2-5-設定可能なwebサーバー変数の導入",
        "text": "2-5. 設定可能なWebサーバー（変数の導入）",
        "isH2": false
    },
    {
        "href": "#2-6-webサーバークラスタのデプロイ",
        "target": "2-6-webサーバークラスタのデプロイ",
        "text": "2-6. Webサーバークラスタのデプロイ",
        "isH2": false
    },
    {
        "href": "#2-7-ロードバランサーのデプロイ",
        "target": "2-7-ロードバランサーのデプロイ",
        "text": "2-7. ロードバランサーのデプロイ",
        "isH2": false
    },
    {
        "href": "#2-8-クリーンアップ",
        "target": "2-8-クリーンアップ",
        "text": "2-8. クリーンアップ",
        "isH2": false
    },
    {
        "href": "#第3部原著第3章対応-terraformの状態state管理",
        "target": "第3部原著第3章対応-terraformの状態state管理",
        "text": "第3部（原著第3章対応）: Terraformの状態（State）管理",
        "isH2": true
    },
    {
        "href": "#3-1-state-fileとは何かなぜ必要か",
        "target": "3-1-state-fileとは何かなぜ必要か",
        "text": "3-1. State fileとは何か、なぜ必要か",
        "isH2": false
    },
    {
        "href": "#3-2-stateの共有ストレージリモートバックエンド",
        "target": "3-2-stateの共有ストレージリモートバックエンド",
        "text": "3-2. Stateの共有ストレージ（リモートバックエンド）",
        "isH2": false
    },
    {
        "href": "#3-3-2026年最新s3ネイティブロックとdynamodbの非推奨化",
        "target": "3-3-2026年最新s3ネイティブロックとdynamodbの非推奨化",
        "text": "3-3. 【2026年最新】S3ネイティブロックとDynamoDBの非推奨化",
        "isH2": false
    },
    {
        "href": "#3-4-backendの制約",
        "target": "3-4-backendの制約",
        "text": "3-4. Backendの制約",
        "isH2": false
    },
    {
        "href": "#3-5-state分離-workspacesとfile-layout",
        "target": "3-5-state分離-workspacesとfile-layout",
        "text": "3-5. State分離: WorkspacesとFile Layout",
        "isH2": false
    },
    {
        "href": "#3-6-terraform_remote_stateデータソース",
        "target": "3-6-terraform_remote_stateデータソース",
        "text": "3-6. terraform_remote_stateデータソース",
        "isH2": false
    },
    {
        "href": "#第4部原著第4章対応-再利用可能なインフラをモジュールで作る",
        "target": "第4部原著第4章対応-再利用可能なインフラをモジュールで作る",
        "text": "第4部（原著第4章対応）: 再利用可能なインフラをモジュールで作る",
        "isH2": true
    },
    {
        "href": "#4-1-モジュールの基本",
        "target": "4-1-モジュールの基本",
        "text": "4-1. モジュールの基本",
        "isH2": false
    },
    {
        "href": "#4-2-モジュール入力変数module-inputs",
        "target": "4-2-モジュール入力変数module-inputs",
        "text": "4-2. モジュール入力変数（Module Inputs）",
        "isH2": false
    },
    {
        "href": "#4-3-モジュールのlocal値",
        "target": "4-3-モジュールのlocal値",
        "text": "4-3. モジュールのlocal値",
        "isH2": false
    },
    {
        "href": "#4-4-モジュール出力値module-outputs",
        "target": "4-4-モジュール出力値module-outputs",
        "text": "4-4. モジュール出力値（Module Outputs）",
        "isH2": false
    },
    {
        "href": "#4-5-モジュールの落とし穴",
        "target": "4-5-モジュールの落とし穴",
        "text": "4-5. モジュールの落とし穴",
        "isH2": false
    },
    {
        "href": "#4-6-モジュールバージョニング",
        "target": "4-6-モジュールバージョニング",
        "text": "4-6. モジュールバージョニング",
        "isH2": false
    },
    {
        "href": "#第5部原著第5章対応-ループ条件分岐デプロイ落とし穴",
        "target": "第5部原著第5章対応-ループ条件分岐デプロイ落とし穴",
        "text": "第5部（原著第5章対応）: ループ・条件分岐・デプロイ・落とし穴",
        "isH2": true
    },
    {
        "href": "#5-15-4-ループの4パターン",
        "target": "5-15-4-ループの4パターン",
        "text": "5-1〜5-4. ループの4パターン",
        "isH2": false
    },
    {
        "href": "#5-5-条件分岐",
        "target": "5-5-条件分岐",
        "text": "5-5. 条件分岐",
        "isH2": false
    },
    {
        "href": "#5-6-ゼロダウンタイムデプロイ",
        "target": "5-6-ゼロダウンタイムデプロイ",
        "text": "5-6. ゼロダウンタイムデプロイ",
        "isH2": false
    },
    {
        "href": "#5-7-terraformの落とし穴",
        "target": "5-7-terraformの落とし穴",
        "text": "5-7. Terraformの落とし穴",
        "isH2": false
    },
    {
        "href": "#第6部原著第6章対応-シークレット管理",
        "target": "第6部原著第6章対応-シークレット管理",
        "text": "第6部（原著第6章対応）: シークレット管理",
        "isH2": true
    },
    {
        "href": "#6-1-シークレット管理の基礎",
        "target": "6-1-シークレット管理の基礎",
        "text": "6-1. シークレット管理の基礎",
        "isH2": false
    },
    {
        "href": "#6-2-主要シークレット管理ツール比較",
        "target": "6-2-主要シークレット管理ツール比較",
        "text": "6-2. 主要シークレット管理ツール比較",
        "isH2": false
    },
    {
        "href": "#6-3-terraformでのシークレット利用パターン",
        "target": "6-3-terraformでのシークレット利用パターン",
        "text": "6-3. Terraformでのシークレット利用パターン",
        "isH2": false
    },
    {
        "href": "#6-42026年最新ephemeral-resources--write-only-argumentsによる根本解決",
        "target": "6-42026年最新ephemeral-resources--write-only-argumentsによる根本解決",
        "text": "6-4.【2026年最新】Ephemeral Resources & Write-Only Argumentsによる根本解決",
        "isH2": false
    },
    {
        "href": "#第7部原著第7章対応-複数プロバイダーの利用",
        "target": "第7部原著第7章対応-複数プロバイダーの利用",
        "text": "第7部（原著第7章対応）: 複数プロバイダーの利用",
        "isH2": true
    },
    {
        "href": "#7-1-単一プロバイダーでの作業とプロバイダーのインストール",
        "target": "7-1-単一プロバイダーでの作業とプロバイダーのインストール",
        "text": "7-1. 単一プロバイダーでの作業とプロバイダーのインストール",
        "isH2": false
    },
    {
        "href": "#7-2-同一プロバイダーの複数コピーマルチリージョンマルチアカウント",
        "target": "7-2-同一プロバイダーの複数コピーマルチリージョンマルチアカウント",
        "text": "7-2. 同一プロバイダーの複数コピー（マルチリージョン・マルチアカウント）",
        "isH2": false
    },
    {
        "href": "#7-3-複数プロバイダーに対応したモジュールの作成",
        "target": "7-3-複数プロバイダーに対応したモジュールの作成",
        "text": "7-3. 複数プロバイダーに対応したモジュールの作成",
        "isH2": false
    },
    {
        "href": "#7-4-異なる複数プロバイダーの利用-dockerkubernetesクラッシュコース",
        "target": "7-4-異なる複数プロバイダーの利用-dockerkubernetesクラッシュコース",
        "text": "7-4. 異なる複数プロバイダーの利用: Docker/Kubernetesクラッシュコース",
        "isH2": false
    },
    {
        "href": "#7-5-eksでのdockerコンテナデプロイ",
        "target": "7-5-eksでのdockerコンテナデプロイ",
        "text": "7-5. EKSでのDockerコンテナデプロイ",
        "isH2": false
    },
    {
        "href": "#第8部原著第8章対応-本番グレードのterraformコード",
        "target": "第8部原著第8章対応-本番グレードのterraformコード",
        "text": "第8部（原著第8章対応）: 本番グレードのTerraformコード",
        "isH2": true
    },
    {
        "href": "#8-1-なぜ本番グレードのインフラ構築は時間がかかるのか",
        "target": "8-1-なぜ本番グレードのインフラ構築は時間がかかるのか",
        "text": "8-1. なぜ本番グレードのインフラ構築は時間がかかるのか",
        "isH2": false
    },
    {
        "href": "#8-2-本番グレードインフラのチェックリスト",
        "target": "8-2-本番グレードインフラのチェックリスト",
        "text": "8-2. 本番グレードインフラのチェックリスト",
        "isH2": false
    },
    {
        "href": "#8-3-本番グレードモジュールの4原則",
        "target": "8-3-本番グレードモジュールの4原則",
        "text": "8-3. 本番グレードモジュールの4原則",
        "isH2": false
    },
    {
        "href": "#8-4-terraformを超えて",
        "target": "8-4-terraformを超えて",
        "text": "8-4. Terraformを超えて",
        "isH2": false
    },
    {
        "href": "#第9部原著第9章対応-terraformコードのテスト手法",
        "target": "第9部原著第9章対応-terraformコードのテスト手法",
        "text": "第9部（原著第9章対応）: Terraformコードのテスト手法",
        "isH2": true
    },
    {
        "href": "#9-1-手動テスト",
        "target": "9-1-手動テスト",
        "text": "9-1. 手動テスト",
        "isH2": false
    },
    {
        "href": "#9-2-自動テストの3階層",
        "target": "9-2-自動テストの3階層",
        "text": "9-2. 自動テストの3階層",
        "isH2": false
    },
    {
        "href": "#9-32026年最新terraform-testネイティブテストフレームワーク",
        "target": "9-32026年最新terraform-testネイティブテストフレームワーク",
        "text": "9-3.【2026年最新】terraform testネイティブテストフレームワーク",
        "isH2": false
    },
    {
        "href": "#9-4-mock_providerによる高速ユニットテスト",
        "target": "9-4-mock_providerによる高速ユニットテスト",
        "text": "9-4. mock_providerによる高速ユニットテスト",
        "isH2": false
    },
    {
        "href": "#9-5-terratest等その他のアプローチ",
        "target": "9-5-terratest等その他のアプローチ",
        "text": "9-5. Terratest等その他のアプローチ",
        "isH2": false
    },
    {
        "href": "#第10部原著第10章対応-チームでterraformを使う",
        "target": "第10部原著第10章対応-チームでterraformを使う",
        "text": "第10部（原著第10章対応）: チームでTerraformを使う",
        "isH2": true
    },
    {
        "href": "#10-1-チームへのiac導入",
        "target": "10-1-チームへのiac導入",
        "text": "10-1. チームへのIaC導入",
        "isH2": false
    },
    {
        "href": "#10-210-3-アプリケーションコードとインフラコードのデプロイワークフロー",
        "target": "10-210-3-アプリケーションコードとインフラコードのデプロイワークフロー",
        "text": "10-2〜10-3. アプリケーションコードとインフラコードのデプロイワークフロー",
        "isH2": false
    },
    {
        "href": "#10-4-まとめて考える",
        "target": "10-4-まとめて考える",
        "text": "10-4. まとめて考える",
        "isH2": false
    },
    {
        "href": "#第11部独自追加-2026年8月時点のterraformエコシステム最新動向",
        "target": "第11部独自追加-2026年8月時点のterraformエコシステム最新動向",
        "text": "第11部（独自追加）: 2026年8月時点のTerraformエコシステム最新動向",
        "isH2": true
    },
    {
        "href": "#11-1-ライセンス変更とopentofuフォークの経緯",
        "target": "11-1-ライセンス変更とopentofuフォークの経緯",
        "text": "11-1. ライセンス変更とOpenTofuフォークの経緯",
        "isH2": false
    },
    {
        "href": "#11-2-ibmによるhashicorp買収2025年2月完了",
        "target": "11-2-ibmによるhashicorp買収2025年2月完了",
        "text": "11-2. IBMによるHashiCorp買収（2025年2月完了）",
        "isH2": false
    },
    {
        "href": "#11-3-terraform-vs-opentofu-現状比較表2026年8月時点",
        "target": "11-3-terraform-vs-opentofu-現状比較表2026年8月時点",
        "text": "11-3. Terraform vs OpenTofu 現状比較表（2026年8月時点）",
        "isH2": false
    },
    {
        "href": "#11-4-hcp-terraform-stacks料金体系ai統合",
        "target": "11-4-hcp-terraform-stacks料金体系ai統合",
        "text": "11-4. HCP Terraform: Stacks・料金体系・AI統合",
        "isH2": false
    },
    {
        "href": "#11-5-policy-as-code-sentinel-vs-opa-vs-スキャナー系ツール比較",
        "target": "11-5-policy-as-code-sentinel-vs-opa-vs-スキャナー系ツール比較",
        "text": "11-5. Policy as Code: Sentinel vs OPA vs スキャナー系ツール比較",
        "isH2": false
    },
    {
        "href": "#学習ロードマップチェックリスト",
        "target": "学習ロードマップチェックリスト",
        "text": "学習ロードマップ・チェックリスト",
        "isH2": true
    },
    {
        "href": "#初学者向け学習ステップ",
        "target": "初学者向け学習ステップ",
        "text": "初学者向け学習ステップ",
        "isH2": false
    },
    {
        "href": "#学習導入チェックリスト",
        "target": "学習導入チェックリスト",
        "text": "学習・導入チェックリスト",
        "isH2": false
    },
    {
        "href": "#資格取得を目指す場合の補足",
        "target": "資格取得を目指す場合の補足",
        "text": "資格取得を目指す場合の補足",
        "isH2": false
    },
    {
        "href": "#付録a-推奨リソース原著付録arecommended-reading準拠の構成",
        "target": "付録a-推奨リソース原著付録arecommended-reading準拠の構成",
        "text": "付録A: 推奨リソース（原著付録A「Recommended Reading」準拠の構成）",
        "isH2": true
    },
    {
        "href": "#books関連書籍",
        "target": "books関連書籍",
        "text": "Books（関連書籍）",
        "isH2": false
    },
    {
        "href": "#blogsブログ",
        "target": "blogsブログ",
        "text": "Blogs（ブログ）",
        "isH2": false
    },
    {
        "href": "#talksカンファレンス動画",
        "target": "talksカンファレンス動画",
        "text": "Talks（カンファレンス動画）",
        "isH2": false
    },
    {
        "href": "#newslettersニュースレター",
        "target": "newslettersニュースレター",
        "text": "Newsletters（ニュースレター）",
        "isH2": false
    },
    {
        "href": "#online-forumsオンラインフォーラム",
        "target": "online-forumsオンラインフォーラム",
        "text": "Online Forums（オンラインフォーラム）",
        "isH2": false
    },
    {
        "href": "#参考文献",
        "target": "参考文献",
        "text": "参考文献",
        "isH2": true
    }
];

export type DiagramId =
    | 'diag-1'
    | 'diag-2'
    | 'diag-3'
    | 'diag-4'
    | 'diag-5'
    | 'diag-6'
    | 'diag-7'
    | 'diag-8'
    | 'diag-9'
    | 'diag-10'
    | 'diag-11'
    | 'diag-12'
    | 'diag-13'
    | 'diag-14'
    | 'diag-15'
    | 'diag-16'
    | 'diag-17'
    | 'diag-18'
    | 'diag-19';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-1': "flowchart TB\n    IAC[\"Infrastructure as Code<br/>ツールの5分類\"]\n    IAC --> A[\"アドホックスクリプト<br/>(Ad Hoc Scripts)\"]\n    IAC --> B[\"構成管理ツール<br/>(Configuration Management)\"]\n    IAC --> C[\"サーバーテンプレートツール<br/>(Server Templating)\"]\n    IAC --> D[\"オーケストレーションツール<br/>(Orchestration)\"]\n    IAC --> E[\"プロビジョニングツール<br/>(Provisioning)\"]\n\n    A --> A1[\"Bashスクリプト等<br/>再現性・べき等性に難あり\"]\n    B --> B1[\"Chef / Puppet / Ansible<br/>既存サーバーの状態を管理\"]\n    C --> C1[\"Docker / Packer<br/>イメージそのものを構築\"]\n    D --> D1[\"Kubernetes<br/>コンテナ化されたアプリの実行制御\"]\n    E --> E1[\"Terraform / OpenTofu / Pulumi / CloudFormation<br/>クラウドリソース自体を作成・変更・削除\"]\n\n    classDef cat fill:#1e3a5f,stroke:#7c9eff,color:#eaf1ff\n    classDef leaf fill:#123024,stroke:#4caf82,color:#eaf1ff\n    class A,B,C,D,E cat\n    class A1,B1,C1,D1,E1 leaf",
    'diag-2': "flowchart LR\n    subgraph Author[\"記述\"]\n        HCL[\".tfファイル<br/>(HCL / Desired State)\"]\n    end\n    subgraph Core[\"Terraform Core\"]\n        Plan[\"terraform plan<br/>差分計算\"]\n        Apply[\"terraform apply<br/>差分解消\"]\n        State[(\"terraform.tfstate<br/>現在の状態\")]\n    end\n    subgraph Providers[\"プロバイダープラグイン\"]\n        P1[\"AWS Provider\"]\n        P2[\"Google Cloud Provider\"]\n        P3[\"Azure Provider\"]\n        P4[\"Kubernetes Provider\"]\n    end\n    subgraph Clouds[\"実際のインフラ\"]\n        C1[(\"AWS API\")]\n        C2[(\"GCP API\")]\n        C3[(\"Azure API\")]\n        C4[(\"Kubernetes API\")]\n    end\n\n    HCL --> Plan\n    State --> Plan\n    Plan --> Apply\n    Apply --> P1 & P2 & P3 & P4\n    P1 --> C1\n    P2 --> C2\n    P3 --> C3\n    P4 --> C4\n    Apply --> State\n\n    classDef core fill:#1e3a5f,stroke:#7c9eff,color:#eaf1ff\n    classDef provider fill:#123024,stroke:#4caf82,color:#eaf1ff\n    class Plan,Apply,State core\n    class P1,P2,P3,P4 provider",
    'diag-3': "flowchart TB\n    subgraph Mutable[\"Mutable Infrastructure（可変）\"]\n        M1[\"既存サーバーに<br/>SSHでログイン\"] --> M2[\"設定を都度上書き\"] --> M3[\"構成ドリフトが蓄積<br/>『スノーフレークサーバー』化\"]\n    end\n    subgraph Immutable[\"Immutable Infrastructure（不変）\"]\n        I1[\"新しいイメージ/構成を<br/>ゼロから作成\"] --> I2[\"新しいサーバー群に置き換え\"] --> I3[\"旧サーバーは破棄<br/>常にクリーンな状態\"]\n    end\n\n    classDef bad fill:#3a1420,stroke:#c05a6e,color:#f5d8de\n    classDef good fill:#123024,stroke:#4caf82,color:#eaf1ff\n    class M1,M2,M3 bad\n    class I1,I2,I3 good",
    'diag-4': "flowchart LR\n    Init[\"terraform init<br/>プロバイダープラグインの取得\"] --> Plan[\"terraform plan<br/>変更内容のプレビュー\"]\n    Plan --> Apply[\"terraform apply<br/>変更の実行\"]\n    Apply --> Destroy[\"terraform destroy<br/>（必要な場合）リソース削除\"]\n\n    classDef step fill:#1e3a5f,stroke:#7c9eff,color:#eaf1ff\n    class Init,Plan,Apply,Destroy step",
    'diag-5': "flowchart TB\n    User([\"利用者\"]) --> ALB[\"Application Load Balancer<br/>(aws_lb + aws_lb_listener)\"]\n    ALB --> TG[\"Target Group<br/>(aws_lb_target_group)<br/>ヘルスチェック\"]\n    TG --> ASG[\"Auto Scaling Group<br/>(aws_autoscaling_group)\"]\n    ASG --> I1[\"EC2インスタンス #1\"]\n    ASG --> I2[\"EC2インスタンス #2\"]\n    ASG --> I3[\"EC2インスタンス #N<br/>(min_size〜max_sizeで自動増減)\"]\n\n    classDef entry fill:#1e3a5f,stroke:#7c9eff,color:#eaf1ff\n    classDef compute fill:#123024,stroke:#4caf82,color:#eaf1ff\n    class ALB,TG entry\n    class ASG,I1,I2,I3 compute",
    'diag-6': "sequenceDiagram\n    participant Dev as 開発者のTerraform CLI\n    participant S3 as S3バケット\n    Dev->>S3: PutObject (.tflockファイル, If-None-Match条件付き)\n    alt ロック取得成功\n        S3-->>Dev: 200 OK（ロック取得）\n        Dev->>S3: state読み込み → plan/apply実行\n        Dev->>S3: state書き込み\n        Dev->>S3: .tflock削除（ロック解放）\n    else 既にロック済み\n        S3-->>Dev: 412 Precondition Failed（他者が実行中）\n        Dev->>Dev: エラー表示・処理中断\n    end",
    'diag-7': "flowchart TB\n    subgraph WS[\"方式A: Terraform Workspaces\"]\n        direction LR\n        WSCode[\"単一の.tfコード\"] --> WSDev[\"workspace: dev\"]\n        WSCode --> WSStg[\"workspace: staging\"]\n        WSCode --> WSProd[\"workspace: prod\"]\n    end\n    subgraph FL[\"方式B: ファイルレイアウトによる分離\"]\n        direction LR\n        FLDev[\"dev/ ディレクトリ<br/>専用backend設定\"]\n        FLStg[\"staging/ ディレクトリ<br/>専用backend設定\"]\n        FLProd[\"prod/ ディレクトリ<br/>専用backend設定\"]\n    end\n\n    classDef ws fill:#1e3a5f,stroke:#7c9eff,color:#eaf1ff\n    classDef fl fill:#123024,stroke:#4caf82,color:#eaf1ff\n    class WSCode,WSDev,WSStg,WSProd ws\n    class FLDev,FLStg,FLProd fl",
    'diag-8': "flowchart TB\n    Root[\"ルートモジュール<br/>(live/stage/webserver-cluster)\"]\n    Root -->|module呼び出し| Child[\"子モジュール<br/>(modules/services/webserver-cluster)\"]\n    Child --> Var[\"variables.tf<br/>入力インターフェース\"]\n    Child --> Main[\"main.tf<br/>実際のリソース定義\"]\n    Child --> Loc[\"locals.tf<br/>内部でのみ使う計算値\"]\n    Child --> Out[\"outputs.tf<br/>戻り値インターフェース\"]\n    Out -.->|出力を参照| Root\n\n    classDef rootStyle fill:#1e3a5f,stroke:#7c9eff,color:#eaf1ff\n    classDef childStyle fill:#123024,stroke:#4caf82,color:#eaf1ff\n    class Root rootStyle\n    class Child,Var,Main,Loc,Out childStyle",
    'diag-9': "sequenceDiagram\n    participant TF as Terraform\n    participant Old as 旧ASG/旧Launch Template\n    participant New as 新ASG/新Launch Template\n    participant LB as ロードバランサー\n\n    TF->>New: 1. 新しいリソースを先に作成\n    New->>LB: 2. ターゲットグループへ登録\n    LB-->>TF: 3. min_elb_capacity 台がヘルスチェックを通過するまで待機\n    TF->>Old: 4. 旧リソースをロードバランサーから切り離し\n    TF->>Old: 5. 旧リソースを破棄\n    Note over TF,LB: create_before_destroy だけでは不十分<br/>ELBへの接続とヘルスチェック待機が揃って初めて無停止に近づく",
    'diag-10': "sequenceDiagram\n    participant Cfg as HCLコード\n    participant Core as Terraform Core（メモリ上）\n    participant Provider as AWSプロバイダー\n    participant State as terraform.tfstate\n\n    Cfg->>Core: ephemeral \"random_password\" でパスワード生成\n    Note over Core: メモリ上にのみ存在<br/>Stateには一切書き込まれない\n    Core->>Provider: password_wo (write-only引数) として渡す\n    Provider->>Provider: RDSインスタンスのパスワードとして設定\n    Core--xState: パスワードの値は書き込まない\n    Core->>State: password_wo_versionという整数のみ記録<br/>(変更検知用、値そのものではない)",
    'diag-11': "flowchart TB\n    Root[\"1つのTerraformコード\"]\n    Root -->|provider aws（デフォルト）| East[\"us-east-2リージョン\"]\n    Root -->|provider aws.usa_west_2| West[\"us-west-2リージョン\"]\n    Root -->|provider aws.account_b| AccountB[\"別AWSアカウント<br/>(assume_role経由)\"]\n\n    classDef region fill:#1e3a5f,stroke:#7c9eff,color:#eaf1ff\n    class East,West,AccountB region",
    'diag-12': "flowchart TB\n    subgraph Providers[\"異なる種類のプロバイダーの組み合わせ例\"]\n        AWSProv[\"aws provider<br/>EKSクラスタ自体を作成\"]\n        K8sProv[\"kubernetes provider<br/>クラスタ内のDeployment/Serviceを作成\"]\n        DockerProv[\"docker provider<br/>ローカル検証用コンテナ起動\"]\n    end\n    AWSProv -->|root module A は cluster_name のみ出力<br/>endpoint/token は root module B が data source で取得| K8sProv\n\n    classDef p fill:#123024,stroke:#4caf82,color:#eaf1ff\n    class AWSProv,K8sProv,DockerProv p",
    'diag-13': "flowchart TB\n    Prod[\"本番グレードモジュール\"]\n    Prod --> Small[\"Small（小さい）<br/>単一責任、レビューしやすい単位\"]\n    Prod --> Composable[\"Composable（組み合わせ可能）<br/>他モジュールと疎結合\"]\n    Prod --> Testable[\"Testable（テスト可能）<br/>自動テストで検証できる\"]\n    Prod --> Versioned[\"Versioned（バージョン管理された）<br/>タグ/リリースで固定できる\"]\n\n    classDef principle fill:#1e3a5f,stroke:#7c9eff,color:#eaf1ff\n    class Small,Composable,Testable,Versioned principle",
    'diag-14': "flowchart TB\n    E2E[\"E2Eテスト<br/>本番相当環境を丸ごとデプロイし、<br/>ユーザー視点で動作確認\"]\n    Integration[\"インテグレーションテスト<br/>複数モジュールを組み合わせてデプロイし検証\"]\n    Unit[\"ユニットテスト<br/>単一モジュール単位で検証、実行が高速\"]\n\n    Unit --> Integration --> E2E\n\n    classDef pyramid fill:#123024,stroke:#4caf82,color:#eaf1ff\n    class Unit,Integration,E2E pyramid",
    'diag-15': "flowchart LR\n    subgraph WithMock[\"mock_providerあり（ユニットテスト）\"]\n        M1[\"terraform test<br/>command = plan\"] --> M2[\"モックプロバイダー<br/>認証情報不要、実リソース作成なし\"] --> M3[\"数秒で完了<br/>ロジック検証に最適\"]\n    end\n    subgraph WithReal[\"実プロバイダーあり（インテグレーションテスト）\"]\n        R1[\"terraform test<br/>command = apply\"] --> R2[\"実際のクラウドAPI<br/>認証情報が必要\"] --> R3[\"実リソースを作成・検証・自動破棄<br/>実際の挙動を検証\"]\n    end\n\n    classDef mock fill:#123024,stroke:#4caf82,color:#eaf1ff\n    classDef real fill:#1e3a5f,stroke:#7c9eff,color:#eaf1ff\n    class M1,M2,M3 mock\n    class R1,R2,R3 real",
    'diag-16': "flowchart TB\n    Start([\"変更を加えたい\"]) --> Branch[\"1. バージョン管理<br/>featureブランチを作成\"]\n    Branch --> Change[\"2. コード変更<br/>コミット\"]\n    Change --> Local[\"3. ローカルで実行<br/>変更後のコードを terraform plan で確認\"]\n    Local --> PR[\"4. レビュー依頼<br/>Pull Requestを作成\"]\n    PR --> CI[\"5. 自動テスト<br/>fmt/validate/test/tflint/セキュリティスキャン\"]\n    CI --> Merge[\"6. マージ<br/>mainブランチへ統合\"]\n    Merge --> Deploy[\"7. デプロイ<br/>CI/CDがplan結果を提示 → 承認 → apply\"]\n\n    classDef step fill:#1e3a5f,stroke:#7c9eff,color:#eaf1ff\n    class Start,Branch,Change,Local,PR,CI,Merge,Deploy step",
    'diag-17': "flowchart TB\n    A[\"2023年8月<br/>HashiCorpがTerraformのライセンスを<br/>MPL 2.0からBUSL 1.1へ変更\"] --> B[\"競合サービス事業者による<br/>商用利用に制限がかかる\"]\n    B --> C[\"コミュニティが反発<br/>Linux Foundation傘下でフォークを開始\"]\n    C --> D[\"2023年9月<br/>OpenTofuが発足<br/>MPL 2.0ライセンスを維持\"]\n    D --> E[\"2024年4月<br/>HashiCorpがOpenTofuに<br/>コード無断使用を主張しCease & Desist送付\"]\n    E --> F[\"OpenTofu側は当該コードが<br/>MPL版由来と反論・否定\"]\n    F --> G[\"2026年8月時点<br/>両プロジェクトは併存<br/>プロバイダーエコシステムは概ね互換\"]\n\n    classDef event fill:#1e3a5f,stroke:#7c9eff,color:#eaf1ff\n    class A,B,C,D,E,F,G event",
    'diag-18': "flowchart TB\n    Plan[\"terraform plan の出力\"] --> Gate{\"ポリシーゲート\"}\n    Gate --> Sentinel[\"Sentinel<br/>HCP Terraform/Enterprise専用<br/>plan/state/run/config段階で評価\"]\n    Gate --> OPA[\"OPA (Rego)<br/>ベンダー中立<br/>Kubernetes等とも共通の言語\"]\n    Gate --> Scanner[\"Checkov / Trivy config<br/>事前定義済みのセキュリティルール集<br/>設定即利用可能\"]\n    Sentinel --> Result[\"合格 → apply実行 / 不合格 → ブロック\"]\n    OPA --> Result\n    Scanner --> Result\n\n    classDef gate fill:#1e3a5f,stroke:#7c9eff,color:#eaf1ff\n    classDef tool fill:#123024,stroke:#4caf82,color:#eaf1ff\n    class Gate gate\n    class Sentinel,OPA,Scanner tool",
    'diag-19': "flowchart LR\n    S1[\"Step1<br/>HCL基礎構文<br/>(provider/resource/variable/output)\"] --> S2[\"Step2<br/>単一リソースのplan/apply/destroy\"]\n    S2 --> S3[\"Step3<br/>State管理とリモートバックエンド\"]\n    S3 --> S4[\"Step4<br/>モジュール化と再利用\"]\n    S4 --> S5[\"Step5<br/>ループ・条件分岐・ゼロダウンタイムデプロイ\"]\n    S5 --> S6[\"Step6<br/>シークレット管理<br/>(Ephemeral Resources含む)\"]\n    S6 --> S7[\"Step7<br/>テスト自動化<br/>(terraform test / mock_provider)\"]\n    S7 --> S8[\"Step8<br/>CI/CD統合とチーム運用\"]\n    S8 --> S9[\"Step9<br/>Policy as Code / 本番グレード化\"]\n\n    classDef step fill:#1e3a5f,stroke:#7c9eff,color:#eaf1ff\n    class S1,S2,S3,S4,S5,S6,S7,S8,S9 step",
};
