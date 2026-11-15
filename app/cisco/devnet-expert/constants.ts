export const DIAGRAMS = {
  "d0": "flowchart TD\nA[\"スタート:ネットワーク基礎と Python 基礎\"] --> B[\"筆記試験 350-901 AUTOCOR に合格\"]\nB --> C[\"Specialist(Automation Core)認定を自動取得\"]\nC --> D[\"ラボ試験 CCIE Automation v1.1 を受験(8時間)\"]\nD --> E{\"合格か\"}\nE -->|\"合格\"| F[\"CCIE Automation 認定を取得(有効期間 3年)\"]\nE -->|\"不合格\"| G[\"30日待機してから再受験\"]\nG --> D\nF --> H[\"3年以内に再認定:試験合格または CE クレジット\"]",
  "d1": "pie showData\ntitle \"ラボ試験ブループリントの配点(%)\"\n\"1. ソフトウェア設計・開発・デプロイ\" : 20\n\"2. Infrastructure as Code\" : 30\n\"3. ネットワークプログラマビリティと自動化\" : 25\n\"4. コンテナ\" : 10\n\"5. セキュリティ\" : 15",
  "d2": "flowchart TD\nS0[\"Step 0:土台づくり(Linux・Git・HTTP・JSON/YAML/XML・Python)\"] --> S1[\"Step 1:API の基礎(REST・GraphQL・OpenAPI)\"]\nS1 --> S2[\"Step 2:データモデル(YANG・NETCONF・RESTCONF)\"]\nS2 --> S3[\"Step 3:構成管理ツール(Ansible・Terraform・NSO)\"]\nS3 --> S4[\"Step 4:検証と観測(pyATS・テレメトリ)\"]\nS4 --> S5[\"Step 5:デリバリー(Git・CI/CD・Docker・Kubernetes)\"]\nS5 --> S6[\"Step 6:セキュリティ(OWASP・OpenSSL・OAuth2・Vault)\"]\nS6 --> S7[\"Step 7:統合演習(8時間ラボ形式で通し練習)\"]",
  "d3": "flowchart LR\nU[\"運用者・外部システム\"] --> GW[\"API ゲートウェイ(認証・レート制限)\"]\nGW --> APP1[\"自動化アプリ 1(コンテナ)\"]\nGW --> APP2[\"自動化アプリ 2(コンテナ)\"]\nAPP1 --> Q[\"メッセージキュー(非同期処理)\"]\nAPP2 --> Q\nQ --> WK[\"ワーカー(機器への設定投入)\"]\nWK --> NET[\"ネットワーク機器・コントローラ\"]\nAPP1 --> DB[(\"データベース / Source of Truth\")]\nAPP2 --> DB\nAPP1 -.->|\"メトリクス・ログ\"| OBS[\"監視基盤(可観測性)\"]\nAPP2 -.-> OBS\nWK -.-> OBS",
  "d4": "flowchart TD\nA[\"1. 要件を整理する(何を実現したいか)\"] --> B[\"2. 現状を把握する(既存コードと設定を読む)\"]\nB --> C[\"3. ギャップ分析(要件と現状の差を一覧化)\"]\nC --> D[\"4. Source of Truth を確認(正しいデータはどこか)\"]\nD --> E[\"5. 最小限の変更を設計する\"]\nE --> F[\"6. ブランチで実装して差分をテストする\"]\nF --> G[\"7. レビューして展開する\"]",
  "d5": "flowchart LR\nDEV[\"開発者が push\"] --> LINT[\"Lint(構文・書式チェック)\"]\nLINT --> UT[\"単体テスト\"]\nUT --> BLD[\"ビルド(コンテナイメージ)\"]\nBLD --> PRE[\"事前検証(テスト環境で pyATS など)\"]\nPRE --> APR{\"承認\"}\nAPR -->|\"承認\"| DEP[\"本番へデプロイ\"]\nDEP --> POST[\"事後検証(設定・状態の確認)\"]\nAPR -->|\"却下\"| STOP[\"修正して再 push\"]",
  "d6": "flowchart TD\nA[\"パイプラインが失敗\"] --> B[\"失敗したジョブとログを確認\"]\nB --> C{\"どの種類の失敗か\"}\nC -->|\"コード起因\"| D[\"テスト失敗・構文エラー:ローカルで再現して修正\"]\nC -->|\"パイプライン定義\"| E[\"YAML の書式・stage 名・rules・変数の綴りを確認\"]\nC -->|\"ツール非互換\"| F[\"バージョン固定を確認(Python・Ansible・コレクション)\"]\nC -->|\"環境・権限\"| G[\"Runner・認証情報・ネットワーク到達性を確認\"]\nD --> H[\"修正をコミットして再実行\"]\nE --> H\nF --> H\nG --> H",
  "d7": "flowchart TD\nA[\"「遅い」という報告\"] --> B[\"どこが遅いか切り分ける:クライアント・ネットワーク・サーバ・DB\"]\nB --> C[\"ネットワーク経路を確認(ping・traceroute・MTU・経路の往復一致)\"]\nB --> D[\"サーバ資源を確認(CPU・メモリ・ディスク・接続数)\"]\nB --> E[\"アプリ内部を確認(ログ・トレース・非同期キューの滞留)\"]\nB --> F[\"DB を確認(遅いクエリ・ロック・接続プール枯渇)\"]\nC --> G[\"原因を特定して修正し、再計測で効果を確認\"]\nD --> G\nE --> G\nF --> G",
  "d8": "flowchart LR\nA[\"2.1〜2.3 API を作る・使う(REST・GraphQL)\"] --> B[\"2.4〜2.6 YANG・NETCONF・RESTCONF で機器を設定\"]\nB --> C[\"2.7 Ansible(手順を自動化)\"]\nB --> D[\"2.8 Terraform(状態を宣言して管理)\"]\nB --> E[\"2.9 NSO(サービス単位で複数機器を管理)\"]",
  "d9": "flowchart TD\nA[\"API ドキュメントを開く\"] --> B[\"認証方式を確認(API キー・Bearer・OAuth2)\"]\nB --> C[\"ベース URL とエンドポイントを確認\"]\nC --> D[\"curl か Postman で1回だけ呼んでみる\"]\nD --> E[\"レスポンスの構造を読み取る(JSON のキー)\"]\nE --> F[\"Python に書き起こす(ページネーション・エラー処理を追加)\"]",
  "d10": "flowchart LR\nY[\"YANG モジュール(設計図)\"] --> P1[\"NETCONF:XML ペイロード\"]\nY --> P2[\"RESTCONF:JSON / XML ペイロード\"]\nP1 --> D[\"ネットワーク機器\"]\nP2 --> D",
  "d11": "flowchart TD\nA[\"Source of Truth(YAML / NetBox)\"] --> B[\"Python が読み込む\"]\nB --> C[\"YANG に合わせてペイロードを生成\"]\nC --> D[\"NETCONF edit-config / RESTCONF PATCH で投入\"]\nD --> E[\"get で再取得して SoT と一致するか検証\"]\nE -->|\"不一致\"| C\nE -->|\"一致\"| F[\"完了\"]",
  "d12": "flowchart LR\nA[\"terraform init(プロバイダ取得)\"] --> B[\"terraform plan(差分を確認)\"]\nB --> C[\"terraform apply(反映)\"]\nC --> D[\"ステートに記録\"]\nD --> B",
  "d13": "flowchart TD\nA[\"利用者がサービスのインスタンスを作成(YANG に基づく入力)\"] --> B[\"サービスの Python コールバック(cb_create)\"]\nB --> C[\"XML 設定テンプレートに変数を渡して適用\"]\nC --> D[\"NSO が差分を計算\"]\nD --> E[\"NED が各機器の CLI へ変換して投入\"]",
  "d14": "flowchart LR\nA[\"1. 認証(トークン・API キー・OAuth2)\"] --> B[\"2. エンドポイントを呼ぶ(GET で現状把握)\"]\nB --> C[\"3. レスポンスを解析(JSON を辞書として扱う)\"]\nC --> D[\"4. 変更(POST・PUT・PATCH)\"]\nD --> E[\"5. 結果を検証(再取得・ステータス確認)\"]",
  "d15": "flowchart TD\nA[\"testbed.yaml(機器と接続情報)\"] --> B[\"ジョブファイル(pyats run job)\"]\nB --> C[\"AEtest スクリプト\"]\nC --> D[\"CommonSetup:全機器へ接続\"]\nD --> E[\"Testcase:状態を取得して検証\"]\nE --> F[\"CommonCleanup:切断\"]\nF --> G[\"結果レポート(Pass / Fail)\"]",
  "d16": "flowchart TD\nsubgraph DI[\"Dial-in:コレクタから機器へ接続\"]\nC1[\"コレクタ\"] -->|\"gNMI Subscribe\"| D1[\"機器\"]\nC2[\"コレクタ\"] -->|\"NETCONF 購読\"| D2[\"機器\"]\nend\nsubgraph DO[\"Dial-out:機器からコレクタへ接続\"]\nD3[\"機器\"] -->|\"gRPC で送信\"| C3[\"コレクタ\"]\nend",
  "d17": "flowchart LR\nU[\"外部クライアント\"] --> I[\"Ingress\"]\nI --> S[\"Service\"]\nS --> P1[\"Pod 1\"]\nS --> P2[\"Pod 2\"]\nS --> P3[\"Pod 3\"]\nD[\"Deployment(レプリカ数を管理)\"] -.-> P1\nD -.-> P2\nD -.-> P3",
  "d18": "flowchart TD\nA[\"コンテナ間・外部と通信できない\"] --> B{\"同じネットワークに接続しているか\"}\nB -->|\"いいえ\"| C[\"docker network connect で参加させる\"]\nB -->|\"はい\"| D{\"名前解決はできるか\"}\nD -->|\"いいえ\"| E[\"ユーザー定義 bridge を使っているか確認\"]\nD -->|\"はい\"| F{\"外部(ホスト外)へ出られるか\"}\nF -->|\"いいえ\"| G[\"ホストの経路・NAT(マスカレード)・FW を確認\"]\nF -->|\"はい\"| H{\"外部からコンテナへ入れるか\"}\nH -->|\"いいえ\"| I[\"-p で公開しているか、ホスト FW とポート競合を確認\"]\nH -->|\"はい\"| J[\"アプリ側の待ち受けアドレス(0.0.0.0)を確認\"]",
  "d19": "flowchart TD\nA[\"1. 秘密鍵を生成(外に出さない)\"] --> B[\"2. CSR(証明書署名要求)を作成\"]\nB --> C[\"3. CSR を認証局(CA)へ送る\"]\nC --> D[\"4. CA が署名した証明書を受け取る\"]\nD --> E[\"5. Web アプリに鍵と証明書を設定\"]\nE --> F[\"6. s_client などで検証\"]",
  "d20": "sequenceDiagram\nparticipant C as 自動化スクリプト(クライアント)\nparticipant A as 認可サーバ\nparticipant R as API(リソースサーバ)\nC->>A: トークン要求(client_id・client_secret・scope)\nA-->>C: アクセストークン(有効期限付き)\nC->>R: API 呼び出し(Authorization: Bearer トークン)\nR-->>C: 結果",
  "d21": "flowchart LR\nU[\"運用者(自然言語で質問)\"] --> AG[\"対話型エージェント(LLM)\"]\nAG -->|\"ツール呼び出し\"| MCP[\"MCP サーバ(FastMCP)\"]\nMCP --> NET[\"ネットワーク機器・API\"]\nNET --> MCP\nMCP --> AG\nAG --> U\nAG -.-> GUARD[\"ガードレール:権限制限・人間の承認・検証・ログ\"]",
  "d22": "flowchart TD\nA[\"開始:全体の指示と環境を確認\"] --> B[\"全タスクを一度読み、配点と所要時間の目安をつける\"]\nB --> C[\"得意な・確実に取れるタスクから着手\"]\nC --> D{\"15〜20分で進展があるか\"}\nD -->|\"あり\"| E[\"最後まで仕上げて動作確認\"]\nD -->|\"なし\"| F[\"メモを残して次へ(後で戻る)\"]\nE --> G[\"検証:要件をすべて満たしたか再確認\"]\nF --> C\nG --> H[\"終盤30〜60分は見直しと未完了の回収に使う\"]"
} as const;
export type DiagramId = keyof typeof DIAGRAMS;
export const NAV_ITEMS = [
  {
    "id": "s-0",
    "label": "0. 最初に必ず読んでください：名称と試験の変更点",
    "level": 2
  },
  {
    "id": "s-1",
    "label": "1. この認定の全体像",
    "level": 2
  },
  {
    "id": "s-1-1",
    "label": "1.1 何を証明する認定か",
    "level": 3
  },
  {
    "id": "s-1-2",
    "label": "1.2 取得までの道のり",
    "level": 3
  },
  {
    "id": "s-1-3",
    "label": "1.3 試験の要点（公式情報の整理）",
    "level": 3
  },
  {
    "id": "s-1-4",
    "label": "1.4 ラボ試験の5つのドメインと配点",
    "level": 3
  },
  {
    "id": "s-2",
    "label": "2. 学習ロードマップ（初学者向けステップ）",
    "level": 2
  },
  {
    "id": "s-2-1",
    "label": "2.1 全体の流れ",
    "level": 3
  },
  {
    "id": "s-2-2",
    "label": "2.2 学習期間の目安",
    "level": 3
  },
  {
    "id": "s-2-3",
    "label": "2.3 Step 0：土台づくり（ここを飛ばすと後で必ず詰まります）",
    "level": 3
  },
  {
    "id": "s-3",
    "label": "3. ドメイン1：ソフトウェア設計・開発・デプロイ（20%）",
    "level": 2
  },
  {
    "id": "s-3-1",
    "label": "3.1 【1.1】オンプレミス／ハイブリッド／パブリッククラウドの設計",
    "level": 3
  },
  {
    "id": "s-3-2",
    "label": "3.2 【1.2】既存の自動化ソリューションを要件に合わせて修正する",
    "level": 3
  },
  {
    "id": "s-3-3",
    "label": "3.3 【1.3】Git を CI/CD 開発ワークフローで使う",
    "level": 3
  },
  {
    "id": "s-3-4",
    "label": "3.4 【1.4】CI/CD パイプラインのトラブルシュート",
    "level": 3
  },
  {
    "id": "s-3-5",
    "label": "3.5 【1.5】アプリケーション性能問題の診断",
    "level": 3
  },
  {
    "id": "s-4",
    "label": "4. ドメイン2：Infrastructure as Code（30%）",
    "level": 2
  },
  {
    "id": "s-4-1",
    "label": "4.1 【2.1】Python で REST API を構築・運用する",
    "level": 3
  },
  {
    "id": "s-4-2",
    "label": "4.2 【2.2】REST API を使う Python CLI アプリを作る",
    "level": 3
  },
  {
    "id": "s-4-3",
    "label": "4.3 【2.3】ドキュメントを読んで新しい API を使う（REST／GraphQL）",
    "level": 3
  },
  {
    "id": "s-4-4",
    "label": "4.4 【2.4】YANG モジュールから RESTCONF／NETCONF のペイロードを作る",
    "level": 3
  },
  {
    "id": "s-4-5",
    "label": "4.5 【2.5】XPath で NETCONF フィルタを作る",
    "level": 3
  },
  {
    "id": "s-4-6",
    "label": "4.6 【2.6】NETCONF／RESTCONF で機器を設定する（SoT 駆動）",
    "level": 3
  },
  {
    "id": "s-4-7",
    "label": "4.7 【2.7】Ansible でロールを作り、インフラを管理する",
    "level": 3
  },
  {
    "id": "s-4-8",
    "label": "4.8 【2.8】Terraform で状態を持つインフラ管理",
    "level": 3
  },
  {
    "id": "s-4-9",
    "label": "4.9 【2.9】Cisco NSO のサービスパッケージを作る",
    "level": 3
  },
  {
    "id": "s-5",
    "label": "5. ドメイン3：ネットワークプログラマビリティと自動化（25%）",
    "level": 2
  },
  {
    "id": "s-5-1",
    "label": "5.1 【3.1】Python ライブラリと SDK ドキュメントで各プラットフォームを自動化する",
    "level": 3
  },
  {
    "id": "s-5-2",
    "label": "5.2 【3.2】IOS XE の設定を自動化する",
    "level": 3
  },
  {
    "id": "s-5-3",
    "label": "5.3 【3.3】pyATS で自動テストを作る・修正する・トラブルシュートする",
    "level": 3
  },
  {
    "id": "s-5-4",
    "label": "5.4 【3.4】モデル駆動型テレメトリの設計",
    "level": 3
  },
  {
    "id": "s-5-5",
    "label": "5.5 【3.5】YANG モデル駆動型テレメトリのサブスクリプションを作る",
    "level": 3
  },
  {
    "id": "s-6",
    "label": "6. ドメイン4：コンテナ（10%）",
    "level": 2
  },
  {
    "id": "s-6-1",
    "label": "6.1 【4.1】Docker イメージの作成（Dockerfile）",
    "level": 3
  },
  {
    "id": "s-6-2",
    "label": "6.2 【4.2】Docker Compose でのパッケージングと展開",
    "level": 3
  },
  {
    "id": "s-6-3",
    "label": "6.3 【4.3】Kubernetes でのパッケージングと展開",
    "level": 3
  },
  {
    "id": "s-6-4",
    "label": "6.4 【4.4】Docker ホストとブリッジ型ネットワークの作成・利用・トラブルシュート",
    "level": 3
  },
  {
    "id": "s-7",
    "label": "7. ドメイン5：セキュリティ（15%）",
    "level": 2
  },
  {
    "id": "s-7-1",
    "label": "7.1 【5.1】OWASP のセキュアコーディングを全ソリューションに適用する",
    "level": 3
  },
  {
    "id": "s-7-2",
    "label": "7.2 【5.2】OpenSSL で CSR を作成し、CA で署名された証明書を Web アプリに適用する",
    "level": 3
  },
  {
    "id": "s-7-3",
    "label": "7.3 【5.3】OAuth2 でアクセストークンを取得する",
    "level": 3
  },
  {
    "id": "s-7-4",
    "label": "7.4 【5.4】シークレット管理システムでアプリを保護する",
    "level": 3
  },
  {
    "id": "s-7-5",
    "label": "7.5 【5.5】トークン・ヘッダ・シークレットで REST API を保護する",
    "level": 3
  },
  {
    "id": "s-8",
    "label": "8. 筆記試験 350-901 AUTOCOR の学び方",
    "level": 2
  },
  {
    "id": "s-8-1",
    "label": "8.1 試験の位置づけ",
    "level": 3
  },
  {
    "id": "s-8-2",
    "label": "8.2 出題ドメイン",
    "level": 3
  },
  {
    "id": "s-8-3",
    "label": "8.3 「AI in Automation」を初学者向けに整理",
    "level": 3
  },
  {
    "id": "s-8-4",
    "label": "8.4 筆記試験の学習の進め方",
    "level": 3
  },
  {
    "id": "s-9",
    "label": "9. ラボ試験（8時間）の戦略",
    "level": 2
  },
  {
    "id": "s-9-1",
    "label": "9.1 試験の性質",
    "level": 3
  },
  {
    "id": "s-9-2",
    "label": "9.2 試験中の進め方",
    "level": 3
  },
  {
    "id": "s-9-3",
    "label": "9.3 日頃の練習で身につけたいこと",
    "level": 3
  },
  {
    "id": "s-10",
    "label": "10. 全体のベストプラクティス一覧",
    "level": 2
  },
  {
    "id": "s-10-1",
    "label": "10.1 設計・開発",
    "level": 3
  },
  {
    "id": "s-10-2",
    "label": "10.2 自動化ツール",
    "level": 3
  },
  {
    "id": "s-10-3",
    "label": "10.3 運用・セキュリティ",
    "level": 3
  },
  {
    "id": "s-10-4",
    "label": "10.4 受験前チェックリスト",
    "level": 3
  },
  {
    "id": "s-11",
    "label": "11. 用語集",
    "level": 2
  },
  {
    "id": "s-12",
    "label": "12. 参考にした情報源（URL）",
    "level": 2
  },
  {
    "id": "s-12-1",
    "label": "12.1 Cisco 公式（本書の根拠。今回、内容を直接確認したもの）",
    "level": 3
  },
  {
    "id": "s-12-2",
    "label": "12.2 標準仕様・製品公式ドキュメント（学習用の入口。今回は内容の再確認をしていないため、リンク切れ・版の違いにご注意ください）",
    "level": 3
  },
  {
    "id": "s-12-3",
    "label": "12.3 第三者の情報（補助的に参照。公式ではないため、必ず公式で再確認してください）",
    "level": 3
  }
] as const;
