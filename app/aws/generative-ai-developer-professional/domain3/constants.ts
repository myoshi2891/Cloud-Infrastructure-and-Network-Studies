/** 原本から抽出した目次・図・描画設定。 */
export const NAV_ITEMS = [
  {
    "id": "usage",
    "label": "0. このガイドの使い方",
    "level": 2
  },
  {
    "id": "toc",
    "label": "目次",
    "level": 2
  },
  {
    "id": "step-0",
    "label": "Step 0. Domain 3 の全体像",
    "level": 2
  },
  {
    "id": "sec-0-1",
    "label": "0-1. 4 つの Task と 15 の Skill",
    "level": 3
  },
  {
    "id": "sec-0-2",
    "label": "0-2. 守る対象の 3 方向",
    "level": 3
  },
  {
    "id": "step-1",
    "label": "Step 1. 生成AI特有の脅威を理解する",
    "level": 2
  },
  {
    "id": "task-3-1",
    "label": "Task 3.1 入出力の安全対策",
    "level": 2
  },
  {
    "id": "step-2",
    "label": "Step 2. Amazon Bedrock Guardrails の基礎",
    "level": 2
  },
  {
    "id": "sec-2-1",
    "label": "2-1. Guardrails とは",
    "level": 3
  },
  {
    "id": "sec-2-2",
    "label": "2-2. 6 つのポリシー（セーフガード）",
    "level": 3
  },
  {
    "id": "sec-2-3",
    "label": "2-3. 重要な設定ポイント",
    "level": 3
  },
  {
    "id": "sec-2-4",
    "label": "2-4. ベストプラクティス",
    "level": 3
  },
  {
    "id": "sec-2-5",
    "label": "2-5. 試験の着眼点",
    "level": 3
  },
  {
    "id": "step-3",
    "label": "Step 3. 入力の安全対策（Skill 3.1.1）",
    "level": 2
  },
  {
    "id": "sec-3-1",
    "label": "3-1. 何を守るのか",
    "level": 3
  },
  {
    "id": "sec-3-2",
    "label": "3-2. 選択肢の整理",
    "level": 3
  },
  {
    "id": "sec-3-3",
    "label": "3-3. カスタムモデレーションワークフロー例",
    "level": 3
  },
  {
    "id": "sec-3-4",
    "label": "3-4. ベストプラクティス",
    "level": 3
  },
  {
    "id": "sec-3-5",
    "label": "3-5. 試験の着眼点",
    "level": 3
  },
  {
    "id": "step-4",
    "label": "Step 4. 出力の安全対策（Skill 3.1.2）",
    "level": 2
  },
  {
    "id": "sec-4-1",
    "label": "4-1. 3 つの手段",
    "level": 3
  },
  {
    "id": "sec-4-2",
    "label": "4-2. FM 評価で有害性をチェックする",
    "level": 3
  },
  {
    "id": "sec-4-3",
    "label": "4-3. text-to-SQL で「決定的な結果」を得る",
    "level": 3
  },
  {
    "id": "sec-4-4",
    "label": "4-4. ベストプラクティス",
    "level": 3
  },
  {
    "id": "sec-4-5",
    "label": "4-5. 試験の着眼点",
    "level": 3
  },
  {
    "id": "step-5",
    "label": "Step 5. ハルシネーション対策（Skill 3.1.3）",
    "level": 2
  },
  {
    "id": "sec-5-1",
    "label": "5-1. ハルシネーションとは",
    "level": 3
  },
  {
    "id": "sec-5-2",
    "label": "5-2. 対策マップ",
    "level": 3
  },
  {
    "id": "sec-5-3",
    "label": "5-3. Contextual grounding check を理解する",
    "level": 3
  },
  {
    "id": "sec-5-4",
    "label": "5-4. 検証フロー例",
    "level": 3
  },
  {
    "id": "sec-5-5",
    "label": "5-5. 構造化出力を JSON Schema で強制する理由",
    "level": 3
  },
  {
    "id": "sec-5-6",
    "label": "5-6. ベストプラクティス",
    "level": 3
  },
  {
    "id": "sec-5-7",
    "label": "5-7. 試験の着眼点",
    "level": 3
  },
  {
    "id": "step-6",
    "label": "Step 6. 多層防御（Skill 3.1.4）",
    "level": 2
  },
  {
    "id": "sec-6-1",
    "label": "6-1. 考え方",
    "level": 3
  },
  {
    "id": "sec-6-2",
    "label": "6-2. Amazon Comprehend の役割",
    "level": 3
  },
  {
    "id": "sec-6-3",
    "label": "6-3. ベストプラクティス",
    "level": 3
  },
  {
    "id": "sec-6-4",
    "label": "6-4. 試験の着眼点",
    "level": 3
  },
  {
    "id": "step-7",
    "label": "Step 7. 高度な脅威検知（Skill 3.1.5）",
    "level": 2
  },
  {
    "id": "sec-7-1",
    "label": "7-1. 脅威と対策の対応表",
    "level": 3
  },
  {
    "id": "sec-7-2",
    "label": "7-2. 自動化された敵対的テスト",
    "level": 3
  },
  {
    "id": "sec-7-3",
    "label": "7-3. ベストプラクティス",
    "level": 3
  },
  {
    "id": "sec-7-4",
    "label": "7-4. 試験の着眼点",
    "level": 3
  },
  {
    "id": "task-3-2",
    "label": "Task 3.2 データセキュリティとプライバシー",
    "level": 2
  },
  {
    "id": "step-8",
    "label": "Step 8. 保護された AI 環境（Skill 3.2.1）",
    "level": 2
  },
  {
    "id": "sec-8-1",
    "label": "8-1. Bedrock のデータ保護の前提（まず知っておく事実）",
    "level": 3
  },
  {
    "id": "sec-8-2",
    "label": "8-2. 4 つの防御面",
    "level": 3
  },
  {
    "id": "sec-8-3",
    "label": "8-3. Bedrock 向け VPC エンドポイント（覚える対象）",
    "level": 3
  },
  {
    "id": "sec-8-4",
    "label": "8-4. Lake Formation の位置づけ",
    "level": 3
  },
  {
    "id": "sec-8-5",
    "label": "8-5. ベストプラクティス",
    "level": 3
  },
  {
    "id": "sec-8-6",
    "label": "8-6. 試験の着眼点",
    "level": 3
  },
  {
    "id": "step-9",
    "label": "Step 9. プライバシー保護システム（Skill 3.2.2）",
    "level": 2
  },
  {
    "id": "sec-9-1",
    "label": "9-1. PII 検出サービスの使い分け",
    "level": 3
  },
  {
    "id": "sec-9-2",
    "label": "9-2. データのライフサイクル全体で守る",
    "level": 3
  },
  {
    "id": "sec-9-3",
    "label": "9-3. S3 ライフサイクルによる保持ポリシー",
    "level": 3
  },
  {
    "id": "sec-9-4",
    "label": "9-4. ベストプラクティス",
    "level": 3
  },
  {
    "id": "sec-9-5",
    "label": "9-5. 試験の着眼点",
    "level": 3
  },
  {
    "id": "step-10",
    "label": "Step 10. プライバシー重視設計（Skill 3.2.3）",
    "level": 2
  },
  {
    "id": "sec-10-1",
    "label": "10-1. 「守る」と「役に立つ」を両立する",
    "level": 3
  },
  {
    "id": "sec-10-2",
    "label": "10-2. 仮名化して推論し、表示時に復元する流れ",
    "level": 3
  },
  {
    "id": "sec-10-3",
    "label": "10-3. Guardrails の機密情報フィルターの使い分け",
    "level": 3
  },
  {
    "id": "sec-10-4",
    "label": "10-4. ベストプラクティス",
    "level": 3
  },
  {
    "id": "sec-10-5",
    "label": "10-5. 試験の着眼点",
    "level": 3
  },
  {
    "id": "task-3-3",
    "label": "Task 3.3 ガバナンスとコンプライアンス",
    "level": 2
  },
  {
    "id": "step-11",
    "label": "Step 11. コンプライアンスフレームワーク（Skill 3.3.1）",
    "level": 2
  },
  {
    "id": "sec-11-1",
    "label": "11-1. 4 つの部品",
    "level": 3
  },
  {
    "id": "sec-11-2",
    "label": "11-2. モデルカードをコードで作る理由",
    "level": 3
  },
  {
    "id": "sec-11-3",
    "label": "11-3. 意思決定ログ設計のコツ",
    "level": 3
  },
  {
    "id": "sec-11-4",
    "label": "11-4. ベストプラクティス",
    "level": 3
  },
  {
    "id": "sec-11-5",
    "label": "11-5. 試験の着眼点",
    "level": 3
  },
  {
    "id": "step-12",
    "label": "Step 12. データソース追跡（Skill 3.3.2）",
    "level": 2
  },
  {
    "id": "sec-12-1",
    "label": "12-1. 追跡したい問い",
    "level": 3
  },
  {
    "id": "sec-12-2",
    "label": "12-2. 3 つの仕組みの役割分担",
    "level": 3
  },
  {
    "id": "sec-12-3",
    "label": "12-3. ベストプラクティス",
    "level": 3
  },
  {
    "id": "sec-12-4",
    "label": "12-4. 試験の着眼点",
    "level": 3
  },
  {
    "id": "step-13",
    "label": "Step 13. 組織ガバナンス（Skill 3.3.3）",
    "level": 2
  },
  {
    "id": "sec-13-1",
    "label": "13-1. ガバナンスとは",
    "level": 3
  },
  {
    "id": "sec-13-2",
    "label": "13-2. 3 つのレイヤー",
    "level": 3
  },
  {
    "id": "sec-13-3",
    "label": "13-3. 役割分担の例",
    "level": 3
  },
  {
    "id": "sec-13-4",
    "label": "13-4. ベストプラクティス",
    "level": 3
  },
  {
    "id": "sec-13-5",
    "label": "13-5. 試験の着眼点",
    "level": 3
  },
  {
    "id": "step-14",
    "label": "Step 14. 継続監視と高度なガバナンス統制（Skill 3.3.4）",
    "level": 2
  },
  {
    "id": "sec-14-1",
    "label": "14-1. 何を監視するか",
    "level": 3
  },
  {
    "id": "sec-14-2",
    "label": "14-2. 自動検知から修復までの流れ",
    "level": 3
  },
  {
    "id": "sec-14-3",
    "label": "14-3. トークンレベルのレダクションと出力ポリシーフィルター",
    "level": 3
  },
  {
    "id": "sec-14-4",
    "label": "14-4. ベストプラクティス",
    "level": 3
  },
  {
    "id": "sec-14-5",
    "label": "14-5. 試験の着眼点",
    "level": 3
  },
  {
    "id": "task-3-4",
    "label": "Task 3.4 責任ある AI の実装",
    "level": 2
  },
  {
    "id": "step-15",
    "label": "Step 15. 透明性（Skill 3.4.1）",
    "level": 2
  },
  {
    "id": "sec-15-1",
    "label": "15-1. 透明性の 4 つの形",
    "level": 3
  },
  {
    "id": "sec-15-2",
    "label": "15-2. Bedrock Agent トレース",
    "level": 3
  },
  {
    "id": "sec-15-3",
    "label": "15-3. 不確実性の扱い（確信度の見せ方）",
    "level": 3
  },
  {
    "id": "sec-15-4",
    "label": "15-4. ベストプラクティス",
    "level": 3
  },
  {
    "id": "sec-15-5",
    "label": "15-5. 試験の着眼点",
    "level": 3
  },
  {
    "id": "step-16",
    "label": "Step 16. 公平性評価（Skill 3.4.2）",
    "level": 2
  },
  {
    "id": "sec-16-1",
    "label": "16-1. 公平性とは",
    "level": 3
  },
  {
    "id": "sec-16-2",
    "label": "16-2. 3 つの手法",
    "level": 3
  },
  {
    "id": "sec-16-3",
    "label": "16-3. 評価サイクル",
    "level": 3
  },
  {
    "id": "sec-16-4",
    "label": "16-4. ベストプラクティス",
    "level": 3
  },
  {
    "id": "sec-16-5",
    "label": "16-5. 試験の着眼点",
    "level": 3
  },
  {
    "id": "step-17",
    "label": "Step 17. ポリシー準拠 AI（Skill 3.4.3）",
    "level": 2
  },
  {
    "id": "sec-17-1",
    "label": "17-1. 「ポリシー → 実装 → 証明」の対応",
    "level": 3
  },
  {
    "id": "sec-17-2",
    "label": "17-2. 自動コンプライアンスチェックの流れ",
    "level": 3
  },
  {
    "id": "sec-17-3",
    "label": "17-3. モデルカードに書く「制限」の例",
    "level": 3
  },
  {
    "id": "sec-17-4",
    "label": "17-4. ベストプラクティス",
    "level": 3
  },
  {
    "id": "sec-17-5",
    "label": "17-5. 試験の着眼点",
    "level": 3
  },
  {
    "id": "step-18",
    "label": "Step 18. Task 3.4 のまとめ",
    "level": 2
  },
  {
    "id": "integration",
    "label": "統合と試験対策",
    "level": 2
  },
  {
    "id": "step-19",
    "label": "Step 19. 統合リファレンスアーキテクチャ",
    "level": 2
  },
  {
    "id": "step-20",
    "label": "Step 20. サービス選択早見表・引っ掛け表",
    "level": 2
  },
  {
    "id": "sec-20-1",
    "label": "20-1. 要件 → サービス早見表",
    "level": 3
  },
  {
    "id": "sec-20-2",
    "label": "20-2. 引っ掛け表（よくある誤り）",
    "level": 3
  },
  {
    "id": "step-21",
    "label": "Step 21. 練習問題 10 問",
    "level": 2
  },
  {
    "id": "step-22",
    "label": "Step 22. 直前チートシート",
    "level": 2
  },
  {
    "id": "references",
    "label": "参考 URL 一覧",
    "level": 2
  },
  {
    "id": "ref-group-1",
    "label": "試験ガイド",
    "level": 3
  },
  {
    "id": "ref-group-2",
    "label": "Task 3.1 関連",
    "level": 3
  },
  {
    "id": "ref-group-3",
    "label": "Task 3.2 関連",
    "level": 3
  },
  {
    "id": "ref-group-4",
    "label": "Task 3.3 関連",
    "level": 3
  },
  {
    "id": "ref-group-5",
    "label": "Task 3.4 関連",
    "level": 3
  }
] as const;
export const MERMAID_CONFIG = {
  "theme": "base",
  "themeVariables": {
    "fontSize": "16px",
    "background": "#ffffff",
    "primaryColor": "#e8eefc",
    "primaryTextColor": "#1b2740",
    "primaryBorderColor": "#8fa7e3",
    "lineColor": "#5b6f95",
    "secondaryColor": "#eef2f9",
    "tertiaryColor": "#eef2f9",
    "edgeLabelBackground": "#ffffff",
    "clusterBkg": "#f4f7fd",
    "clusterBorder": "#b4c4e8",
    "nodeTextColor": "#1b2740"
  },
  "flowchart": {
    "useMaxWidth": false,
    "htmlLabels": true,
    "subGraphTitleMargin": {
      "top": 12,
      "bottom": 18
    },
    "nodeSpacing": 70,
    "rankSpacing": 60,
    "curve": "basis"
  }
};
export const DIAGRAMS = {
  "diag-1": "flowchart TD\nD3[\"Domain 3 AI Safety Security Governance\"]\nT1[\"Task 3.1 入出力の安全対策\"]\nT2[\"Task 3.2 データセキュリティとプライバシー\"]\nT3[\"Task 3.3 ガバナンスとコンプライアンス\"]\nT4[\"Task 3.4 責任あるAI\"]\nD3 --> T1\nD3 --> T2\nD3 --> T3\nD3 --> T4\nT1 --> S1[\"Guardrails Comprehend Lambda API Gateway\"]\nT2 --> S2[\"VPC Endpoint IAM Lake Formation Macie KMS\"]\nT3 --> S3[\"Model Cards Glue Data Catalog CloudTrail CloudWatch\"]\nT4 --> S4[\"Agent Trace 評価 Prompt Management Guardrails\"]",
  "diag-2": "flowchart LR\nU[\"ユーザー入力\"] --> A[\"アプリケーション\"]\nR[\"検索結果 外部文書\"] --> A\nA --> M[\"基盤モデル\"]\nM --> O[\"出力\"]\nO --> U\nX1[\"直接攻撃\"] -.-> U\nX2[\"間接攻撃\"] -.-> R\nX3[\"漏えい ハルシネーション 有害表現\"] -.-> O",
  "diag-3": "flowchart TD\nA[\"ユーザー入力\"] --> B[\"入力側 Guardrails 評価\"]\nB -->|違反なし| C[\"基盤モデル推論\"]\nB -->|違反あり| X[\"ブロックメッセージ\"]\nC --> D[\"出力側 Guardrails 評価\"]\nD -->|違反なし| E[\"ユーザーへ返却\"]\nD -->|違反あり| Y[\"ブロックまたはマスクして返却\"]",
  "diag-4": "flowchart TD\nA[\"API Gateway で入力受信\"] --> B[\"Lambda 形式 長さ 文字種の検証\"]\nB -->|不正| R1[\"400 エラーで拒否\"]\nB -->|正常| C[\"Step Functions 開始\"]\nC --> D[\"Guardrails ApplyGuardrail で入力評価\"]\nD -->|ブロック| R2[\"拒否 + 監査ログ\"]\nD -->|通過| E{\"高リスクか\"}\nE -->|はい| F[\"人手レビュー待ち\"]\nF -->|却下| R2\nF -->|承認| G[\"Bedrock 推論\"]\nE -->|いいえ| G\nG --> H[\"結果返却\"]",
  "diag-5": "flowchart TD\nQ[\"自然言語の質問\"] --> L[\"LLM が SQL を生成\"]\nL --> V[\"Lambda で SQL を検証\"]\nV -->|SELECT 以外 許可外テーブル| N[\"拒否\"]\nV -->|OK| E[\"読み取り専用ロールで DB 実行\"]\nE --> R[\"結果の数値\"]\nR --> F[\"LLM が結果を文章化\"]\nF --> G[\"出力 Guardrails\"]\nG --> A[\"回答\"]",
  "diag-6": "flowchart TD\nQ[\"質問\"] --> KB[\"Knowledge Bases で関連文書を取得\"]\nKB --> G[\"FM が根拠付きで回答生成\"]\nG --> C1[\"Contextual grounding check\"]\nC1 -->|低スコア| RE[\"再生成 または 回答不能と返答\"]\nC1 -->|通過| C2[\"JSON Schema 検証\"]\nC2 -->|不一致| RE\nC2 -->|一致| OUT[\"引用元付きで回答\"]",
  "diag-7": "flowchart TD\nU[\"クライアント\"] --> AG[\"API Gateway 認証 スロットリング 検証\"]\nAG --> PRE[\"Lambda 前処理 Comprehend 判定\"]\nPRE -->|NG| BLK1[\"拒否\"]\nPRE -->|OK| GIN[\"Guardrails 入力評価\"]\nGIN -->|NG| BLK2[\"拒否\"]\nGIN -->|OK| FM[\"Bedrock FM\"]\nFM --> GOUT[\"Guardrails 出力評価\"]\nGOUT --> POST[\"Lambda 後処理検証\"]\nPOST -->|NG| BLK3[\"差し替え 再生成\"]\nPOST -->|OK| RESP[\"API Gateway 応答フィルタ\"]\nRESP --> U",
  "diag-8": "flowchart TD\nA[\"攻撃プロンプト集 既知の Jailbreak Injection\"] --> B[\"テスト実行 Lambda または Step Functions\"]\nB --> C[\"対象アプリ 検証環境\"]\nC --> D[\"応答の判定 ルール または LLM 判定\"]\nD --> E{\"防御成功か\"}\nE -->|成功| F[\"結果を記録\"]\nE -->|失敗| G[\"アラート + Guardrails 設定修正\"]\nG --> A\nF --> H[\"CloudWatch メトリクス 検知率の推移\"]",
  "diag-9": "flowchart TD\nAPP[\"アプリ 保護された VPC のプライベートサブネット\"] --> VPCE[\"VPC インターフェイスエンドポイント PrivateLink\"]\nVPCE --> BR[\"Amazon Bedrock API\"]\nAPP --> S3E[\"S3 ゲートウェイエンドポイント\"]\nS3E --> S3[\"S3 暗号化 KMS\"]\nAPP --> LF[\"Lake Formation 経由のデータアクセス\"]\nLF --> CAT[\"Glue Data Catalog テーブル 列 行の権限\"]\nBR -.-> LOG[\"モデル呼び出しログ CloudWatch Logs S3\"]\nAPP -.-> CT[\"CloudTrail 管理イベント データイベント\"]\nLOG -.-> MON[\"CloudWatch アラーム\"]",
  "diag-10": "flowchart TD\nSRC[\"データソース S3\"] --> MAC[\"Macie で機密データ棚卸し\"]\nMAC -->|PII あり| FIX[\"マスキング 除外 またはアクセス制限\"]\nMAC -->|問題なし| ING[\"KB 取り込み\"]\nING --> RUN[\"推論時\"]\nRUN --> IN[\"入力 PII 検査 Comprehend Guardrails\"]\nRUN --> OUT[\"出力 PII 検査 Guardrails\"]\nRUN --> LOG[\"ログ保存\"]\nLOG --> LC[\"S3 Lifecycle 保持期間後に削除 または低頻度層へ\"]",
  "diag-11": "flowchart TD\nIN[\"ユーザー入力 山田太郎 住所 電話\"] --> LANG{\"検出器が入力言語に対応しているか\"}\nLANG -->|\"非対応\"| BLK[\"処理を中止 フェイルクローズ\"]\nLANG -->|\"対応 日本語は日本語対応の検出器\"| DET[\"日本語対応の PII 検出器で検出\"]\nDET --> TOK[\"トークン化 NAME_001 ADDR_001\"]\nTOK --> MAP[\"対応表を暗号化して別保管 DynamoDB KMS\"]\nTOK --> FM[\"FM 推論 PII を含まない入力\"]\nFM --> OUT[\"出力 NAME_001 さんへ\"]\nOUT --> GR[\"Guardrails で想定外の PII を最終チェック\"]\nGR --> RES[\"権限あるユーザーのみ復元\"]\nMAP --> RES",
  "diag-12": "flowchart LR\nA[\"データソース\"] -->|取り込み ETL| B[\"Glue Data Catalog メタデータ\"]\nB --> C[\"Knowledge Base ベクトルストア\"]\nC --> D[\"Bedrock 推論\"]\nD --> E[\"意思決定ログ CloudWatch Logs\"]\nF[\"モデルカード SageMaker\"] -.->|目的 制限 評価| D\nB -.->|リネージ 帰属タグ| E\nG[\"CloudTrail\"] -.->|API 監査| D",
  "diag-13": "flowchart TD\nR[\"データソース登録 Glue Data Catalog\"] --> T[\"ドキュメントへメタデータタグ付与 source owner classification\"]\nT --> KB[\"KB 取り込み メタデータ保持\"]\nKB --> Q[\"質問時に検索 メタデータで絞り込み可\"]\nQ --> A[\"回答 + 引用元メタデータ\"]\nA --> U[\"ユーザーが出典を確認\"]\nCT[\"CloudTrail\"] -.->|API 呼び出し 設定変更の監査| KB\nCT -.-> Q",
  "diag-14": "flowchart TD\nP[\"組織の AI ポリシー 責任ある AI 原則 規制要件\"] --> E1[\"SCP で利用可能なモデルとリージョンを制限\"]\nP --> E2[\"IAM 条件でガードレール付き呼び出しを強制\"]\nP --> E3[\"タグポリシーでデータ分類タグを標準化\"]\nE1 --> V[\"検証と証跡 CloudTrail Config モデルカード\"]\nE2 --> V\nE3 --> V\nV --> R[\"定期レビュー 例外申請 ポリシー更新\"]\nR --> P",
  "diag-15": "flowchart TD\nL[\"ログ メトリクス モデル呼び出しログ Guardrails 判定\"] --> M[\"CloudWatch メトリクスフィルター アラーム\"]\nM -->|閾値超過| EB[\"EventBridge ルール\"]\nEB --> SF[\"Step Functions または Lambda 修復ワークフロー\"]\nSF --> A1[\"通知 SNS Slack\"]\nSF --> A2[\"該当ユーザー ロールを一時制限\"]\nSF --> A3[\"ガードレール強化 ロールバック\"]\nSF --> A4[\"チケット作成 監査記録\"]",
  "diag-16": "flowchart TD\nQ[\"ユーザーの質問\"] --> AG[\"Bedrock Agent\"]\nAG --> R[\"Rationale 次に何をするか\"]\nR --> I[\"InvocationInput ツール または KB 呼び出し\"]\nI --> O[\"Observation 結果\"]\nO -->|まだ不足| R\nO -->|十分| F[\"最終回答\"]\nAG -.-> TR[\"トレース 推論ステップの記録\"]\nTR -.-> CW[\"CloudWatch へ保存 分析 監査\"]\nF --> UI[\"回答 + 出典 + 確信度\"]",
  "diag-17": "flowchart TD\nD[\"評価データ作成 属性だけ変えた対のプロンプト\"] --> P1[\"プロンプト版 A Prompt Management\"]\nD --> P2[\"プロンプト版 B Prompt Management\"]\nP1 --> F[\"Prompt Flows で同条件実行\"]\nP2 --> F\nF --> J[\"LLM-as-a-judge Stereotyping Harmfulness 等\"]\nJ --> M[\"差の集計 CloudWatch メトリクス\"]\nM --> C{\"許容範囲か\"}\nC -->|はい| REL[\"採用 リリース\"]\nC -->|いいえ| FIX[\"プロンプト モデル データ修正\"]\nFIX --> D",
  "diag-18": "flowchart TD\nOUT[\"FM 出力\"] --> GR[\"Guardrails ポリシー準拠フィルター\"]\nGR --> LM[\"Lambda 自動コンプライアンスチェック 免責文 禁止表現 形式\"]\nLM -->|違反| FIX[\"修正 再生成 または 定型文に差し替え\"]\nLM -->|準拠| SEND[\"ユーザーへ\"]\nFIX --> LOG[\"違反ログ CloudWatch\"]\nSEND --> LOG2[\"準拠ログ 監査用\"]\nMC[\"モデルカード 制限と用途を文書化\"] -.-> LM",
  "diag-19": "flowchart TD\nU[\"ユーザー\"] --> AG[\"API Gateway 認証 スロットリング 検証\"]\nAG --> PRE[\"Lambda 前処理 Comprehend 毒性 PII 判定\"]\nPRE --> GI[\"Guardrails 入力 Prompt Attack 話題 PII\"]\nGI --> RAG[\"Knowledge Bases 根拠付け 権限に応じた取得\"]\nRAG --> FM[\"Bedrock FM or Agent\"]\nFM --> GO[\"Guardrails 出力 有害 PII Grounding\"]\nGO --> POST[\"Lambda 後処理 ポリシー検証 スキーマ検証\"]\nPOST --> RES[\"回答 + 出典 + 確信度\"]\nRES --> U\nsubgraph NET[\"ネットワーク 認可\"]\nVPCE[\"VPC エンドポイント\"]\nIAMX[\"IAM 最小権限 + GuardrailIdentifier 強制\"]\nLFX[\"Lake Formation 細粒度アクセス\"]\nend\nsubgraph GOV[\"ガバナンス 監視\"]\nCTX[\"CloudTrail\"]\nCWL[\"CloudWatch Logs メトリクス アラーム\"]\nMCX[\"モデルカード Glue Data Catalog\"]\nEVX[\"EventBridge Lambda 自動修復\"]\nend\nVPCE -.-> FM\nRAG -.-> LFX\nGO -.-> CWL\nCWL --> EVX\nFM -.-> CTX\nMCX -.-> POST"
};
export type DiagramId = keyof typeof DIAGRAMS;
