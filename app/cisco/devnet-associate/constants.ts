export type DiagramId =
  | 'dg1'
  | 'dg2'
  | 'dg3'
  | 'dg4'
  | 'dg5'
  | 'dg6'
  | 'dg7'
  | 'dg8'
  | 'dg9'
  | 'dg10'
  | 'dg11'
  | 'dg12'
  | 'dg13'
  | 'dg14'
  | 'dg15'
  | 'dg16'
  | 'dg17'
  | 'dg18'
  | 'dg19'
  | 'dg20'
  | 'dg21'
  | 'dg22'
  | 'dg23'
  | 'dg24'
  | 'dg25'
  | 'dg26'
  | 'dg27'
  | 'dg28'
  | 'dg29'
  | 'dg30'
  | 'dg31'
  | 'dg32'
  | 'dg33'
  | 'dg34';

export const DIAGRAM_LABELS: Record<DiagramId, string> = {
  "dg1": "200-901 ドメイン別の出題比率パイチャート",
  "dg2": "DevNet Associate 初学者向け学習ロードマップフロー",
  "dg3": "テスト駆動開発（TDD）の Red-Green-Refactor サイクル",
  "dg4": "ウォーターフォール開発とアジャイル開発の比較フロー",
  "dg5": "MVC（Model-View-Controller）デザインパターンのデータフロー",
  "dg6": "Observer パターンの購読・状態通知シーケンス",
  "dg7": "Git の基本操作とワークスペース・リポジトリ間フロー",
  "dg8": "Git ブランチ作成とマージを表す gitGraph",
  "dg9": "Git マージコンフリクトの解決手順フロー",
  "dg10": "API 呼び出し失敗時のステータスコード別トラブルシューティングフロー",
  "dg11": "トークンベース認証とデバイス情報取得のシーケンス",
  "dg12": "非同期タスク処理とステータスポーリングのシーケンス",
  "dg13": "Webex Webhook の登録とイベント通知シーケンス",
  "dg14": "Cisco プラットフォームと提供 API の全体俯瞰図",
  "dg15": "YANG データモデルと NETCONF / RESTCONF の関係図",
  "dg16": "API ドキュメントおよびコード読解のステップフロー",
  "dg17": "エッジコンピューティングとクラウドの役割分担フロー",
  "dg18": "仮想マシン（VM）方式とコンテナ方式のアーキテクチャ比較図",
  "dg19": "CI/CD パイプラインの全体フロー",
  "dg20": "Dockerfile からコンテナ実行・レジストリ連携のライフサイクルフロー",
  "dg21": "Web アプリケーションの 3 層構成とロードバランサー配置図",
  "dg22": "DevOps の継続的改善ライフサイクルループ",
  "dg23": "ネットワーク管理規模と手法（コントローラー / デバイス API / オーケストレーター）の選択フロー",
  "dg24": "CML と pyATS を用いたネットワーク自動化検証フロー",
  "dg25": "NetDevOps における Git・CI/CD・構成管理連携フロー",
  "dg26": "Terraform の init / plan / apply ワークフロー",
  "dg27": "Catalyst Center を経由したネットワーク機器情報取得シーケンス",
  "dg28": "TCP/IP 各層におけるデータカプセル化フロー",
  "dg29": "スイッチのポート VLAN とトランクポート・ルーター間接続構成図",
  "dg30": "同一サブネット内における ARP アドレス解決シーケンス",
  "dg31": "TCP 3 ウェイハンドシェイクによるコネクション確立シーケンス",
  "dg32": "DHCP による IP アドレス配布（DORA）シーケンス",
  "dg33": "DNS 名前解決におけるキャッシュサーバーと権威サーバーへの問い合わせフロー",
  "dg34": "ネットワーク障害発生時の階層別切り分けフローチャート"
};

export const DIAGRAMS: Record<DiagramId, string> = {
  'dg1': `pie showData
    title 200-901 ドメイン別の出題比率(%)
    "1 開発とデザイン" : 15
    "2 API の理解と利用" : 20
    "3 Cisco プラットフォーム" : 15
    "4 デプロイとセキュリティ" : 15
    "5 インフラと自動化" : 20
    "6 ネットワーク基礎" : 15`,
  'dg2': `flowchart TD
    A["開始: Python の基本文法"] --> B["第1章 データ形式・Git・開発手法"]
    A --> F["第6章 ネットワーク基礎"]
    B --> C["第2章 HTTP と REST API"]
    F --> C
    C --> D["第3章 Cisco プラットフォームと SDK"]
    D --> E["第5章 自動化ツールとモデル駆動"]
    B --> G["第4章 Docker・CI/CD・セキュリティ"]
    C --> G
    G --> E
    E --> H["模擬試験と弱点補強"]
    H --> I["受験"]`,
  'dg3': `flowchart LR
    R["Red: 失敗するテストを書く"] --> G["Green: テストを通す最小限のコードを書く"]
    G --> F["Refactor: コードを整理する"]
    F --> R`,
  'dg4': `flowchart LR
    subgraph W["Waterfall"]
        W1["要件"] --> W2["設計"] --> W3["実装"] --> W4["テスト"] --> W5["運用"]
    end
    subgraph A["Agile"]
        A1["計画"] --> A2["開発"] --> A3["テスト"] --> A4["レビュー"] --> A1
    end`,
  'dg5': `flowchart LR
    U["ユーザー"] -->|"操作"| C["Controller: 入力を受け取り処理を振り分ける"]
    C -->|"更新"| M["Model: データとビジネスロジック"]
    M -->|"状態を通知"| V["View: 画面表示"]
    V -->|"表示"| U`,
  'dg6': `sequenceDiagram
    participant S as Subject 状態が変わる側
    participant O1 as Observer A
    participant O2 as Observer B
    O1->>S: 登録(subscribe)
    O2->>S: 登録(subscribe)
    S->>S: 状態が変化
    S-->>O1: 通知(notify)
    S-->>O2: 通知(notify)`,
  'dg7': `flowchart LR
    W["作業ディレクトリ"] -->|"git add"| S["ステージングエリア"]
    S -->|"git commit"| L["ローカルリポジトリ"]
    L -->|"git push"| R["リモートリポジトリ"]
    R -->|"git pull / git fetch"| L
    L -->|"git checkout / switch"| W`,
  'dg8': `gitGraph
    commit id: "初期コミット"
    commit id: "設定追加"
    branch feature-vlan
    checkout feature-vlan
    commit id: "VLAN 追加"
    commit id: "テスト追加"
    checkout main
    commit id: "ドキュメント修正"
    merge feature-vlan id: "マージ"`,
  'dg9': `flowchart TD
    A["git merge を実行"] --> B{"競合が発生した？"}
    B -->|"いいえ"| C["マージ完了"]
    B -->|"はい"| D["git status で競合ファイルを確認"]
    D --> E["ファイルを開き競合マーカーを確認"]
    E --> F["正しい内容に手で編集しマーカーを削除"]
    F --> G["git add で解決済みにする"]
    G --> H["git commit でマージを完了"]`,
  'dg10': `flowchart TD
    A["API 呼び出しが失敗"] --> B{"ステータスコードは？"}
    B -->|"401"| C["トークン・APIキー・有効期限を確認"]
    B -->|"403"| D["アカウントの権限・ロールを確認"]
    B -->|"404"| E["URL・リソースIDのスペルを確認"]
    B -->|"400 / 415 / 422"| F["ボディの JSON 構文・必須項目・Content-Type を確認"]
    B -->|"429"| G["Retry-After の秒数だけ待ち、間隔を空けて再試行"]
    B -->|"5xx"| H["時間を置いて再試行。継続するなら提供元へ連絡"]
    B -->|"応答なし"| I["DNS・ネットワーク・FW・プロキシ・証明書を確認"]`,
  'dg11': `sequenceDiagram
    participant C as クライアント Python
    participant A as API サーバー
    C->>A: POST /auth/token(Basic 認証)
    A-->>C: 200 OK トークンを返却
    C->>A: GET /devices(トークンをヘッダーに付与)
    A-->>C: 200 OK デバイス一覧(JSON)
    C->>A: GET /devices(トークン期限切れ)
    A-->>C: 401 Unauthorized
    C->>A: トークンを再取得して再リクエスト`,
  'dg12': `sequenceDiagram
    participant C as クライアント
    participant S as サーバー
    C->>S: POST /tasks(一括設定を依頼)
    S-->>C: 202 Accepted(タスクID)
    loop 完了までポーリング
        C->>S: GET /tasks/{id}
        S-->>C: status = running
    end
    C->>S: GET /tasks/{id}
    S-->>C: status = completed(結果)`,
  'dg13': `sequenceDiagram
    participant U as ユーザー
    participant W as Webex 送信元
    participant R as 自分の Webhook 受信サーバー
    R->>W: Webhook を登録(イベントと通知先 URL)
    U->>W: メッセージを投稿
    W->>R: POST 通知(イベント内容)
    R-->>W: 200 OK(受信完了)
    R->>W: 必要に応じて詳細を API で取得`,
  'dg14': `flowchart TD
    D["Cisco プラットフォームと API"] --> N["ネットワーク管理"]
    D --> CP["コンピュート管理"]
    D --> CL["コラボレーション"]
    D --> SE["セキュリティ"]
    D --> DV["デバイスレベル API"]
    N --> N1["Meraki"]
    N --> N2["Catalyst Center"]
    N --> N3["ACI"]
    N --> N4["Catalyst SD-WAN"]
    N --> N5["NSO"]
    CP --> C1["UCS Manager"]
    CP --> C2["Intersight"]
    CL --> L1["Webex"]
    CL --> L2["Webex デバイス"]
    CL --> L3["Unified CM: AXL と UDS"]
    CL --> L4["Finesse"]
    SE --> S1["Secure Firewall(Firepower)"]
    SE --> S2["Umbrella"]
    SE --> S3["Secure Endpoint"]
    SE --> S4["ISE"]
    SE --> S5["Secure Malware Analytics と XDR"]
    DV --> V1["IOS XE"]
    DV --> V2["NX-OS"]`,
  'dg15': `flowchart LR
    Y["YANG: データの構造を定義するモデル言語"] --> N["NETCONF: XML を SSH 上で送る管理プロトコル"]
    Y --> R["RESTCONF: HTTP で YANG データを操作するプロトコル"]
    N --> D["ネットワーク機器"]
    R --> D`,
  'dg16': `flowchart TD
    A["コードや API リファレンスを読む"] --> B["どのプラットフォームか"]
    B --> C["認証方式は何か: APIキー・トークン・Cookie"]
    C --> D["HTTPメソッドとパスは何か"]
    D --> E["レスポンスの JSON 構造のどこに目的の値があるか"]
    E --> F["どんな処理(一覧取得・作成・更新)か判断する"]`,
  'dg17': `flowchart LR
    S["センサー・IoT・カメラ"] --> E["エッジ: 現地で前処理と判断"]
    E -->|"要約データのみ"| C["クラウド: 長期保存と大規模分析"]
    E -->|"即時の制御"| S`,
  'dg18': `flowchart TB
    subgraph VMS["仮想マシン方式"]
        H1["物理サーバー"] --> HV["ハイパーバイザー"]
        HV --> G1["ゲスト OS とアプリ A"]
        HV --> G2["ゲスト OS とアプリ B"]
    end
    subgraph CTS["コンテナ方式"]
        H2["物理サーバーとホスト OS"] --> CE["コンテナエンジン"]
        CE --> K1["コンテナ A"]
        CE --> K2["コンテナ B"]
    end`,
  'dg19': `flowchart LR
    A["開発者が Git へ push"] --> B["ビルド"]
    B --> C["自動テスト: 単体・結合"]
    C --> D["静的解析・脆弱性スキャン"]
    D --> E["成果物を保管: イメージやパッケージ"]
    E --> F["ステージング環境へデプロイ"]
    F --> G{"承認またはテスト合格？"}
    G -->|"はい"| H["本番環境へデプロイ"]
    G -->|"いいえ"| I["失敗を通知し修正"]
    H --> J["監視とフィードバック"]
    J --> A`,
  'dg20': `flowchart LR
    DF["Dockerfile"] -->|"docker build"| IM["イメージ"]
    IM -->|"docker run"| CT["コンテナ"]
    IM -->|"docker push"| RG["レジストリ"]
    RG -->|"docker pull"| IM`,
  'dg21': `flowchart LR
    U["ユーザー"] --> FW["ファイアウォール"]
    FW --> LB["ロードバランサー / リバースプロキシ"]
    LB --> A1["アプリサーバー 1"]
    LB --> A2["アプリサーバー 2"]
    A1 --> DB["データベース"]
    A2 --> DB
    U -. "名前解決" .-> DNS["DNS"]`,
  'dg22': `flowchart LR
    P["計画"] --> C["コーディング"] --> B["ビルド"] --> T["テスト"] --> R["リリース"] --> D["デプロイ"] --> O["運用"] --> M["監視"] --> P`,
  'dg23': `flowchart TD
    Q{"何台を、どの粒度で管理する？"} -->|"多数・ポリシー単位"| C["コントローラー API を使う"]
    Q -->|"少数・詳細設定"| D["デバイス API(NETCONF / RESTCONF)を使う"]
    Q -->|"マルチベンダーのサービス単位"| N["NSO などのオーケストレーターを使う"]`,
  'dg24': `flowchart LR
    A["CML で検証環境を構築"] --> B["自動化スクリプトを実行"]
    B --> C["pyATS で状態を検証"]
    C --> D{"期待どおり？"}
    D -->|"はい"| E["本番へ展開"]
    D -->|"いいえ"| F["修正して再検証"]
    F --> B`,
  'dg25': `flowchart LR
    A["設定変更を Git のブランチで作成"] --> B["Pull Request"]
    B --> C["レビュー"]
    C --> D["CI: 構文チェック・lint・シミュレーション検証"]
    D --> E{"合格？"}
    E -->|"はい"| F["main へマージ"]
    F --> G["CD: Ansible / Terraform で本番へ適用"]
    E -->|"いいえ"| A
    G --> H["適用後の状態確認と監視"]`,
  'dg26': `flowchart LR
    W["コードを記述"] --> I["terraform init"] --> P["terraform plan: 差分確認"] --> A["terraform apply: 適用"] --> S["ステートに現状を記録"]
    S --> P`,
  'dg27': `sequenceDiagram
    participant App as Python アプリ
    participant CC as Catalyst Center
    participant Dev as ネットワーク機器
    App->>CC: POST /auth/token
    CC-->>App: 200 OK(トークン)
    App->>CC: GET /network-device(X-Auth-Token)
    CC->>Dev: 機器情報を参照
    Dev-->>CC: 情報を返す
    CC-->>App: 200 OK(デバイス一覧 JSON)`,
  'dg28': `flowchart TD
    A["アプリ層: HTTP リクエストを作成"] --> B["トランスポート層: TCP ヘッダーを付与: 宛先ポート 443"]
    B --> C["ネットワーク層: IP ヘッダーを付与: 宛先 IP"]
    C --> D["データリンク層: Ethernet ヘッダーを付与: 宛先 MAC"]
    D --> E["物理層: 信号として送信"]`,
  'dg29': `flowchart LR
    subgraph SW["スイッチ"]
        P1["ポート1: VLAN 10 営業部"]
        P2["ポート2: VLAN 20 開発部"]
        T["トランクポート: VLAN 10 と 20"]
    end
    T --- R["ルーター / L3 スイッチ: VLAN 間ルーティング"]`,
  'dg30': `sequenceDiagram
    participant A as PC A 192.168.10.10
    participant S as スイッチ
    participant G as ゲートウェイ 192.168.10.1
    A->>S: ARP 要求(192.168.10.1 の MAC は？)ブロードキャスト
    S->>G: 転送
    G-->>A: ARP 応答(私の MAC は xx:xx:...)ユニキャスト
    A->>G: 外部宛ての IP パケットをゲートウェイの MAC 宛てフレームで送信`,
  'dg31': `sequenceDiagram
    participant C as クライアント
    participant S as サーバー
    C->>S: SYN
    S-->>C: SYN + ACK
    C->>S: ACK
    Note over C,S: コネクション確立、データ送信開始`,
  'dg32': `sequenceDiagram
    participant C as クライアント
    participant S as DHCP サーバー
    C->>S: Discover(サーバーを探す: ブロードキャスト)
    S-->>C: Offer(このアドレスを貸し出せる)
    C->>S: Request(そのアドレスを使いたい)
    S-->>C: Acknowledge(確定)`,
  'dg33': `flowchart LR
    C["クライアント"] -->|"1 app.example.com は？"| R["リゾルバー: DNS キャッシュサーバー"]
    R -->|"2 問い合わせ"| ROOT["ルート → TLD → 権威サーバー"]
    ROOT -->|"3 A レコード: 203.0.113.10"| R
    R -->|"4 回答"| C`,
  'dg34': `flowchart TD
    A["アプリが API に接続できない"] --> B{"自分の IP・ゲートウェイは正しい？"}
    B -->|"いいえ"| B1["DHCP・VLAN・ケーブル・ポート設定を確認"]
    B -->|"はい"| C{"ゲートウェイに ping は通る？"}
    C -->|"いいえ"| C1["L2 接続・VLAN・ARP を確認"]
    C -->|"はい"| D{"外部 IP アドレスに ping は通る？"}
    D -->|"いいえ"| D1["ルーティング・NAT・ファイアウォールを確認"]
    D -->|"はい"| E{"名前解決はできる？"}
    E -->|"いいえ"| E1["DNS サーバー設定・レコードを確認"]
    E -->|"はい"| F{"宛先ポート 443 に接続できる？"}
    F -->|"いいえ"| F1["ファイアウォール・ACL・サーバー待受けを確認"]
    F -->|"はい"| G{"HTTP ステータスコードは？"}
    G --> H["第2章のステータスコード別の対処へ"]`,
};

export interface NavItem {
  id: string;
  label: string;
  weight?: string;
  group: '導入' | '試験範囲の各章';
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'sec-1', label: '0. 最初にお読みください（重要：名称変更について）', group: '導入' },
  { id: 'sec-2', label: '1. 認定の全体像', group: '導入' },
  { id: 'sec-3', label: '2. 試験範囲と学習ロードマップ', group: '導入' },
  { id: 'sec-4', label: '第 1 章　Software Development and Design', weight: '15%', group: '試験範囲の各章' },
  { id: 'sec-5', label: '第 2 章　Understanding and Using APIs', weight: '20%', group: '試験範囲の各章' },
  { id: 'sec-6', label: '第 3 章　Cisco Platforms and Development', weight: '15%', group: '試験範囲の各章' },
  { id: 'sec-7', label: '第 4 章　Application Deployment and Security', weight: '15%', group: '試験範囲の各章' },
  { id: 'sec-8', label: '第 5 章　Infrastructure and Automation', weight: '20%', group: '試験範囲の各章' },
  { id: 'sec-9', label: '第 6 章　Network Fundamentals', weight: '15%', group: '試験範囲の各章' },
  { id: 'sec-10', label: '第 7 章　総合演習・直前チェック・巻末資料', group: '試験範囲の各章' },
];
