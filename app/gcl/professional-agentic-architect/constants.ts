/**
 * Google Cloud Professional Agentic Architect 技術ガイド
 * 定数定義（ダイアグラム、ナビゲーション、チェックリスト、参考文献）
 */

export interface NavItem {
    id: string;
    title: string;
    level: 2 | 3;
}

export interface ChecklistItem {
    id: string;
    label: string;
}

export interface RefCardItem {
    num: string;
    href: string;
    title: string;
}

export const NAV_ITEMS: NavItem[] = [
    {
        "id": "この試験について",
        "title": "この試験について",
        "level": 2
    },
    {
        "id": "ベータ試験の概要",
        "title": "ベータ試験の概要",
        "level": 3
    },
    {
        "id": "出題範囲の配点構成",
        "title": "出題範囲の配点構成",
        "level": 3
    },
    {
        "id": "google-cloud-エージェントプラットフォームの全体像",
        "title": "Google Cloud エージェントプラットフォームの全体像",
        "level": 3
    },
    {
        "id": "セクション1-ローコードツールを使用したエージェントの構築配点-約13",
        "title": "セクション1: ローコードツールを使用したエージェントの構築（配点 約13%）",
        "level": 2
    },
    {
        "id": "11-ローコードツールを使用したエージェントワークフローと動作の設定",
        "title": "1.1 ローコードツールを使用したエージェントワークフローと動作の設定",
        "level": 3
    },
    {
        "id": "12-gemini-enterpriseへのエンタープライズデータ接続",
        "title": "1.2 Gemini Enterpriseへのエンタープライズデータ接続",
        "level": 3
    },
    {
        "id": "セクション2-コーディングエージェントを使用したアプリケーション開発配点-約17",
        "title": "セクション2: コーディングエージェントを使用したアプリケーション開発（配点 約17%）",
        "level": 2
    },
    {
        "id": "21-コーディングエージェントの効果的な使用",
        "title": "2.1 コーディングエージェントの効果的な使用",
        "level": 3
    },
    {
        "id": "22-エンタープライズワークフロー向けのコーディングエージェントのカスタマイズ",
        "title": "2.2 エンタープライズワークフロー向けのコーディングエージェントのカスタマイズ",
        "level": 3
    },
    {
        "id": "セクション3-カスタムエージェントの開発配点-約33",
        "title": "セクション3: カスタムエージェントの開発（配点 約33%）",
        "level": 2
    },
    {
        "id": "31-コードでのエージェントワークフローの設計と構築",
        "title": "3.1 コードでのエージェントワークフローの設計と構築",
        "level": 3
    },
    {
        "id": "32-エンタープライズドメイン知識の統合",
        "title": "3.2 エンタープライズドメイン知識の統合",
        "level": 3
    },
    {
        "id": "33-エージェントワークフローのオーケストレーションと調整",
        "title": "3.3 エージェントワークフローのオーケストレーションと調整",
        "level": 3
    },
    {
        "id": "セクション4-エージェントワークフローの評価とデプロイ配点-約22",
        "title": "セクション4: エージェントワークフローの評価とデプロイ（配点 約22%）",
        "level": 2
    },
    {
        "id": "41-開発環境本番環境でのエージェント評価",
        "title": "4.1 開発環境・本番環境でのエージェント評価",
        "level": 3
    },
    {
        "id": "42-本番ワークロードのデプロイとスケーリング",
        "title": "4.2 本番ワークロードのデプロイとスケーリング",
        "level": 3
    },
    {
        "id": "セクション5-エージェントワークフローのセキュリティとガバナンス配点-約15",
        "title": "セクション5: エージェントワークフローのセキュリティとガバナンス（配点 約15%）",
        "level": 2
    },
    {
        "id": "51-エージェントのセキュリティとガバナンスの設定",
        "title": "5.1 エージェントのセキュリティとガバナンスの設定",
        "level": 3
    },
    {
        "id": "52-セキュアなエージェントの動作と実行の実装",
        "title": "5.2 セキュアなエージェントの動作と実行の実装",
        "level": 3
    },
    {
        "id": "試験対象ツール一覧",
        "title": "試験対象ツール一覧",
        "level": 2
    },
    {
        "id": "学習チェックリスト",
        "title": "学習チェックリスト",
        "level": 2
    },
    {
        "id": "参考文献",
        "title": "参考文献",
        "level": 2
    }
];

export const CHECKLIST_ITEMS: ChecklistItem[] = [
    {
        "id": "chk1",
        "label": "CX Agent Studio（およびDialogflow\n                                CX）の状態ベースワークフロー（ページ／遷移ルート／イベントハンドラ）の設定方法を説明できる"
    },
    {
        "id": "chk2",
        "label": "Workflow Builder（旧 Agent\n                                Designer）のフローキャンバスが業務手順を可視化するタスク指向のFlow機能であり、CX\n                                Agent\n                                Studioの状態ベースワークフローとは別概念であることを説明できる"
    },
    {
        "id": "chk3",
        "label": "Gemini\n                                Enterpriseへのエンタープライズデータ接続と、非構造化マルチモーダルデータの取り込みの考慮点を説明できる"
    },
    {
        "id": "chk4",
        "label": "MCPサーバー・カスタムスキル・セキュアサンドボックス（GKE／Cloud\n                                Workstations）を使ったコーディングエージェントの構成を説明できる"
    },
    {
        "id": "chk5",
        "label": "Antigravityにおけるスキル・プラグイン・拡張フック・ルール・サブエージェントの役割を説明できる"
    },
    {
        "id": "chk6",
        "label": "Agents\n                                CLIが提供する主要スキル（workflow／scaffold／adk-code／eval／deploy／publish）を挙げられる"
    },
    {
        "id": "chk7",
        "label": "LLM/SLM、自己ホスト/SaaS、OSS/プロプライエタリの選定基準を説明できる"
    },
    {
        "id": "chk8",
        "label": "ADKを使ったエージェント構築の段階的な拡張パス(初期開発→高度なオーケストレーション→最適化→エンタープライズデプロイ)を説明できる"
    },
    {
        "id": "chk9",
        "label": "Agent Platform SessionsとMemory Bankの役割の違いを説明できる"
    },
    {
        "id": "chk10",
        "label": "RAGパイプライン（埋め込み→類似度検索→リランキング）の各ステップを説明できる"
    },
    {
        "id": "chk11",
        "label": "Vector Search 1.0とAgent Retrieval（旧Vector Search\n                                2.0）の違いを説明できる"
    },
    {
        "id": "chk12",
        "label": "Agent RegistryとGoogle Cloud\n                                MCPサーバーによる機能拡張の仕組みを説明できる"
    },
    {
        "id": "chk13",
        "label": "MCPとA2Aの役割分担（ツール接続 vs\n                                エージェント間連携）を説明できる"
    },
    {
        "id": "chk14",
        "label": "ADKのSequential／Parallel／Loop／Graphワークフローパターンの使い分けを説明できる"
    },
    {
        "id": "chk15",
        "label": "evalsetの設計、ADK EvaluationとGen AI Evaluation\n                                Serviceの違い、継続的評価パイプラインを説明できる"
    },
    {
        "id": "chk16",
        "label": "Agent Runtime／Cloud Run／GKEのデプロイ選定基準を説明できる"
    },
    {
        "id": "chk17",
        "label": "エージェントドリフト・ツール呼び出しレイテンシ・推論ループのトラブルシューティング手法を説明できる"
    },
    {
        "id": "chk18",
        "label": "OAuth 2.0（2LO/3LO）とAuth\n                                Managerによるツール認証の仕組みを説明できる"
    },
    {
        "id": "chk19",
        "label": "Agent IdentityとPAB（Principal Access\n                                Boundary）ポリシーの役割を説明できる"
    },
    {
        "id": "chk20",
        "label": "Agent\n                                Gatewayによるトラフィック監視・ガバナンスの仕組みを説明できる"
    },
    {
        "id": "chk21",
        "label": "Model ArmorとSensitive Data\n                                Protectionによる入出力スクリーニング・機密データ保護の仕組みを説明できる"
    },
    {
        "id": "chk22",
        "label": "多層防御（Auth Manager→Agent Identity/PAB→Agent Gateway→Model\n                                Armor→Sensitive Data Protection）の全体像を説明できる"
    }
];

export const REF_CARDS: RefCardItem[] = [
    {
        "num": "1",
        "href": "https://cloud.google.com/learn/certification/agentic-architect",
        "title": "https://cloud.google.com/learn/certification/agentic-architect"
    },
    {
        "num": "2",
        "href": "https://services.google.com/fh/files/misc/professional_agentic_architect_exam_guide_english.pdf",
        "title": "https://services.google.com/fh/files/misc/professional_agentic_architect_exam_guide_english.pdf"
    },
    {
        "num": "4",
        "href": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/design-agents",
        "title": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/design-agents"
    },
    {
        "num": "5",
        "href": "https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio",
        "title": "https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio"
    },
    {
        "num": "6",
        "href": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview",
        "title": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview"
    },
    {
        "num": "7",
        "href": "https://cloud.google.com/blog/products/ai-machine-learning/the-new-gemini-enterprise-one-platform-for-agent-development",
        "title": "https://cloud.google.com/blog/products/ai-machine-learning/the-new-gemini-enterprise-one-platform-for-agent-development"
    },
    {
        "num": "8",
        "href": "https://cloud.google.com/agent-builder/agent-development-kit/overview",
        "title": "https://cloud.google.com/agent-builder/agent-development-kit/overview"
    },
    {
        "num": "9",
        "href": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/adk",
        "title": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/adk"
    },
    {
        "num": "10",
        "href": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/agents/quickstart-adk",
        "title": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/agents/quickstart-adk"
    },
    {
        "num": "11",
        "href": "https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/",
        "title": "https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/"
    },
    {
        "num": "13",
        "href": "https://thenextweb.com/news/google-antigravity-2-desktop-cli-sdk-io-2026",
        "title": "https://thenextweb.com/news/google-antigravity-2-desktop-cli-sdk-io-2026"
    },
    {
        "num": "14",
        "href": "https://github.com/google/agents-cli",
        "title": "https://github.com/google/agents-cli"
    },
    {
        "num": "15",
        "href": "https://developers.googleblog.com/agent-plugins-package-your-skills-tools-and-more/",
        "title": "https://developers.googleblog.com/agent-plugins-package-your-skills-tools-and-more/"
    },
    {
        "num": "16",
        "href": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime",
        "title": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime"
    },
    {
        "num": "18",
        "href": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes",
        "title": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes"
    },
    {
        "num": "19",
        "href": "https://docs.cloud.google.com/agent-registry/register-agents",
        "title": "https://docs.cloud.google.com/agent-registry/register-agents"
    },
    {
        "num": "20",
        "href": "https://docs.cloud.google.com/agent-registry/automatic-registration",
        "title": "https://docs.cloud.google.com/agent-registry/automatic-registration"
    },
    {
        "num": "21",
        "href": "https://docs.cloud.google.com/iam/docs/agent-identity-overview",
        "title": "https://docs.cloud.google.com/iam/docs/agent-identity-overview"
    },
    {
        "num": "22",
        "href": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity",
        "title": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity"
    },
    {
        "num": "23",
        "href": "https://cloud.google.com/blog/products/identity-security/whats-new-in-iam-security-governance-and-runtime-defense",
        "title": "https://cloud.google.com/blog/products/identity-security/whats-new-in-iam-security-governance-and-runtime-defense"
    },
    {
        "num": "24",
        "href": "https://cloud.google.com/iam/docs/principal-access-boundary-policies-create",
        "title": "https://cloud.google.com/iam/docs/principal-access-boundary-policies-create"
    },
    {
        "num": "25",
        "href": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview",
        "title": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview"
    },
    {
        "num": "26",
        "href": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/monitor-agent-gateway",
        "title": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/monitor-agent-gateway"
    },
    {
        "num": "27",
        "href": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway",
        "title": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway"
    },
    {
        "num": "28",
        "href": "https://codelabs.developers.google.com/cloudnet-agent-gateway",
        "title": "https://codelabs.developers.google.com/cloudnet-agent-gateway"
    },
    {
        "num": "29",
        "href": "https://cloud.google.com/security/products/model-armor",
        "title": "https://cloud.google.com/security/products/model-armor"
    },
    {
        "num": "30",
        "href": "https://codelabs.developers.google.com/secure-agent-modelarmor",
        "title": "https://codelabs.developers.google.com/secure-agent-modelarmor"
    },
    {
        "num": "32",
        "href": "https://docs.cloud.google.com/iam/docs/auth-manager-overview",
        "title": "https://docs.cloud.google.com/iam/docs/auth-manager-overview"
    },
    {
        "num": "33",
        "href": "https://docs.cloud.google.com/iam/docs/auth-with-2lo",
        "title": "https://docs.cloud.google.com/iam/docs/auth-with-2lo"
    },
    {
        "num": "34",
        "href": "https://docs.cloud.google.com/agent-registry/authenticate-toolsets",
        "title": "https://docs.cloud.google.com/agent-registry/authenticate-toolsets"
    },
    {
        "num": "35",
        "href": "https://docs.cloud.google.com/sensitive-data-protection/docs/sensitive-data-protection-overview",
        "title": "https://docs.cloud.google.com/sensitive-data-protection/docs/sensitive-data-protection-overview"
    },
    {
        "num": "36",
        "href": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search-2/overview",
        "title": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search-2/overview"
    },
    {
        "num": "37",
        "href": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/use-rag-managed-vertex-ai-vector-search",
        "title": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/use-rag-managed-vertex-ai-vector-search"
    },
    {
        "num": "39",
        "href": "https://docs.cloud.google.com/run/docs/ai/a2a-agents",
        "title": "https://docs.cloud.google.com/run/docs/ai/a2a-agents"
    },
    {
        "num": "40",
        "href": "https://github.com/a2aproject/A2A",
        "title": "https://github.com/a2aproject/A2A"
    },
    {
        "num": "41",
        "href": "https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/",
        "title": "https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/"
    },
    {
        "num": "42",
        "href": "https://developers.googleblog.com/developers-guide-to-multi-agent-patterns-in-adk/",
        "title": "https://developers.googleblog.com/developers-guide-to-multi-agent-patterns-in-adk/"
    },
    {
        "num": "43",
        "href": "https://github.com/google/adk-docs/blob/main/docs/graphs/index.md",
        "title": "https://github.com/google/adk-docs/blob/main/docs/graphs/index.md"
    },
    {
        "num": "44",
        "href": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/agent-evaluation",
        "title": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/agent-evaluation"
    },
    {
        "num": "45",
        "href": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/evaluate-agents",
        "title": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/evaluate-agents"
    },
    {
        "num": "46",
        "href": "https://adk.dev/evaluate/",
        "title": "https://adk.dev/evaluate/"
    },
    {
        "num": "47",
        "href": "https://cloud.google.com/blog/topics/developers-practitioners/a-methodical-approach-to-agent-evaluation",
        "title": "https://cloud.google.com/blog/topics/developers-practitioners/a-methodical-approach-to-agent-evaluation"
    },
    {
        "num": "48",
        "href": "https://docs.cloud.google.com/stackdriver/docs/observability/agent-observability",
        "title": "https://docs.cloud.google.com/stackdriver/docs/observability/agent-observability"
    },
    {
        "num": "50",
        "href": "https://blog.g-gen.co.jp/entry/vertex-ai-agent-engine-explained",
        "title": "https://blog.g-gen.co.jp/entry/vertex-ai-agent-engine-explained"
    },
    {
        "num": "52",
        "href": "https://google.github.io/adk-docs/deploy/agent-engine",
        "title": "https://google.github.io/adk-docs/deploy/agent-engine"
    },
    {
        "num": "121",
        "href": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank",
        "title": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank"
    },
    {
        "num": "123",
        "href": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions",
        "title": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions"
    },
    {
        "num": "125",
        "href": "https://google.github.io/adk-docs/sessions/",
        "title": "https://google.github.io/adk-docs/sessions/"
    },
    {
        "num": "140",
        "href": "https://dev.to/gde/google-clouds-agent-ops-stack-why-deployment-is-no-longer-the-hard-part-g3k",
        "title": "https://dev.to/gde/google-clouds-agent-ops-stack-why-deployment-is-no-longer-the-hard-part-g3k"
    },
    {
        "num": "55",
        "href": "https://codelabs.developers.google.com/getting-started-google-antigravity",
        "title": "https://codelabs.developers.google.com/getting-started-google-antigravity"
    },
    {
        "num": "57",
        "href": "https://codelabs.developers.google.com/getting-started-google-antigravity",
        "title": "https://codelabs.developers.google.com/getting-started-google-antigravity"
    },
    {
        "num": "60",
        "href": "https://github.com/google/agents-cli",
        "title": "https://github.com/google/agents-cli"
    },
    {
        "num": "67",
        "href": "https://developers.googleblog.com/agent-plugins-package-your-skills-tools-and-more/",
        "title": "https://developers.googleblog.com/agent-plugins-package-your-skills-tools-and-more/"
    },
    {
        "num": "71",
        "href": "https://modelcontextprotocol.io/",
        "title": "https://modelcontextprotocol.io/"
    },
    {
        "num": "72",
        "href": "https://github.com/a2aproject/A2A",
        "title": "https://github.com/a2aproject/A2A"
    },
    {
        "num": "73",
        "href": "https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/",
        "title": "https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/"
    },
    {
        "num": "75",
        "href": "https://github.com/a2aproject/A2A",
        "title": "https://github.com/a2aproject/A2A"
    },
    {
        "num": "76",
        "href": "https://docs.cloud.google.com/architecture/multiagent-ai-system",
        "title": "https://docs.cloud.google.com/architecture/multiagent-ai-system"
    },
    {
        "num": "89",
        "href": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/design-agents",
        "title": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/design-agents"
    },
    {
        "num": "90",
        "href": "https://cloud.google.com/model-garden",
        "title": "https://cloud.google.com/model-garden"
    },
    {
        "num": "92",
        "href": "https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio",
        "title": "https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio"
    },
    {
        "num": "93",
        "href": "https://cloud.google.com/blog/products/ai-machine-learning/the-new-gemini-enterprise-one-platform-for-agent-development",
        "title": "https://cloud.google.com/blog/products/ai-machine-learning/the-new-gemini-enterprise-one-platform-for-agent-development"
    },
    {
        "num": "97",
        "href": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview",
        "title": "https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview"
    }
];

export const DIAGRAMS: Record<string, string> & {
    diag1: string; diag2: string; diag3: string; diag4: string; diag5: string;
    diag6: string; diag7: string; diag8: string; diag9: string; diag10: string;
    diag11: string; diag12: string; diag13: string; diag14: string; diag15: string;
    diag16: string; diag17: string; diag18: string; diag19: string; diag20: string;
    diag21: string;
} = {
    "diag1": "pie\n    \"セクション1: ローコードツールでのエージェント構築 (13%)\" : 13\n    \"セクション2: コーディングエージェントの活用 (17%)\" : 17\n    \"セクション3: カスタムエージェントの開発 (33%)\" : 33\n    \"セクション4: 評価とデプロイ (22%)\" : 22\n    \"セクション5: セキュリティとガバナンス (15%)\" : 15",
    "diag2": "flowchart TB\n    subgraph Build[\"Build: 構築\"]\n        ADK[\"Agent Development Kit（ADK）\"]\n        AgentStudio[\"Workflow Builder（旧 Agent Designer）<br/>CX Agent Studio\"]\n        ModelGarden[\"Model Garden\"]\n        RAGEngine[\"RAG Engine\"]\n    end\n    subgraph Scale[\"Scale: 拡張\"]\n        Runtime[\"Agent Runtime<br/>（旧Agent Engine）\"]\n        Sessions[\"Agent Platform Sessions\"]\n        MemoryBank[\"Agent Platform Memory Bank\"]\n        VectorSearch[\"Vector Search 1.0 /<br/>Agent Retrieval\"]\n    end\n    subgraph Govern[\"Govern: ガバナンス\"]\n        AgentIdentity[\"Agent Identity（PAB）\"]\n        AgentGateway[\"Agent Gateway\"]\n        ModelArmor[\"Model Armor\"]\n        AgentRegistry[\"Agent Registry\"]\n    end\n    subgraph Optimize[\"Optimize: 最適化\"]\n        Eval[\"Agent Evaluation\"]\n        Observability[\"Agent Observability<br/>（Cloud Logging / Cloud Trace）\"]\n    end\n\n    Build --> Scale --> Govern --> Optimize",
    "diag3": "stateDiagram-v2\n    direction LR\n    [*] --> 挨拶ページ\n    挨拶ページ --> 意図分類ページ: ユーザー発話イベント\n    意図分類ページ --> 注文照会ページ: transition route（意図=注文照会）\n    意図分類ページ --> 返品受付ページ: transition route（意図=返品）\n    意図分類ページ --> 有人対応ページ: event handler（no-match / no-input）\n    注文照会ページ --> [*]: タスク完了\n    返品受付ページ --> [*]: タスク完了\n    有人対応ページ --> [*]: エスカレーション",
    "diag4": "flowchart LR\n    subgraph Sources[\"エンタープライズデータソース\"]\n        Docs[\"社内文書<br/>（Drive / SharePoint等）\"]\n        DB[\"構造化データ<br/>（BigQuery / Cloud SQL等）\"]\n        Media[\"非構造化マルチモーダルデータ<br/>（動画・音声・画像）\"]\n        SaaS[\"サードパーティSaaS<br/>（Jira / Salesforce等）\"]\n    end\n\n    Sources --> Connector[\"データコネクタ層\"]\n    Connector --> AgentSearch[\"Agent Search<br/>（旧Vertex AI Search）\"]\n    AgentSearch --> Index[\"インデックス／埋め込み表現\"]\n    Index --> Agent[\"Gemini Enterprise エージェント\"]\n    Agent --> User[\"エンドユーザー\"]",
    "diag5": "flowchart TB\n    Dev[\"開発者\"] --> Agent[\"コーディングエージェント<br/>（Antigravity / Claude Code on Google Cloud）\"]\n    Agent -->|MCP| MCP1[\"MCPサーバー: コードリポジトリ\"]\n    Agent -->|MCP| MCP2[\"MCPサーバー: 社内API\"]\n    Agent -->|Skill| Skill[\"カスタムスキル<br/>（SKILL.md）\"]\n    Agent -->|Sandbox| SandboxEnv\n\n    subgraph SandboxEnv[\"セキュアサンドボックス\"]\n        GKE[\"GKE Pod\"]\n        Workstation[\"Cloud Workstations\"]\n        AGSandbox[\"Antigravityサンドボックス\"]\n    end\n\n    SandboxEnv --> Repo[\"対象コードベース\"]",
    "diag6": "flowchart LR\n    Plugin[\"Agent Plugin\"] --> SkillFile[\"SKILL.md<br/>（手順・知識）\"]\n    Plugin --> MCPServer[\"MCPサーバー<br/>（ツール実行）\"]\n    SkillFile -.バインド.- MCPServer\n\n    Antigravity[\"Antigravity\"] -->|プラグインを読み込み| Plugin\n    Antigravity --> Hooks[\"拡張フック<br/>（ライフサイクルイベント）\"]\n    Antigravity --> Rules[\"ルール<br/>（AGENTS.md）\"]\n    Antigravity --> Sub1[\"サブエージェント: テスト担当\"]\n    Antigravity --> Sub2[\"サブエージェント: セキュリティ監査担当\"]\n    Antigravity --> Sub3[\"サブエージェント: ドキュメント担当\"]",
    "diag7": "flowchart TD\n    Start[\"エージェントのユースケースを定義\"] --> Q1{\"タスクの複雑さは？<br/>多段推論・厳密なフォーマット遵守が必要か\"}\n    Q1 -->|高い| LLM[\"LLM（例: Gemini 3系）を検討\"]\n    Q1 -->|定型的・低レイテンシ重視| SLM[\"SLM（軽量モデル）を検討\"]\n    LLM --> Q2{\"データ主権・レイテンシ制御が最優先か\"}\n    SLM --> Q2\n    Q2 -->|はい| SelfHosted[\"自己ホスト<br/>（Model Garden経由のOSS等）\"]\n    Q2 -->|いいえ・運用負荷を減らしたい| SaaSModel[\"SaaS型マネージドAPI<br/>（Gemini LLMs等）\"]\n    SelfHosted --> Q3{\"カスタマイズ性・透明性を重視するか\"}\n    SaaSModel --> Q3\n    Q3 -->|はい| OSSModel[\"OSSモデル\"]\n    Q3 -->|いいえ・最新性能とサポートを重視| Proprietary[\"プロプライエタリモデル\"]",
    "diag8": "flowchart LR\n    A[\"① 初期開発<br/>プロンプト＋ツール呼び出し\"] --> B[\"② 高度なオーケストレーション<br/>マルチエージェント／グラフワークフロー\"]\n    B --> C[\"③ 最適化<br/>パフォーマンス評価の実施\"]\n    C --> D[\"④ エンタープライズデプロイ<br/>高スケーラビリティ・信頼性・スループット\"]",
    "diag9": "flowchart TB\n    User[\"ユーザー\"] <--> Agent[\"ADKエージェント\"]\n    Agent --> Session[\"Agent Platform Sessions<br/>（短期・会話内の状態）\"]\n    Session -->|\"add_session_to_memory / generate / IngestEvents\"| MemGen[\"メモリ生成処理\"]\n    MemGen --> MemoryBank[\"Agent Platform Memory Bank<br/>（長期記憶）\"]\n    MemoryBank -->|次回セッションで検索| Agent",
    "diag10": "flowchart LR\n    subgraph Ingest[\"インデックス構築（オフライン）\"]\n        Doc[\"社内ドキュメント\"] --> Chunk[\"チャンク分割\"]\n        Chunk --> Embed[\"埋め込みモデルでベクトル化\"]\n        Embed --> Store[\"ベクトルストアへ格納\"]\n    end\n\n    subgraph Query[\"クエリ処理（オンライン）\"]\n        UserQ[\"ユーザー質問\"] --> EmbedQ[\"クエリの埋め込み\"]\n        EmbedQ --> Search[\"類似度検索<br/>（ANN: 近似最近傍探索）\"]\n        Search --> Rerank[\"リランキング\"]\n        Rerank --> Context[\"関連コンテキスト\"]\n        Context --> LLMGen[\"LLMによる回答生成\"]\n    end\n\n    Store -.検索対象.-> Search",
    "diag11": "flowchart TB\n    subgraph Runtime[\"Agent Runtime\"]\n        MyAgent[\"自作エージェント<br/>（A2A準拠）\"]\n    end\n    MyAgent -->|デプロイ時に自動登録| Registry[\"Agent Registry\"]\n    GoogleAgent[\"Google提供エージェント<br/>（Workspace等）\"] -->|設定不要で発見可能| Registry\n    Registry --> Orchestrator[\"オーケストレーター<br/>エージェント\"]\n    Orchestrator -->|スキルを検索して発見| Registry\n\n    MyAgent -->|ツール呼び出し| MCPCustom[\"カスタム統合レイヤー<br/>（マネージドDB接続等）\"]\n    MyAgent -->|ツール呼び出し| MCPThirdParty[\"MCPサーバー<br/>（サードパーティSaaS接続）\"]",
    "diag12": "flowchart TB\n    subgraph AgentA[\"エージェントA（オーケストレーター）\"]\n        A2AClient[\"A2Aクライアント\"]\n    end\n    subgraph AgentB[\"エージェントB（専門エージェント）\"]\n        A2AServer[\"A2Aサーバー\"]\n        MCPHost[\"MCPホスト\"]\n    end\n    subgraph Tools[\"外部ツール・データ\"]\n        MCPServer1[\"MCPサーバー: DB\"]\n        MCPServer2[\"MCPサーバー: 外部API\"]\n    end\n\n    AgentA -->|A2A: タスク委譲| AgentB\n    A2AClient -->|AgentCard取得<br/>/.well-known/agent-card.json| A2AServer\n    MCPHost -->|MCP: ツール呼び出し| MCPServer1\n    MCPHost -->|MCP: ツール呼び出し| MCPServer2",
    "diag13": "flowchart TB\n    subgraph SeqPattern[\"Sequential\"]\n        S1[\"Step1: パース\"] --> S2[\"Step2: 抽出\"] --> S3[\"Step3: 要約\"]\n    end\n    subgraph ParPattern[\"Parallel\"]\n        P0[\"ファンアウト\"] --> P1[\"調査A\"]\n        P0 --> P2[\"調査B\"]\n        P0 --> P3[\"調査C\"]\n        P1 --> PM[\"結果を集約\"]\n        P2 --> PM\n        P3 --> PM\n    end\n    subgraph LoopPattern[\"Loop\"]\n        L1[\"生成\"] --> L2[\"批評\"]\n        L2 -->|基準未達| L1\n        L2 -->|基準達成| LOut[\"完了\"]\n    end",
    "diag14": "flowchart LR\n    Design[\"evalset設計<br/>（代表クエリ＋エッジケース）\"] --> Run[\"エージェント実行\"]\n    Run --> Collect[\"応答・ツール軌跡を収集\"]\n    Collect --> Judge{\"評価方式\"}\n    Judge -->|定量比較| Exact[\"期待値との一致度スコアリング\"]\n    Judge -->|定性評価| LLMJudge[\"LLM-as-judge<br/>（Gen AI Evaluation Service）\"]\n    Judge -->|組織固有基準| Custom[\"カスタムオートレーター\"]\n    Exact --> Report[\"評価レポート\"]\n    LLMJudge --> Report\n    Custom --> Report\n    Report --> Gate{\"合格基準を満たすか\"}\n    Gate -->|Yes| Deploy[\"デプロイパイプラインへ\"]\n    Gate -->|No| Iterate[\"プロンプト／ツール／モデルを改善\"]\n    Iterate --> Run",
    "diag15": "flowchart TD\n    Start[\"デプロイ要件を整理\"] --> Q1{\"運用負荷を最小化し、<br/>セッション/メモリ管理を任せたいか\"}\n    Q1 -->|はい| AgentRuntime[\"Agent Runtimeを選択\"]\n    Q1 -->|いいえ、既存基盤に統合したい| Q2{\"サーバーレスで十分か、<br/>高度なK8s制御が必要か\"}\n    Q2 -->|サーバーレスで十分| CloudRun[\"Cloud Runを選択\"]\n    Q2 -->|高度なK8s制御が必要| GKE[\"GKEを選択\"]",
    "diag16": "flowchart LR\n    Agent[\"本番エージェント\"] -->|テレメトリ送信| Trace[\"Cloud Trace<br/>（ステップ単位のトレース）\"]\n    Agent -->|ログ送信| Logging[\"Cloud Logging<br/>（構造化ログ）\"]\n    Trace --> Analyze[\"異常検知・分析\"]\n    Logging --> Analyze\n    Analyze --> Drift[\"ドリフト検知<br/>（応答分布の変化）\"]\n    Analyze --> Latency[\"レイテンシ分析<br/>（ツール呼び出し単位）\"]\n    Analyze --> LoopDetect[\"推論ループ検知<br/>（繰り返しパターン）\"]\n    Analyze --> Failure[\"システム障害の切り分け\"]\n    Drift --> Action[\"改善アクション<br/>（プロンプト修正・evalset追加・再デプロイ）\"]\n    Latency --> Action\n    LoopDetect --> Action\n    Failure --> Action",
    "diag17": "sequenceDiagram\n    participant User as ユーザー\n    participant Agent as エージェント\n    participant AuthMgr as Auth Manager\n    participant Tool as 外部ツール/API\n\n    User->>Agent: タスクを依頼\n    Agent->>AuthMgr: ツール実行に必要な認可を要求\n    alt 3-legged OAuth（ユーザー代理）\n        AuthMgr->>User: 同意画面を提示\n        User-->>AuthMgr: 同意\n    else 2-legged OAuth（システム間）\n        AuthMgr->>AuthMgr: サービスアカウント認証\n    end\n    AuthMgr-->>Agent: アクセストークン発行\n    Agent->>Tool: トークン付きでツール呼び出し\n    Tool-->>Agent: 実行結果\n    Agent-->>User: 応答",
    "diag18": "flowchart TB\n    AgentID[\"Agent Identity<br/>（エージェント固有のプリンシパル）\"] --> PAB[\"PABポリシー\"]\n    PAB -->|許可範囲を境界として定義| Boundary[\"アクセス境界\"]\n    Boundary --> ResA[\"リソースA: 許可\"]\n    Boundary -.->|境界外は拒否| ResB[\"リソースB: 拒否\"]\n    Boundary --> ResC[\"リソースC: 許可（読み取りのみ）\"]\n\n    IAM[\"通常のIAMポリシー\"] -.併用.-> PAB",
    "diag19": "flowchart TB\n    Agent[\"エージェント\"] -->|すべての通信を経由| Gateway[\"Agent Gateway\"]\n    Gateway --> LLMCall[\"LLM呼び出し\"]\n    Gateway --> ToolCall[\"ツール呼び出し\"]\n    Gateway --> A2ACall[\"他エージェントへのA2A呼び出し\"]\n    Gateway --> Monitor[\"トラフィック監視・ログ\"]\n    Gateway --> PolicyEnforce[\"ポリシー適用<br/>（許可/拒否/レート制限）\"]\n    Monitor --> Dashboard[\"可観測性ダッシュボード\"]",
    "diag20": "flowchart LR\n    Input[\"ユーザー入力/<br/>外部ツールの応答\"] --> ModelArmorIn[\"Model Armor<br/>（入力スクリーニング）\"]\n    ModelArmorIn -->|安全| LLM[\"LLM推論\"]\n    ModelArmorIn -->|プロンプトインジェクション検知等| BlockIn[\"ブロック/サニタイズ\"]\n    LLM --> ModelArmorOut[\"Model Armor<br/>（出力スクリーニング）\"]\n    ModelArmorOut -->|安全| Output[\"エージェントの応答\"]\n    ModelArmorOut -->|機密データ漏えい・有害コンテンツ検知| BlockOut[\"ブロック/マスキング\"]",
    "diag21": "flowchart TB\n    subgraph Defense[\"多層防御アーキテクチャ\"]\n        direction TB\n        L1[\"層1: Auth Manager / OAuth<br/>（誰がアクセスしているか）\"]\n        L2[\"層2: Agent Identity + PAB<br/>（何にアクセスできるか）\"]\n        L3[\"層3: Agent Gateway<br/>（すべての通信を可視化・制御）\"]\n        L4[\"層4: Model Armor<br/>（入出力の内容が安全か）\"]\n        L5[\"層5: Sensitive Data Protection<br/>（機密データの検出・匿名化）\"]\n    end\n    L1 --> L2 --> L3 --> L4 --> L5"
};
