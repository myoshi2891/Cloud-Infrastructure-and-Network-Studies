/** 原本の26目次・22図・描画設定。 */
export const NAV_ITEMS = [
  {
    "id": "step-0-domain-4-の全体像",
    "label": "Step 0: Domain 4 の全体像",
    "level": 2
  },
  {
    "id": "step-1-前提知識---トークンと-3-つの最適化レバー",
    "label": "Step 1: 前提知識 - トークンと 3 つの最適化レバー",
    "level": 2
  },
  {
    "id": "task-41-コスト最適化とリソース効率",
    "label": "Task 4.1 コスト最適化とリソース効率",
    "level": 2
  },
  {
    "id": "step-2-skill-411-トークン効率化",
    "label": "Step 2: Skill 4.1.1 トークン効率化",
    "level": 3
  },
  {
    "id": "step-3-skill-412-コスト効率のよいモデル選択",
    "label": "Step 3: Skill 4.1.2 コスト効率のよいモデル選択",
    "level": 3
  },
  {
    "id": "step-4-skill-413-高性能な-fm-システム-バッチ容量スケーリング",
    "label": "Step 4: Skill 4.1.3 高性能な FM システム (バッチ・容量・スケーリング)",
    "level": 3
  },
  {
    "id": "step-5-skill-414-インテリジェントなキャッシュ",
    "label": "Step 5: Skill 4.1.4 インテリジェントなキャッシュ",
    "level": 3
  },
  {
    "id": "task-42-アプリケーション性能の最適化",
    "label": "Task 4.2 アプリケーション性能の最適化",
    "level": 2
  },
  {
    "id": "step-6-skill-421-応答性の高い-ai-システム",
    "label": "Step 6: Skill 4.2.1 応答性の高い AI システム",
    "level": 3
  },
  {
    "id": "step-7-skill-422-検索-リトリーバル-性能の向上",
    "label": "Step 7: Skill 4.2.2 検索 (リトリーバル) 性能の向上",
    "level": 3
  },
  {
    "id": "step-8-skill-423-fm-スループットの最適化",
    "label": "Step 8: Skill 4.2.3 FM スループットの最適化",
    "level": 3
  },
  {
    "id": "step-9-skill-424-fm-性能の調整-パラメータと-ab-テスト",
    "label": "Step 9: Skill 4.2.4 FM 性能の調整 (パラメータと A/B テスト)",
    "level": 3
  },
  {
    "id": "step-10-skill-425-fm-ワークロード向けリソース配分",
    "label": "Step 10: Skill 4.2.5 FM ワークロード向けリソース配分",
    "level": 3
  },
  {
    "id": "step-11-skill-426-genai-ワークフロー全体の最適化",
    "label": "Step 11: Skill 4.2.6 GenAI ワークフロー全体の最適化",
    "level": 3
  },
  {
    "id": "task-43-genai-アプリのモニタリング",
    "label": "Task 4.3 GenAI アプリのモニタリング",
    "level": 2
  },
  {
    "id": "step-12-skill-431-包括的なオブザーバビリティ",
    "label": "Step 12: Skill 4.3.1 包括的なオブザーバビリティ",
    "level": 3
  },
  {
    "id": "step-13-skill-432-genai-固有のモニタリング",
    "label": "Step 13: Skill 4.3.2 GenAI 固有のモニタリング",
    "level": 3
  },
  {
    "id": "step-14-skill-433-統合オブザーバビリティと監査",
    "label": "Step 14: Skill 4.3.3 統合オブザーバビリティと監査",
    "level": 3
  },
  {
    "id": "step-15-skill-434-ツール性能フレームワーク",
    "label": "Step 15: Skill 4.3.4 ツール性能フレームワーク",
    "level": 3
  },
  {
    "id": "step-16-skill-435-ベクトルストアの運用管理",
    "label": "Step 16: Skill 4.3.5 ベクトルストアの運用管理",
    "level": 3
  },
  {
    "id": "step-17-skill-436-fm-固有のトラブルシューティング",
    "label": "Step 17: Skill 4.3.6 FM 固有のトラブルシューティング",
    "level": 3
  },
  {
    "id": "step-18-症状から解決策を選ぶ早見表",
    "label": "Step 18: 症状から解決策を選ぶ早見表",
    "level": 2
  },
  {
    "id": "step-19-試験の罠チェック表",
    "label": "Step 19: 試験の罠チェック表",
    "level": 2
  },
  {
    "id": "step-20-練習問題",
    "label": "Step 20: 練習問題",
    "level": 2
  },
  {
    "id": "step-21-最終チートシート",
    "label": "Step 21: 最終チートシート",
    "level": 2
  },
  {
    "id": "step-22-参考-url-一覧",
    "label": "Step 22: 参考 URL 一覧",
    "level": 2
  }
] as const;
export const MERMAID_CONFIG = {
  "theme": "base",
  "themeVariables": {
    "fontSize": "16px",
    "background": "#ffffff",
    "primaryColor": "#eaf0ff",
    "primaryTextColor": "#1b2540",
    "primaryBorderColor": "#9db0ea",
    "lineColor": "#5b6fa8",
    "secondaryColor": "#f0f3fa",
    "tertiaryColor": "#f6f8fc",
    "edgeLabelBackground": "#ffffff",
    "clusterBkg": "#f6f8fc",
    "clusterBorder": "#b4c1ee",
    "nodeTextColor": "#1b2540"
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
  "diag-1": "flowchart TB\nD4[\"Domain 4 運用効率と最適化\"]\nT1[\"Task 4.1 コストとリソース効率\"]\nT2[\"Task 4.2 性能最適化\"]\nT3[\"Task 4.3 モニタリング\"]\nD4 --> T1\nD4 --> T2\nD4 --> T3\nT1 --> S11[\"4.1.1 トークン効率\"]\nT1 --> S12[\"4.1.2 モデル選択\"]\nT1 --> S13[\"4.1.3 スループットと容量\"]\nT1 --> S14[\"4.1.4 キャッシュ\"]\nT2 --> S21[\"4.2.1 応答性\"]\nT2 --> S22[\"4.2.2 検索性能\"]\nT2 --> S23[\"4.2.3 スループット\"]\nT2 --> S24[\"4.2.4 パラメータ調整\"]\nT2 --> S25[\"4.2.5 リソース配分\"]\nT2 --> S26[\"4.2.6 ワークフロー\"]\nT3 --> S31[\"4.3.1 オブザーバビリティ\"]\nT3 --> S32[\"4.3.2 GenAI 監視\"]\nT3 --> S33[\"4.3.3 統合と監査\"]\nT3 --> S34[\"4.3.4 ツール性能\"]\nT3 --> S35[\"4.3.5 ベクトルストア運用\"]\nT3 --> S36[\"4.3.6 トラブルシュート\"]",
  "diag-2": "flowchart TB\nQ[\"品質を維持する\"]\nC[\"コストを下げる\"]\nL[\"レイテンシを下げる\"]\nT[\"スループットを上げる\"]\nQ --- C\nQ --- L\nQ --- T\nC --> C1[\"トークン削減 / 小型モデル / バッチ\"]\nL --> L1[\"ストリーミング / キャッシュ / 並列化\"]\nT --> T1[\"クォータ管理 / 容量確保 / 同時実行制御\"]",
  "diag-3": "flowchart TB\nSTART[\"ワークロードの特徴は\"]\nRT{\"リアルタイム応答が必要か\"}\nBATCH[\"バッチ推論\"]\nSTABLE{\"負荷は安定して高いか\"}\nPT[\"Provisioned Throughput\"]\nLAT{\"体感速度が最優先か\"}\nLO[\"低レイテンシモデル or レイテンシ最適化\"]\nOD[\"オンデマンド + クロスリージョン推論\"]\nSTART --> RT\nRT -->|\"いいえ\"| BATCH\nRT -->|\"はい\"| STABLE\nSTABLE -->|\"はい\"| PT\nSTABLE -->|\"いいえ\"| LAT\nLAT -->|\"はい\"| LO\nLAT -->|\"いいえ\"| OD",
  "diag-4": "flowchart TB\nREQ[\"ユーザーのリクエスト\"]\nEST[\"トークン数を推定\"]\nCHK{\"予算内か\"}\nPRUNE[\"履歴を要約し 検索結果を剪定\"]\nINV[\"モデルを呼び出し maxTokens を設定\"]\nREC[\"使用量をメトリクスに記録\"]\nRES[\"レスポンスを返す\"]\nREQ --> EST\nEST --> CHK\nCHK -->|\"はい\"| INV\nCHK -->|\"いいえ\"| PRUNE\nPRUNE --> EST\nINV --> REC\nREC --> RES",
  "diag-5": "flowchart TB\nQ[\"受信クエリ\"]\nR{\"難易度を判定\"}\nS[\"小型モデル\"]\nM[\"中型モデル\"]\nL[\"大型モデル\"]\nE{\"品質チェックに合格か\"}\nOUT[\"回答を返す\"]\nQ --> R\nR -->|\"簡単\"| S\nR -->|\"標準\"| M\nR -->|\"難しい\"| L\nS --> E\nE -->|\"はい\"| OUT\nE -->|\"いいえ\"| L\nM --> OUT\nL --> OUT",
  "diag-6": "flowchart TB\nREQ[\"アプリのリクエスト\"]\nPT{\"Provisioned の容量に空きがあるか\"}\nPTI[\"Provisioned Throughput で処理\"]\nOD[\"オンデマンドで処理\"]\nTHR{\"スロットリングされたか\"}\nRETRY[\"指数バックオフで再試行 or クロスリージョン推論\"]\nOK[\"レスポンス\"]\nREQ --> PT\nPT -->|\"はい\"| PTI\nPT -->|\"いいえ\"| OD\nOD --> THR\nTHR -->|\"はい\"| RETRY\nTHR -->|\"いいえ\"| OK\nPTI --> OK\nRETRY --> OK",
  "diag-7": "flowchart TB\nsubgraph P[\"プロンプトの並べ方\"]\ndirection TB\nA[\"1 システムプロンプト 静的\"]\nB[\"2 ツール定義 静的\"]\nC[\"3 参照文書 静的 ここまでをキャッシュ\"]\nD[\"4 ユーザーの質問 動的\"]\nA --> B --> C --> D\nend",
  "diag-8": "flowchart TB\nREQ[\"リクエスト\"]\nN[\"正規化してハッシュを作成\"]\nEX{\"完全一致キャッシュに存在するか\"}\nEMB[\"質問を埋め込みベクトル化\"]\nSEM{\"類似度が閾値以上のエントリがあるか\"}\nFM[\"プロンプトキャッシュを使って FM を呼び出し\"]\nSTORE[\"結果を両方のキャッシュに保存 TTL 付き\"]\nHIT[\"キャッシュ結果を返す\"]\nREQ --> N\nN --> EX\nEX -->|\"はい\"| HIT\nEX -->|\"いいえ\"| EMB\nEMB --> SEM\nSEM -->|\"はい\"| HIT\nSEM -->|\"いいえ\"| FM\nFM --> STORE\nSTORE --> HIT",
  "diag-9": "flowchart TB\nU[\"ユーザー\"]\nAPP[\"アプリ層\"]\nFM[\"Bedrock ConverseStream\"]\nU -->|\"質問を送信\"| APP\nAPP -->|\"ストリーミング呼び出し\"| FM\nFM -->|\"トークンを逐次返却\"| APP\nAPP -->|\"WebSocket などで逐次表示\"| U",
  "diag-10": "flowchart TB\nIN[\"入力 複数の文書\"]\nP1[\"要約 文書 1\"]\nP2[\"要約 文書 2\"]\nP3[\"要約 文書 3\"]\nAGG[\"統合要約\"]\nOUT[\"最終回答\"]\nIN --> P1\nIN --> P2\nIN --> P3\nP1 --> AGG\nP2 --> AGG\nP3 --> AGG\nAGG --> OUT",
  "diag-11": "flowchart TB\nQ[\"ユーザーの質問\"]\nPRE[\"クエリ前処理 書き換え 分解 フィルタ抽出\"]\nEMB[\"埋め込み生成\"]\nVEC[\"ベクトル検索\"]\nKW[\"キーワード検索 BM25\"]\nFUSE[\"スコア統合 重み付け\"]\nRR[\"再ランキング\"]\nCTX[\"上位チャンクをプロンプトへ\"]\nQ --> PRE\nPRE --> EMB\nPRE --> KW\nEMB --> VEC\nVEC --> FUSE\nKW --> FUSE\nFUSE --> RR\nRR --> CTX",
  "diag-12": "flowchart TB\nREQ[\"FM 呼び出し\"]\nR{\"スロットリング 429 か\"}\nOK[\"成功\"]\nRT{\"再試行回数の上限内か\"}\nWAIT[\"指数バックオフ + ジッターで待機\"]\nFB[\"フォールバック クロスリージョン or 別モデル or キューへ退避\"]\nREQ --> R\nR -->|\"いいえ\"| OK\nR -->|\"はい\"| RT\nRT -->|\"はい\"| WAIT\nWAIT --> REQ\nRT -->|\"いいえ\"| FB",
  "diag-13": "flowchart TB\nH[\"仮説を立てる 例 新プロンプトで解決率が上がる\"]\nM[\"成功指標を決める 品質 コスト 遅延\"]\nV[\"バリアント A と B を用意 プロンプト版 モデル パラメータ\"]\nS[\"トラフィックを分割して実行\"]\nC[\"指標を収集し 統計的に比較\"]\nD{\"有意な改善があるか\"}\nADOPT[\"採用して全体展開\"]\nREJ[\"不採用 仮説を見直す\"]\nH --> M --> V --> S --> C --> D\nD -->|\"はい\"| ADOPT\nD -->|\"いいえ\"| REJ",
  "diag-14": "flowchart TB\nTR[\"GenAI トラフィック\"]\nQ[\"SQS キュー\"]\nW[\"ワーカー ECS or Lambda\"]\nFM[\"Bedrock\"]\nM[\"CloudWatch メトリクス キュー長 トークン消費 429 数\"]\nAS[\"スケーリング判断\"]\nTR --> Q\nQ --> W\nW --> FM\nQ --> M\nFM --> M\nM --> AS\nAS -->|\"ワーカー数を増減\"| W",
  "diag-15": "flowchart TB\nsubgraph BEFORE[\"最適化前 直列と同期\"]\ndirection TB\nB1[\"認証\"] --> B2[\"検索\"] --> B3[\"ガードレール確認\"] --> B4[\"FM 呼び出し\"] --> B5[\"ログ保存を待つ\"] --> B6[\"回答\"]\nend",
  "diag-16": "flowchart TB\nsubgraph AFTER[\"最適化後 並列と非同期\"]\ndirection TB\nA1[\"認証\"] --> A2[\"検索と入力チェックを並列\"]\nA2 --> A3[\"FM 呼び出し ストリーミング\"]\nA3 --> A4[\"回答を即時表示\"]\nA3 -.-> A5[\"ログ保存は非同期\"]\nend",
  "diag-17": "flowchart TB\nAPP[\"GenAI アプリ\"]\nL1[\"運用メトリクス\"]\nL2[\"トレース\"]\nL3[\"FM とのやり取りのログ\"]\nL4[\"ビジネスメトリクス\"]\nCW[\"CloudWatch ダッシュボードとアラーム\"]\nAPP --> L1\nAPP --> L2\nAPP --> L3\nAPP --> L4\nL1 --> CW\nL2 --> CW\nL3 --> CW\nL4 --> CW",
  "diag-18": "flowchart TB\nINV[\"Bedrock モデル呼び出し\"]\nMET[\"CloudWatch メトリクス 自動\"]\nLOG[\"モデル呼び出しログ 要有効化\"]\nS3[\"Amazon S3\"]\nCWL[\"CloudWatch Logs\"]\nALM[\"アラーム 異常検知\"]\nANA[\"Logs Insights や Athena で分析\"]\nINV --> MET\nINV --> LOG\nLOG --> S3\nLOG --> CWL\nMET --> ALM\nCWL --> ANA\nS3 --> ANA",
  "diag-19": "flowchart TB\nEV[\"調査したい出来事\"]\nWHO[\"誰が いつ どの API を呼んだか CloudTrail\"]\nWHAT[\"入出力の本文 モデル呼び出しログ\"]\nHOW[\"途中の経路 トレース\"]\nGUARD[\"何が遮断されたか Guardrails\"]\nREP[\"フォレンジックレポート\"]\nEV --> WHO\nEV --> WHAT\nEV --> HOW\nEV --> GUARD\nWHO --> REP\nWHAT --> REP\nHOW --> REP\nGUARD --> REP",
  "diag-20": "flowchart TB\nU[\"ユーザー\"]\nSUP[\"スーパーバイザーエージェント\"]\nA1[\"検索エージェント\"]\nA2[\"分析エージェント\"]\nT1[\"ツール 社内 DB 検索\"]\nT2[\"ツール 計算 API\"]\nTR[\"共通のトレース ID で全体を追跡\"]\nU --> SUP\nSUP --> A1\nSUP --> A2\nA1 --> T1\nA2 --> T2\nSUP -.-> TR\nA1 -.-> TR\nA2 -.-> TR",
  "diag-21": "flowchart TB\nSRC[\"ソースデータ S3 など\"]\nCHK1[\"重複排除と空チャンクの検出\"]\nCHK2[\"メタデータの必須項目チェック\"]\nEMB[\"埋め込み生成 と 次元チェック\"]\nIDX[\"ベクトルストアへ登録\"]\nQA[\"サンプル質問で検索品質を確認\"]\nOK{\"基準を満たすか\"}\nPUB[\"本番インデックスに反映\"]\nFIX[\"隔離して原因を修正\"]\nSRC --> CHK1 --> CHK2 --> EMB --> IDX --> QA --> OK\nOK -->|\"はい\"| PUB\nOK -->|\"いいえ\"| FIX",
  "diag-22": "flowchart TB\nBAD[\"誤った回答が報告された\"]\nT[\"トレースとログで該当リクエストを特定\"]\nR{\"検索結果に正しい根拠は含まれていたか\"}\nRFIX[\"検索の改善 チャンク ハイブリッド 再ランキング\"]\nP{\"プロンプトに根拠と指示は正しく入っていたか\"}\nPFIX[\"プロンプトとコンテキストの改善\"]\nM{\"根拠があるのに誤ったか\"}\nMFIX[\"温度を下げる 根拠チェック有効化 モデル見直し\"]\nG[\"ゴールデンデータセットに追加して回帰テスト化\"]\nBAD --> T --> R\nR -->|\"いいえ\"| RFIX\nR -->|\"はい\"| P\nP -->|\"いいえ\"| PFIX\nP -->|\"はい\"| M\nM -->|\"はい\"| MFIX\nRFIX --> G\nPFIX --> G\nMFIX --> G"
} as const;
export type DiagramId = keyof typeof DIAGRAMS;
