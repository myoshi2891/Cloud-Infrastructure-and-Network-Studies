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
 */

/** @type {Readonly<Record<string, FidelityPageConfig>>} */
export const FIDELITY_PAGES = {
    'aws-ai-business-strategist-domain1': {
        source: 'archive/Aws/html/ai-business-strategist/domain1/Aib-c01-domain1-ai-fundamentals-and-literacy.html',
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
