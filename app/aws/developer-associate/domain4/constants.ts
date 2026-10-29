/** 原本の全目次・全図の単一正本。 */
export const NAV_ITEMS = [
  {
    "id": "intro",
    "n": "序",
    "label": "はじめに",
    "group": "はじめに"
  },
  {
    "id": "step-0",
    "n": "0",
    "label": "ドメイン 4 の全体像",
    "group": ""
  },
  {
    "id": "step-1",
    "n": "1",
    "label": "コードをデバッグして不具合を特定する",
    "group": "Task 1 根本原因分析"
  },
  {
    "id": "step-2",
    "n": "2",
    "label": "メトリクス・ログ・トレースを読み解く",
    "group": ""
  },
  {
    "id": "step-3",
    "n": "3",
    "label": "ログをクエリして必要なデータを見つける",
    "group": ""
  },
  {
    "id": "step-4",
    "n": "4",
    "label": "カスタムメトリクスと EMF",
    "group": ""
  },
  {
    "id": "step-5",
    "n": "5",
    "label": "ダッシュボードとインサイトでヘルスを確認する",
    "group": ""
  },
  {
    "id": "step-6",
    "n": "6",
    "label": "サービス出力ログでデプロイ失敗を調査する",
    "group": ""
  },
  {
    "id": "step-7",
    "n": "7",
    "label": "サービス間連携の問題をデバッグする",
    "group": ""
  },
  {
    "id": "step-8",
    "n": "8",
    "label": "ロギング・モニタリング・オブザーバビリティの違い",
    "group": "Task 2 オブザーバビリティの計装"
  },
  {
    "id": "step-9",
    "n": "9",
    "label": "効果的なロギング戦略",
    "group": ""
  },
  {
    "id": "step-10",
    "n": "10",
    "label": "構造化ログ",
    "group": ""
  },
  {
    "id": "step-11",
    "n": "11",
    "label": "カスタムメトリクスを出力するコード",
    "group": ""
  },
  {
    "id": "step-12",
    "n": "12",
    "label": "AWS サービスとツールによるトレーシング",
    "group": ""
  },
  {
    "id": "step-13",
    "n": "13",
    "label": "トレースへのアノテーション追加",
    "group": ""
  },
  {
    "id": "step-14",
    "n": "14",
    "label": "通知アラートの実装",
    "group": ""
  },
  {
    "id": "step-15",
    "n": "15",
    "label": "ヘルスチェックとレディネスプローブ",
    "group": ""
  },
  {
    "id": "step-16",
    "n": "16",
    "label": "同時実行数(Concurrency)の定義",
    "group": "Task 3 最適化"
  },
  {
    "id": "step-17",
    "n": "17",
    "label": "アプリケーションのパフォーマンスをプロファイルする",
    "group": ""
  },
  {
    "id": "step-18",
    "n": "18",
    "label": "最小限のメモリとコンピューティング能力を決める",
    "group": ""
  },
  {
    "id": "step-19",
    "n": "19",
    "label": "SNS サブスクリプションフィルターポリシー",
    "group": ""
  },
  {
    "id": "step-20",
    "n": "20",
    "label": "リクエストヘッダーに基づくコンテンツのキャッシュ",
    "group": ""
  },
  {
    "id": "step-21",
    "n": "21",
    "label": "アプリケーションレベルのキャッシュ",
    "group": ""
  },
  {
    "id": "step-22",
    "n": "22",
    "label": "アプリケーションのリソース使用量を最適化する",
    "group": ""
  },
  {
    "id": "step-23",
    "n": "23",
    "label": "パフォーマンス問題を分析する",
    "group": ""
  },
  {
    "id": "step-24",
    "n": "24",
    "label": "アプリケーションログからボトルネックを特定する",
    "group": ""
  },
  {
    "id": "app-a",
    "n": "A",
    "label": "練習問題と解答",
    "group": "付録"
  },
  {
    "id": "app-b",
    "n": "B",
    "label": "症状から原因を引くチートシート",
    "group": ""
  },
  {
    "id": "app-c",
    "n": "C",
    "label": "試験のひっかけパターン",
    "group": ""
  },
  {
    "id": "app-d",
    "n": "D",
    "label": "新興トピック(AI 支援ツール)",
    "group": ""
  },
  {
    "id": "app-e",
    "n": "E",
    "label": "スキルと Step の対応表",
    "group": ""
  },
  {
    "id": "app-f",
    "n": "F",
    "label": "参考 URL 一覧",
    "group": ""
  },
  {
    "id": "closing",
    "n": "終",
    "label": "おわりに: 学習の進め方",
    "group": ""
  }
] as const;
export const DIAGRAMS = {
  "d00": "flowchart TD\nA[\"Domain 1　Development　32%\"] --> B[\"Domain 2　Security　26%\"]\nB --> C[\"Domain 3　Deployment　24%\"]\nC --> D[\"Domain 4　Troubleshooting and Optimization　18%\"]\nclass A hub\nclass D done\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d01": "flowchart TD\nD4[\"Domain 4　Troubleshooting and Optimization\"]\nT1[\"Task 1　根本原因分析を支援する　4.1.1 から 4.1.7\"]\nT2[\"Task 2　オブザーバビリティのため　コードを計装する　4.2.1 から 4.2.8\"]\nT3[\"Task 3　サービスと機能で　アプリを最適化する　4.3.1 から 4.3.9\"]\nD4 --> T1\nD4 --> T2\nD4 --> T3\nT2 -->|\"計装したデータを使う\"| T1\nT1 -->|\"原因が分かったら改善\"| T3\nclass D4 hub\nclass T3 done\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d02": "flowchart TD\nA[\"1 検知　アラーム 通知\"] --> B[\"2 切り分け　ダッシュボード メトリクス\"]\nB --> C[\"3 原因特定　ログ トレース\"]\nC --> D[\"4 修正　コード 設定 リソース\"]\nD --> E[\"5 再発防止　計装 アラーム 最適化\"]\nE --> A\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d03": "flowchart TD\nS[\"不具合の報告\"] --> R{\"再現できるか\"}\nR -->|\"できる\"| L[\"ローカルで再現　sam local invoke\"]\nR -->|\"できない 本番のみ\"| P[\"本番ログ メトリクス　トレースを確認\"]\nL --> U[\"単体テストを書いて　失敗を固定する\"]\nP --> H[\"仮説を立てる\"]\nU --> H\nH --> F[\"修正して再テスト\"]\nF --> V{\"解決したか\"}\nV -->|\"いいえ\"| H\nV -->|\"はい\"| D[\"デプロイして監視を継続\"]\nclass S hub\nclass D done\nclass R,V box\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d04": "flowchart TD\nM[\"メトリクス　エラー率が上がった\"] --> T[\"トレース　決済サービスの呼び出しで遅い\"]\nT --> L[\"ログ　決済 API が 503 を返している\"]\nL --> C[\"原因　外部決済の障害\"]\nclass M hub\nclass C done\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d05": "flowchart LR\nC[\"クライアント\"] --> A[\"API Gateway\"]\nA --> F[\"Lambda 関数\"]\nF --> D[\"DynamoDB\"]\nF --> E[\"外部 API\"]\nclass C hub\nclass D,E done\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d06": "flowchart LR\nQ[\"ログを調べたい\"] --> A{\"目的は\"}\nA -->|\"今の流れを見たい\"| LT[\"Live Tail\"]\nA -->|\"過去を絞り込み 集計したい\"| LI[\"Logs Insights\"]\nA -->|\"特定の文字列を　数えて警報にしたい\"| MF[\"メトリクスフィルター　とアラーム\"]\nA -->|\"リアルタイムで　別システムへ流したい\"| SF[\"サブスクリプション　フィルター\"]\nA -->|\"長期保存の　大規模分析\"| AT[\"S3 と Athena\"]\nA -->|\"誰が API を呼んだか\"| CT[\"CloudTrail\"]\nclass Q hub\nclass A box\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d07": "flowchart TD\nA[\"アプリが　ERROR をログ出力\"] --> B[\"ロググループ\"]\nB --> C[\"メトリクスフィルター　ERROR を含む行を数える\"]\nC --> D[\"カスタムメトリクス　ErrorCount\"]\nD --> E[\"CloudWatch アラーム\"]\nE --> F[\"SNS で通知\"]\nclass A hub\nclass F done\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d08": "flowchart TD\nA[\"アプリのコード\"] --> B{\"メトリクスの送り方\"}\nB -->|\"PutMetricData\"| C[\"CloudWatch API を　同期的に呼ぶ\"]\nB -->|\"EMF\"| D[\"JSON を標準出力へ　ログとして書く\"]\nD --> E[\"CloudWatch Logs\"]\nE --> F[\"CloudWatch が EMF を　自動で解析\"]\nC --> G[\"CloudWatch Metrics\"]\nF --> G\nF --> H[\"ログとしても保存　Logs Insights で検索可能\"]\nclass A hub\nclass G,H done\nclass B box\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d09": "flowchart TD\nA[\"アプリが遅い 失敗している\"] --> B[\"ダッシュボードで全体を確認\"]\nB --> C{\"どの層が異常か\"}\nC -->|\"関数のリソース不足\"| D[\"Lambda Insights\"]\nC -->|\"特定ユーザーや IP が突出\"| E[\"Contributor Insights\"]\nC -->|\"サービス間の依存で遅い\"| F[\"X-Ray サービスマップ\"]\nC -->|\"ユーザー体験の悪化\"| G[\"Synthetics や RUM\"]\nC -->|\"AWS 側の障害の疑い\"| H[\"Health Dashboard\"]\nclass A hub\nclass C box\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d10": "flowchart LR\nS[\"Source　CodeCommit GitHub S3\"] --> B[\"Build　CodeBuild\"]\nB --> T[\"Test\"]\nT --> D[\"Deploy　CodeDeploy CloudFormation　ECS Beanstalk\"]\nclass S hub\nclass D done\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d11": "flowchart LR\nF[\"デプロイ失敗\"] --> P[\"CodePipeline で　失敗したステージを特定\"]\nP --> Q{\"どのサービスか\"}\nQ -->|\"CodeBuild\"| B1[\"ビルドログと　Phase details\"]\nQ -->|\"CodeDeploy\"| B2[\"ライフサイクルイベント　とエージェントのログ\"]\nQ -->|\"CloudFormation\"| B3[\"スタックイベントの　最初の失敗理由\"]\nQ -->|\"ECS\"| B4[\"停止タスクの理由と　コンテナログ\"]\nQ -->|\"Beanstalk\"| B5[\"イベントと eb logs\"]\nclass F hub\nclass Q box\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d12": "flowchart TD\nP[\"連携がうまく動かない\"] --> A{\"リクエストは相手に　届いているか\"}\nA -->|\"届いていない\"| B[\"権限 リソースポリシー　エンドポイント ルールを確認\"]\nA -->|\"届いている\"| C{\"相手は成功したか\"}\nC -->|\"失敗\"| D[\"相手側のログ　エラー 形式 権限を確認\"]\nC -->|\"成功\"| E{\"応答は正しく　返っているか\"}\nE -->|\"いいえ\"| F[\"応答の形式　タイムアウトを確認\"]\nE -->|\"はい\"| G[\"再試行 重複　順序の問題を確認\"]\nclass P hub\nclass A,C,E box\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d13": "flowchart TD\nR1[\"失敗\"] -->|\"待つ 1 秒前後\"| R2[\"再試行 1\"]\nR2 -->|\"待つ 2 秒前後\"| R3[\"再試行 2\"]\nR3 -->|\"待つ 4 秒前後\"| R4[\"再試行 3\"]\nR4 -->|\"上限回数に達した\"| R5[\"DLQ や　エラー処理へ\"]\nclass R1 hub\nclass R5 done\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d14": "flowchart TD\nO[\"オブザーバビリティ　未知の問題を調べられる能力\"]\nM[\"モニタリング　既知の指標を見張り 通知する\"]\nL[\"ロギング　出来事を記録する\"]\nT[\"トレーシング　リクエストの道のりを記録する\"]\nME[\"メトリクス　数値を測る\"]\nL --> O\nT --> O\nME --> M\nM --> O\nclass L hub\nclass O done\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d15": "flowchart LR\nA[\"アプリ Lambda ECS EC2\"] --> B[\"CloudWatch Logs　ロググループとストリーム\"]\nB --> C[\"保持期間を設定　不要な古いログを削除\"]\nB --> D[\"データ保護ポリシー　機密データをマスク\"]\nB --> E[\"Logs Insights で検索\"]\nB --> F[\"メトリクスフィルター　とアラーム\"]\nB --> G[\"S3 へエクスポート　長期保管と Athena 分析\"]\nclass A hub\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d16": "flowchart LR\nA[\"アプリ　JSON でログ出力\"] --> B[\"CloudWatch Logs\"]\nB --> C[\"Logs Insights　フィールドで検索 集計\"]\nB --> D[\"メトリクスフィルター　JSON のフィールド条件\"]\nB --> E[\"S3 へ出力して　Athena で SQL 分析\"]\nclass A hub\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d17": "flowchart TD\nA[\"カスタムメトリクスを追加したい\"] --> B{\"実行環境は Lambda か\"}\nB -->|\"はい\"| C[\"EMF を使う　Powertools Metrics が簡単\"]\nB -->|\"いいえ ECS EC2\"| D[\"CloudWatch エージェント　または EMF クライアント\"]\nC --> E{\"ディメンションは　値の種類が少ないか\"}\nD --> E\nE -->|\"はい\"| F[\"ディメンションとして設定\"]\nE -->|\"いいえ ユーザー ID など\"| G[\"ディメンションにせず　ログのプロパティにする\"]\nclass A hub\nclass F,G done\nclass B,E box\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d18": "flowchart TD\nC[\"クライアント\"] -->|\"X-Amzn-Trace-Id\"| A[\"API Gateway　トレース有効化\"]\nA -->|\"ヘッダーを引き継ぐ\"| L[\"Lambda　アクティブトレース\"]\nL --> D[\"DynamoDB　サブセグメント\"]\nL --> H[\"外部 HTTP API　サブセグメント\"]\nA -.->|\"セグメント送信\"| X[\"AWS X-Ray　サービスマップ トレース\"]\nL -.->|\"セグメント送信\"| X\nclass C hub\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d19": "flowchart TD\nA[\"トレースに情報を付けたい\"] --> B{\"その値で　トレースを検索したいか\"}\nB -->|\"はい\"| C[\"アノテーション　インデックスされる\"]\nB -->|\"いいえ\"| D[\"メタデータ　検索不可 任意の型\"]\nC --> E[\"フィルター式で検索　annotation.userTier = premium\"]\nD --> F[\"トレース詳細で　内容を確認\"]\nclass A hub\nclass E,F done\nclass B box\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d20": "flowchart TD\nM[\"メトリクス　しきい値超過\"] --> A[\"CloudWatch アラーム\"]\nE[\"イベント　状態変化\"] --> R[\"EventBridge ルール\"]\nA --> S[\"SNS トピック\"]\nR --> S\nS --> E1[\"メール\"]\nS --> E2[\"SMS や HTTP\"]\nS --> E3[\"Lambda\"]\nS --> E4[\"Slack など　チャット連携\"]\nclass M hub\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d21": "flowchart TD\nA[\"リソースの使用量　例 Lambda の同時実行数\"] --> B[\"Service Quotas　使用量メトリクス\"]\nB --> C[\"CloudWatch アラーム　使用率が 80 パーセント超\"]\nC --> D[\"SNS で通知\"]\nD --> E[\"クォータ引き上げ申請　または設計見直し\"]\nclass A hub\nclass E done\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d22": "flowchart TD\nS[\"コンテナ起動\"] --> ST{\"Startup プローブ　起動完了か\"}\nST -->|\"完了\"| R{\"Readiness プローブ　受付可能か\"}\nST -->|\"失敗が続く\"| K[\"再起動\"]\nR -->|\"はい\"| T[\"トラフィックを受ける\"]\nR -->|\"いいえ\"| N[\"トラフィックから外す　再起動はしない\"]\nT --> L{\"Liveness プローブ　生存しているか\"}\nL -->|\"はい\"| T\nL -->|\"失敗が続く\"| K\nclass S hub\nclass K,N done\nclass ST,R,L box\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d23": "flowchart TD\nLB[\"ロードバランサー\"] -->|\"GET health 定期的に\"| A[\"アプリ\"]\nA --> C{\"チェック内容\"}\nC -->|\"浅い\"| OK1[\"プロセス生存のみ確認　固定で 200\"]\nC -->|\"深い\"| DB[\"DB キャッシュへ接続確認\"]\nDB -->|\"成功\"| OK2[\"200\"]\nDB -->|\"失敗\"| NG[\"503\"]\nclass LB hub\nclass C box\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d24": "flowchart TD\nA[\"アカウントの同時実行数の上限　既定 1000\"] --> B[\"予約済み同時実行数　関数 A に 200 を確保\"]\nA --> C[\"予約なしの共有プール　残り 800 を他の関数で共有\"]\nB --> D[\"関数 A の上限は 200　他の関数は 200 を使えない\"]\nB --> E[\"その内 プロビジョニング済み 50　初期化済みで待機\"]\nclass A hub\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d25": "flowchart TD\nA[\"遅い と感じる\"] --> B[\"トレースで　遅いサービスを特定\"]\nB --> C{\"遅いのはどこか\"}\nC -->|\"自分のコードの中\"| D[\"プロファイラーで　CPU 時間の大きい処理を特定\"]\nC -->|\"下流の DB\"| E[\"DB のクエリ分析　Performance Insights\"]\nC -->|\"外部 API\"| F[\"タイムアウト 再試行　キャッシュを検討\"]\nC -->|\"初期化\"| G[\"Init Duration を確認　コールドスタート対策\"]\nD --> H[\"改善して再測定\"]\nE --> H\nF --> H\nG --> H\nclass A hub\nclass H done\nclass C box\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d26": "flowchart TD\nA[\"現在の設定で　実行して計測\"] --> B[\"REPORT 行や Lambda Insights　Max Memory Used を確認\"]\nB --> C{\"Max Memory Used が　割り当てに近いか\"}\nC -->|\"近い 90 パーセント超\"| D[\"メモリを増やす　OOM を防ぎ CPU も増える\"]\nC -->|\"余裕がある\"| E[\"メモリを段階的に変えて　実行時間とコストを測定\"]\nE --> F[\"最もコスト効率が良い点　または目標レイテンシを満たす最小の点を採用\"]\nD --> E\nclass A hub\nclass F done\nclass C box\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d27": "flowchart TD\nP[\"発行者　注文イベントを Publish\"] --> T[\"SNS トピック\"]\nT -->|\"フィルターポリシー　status が approved\"| S1[\"承認処理 SQS\"]\nT -->|\"フィルターポリシー　status が rejected\"| S2[\"通知 SQS\"]\nT -->|\"フィルターポリシー　amount が 10000 以上\"| S3[\"不正検知 Lambda\"]\nT -->|\"ポリシーなし\"| S4[\"全件ログ保存\"]\nclass P hub\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d28": "flowchart TD\nV[\"ビューワー\"] --> E[\"CloudFront エッジ\"]\nE --> K{\"キャッシュキーが　一致するキャッシュがあるか\"}\nK -->|\"ヒット\"| R[\"エッジから即座に応答\"]\nK -->|\"ミス\"| O[\"オリジンへリクエスト　S3 ALB API Gateway\"]\nO --> S[\"応答をキャッシュして返す\"]\nS --> R\nclass V hub\nclass R done\nclass K box\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d29": "flowchart LR\nA[\"アプリ\"] --> C[\"キャッシュ　ElastiCache など\"]\nA --> D[\"データベース　RDS Aurora DynamoDB\"]\nC -.->|\"ミスのときだけ\"| D\nclass A hub\nclass D done\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d30": "flowchart TD\nR[\"読み取り要求\"] --> C{\"キャッシュに　データがあるか\"}\nC -->|\"ヒット\"| H[\"キャッシュの値を返す\"]\nC -->|\"ミス\"| D[\"DB から読む\"]\nD --> W[\"キャッシュに書き込む TTL 付き\"]\nW --> H2[\"値を返す\"]\nclass R hub\nclass H,H2 done\nclass C box\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d31": "flowchart LR\nA[\"リソースを使いすぎている\"] --> B{\"どのリソースか\"}\nB -->|\"Lambda の実行時間 コスト\"| C[\"ハンドラー外で初期化　メモリ調整 arm64\"]\nB -->|\"DB 接続\"| D[\"RDS Proxy　接続の再利用\"]\nB -->|\"DynamoDB の容量\"| E[\"Query 使用 ProjectionExpression　キー設計 DAX\"]\nB -->|\"API 呼び出し回数\"| F[\"バッチ化 キャッシュ　ロングポーリング\"]\nB -->|\"転送量\"| G[\"圧縮 範囲取得　CloudFront\"]\nB -->|\"不要なメッセージ処理\"| H[\"SNS フィルターポリシー\"]\nclass A hub\nclass B box\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d32": "flowchart TD\nA[\"1 症状を定量化　いつから どれくらい 誰に\"] --> B[\"2 変更点を確認　デプロイ 設定 トラフィック\"]\nB --> C[\"3 全体の層を切り分け　入口 コンピュート データ 外部\"]\nC --> D[\"4 トレースで　遅い箇所を特定\"]\nD --> E[\"5 ログとメトリクスで　原因を確認\"]\nE --> F[\"6 仮説を 1 つ検証して修正\"]\nF --> G[\"7 再測定して　効果を確認\"]\nclass A hub\nclass G done\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px",
  "d33": "flowchart TD\nA[\"遅いという報告\"] --> B[\"クエリ 7　いつから悪化したか\"]\nB --> C[\"クエリ 1　どの操作が遅いか\"]\nC --> D[\"クエリ 2　遅いリクエストを抽出\"]\nD --> E[\"requestId で　1 リクエストのログを串刺し検索\"]\nE --> F{\"時間はどこで消費されているか\"}\nF -->|\"下流呼び出し\"| G[\"クエリ 5　下流の遅延 キャッシュ 非同期化\"]\nF -->|\"初期化\"| H[\"クエリ 3　コールドスタート対策\"]\nF -->|\"CPU やメモリ\"| I[\"クエリ 4　メモリ増 コード最適化\"]\nF -->|\"再試行\"| J[\"retries を確認　バックオフと根本原因の修正\"]\nclass A hub\nclass F box\nclassDef hub fill:#e4e7f7,stroke:#34439a,color:#1f2a6b,stroke-width:2px\nclassDef box fill:#f7edcf,stroke:#7d5c14,color:#3d2c06,stroke-width:2px\nclassDef done fill:#dcefe3,stroke:#2c6a46,color:#103321,stroke-width:2px"
} as const;
export type DiagramId = keyof typeof DIAGRAMS;
