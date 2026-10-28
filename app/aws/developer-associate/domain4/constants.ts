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
export const DIAGRAMS = {} as const;
export type DiagramId = keyof typeof DIAGRAMS;
