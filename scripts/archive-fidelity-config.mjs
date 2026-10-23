/**
 * 移行忠実性 fixture の生成設定。
 *
 * アーカイブ（`/archive/` は .gitignore 済みのローカル専用資産）が削除されても検証を続けられるよう、
 * 移行元 HTML から抽出したスナップショットを `docs/migration-inventory/<slug>.fidelity.json` に
 * コミットしておく。ここはその抽出対象を宣言する唯一の場所であり、生成側とテスト側が共有する。
 *
 * `sourceCommit` は移行元 HTML を含む最後のコミット（削除コミットの親）。生成器はこのリビジョンから
 * `git show <sourceCommit>:<source>` で移行元を直接読むため、作業ツリーへの一時復元は不要。
 */

/**
 * @typedef {object} FidelityPageConfig
 * @property {string} source - 移行元 HTML のリポジトリ相対パス。
 * @property {string} sourceCommit - 移行元 HTML を取り出せる git リビジョン。
 * @property {string} [textSelector] - 全文照合に使う移行元セレクタ。
 * @property {boolean} [tables] - セル単位の表スナップショットを出力するか。
 * @property {string} [headerBodyTableSelector] - thead/tbody を分けた表スナップショットのセレクタ。
 * @property {string} [supplementalSelector] - 補足要素のセレクタ（移行元・移行先で共通）。
 * @property {boolean} [codeBlocks] - コードブロックの行スナップショットを出力するか。
 * @property {Readonly<Record<string, string>>} [syntaxSelectors] - 移行先クラス名 → 移行元セレクタ。
 * @property {boolean} [styledClasses] - スタイル定義を持つクラス名を出力するか。
 * @property {string} [placementSelector] - 配置順検査のセレクタ（移行元・移行先で共通）。
 * @property {boolean} [inlineCode] - インラインコードを出力するか。
 * @property {boolean} [refUrls] - 参考文献リンクを出力するか。
 * @property {string} [jsonCodeSelector] - JSON コードブロックのセレクタ。
 * @property {string} [introductionSelector] - 導入文のセレクタ。
 * @property {boolean} [mermaidCharts] - Mermaid 定義を出力するか。
 * @property {Readonly<Record<string, string>>} [guideBoundaries] - ガイドを区切る見出し ID。
 * @property {boolean} [guideInteractions] - チェック項目とMermaid描画設定を抽出する。
 */

/** @type {Readonly<Record<string, FidelityPageConfig>>} */
export const FIDELITY_PAGES = {
    "aws-ans-c01-domain4-guide": {
    "source": "Ans-c01-domain4-network-security-compliance-governance-guide.html",
    "sourceCommit": "3782b32cd4e3643e6c83e2e5e440c8797327fab5",
    "tables": true,
    "codeBlocks": true,
    "styledClasses": true,
    "guideInteractions": true,
    "guideBoundaries": {
        "foundation": "",
        "task1": "task-4-1",
        "task2": "task-4-2",
        "task3": "task-4-3",
        "revision": "sec-90"
    }
},
    'aws-ans-c01-domain3-guide': {
        source: 'Ans-c01-domain3-network-management-operation-guide.html',
        syntaxSelectors: {"mi":"pre:not(.mermaid) span.mi","w":"pre:not(.mermaid) span.w","nv":"pre:not(.mermaid) span.nv","mf":"pre:not(.mermaid) span.mf","gi":"pre:not(.mermaid) span.gi","kc":"pre:not(.mermaid) span.kc","gd":"pre:not(.mermaid) span.gd","k":"pre:not(.mermaid) span.k","n":"pre:not(.mermaid) span.n","p":"pre:not(.mermaid) span.p","o":"pre:not(.mermaid) span.o","s1":"pre:not(.mermaid) span.s1","se":"pre:not(.mermaid) span.se","m":"pre:not(.mermaid) span.m","c1":"pre:not(.mermaid) span.c1","nb":"pre:not(.mermaid) span.nb"},
        sourceCommit: '3782b32cd4e3643e6c83e2e5e440c8797327fab5',
        tables: true, codeBlocks: true, styledClasses: true, guideInteractions: true,
        guideBoundaries: {
            foundation: '',
            task1: 'part-a-task-31-ルーティングと接続性の維持',
            task2: 'part-b-task-32-トラフィックの監視分析とトラブルシューティング',
            task3: 'part-c-task-33-性能信頼性コストの最適化',
            revision: 'part-d-横断チートシートと確認問題',
        },
    },

    'aws-ans-c01-domain2-guide': {
        source: 'Ans-c01-domain2-network-implementation-guide.html',
        syntaxSelectors: {"c1":"pre.highlight span.c1","w":"pre.highlight span.w","se":"pre.highlight span.se","s1":"pre.highlight span.s1","m":"pre.highlight span.m","nv":"pre.highlight span.nv","o":"pre.highlight span.o","nt":"pre.highlight span.nt","p":"pre.highlight span.p","l":"pre.highlight span.l","l-Scalar":"pre.highlight span.l-Scalar","l-Scalar-Plain":"pre.highlight span.l-Scalar-Plain","p-Indicator":"pre.highlight span.p-Indicator","kt":"pre.highlight span.kt","s":"pre.highlight span.s","k":"pre.highlight span.k","kr":"pre.highlight span.kr","nx":"pre.highlight span.nx","s2":"pre.highlight span.s2","kd":"pre.highlight span.kd","ow":"pre.highlight span.ow","kn":"pre.highlight span.kn","nn":"pre.highlight span.nn","n":"pre.highlight span.n","nf":"pre.highlight span.nf","sd":"pre.highlight span.sd","mi":"pre.highlight span.mi","kc":"pre.highlight span.kc","nb":"pre.highlight span.nb"},
        sourceCommit: 'c5c1000ffaa0ad1b2ad0b6ae96fcc4b1f0011b8f',
        tables: true, codeBlocks: true, styledClasses: true, guideInteractions: true,
        guideBoundaries: {
            foundation: '',
            task1: '2-task-21-オンプレミスとawsのルーティングと接続',
            task2: '3-task-22-複数アカウントリージョンvpc間の接続',
            task3: '4-task-23-ハイブリッドマルチアカウントdns',
            task4: '5-task-24-ネットワークインフラの自動化と構成',
            revision: '6-ベストプラクティス総まとめ',
        },
    },

    'aws-ans-c01-domain1-guide': {
    "source": "Ans-c01-domain1-network-design-guide.html",
    "sourceCommit": "f687755c9dbcd242e5eae9468ded5e37524f045b",
    "tables": true,
    "codeBlocks": true,
    "styledClasses": true,
    "guideInteractions": true,
    "syntaxSelectors": {
        "ans-code-token-0": "pre.code span[style=\"color: #3D7B7B; font-style: italic\"]",
        "ans-code-token-1": "pre.code span[style=\"color: #BBB\"]",
        "ans-code-token-2": "pre.code span[style=\"color: #AA5D1F; font-weight: bold\"]",
        "ans-code-token-3": "pre.code span[style=\"color: #BA2121\"]",
        "ans-code-token-4": "pre.code span[style=\"color: #19177C\"]",
        "ans-code-token-5": "pre.code span[style=\"color: #666\"]",
        "ans-code-token-6": "pre.code span[style=\"color: #008000; font-weight: bold\"]"
    },
    "guideBoundaries": {
        "foundation": "",
        "task1": "task-11-エッジネットワークサービス",
        "task2": "task-12-dns-設計",
        "task3": "task-13-ロードバランシング設計",
        "task4": "task-14-ログとモニタリング要件の定義",
        "task5": "task-15-ハイブリッド接続とルーティング",
        "task6": "task-16-複数アカウント複数リージョン複数-vpc-の接続設計",
        "revision": "ドメイン-1-横断チートシート"
    }
},
    'aws-aip-c01-domain5-guide': {
        source: 'Aip-c01-domain5-testing-validation-troubleshooting-guide.html',
        sourceCommit: 'cb46fb6dc39604b936f3c413f953b6abd4469441',
        tables: true,
        codeBlocks: true,
        styledClasses: true,
        guideInteractions: true,
        guideBoundaries: {
            foundation: '',
            task1: '3-task-51-生成aiの評価システムを実装する',
            task2: '4-task-52-生成aiアプリをトラブルシュートする',
            revision: '5-横断まとめ',
        },
    },
    'aws-aip-c01-domain4-guide': {
        syntaxSelectors: {"kn":".hl .kn","w":".hl .w","nn":".hl .nn","o":".hl .o","n":".hl .n","p":".hl .p","s2":".hl .s2","k":".hl .k","nf":".hl .nf","nb":".hl .nb","mi":".hl .mi","mf":".hl .mf","c1":".hl .c1"},

        source: 'Aip-c01-domain4-operational-efficiency-guide.html',
        sourceCommit: '0af9544e9f5439bd4522bce6bb5f20aca2bb710f',
        tables: true,
        codeBlocks: true,
        styledClasses: true,
        guideInteractions: true,
        guideBoundaries: {
            foundation: '',
            task1: 'task-41-コスト最適化とリソース効率',
            task2: 'task-42-アプリケーション性能の最適化',
            task3: 'task-43-genai-アプリのモニタリング',
            revision: 'step-18-症状から解決策を選ぶ早見表',
        },
    },
    'aws-aip-c01-domain3-guide': {
        source: 'Aws-aip-c01-domain3-ai-safety-security-governance-guide.html',
        sourceCommit: 'd08571d893cd2007e312fcf4d4e161639ec69c17',
        tables: true,
        codeBlocks: true,
        styledClasses: true,
        guideInteractions: true,
        guideBoundaries: {
            foundation: '',
            task1: 'task-3-1',
            task2: 'task-3-2',
            task3: 'task-3-3',
            task4: 'task-3-4',
            revision: 'integration',
        },
    },
    "aws-aip-c01-domain2-guide": {
    "source": "Aws-aip-c01-domain2-implementation-integration-guide.html",
    "sourceCommit": "9eb40ce6830575a34214cd0847b65bc9406190e5",
    "tables": true,
    "codeBlocks": true,
    "styledClasses": true,
    "guideInteractions": true,
    "guideBoundaries": {
        "foundation": "",
        "task1": "task-21-エージェント型aiソリューションとツール統合",
        "task2": "task-22-モデルのデプロイ戦略",
        "task3": "task-23-エンタープライズ統合アーキテクチャ",
        "task4": "task-24-fm-api-統合の実装",
        "task5": "task-25-アプリケーション統合パターンと開発ツール",
        "revision": "step-27-練習問題15問"
    }
},
    'aws-aip-c01-domain1-guide': {
        source: 'Aws-aip-c01-domain1-guide.html',
        sourceCommit: '10e0f85f765c2efec07ade99669855fa53ba948d',
        tables: true,
        codeBlocks: true,
        styledClasses: true,
        guideInteractions: true,
        guideBoundaries: {
            foundation: '',
            task11: '3-task-11-要件分析と-genai-ソリューション設計',
            task12: '4-task-12-fm-の選定と構成',
            task13: '5-task-13-fm-向けデータ検証と処理パイプライン',
            task14: '6-task-14-ベクトルストア設計と実装',
            task15: '7-task-15-fm-拡張のための検索メカニズム',
            task16: '8-task-16-プロンプトエンジニアリングとガバナンス',
            revision: '9-試験で問われる判断軸まとめ',
        },
    },
    'aws-aip-c01-guide': {
        source: 'Aws-aip-c01-guide.html',
        sourceCommit: 'c4cc32a7a4180d2af4db79b50a3eddd72e517be3',
        tables: true,
        codeBlocks: true,
        styledClasses: true,
        guideBoundaries: {
            foundation: '',
            domain1: '2-ドメイン1-fm統合データ管理コンプライアンス31',
            domain2: '3-ドメイン2-実装と統合26',
            domain3: '4-ドメイン3-ai安全性セキュリティガバナンス20',
            operations: '5-ドメイン4-運用効率と最適化12',
            revision: '7-試験直前チェック-シナリオ別この要件ならこれ早見表',
        },
    },
    'aws-dva-domain3-deployment': {
        source: 'Aws-dva-c02-domain3-deployment-guide.html',
        sourceCommit: 'b1412ef1a5d2ebdf136c183a64a34150abf5eccc',
        textSelector: 'main h1, main h2, main h3, main h4, main p, main li, main th, main td, main summary, main blockquote, main .eyebrow, main .chip',
        tables: true,
        codeBlocks: true,
        refUrls: true,
    },
    'aws-ai-business-strategist-domain1': {
        source: 'Aib-c01-domain1-ai-fundamentals-and-literacy.html',
        sourceCommit: '7d2d35ec',
        textSelector: 'main h1, main h2, main h3, main h4, main p, main li, main th, main td, main .kicker, main .pill',
        tables: true,
        inlineCode: true,
    },
    'aws-dva-domain1-development': {
        source: 'Dva-c02-domain1-development-with-aws-services-guide.html',
        sourceCommit: '2c4c019d3fefca3eef92cd0d1d4b470a0de5ad54',
        textSelector: 'main h1, main h2, main h3, main h4, main p, main li, main th, main td, main summary, main blockquote, main .eyebrow, main .chip',
        tables: true,
        inlineCode: true,
    },
    'aws-dva-domain2-security': {
        source: 'Aws-dva-c02-domain2-security-guide.html',
        sourceCommit: 'fe948bdc47ca5e8e433b8c917d93d3457d2ba173',
        textSelector: 'main h1, main h2, main h3, main h4, main p, main li, main th, main td, main summary, main blockquote, main .eyebrow, main .chip',
        tables: true,
        inlineCode: true,
    },
    'computer-networks-tanenbaum': {
        source: 'Computer-networks-tanenbaum.html',
        sourceCommit: '437f4d77',
        textSelector: 'main h1, main h2, main h3, main p, main li, main th, main td, main .kicker, main .pill, main .ref-card',
        tables: true,
        supplementalSelector: '.callout-practice, .practice-label, .checklist-header .title',
        inlineCode: true,
    },
    'secure-cicd-pipeline-guide': {
        source: 'Secure-cicd-pipeline-guide.html',
        sourceCommit: '96f9488a8805139d10a5674dd5bbf7f2a49c839b',
        textSelector: 'main h1, main h2, main h3, main h4, main p, main li, main th, main td, main .hero-eyebrow, .sidebar-brand, .sidebar-source',
        tables: true,
        supplementalSelector: '.source-note, .callout, .code-label, .mermaid-caption, .reference-index, .reference-url',
        codeBlocks: true,
        styledClasses: true,
        placementSelector: 'table, pre, .code-block, .mermaid-card, .callout, .source-note',
    },
    'comptia-network-plus-guide': {
        source: 'archive/CompTIA/html/Comptia-network-plus-guide.html',
        sourceCommit: '7833298^',
        introductionSelector: '.doc-header .subtitle',
        mermaidCharts: true,
    },
    'ccna-automation-programmability': {
        source: 'archive/Cisco/html/ccna/Ccna-automation-programmability.html',
        sourceCommit: '7d5d3ad^',
        textSelector:
            'main h1, main h2, main h3, main p, main li, main th, main td, main a, main span.num, main figcaption',
        tables: true,
        supplementalSelector: '.callout, figcaption',
        codeBlocks: true,
        styledClasses: true,
        placementSelector: '.table-wrap > table, figure, .callout, .code-block, pre',
        jsonCodeSelector: 'pre code.language-json',
    },
    'ccna-automation-network-fundamentals': {
        source: 'archive/Cisco/html/ccna/Ccna-automation-network-fundamentals.html',
        sourceCommit: '7d5d3ad^',
        textSelector:
            'main h1, main h2, main h3, main p, main li, main th, main td, main a.ref-url, main span.ref-name',
        tables: true,
        supplementalSelector: '.callout, .meta-card, .diagram-caption',
        styledClasses: true,
        placementSelector: '.table-wrapper > table, .diagram-block, .callout',
        inlineCode: true,
        refUrls: true,
    },
    'ccna-network-access-guide': {
        source: 'archive/Cisco/html/ccna/Ccna-network-access-guide.html',
        sourceCommit: '7d5d3ad^',
        textSelector: 'main h1, main h2, main h3, main p, main li, main th, main td, main a',
        tables: true,
        supplementalSelector: '.callout, .diagram-caption',
        // 図のラッパーは移行元が .diagram-wrap、移行先が .mermaid-wrap。両方を選び、
        // それぞれの側では片方だけが一致するため、配置列は同じ長さ・同じ kind になる。
        placementSelector: 'table, .callout, .diagram-wrap, .mermaid-wrap',
    },
    'ccna-automation-infrastructure-and-automation': {
        source: 'archive/Cisco/html/ccna/Ccna-automation-infrastructure-and-automation.html',
        sourceCommit: '7d5d3ad^',
        tables: true,
        supplementalSelector: '.callout, .chip, .weight-tag, .diagram-label, .code-label',
        codeBlocks: true,
        syntaxSelectors: {
            'hl-kw': '.hljs-keyword, .hljs-literal',
            'hl-str': '.hljs-string',
            'hl-num': '.hljs-number',
            'hl-fn': '.hljs-built_in, .hljs-name',
            'hl-cm': '.hljs-comment',
            'hl-add': '.hljs-addition',
            'hl-del': '.hljs-deletion',
        },
        styledClasses: true,
        placementSelector: '.table-wrapper > table, .diagram-wrapper, .callout, .code-block, pre',
    },
    'cisco-devnet-associate-guide': {
        source: 'archive/Cisco/html/devnet/Cisco-devnet-associate-guide.html',
        sourceCommit: '7d5d3ad^',
        headerBodyTableSelector: 'main table',
    },
};
