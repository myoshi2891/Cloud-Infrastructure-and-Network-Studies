import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import { JSDOM } from 'jsdom';
import postcss from 'postcss';
import ts from 'typescript';
import fixture from '../docs/migration-inventory/aws-scs-c03-domain3-guide.fidelity.json' with { type: 'json' };
import { FIDELITY_PAGES } from './archive-fidelity-config.mjs';

const dir = 'app/aws/security-specialty/domain3';
fs.mkdirSync(`${dir}/sections`, { recursive: true });

const config = FIDELITY_PAGES['aws-scs-c03-domain3-guide'];
const html = execFileSync('git', ['show', `${config.sourceCommit}:${config.source}`], {
    encoding: 'utf8',
    maxBuffer: 8 * 1024 * 1024,
});
const doc = new JSDOM(html).window.document;
const boundaries = config.guideBoundaries;

const diagrams = [...doc.querySelectorAll('pre.mermaid')];
const tableScrolls = [...doc.querySelectorAll('.table-scroll')];

function tableLabel(n) {
    let heading = n.previousElementSibling;
    while (heading && !heading.matches('h2,h3,h4')) heading = heading.previousElementSibling;
    return `比較表 ${tableScrolls.indexOf(n) + 1}：` + (heading?.textContent ?? '学習資料').replace(/\s+/g, ' ').trim();
}

const DOUBLE_QUOTED = String.raw`"(?:\\.|[^"\\])*"`;
const SINGLE_QUOTED = String.raw`'(?:\\.|[^'\\])*'`;
const COMMON = String.raw`\b(?:true|false)\b|\b\d+\b`;

const TOKEN_PATTERNS = {
    json: new RegExp(String.raw`(?<key>${DOUBLE_QUOTED}(?=\s*:))|${DOUBLE_QUOTED}|\b(?:true|false|null)\b|\b\d+\b`, 'g'),
    yaml: new RegExp(String.raw`#.*$|${DOUBLE_QUOTED}|${SINGLE_QUOTED}|(?<key>(?<=^\s*(?:-\s+)?)[\w-]+(?=:(?:\s|$)))|${COMMON}|!Ref\b`, 'g'),
    python: new RegExp(String.raw`#.*$|${DOUBLE_QUOTED}|${SINGLE_QUOTED}|${COMMON}`, 'g'),
    sql: new RegExp(`${DOUBLE_QUOTED}|${SINGLE_QUOTED}|${COMMON}`, 'g'),
    default: new RegExp(String.raw`#.*$|${DOUBLE_QUOTED}|${COMMON}`, 'g'),
};

function tokens(line, language) {
    if (['bash', 'shell'].includes(language)) {
        let output = '', end = 0;
        for (const m of line.matchAll(/(?<![\w:-])aws(?![\w:-])|--[\w-]+|\b(?:\$|export|echo)\b/g)) {
            output += '{' + JSON.stringify(line.slice(end, m.index)) + '}';
            output += '<span className="hljs-' + (m[0] === 'aws' ? 'built_in' : 'keyword') + '">{' + JSON.stringify(m[0]) + '}</span>';
            end = m.index + m[0].length;
        }
        return output + '{' + JSON.stringify(line.slice(end)) + '}';
    }
    const regex = TOKEN_PATTERNS[language] ?? TOKEN_PATTERNS.default;
    let out = '', end = 0;
    for (const m of line.matchAll(regex)) {
        out += '{' + JSON.stringify(line.slice(end, m.index)) + '}';
        const text = m[0];
        const cls = m.groups?.key !== undefined
            ? 'attr'
            : text.startsWith('#')
            ? 'comment'
            : /^["']/.test(text)
            ? 'string'
            : /^\d/.test(text)
            ? 'number'
            : 'literal';
        out += `<span className="hljs-${cls}">{${JSON.stringify(text)}}</span>`;
        end = m.index + text.length;
    }
    return out + '{' + JSON.stringify(line.slice(end)) + '}';
}

function jsx(n) {
    if (n.nodeType === 3) {
        if (['TABLE', 'THEAD', 'TBODY', 'TFOOT', 'TR'].includes(n.parentElement?.tagName) && !n.textContent.trim()) {
            return '';
        }
        return '{' + JSON.stringify(n.textContent) + '}';
    }
    if (n.nodeType !== 1) return '';

    if (n.matches('pre.mermaid')) {
        const i = diagrams.indexOf(n);
        let prev = n.previousElementSibling;
        while (prev && !prev.matches('h2,h3,h4,h5')) prev = prev.previousElementSibling;
        const label = prev?.textContent?.replace(/\s+/g, ' ').trim() ?? `図 ${i + 1}`;
        return `<Diagram id="diag-${i}" label={${JSON.stringify(label)}} />`;
    }

    if (n.matches('pre.code') || n.matches('.code-block')) {
        const langEl = n.querySelector('.code-lang');
        const lang = langEl?.textContent?.trim().toLowerCase() ?? 'text';
        const pre = n.matches('pre') ? n : n.querySelector('pre');
        const code = pre?.querySelector('code');
        const codeText = code ? code.textContent : pre ? pre.textContent : '';
        const lines = codeText.replace(/^\n|\n$/g, '').split('\n');
        return `<div className="code-sample"><div className="code-lang">${langEl?.textContent?.trim() ?? ''}</div><div className="code-block" tabIndex={0} role="region" aria-label="${lang} コード例">${lines.map((line) => '<div className="code-line">' + tokens(line, lang) + '</div>').join('')}</div></div>`;
    }

    const attrs = [...n.attributes]
        .filter((a) => !['style'].includes(a.name))
        .map((a) => `${{ class: 'className', for: 'htmlFor' }[a.name] || a.name}={${JSON.stringify(a.value)}}`);

    if (n.matches('th')) attrs.push('scope="col"');
    if (n.matches('h2[id],h3[id],h4[id]')) attrs.push('tabIndex={-1}');
    if (n.matches('.table-scroll')) {
        attrs.push('tabIndex={0}', 'role="region"', `aria-label={${JSON.stringify(tableLabel(n))}}`);
    }

    const tag = n.tagName.toLowerCase();
    if (['input', 'br', 'hr', 'img'].includes(tag)) {
        return `<${tag} ${attrs.join(' ')} />`;
    }
    return `<${tag} ${attrs.join(' ')}>${[...n.childNodes].map(jsx).join('')}</${tag}>`;
}

// ----------------------------------------------------
// Scaffold core infrastructure
// ----------------------------------------------------
export function scaffoldCore() {
    // 1. constants.ts
    const diagramCharts = Object.fromEntries(
        diagrams.map((e, i) => [
            `diag-${i}`,
            e.textContent
                .trim()
                .split('\n')
                .map((l) => l.trimStart())
                .join('\n'),
        ]),
    );

    const descriptions = {
        'diag-0': 'Task 3.1 ネットワークエッジ、Task 3.2 コンピュートワークロード、Task 3.3 ネットワークセキュリティ制御の3つのタスクと16のスキルの階層構造を表すDomain 3の全体像。',
        'diag-1': '層1エッジ（Shield, WAF, CloudFront）、層2ネットワーク（Network Firewall, NACL, SG）、層3コンピュート（堅牢化AMI, ロール, Inspector）、層4データ・アプリ（KMS, Guardrails）を順に通過する多層防御の概念図。',
        'diag-2': 'Route 53、CloudFront、Shield/WAF、ALB、EC2、S3オリジンと連携するエッジ防御全体のアーキテクチャ図。',
        'diag-3': '脅威を特定し、攻撃の層（L3/L4かL7か）や要件に応じてShield Standard、Shield Advanced、WAF、レート制限、マネージドルールを選定するフロー。',
        'diag-4': 'カスタムヘッダー検証によるALBオリジン保護と、OACによるS3オリジン保護でCloudFrontの直接迂回を遮断する設計フロー。',
        'diag-5': 'リクエスト到着から優先度順のルール評価、カウント・ブロック・許可のアクション判定、およびデフォルトアクションへのフォールバックを示すWAF評価フロー。',
        'diag-6': 'CloudTrailやVPC Flow LogsなどのログをOCSF標準スキーマに変換してSecurity Lakeに集約し、サードパーティSIEMで分析する統合フロー。',
        'diag-7': 'ビルド時の堅牢化AMIとコンテナイメージ、デプロイ時のロール権限付与、ランタイム時の脆弱性スキャン・パッチ・安全アクセス、パイプライン監視に至るコンピュートセキュリティの全体フロー。',
        'diag-8': 'ベースイメージからビルドコンポーネントによる堅牢化、テストコンポーネントによる検証、AMI配布・共有をパイプラインで自動化するEC2 Image Builderのワークフロー。',
        'diag-9': 'EC2、Lambda、ECS、EKSの各コンピュート環境に応じたインスタンスプロファイル、サービスロール、実行ロールの選択決定木。',
        'diag-10': '承認ルールを定めたパッチベースライン、パッチグループ、メンテナンスウィンドウによる自動適用とSystems Manager Patch Managerの実行フロー。',
        'diag-11': '管理者がIAM認証を経てSSMサービスとセッションを開始し、アウトバウンドHTTPS（443）経由のSSM Agentと通信してポート開放不要で接続するSession Managerの仕組み。',
        'diag-12': '開発者のIDE内スキャンからコミット・PRレビュー、CIパイプラインスキャン、レジストリスキャンを経て本番へ進むDevSecOpsシフトレフトの流れ。',
        'diag-13': 'ユーザー入力とモデル出力をBedrock Guardrailsがフィルタリングし、トピック拒否・有害語ブロック・機密情報マスキング・幻覚抑制を適用する保護フロー。',
        'diag-14': 'インターネットからIGW、サブネットのNACL、ENIのセキュリティグループを経てEC2へ至るインバウンドパケットの通過順序とステートフル/ステートレスの比較。',
        'diag-15': 'スポークVPC群からTransit Gatewayを経由し、集中インスペクションVPC内のAWS Network Firewallでドメイン・シグネチャ検査を行う中央集約型インスペクション構成。',
        'diag-16': '接続要件（低コスト・迅速、大量・専用線、ゼロトラストWeb）に応じてSite-to-Site VPN、Direct Connect、Verified Accessを分岐して選ぶ接続方式決定木。',
        'diag-17': '社員がIdPで認証し、Verified Accessエンドポイントとセキュリティポリシー（Cedar）で評価されて社内プライベートアプリへセキュアにアクセスするゼロトラストフロー。',
        'diag-18': 'パブリックサブネット（ALB・NAT GW）、アプリケーションサブネット（EC2・SG）、データベース分離サブネット（RDS・SG）による3層ネットワークセグメンテーション構成。',
        'diag-19': '構成上の到達可能性を検証するNetwork Access Analyzer、既知の攻撃経路・開いたポートを調べるInspector、実際のパケット通過を監視するVPC Flow Logsの使い分け決定木。',
        'diag-20': 'ルートテーブルの経路確認からIGW/NAT GW、セキュリティグループ、NACL、OS内ファイアウォール・サービス起動確認へと段階的に進むトラブルシューティング決定フロー。',
    };

    const navItems = fixture.guideDesign.nav;

    const constantsContent = `export type DiagramId = keyof typeof DIAGRAMS;

export const DIAGRAMS = ${JSON.stringify(diagramCharts, null, 4)} as const satisfies Record<string, string>;

export const DIAGRAM_DESCRIPTIONS: Record<DiagramId, string> = ${JSON.stringify(descriptions, null, 4)} as const;

export const NAV_ITEMS = ${JSON.stringify(navItems, null, 4)} as const;
`;
    fs.writeFileSync(`${dir}/constants.ts`, constantsContent);

    // 2. mermaid-theme.json
    const theme = fixture.guideInteractions.mermaidConfig;
    fs.writeFileSync(`${dir}/mermaid-theme.json`, JSON.stringify(theme, null, 4) + '\n');

    // 3. Diagram.tsx
    const diagramComponent = `import { memo, useId } from 'react';
import sourceTheme from './mermaid-theme.json';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, DIAGRAM_DESCRIPTIONS, type DiagramId } from './constants';

const { primaryColor, primaryBorderColor, primaryTextColor, lineColor, background, secondaryColor } =
    sourceTheme.themeVariables;

const renderConfig = {
    ...sourceTheme,
    themeVariables: {
        ...sourceTheme.themeVariables,
        mainBkg: primaryColor,
        actorBkg: primaryColor,
        stateBkg: primaryColor,
        activationBkgColor: primaryColor,
        actorBorder: primaryBorderColor,
        stateBorder: primaryBorderColor,
        activationBorderColor: primaryBorderColor,
        actorTextColor: primaryTextColor,
        stateLabelColor: primaryTextColor,
        signalTextColor: primaryTextColor,
        labelTextColor: primaryTextColor,
        titleColor: primaryTextColor,
        actorLineColor: lineColor,
        signalColor: lineColor,
        labelBoxBkgColor: background,
        labelBoxBorderColor: primaryBorderColor,
        noteBkgColor: secondaryColor,
        noteTextColor: primaryTextColor,
        noteBorderColor: primaryBorderColor,
    },
};

const themeFrontmatter = \`---\\nconfig: \${JSON.stringify(renderConfig)}\\n---\\n\`;

/**
 * 原本のライト配色・配置設定と自然倍率を保持する図。
 */
export const Diagram = memo(function Diagram({
    id,
    label,
}: {
    id: DiagramId;
    label: string;
}) {
    const descriptionId = useId();
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap" role="region" tabIndex={0} aria-label={label}>
            <MermaidDiagram
                chart={themeFrontmatter + chart}
                ariaLabel={label}
                ariaDescribedBy={descriptionId}
                theme="light"
                preserveChartTheme
                preserveNaturalScale={true}
            />
            <span id={descriptionId} className="sr-only">
                {DIAGRAM_DESCRIPTIONS[id]}
            </span>
        </div>
    );
});
`;
    fs.writeFileSync(`${dir}/Diagram.tsx`, diagramComponent);

    // 4. NavBar.tsx
    const navBarComponent = `'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { NAV_ITEMS } from './constants';

const DEFAULT_ID = NAV_ITEMS[0]?.id ?? '1-このガイドの使い方';

/** URL fragment が目次項目に一致すればその ID、なければ先頭項目の ID を返す。 */
const idFromHash = (): string => {
    const raw = window.location.hash.slice(1);
    let hash = raw;
    try {
        hash = decodeURIComponent(raw);
    } catch (error) {
        if (!(error instanceof URIError)) throw error;
        return DEFAULT_ID;
    }
    return NAV_ITEMS.some((item) => item.id === hash) ? hash : DEFAULT_ID;
};

/** モバイル開閉と見出しに連動する目次。 */
export default function NavBar() {
    const [open, setOpen] = useState(false);
    const [activeId, setActiveId] = useState<string>(DEFAULT_ID);
    const toggleRef = useRef<HTMLButtonElement>(null);

    // 開いている間だけ Escape を監視し、閉じた状態でのフォーカス奪取を防ぐ
    useEffect(() => {
        if (!open) return;
        const escape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
                toggleRef.current?.focus();
            }
        };
        document.addEventListener('keydown', escape);
        return () => document.removeEventListener('keydown', escape);
    }, [open]);

    // サーバー描画と一致させるため初期値は先頭項目とし、マウント後と履歴移動時に fragment から同期する
    useEffect(() => {
        const syncFromHash = () => setActiveId(idFromHash());
        syncFromHash();
        window.addEventListener('hashchange', syncFromHash);
        window.addEventListener('popstate', syncFromHash);
        return () => {
            window.removeEventListener('hashchange', syncFromHash);
            window.removeEventListener('popstate', syncFromHash);
        };
    }, []);

    useEffect(() => {
        const visibleIds = new Set<string>();
        const observer =
            typeof IntersectionObserver === 'undefined'
                ? undefined
                : new IntersectionObserver(
                      (entries) => {
                          for (const entry of entries) {
                              if (entry.isIntersecting) visibleIds.add(entry.target.id);
                              else visibleIds.delete(entry.target.id);
                          }
                          const firstVisible = NAV_ITEMS.find((item) =>
                              visibleIds.has(item.id),
                          );
                          if (firstVisible) setActiveId(firstVisible.id);
                      },
                      { rootMargin: '-15% 0px -75% 0px', threshold: 0 },
                  );

        for (const item of NAV_ITEMS) {
            const target = document.getElementById(item.id);
            if (target) observer?.observe(target);
        }

        const endOfPage = () => {
            if (
                window.scrollY > 0 &&
                window.innerHeight + window.scrollY >=
                    document.documentElement.scrollHeight - 2
            ) {
                setActiveId(NAV_ITEMS[NAV_ITEMS.length - 1]?.id ?? DEFAULT_ID);
            }
        };
        window.addEventListener('scroll', endOfPage, { passive: true });

        return () => {
            observer?.disconnect();
            window.removeEventListener('scroll', endOfPage);
        };
    }, []);

    useEffect(() => {
        const sidebar = document.getElementById('sidebar');
        const link = sidebar?.querySelector<HTMLElement>('a[aria-current="location"]');
        if (!sidebar || !link) return;
        const top = link.offsetTop;
        if (
            top < sidebar.scrollTop + 80 ||
            top > sidebar.scrollTop + sidebar.clientHeight - 80
        ) {
            sidebar.scrollTop = top - sidebar.clientHeight / 3;
        }
    }, [activeId]);

    const handleLinkClick = (id: string) => {
        setOpen(false);
        setActiveId(id);
        const heading = document.getElementById(id);
        if (heading) {
            heading.focus();
        }
    };

    return (
        <Fragment>
            <button
                ref={toggleRef}
                type="button"
                id="sidebarToggle"
                className="sidebar-toggle"
                aria-label="目次を開閉"
                aria-expanded={open}
                aria-controls="sidebar"
                onClick={() => setOpen((prev) => !prev)}
            >
                ☰
            </button>
            <aside id="sidebar" className={\`sidebar\${open ? ' open' : ''}\`}>
                <div className="sidebar-header">
                    <div className="kicker">AWS SCS-C03</div>
                    <h2>Domain 3: Infrastructure Security</h2>
                </div>
                <nav id="sidebarNav" aria-label="SCS-C03 Domain 3 目次">
                    {NAV_ITEMS.map((item) => (
                        <Fragment key={item.id}>
                            <a
                                href={\`#\${item.id}\`}
                                className={item.level === 3 ? 'lvl3' : ''}
                                aria-current={activeId === item.id ? 'location' : undefined}
                                onClick={() => handleLinkClick(item.id)}
                            >
                                {item.label}
                            </a>{' '}
                        </Fragment>
                    ))}
                </nav>
            </aside>
        </Fragment>
    );
}
`;
    fs.writeFileSync(`${dir}/NavBar.tsx`, navBarComponent);

    // 5. page.css
    const rawCss = doc.querySelector('style').textContent;
    const cssAst = postcss.parse(rawCss);

    const rootNode = cssAst.nodes.find((n) => n.type === 'rule' && n.selector === ':root');
    if (rootNode) rootNode.remove();

    const tokenMap = {
        '--bg': 'var(--color-scs-d3-bg)',
        '--bg-card': 'var(--color-scs-d3-bg-card)',
        '--bg-card-2': 'var(--color-scs-d3-bg-card-2)',
        '--border': 'var(--color-scs-d3-border)',
        '--border-soft': 'var(--color-scs-d3-border-soft)',
        '--text': 'var(--color-scs-d3-text)',
        '--text-dim': 'var(--color-scs-d3-text-dim)',
        '--text-faint': 'var(--color-scs-d3-text-faint)',
        '--accent': 'var(--color-scs-d3-accent)',
        '--accent-soft': 'var(--color-scs-d3-accent-soft)',
        '--accent-bg': 'var(--color-scs-d3-accent-bg)',
        '--danger': 'var(--color-scs-d3-danger)',
        '--danger-bg': 'var(--color-scs-d3-danger-bg)',
        '--warn': 'var(--color-scs-d3-warn)',
        '--warn-bg': 'var(--color-scs-d3-warn-bg)',
        '--success': 'var(--color-scs-d3-success)',
        '--success-bg': 'var(--color-scs-d3-success-bg)',
        '--font-jp': 'var(--font-body)',
        '--sidebar-w': '280px',
    };

    cssAst.walkDecls((decl) => {
        let val = decl.value;
        for (const [v, replacement] of Object.entries(tokenMap)) {
            val = val.replaceAll(new RegExp(`var\\(${v}\\)`, 'g'), replacement);
        }
        decl.value = val;
    });

    const scope = '.scs-domain3-page';
    cssAst.walkRules((rule) => {
        if (rule.parent && rule.parent.type === 'atrule' && rule.parent.name === 'keyframes') return;
        rule.selectors = rule.selectors.map((sel) => {
            if (sel.startsWith('html') || sel.startsWith('body')) {
                return sel.replace(/^(html|body)/, scope);
            }
            if (sel.startsWith(':root')) {
                return sel.replace(/^:root/, scope);
            }
            return `${scope} ${sel}`;
        });

        // 契約テストと標準レイアウトに合わせて .main の宣言を調整
        if (rule.selectors.some((s) => s.endsWith('.main'))) {
            if (rule.parent && rule.parent.type === 'atrule' && rule.parent.name === 'media') {
                rule.append({ prop: 'width', value: '100%' });
                rule.append({ prop: 'max-width', value: 'none' });
            } else {
                rule.append({ prop: 'width', value: 'calc(100% - 280px)' });
                rule.append({ prop: 'max-width', value: 'none' });
                rule.append({ prop: 'box-sizing', value: 'border-box' });
            }
        }
    });

    // スコープ外のはみ出しを防ぎ、サイドバーレイアウト契約に合わせる
    const additionalCss = `
${scope} .sidebar {
    position: fixed;
    top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px));
    left: 0;
    bottom: 0;
    width: 280px;
    background: var(--color-scs-d3-sidebar-bg);
    border-right: 1px solid var(--color-scs-d3-border-soft);
    overflow-y: auto;
    padding: 28px 0 40px;
    z-index: 50;
}
${scope} .main {
    min-width: 0;
}
@media (max-width: 900px) {
    ${scope} .sidebar {
        transform: translateX(-100%);
        transition: transform 0.25s ease;
    }
    ${scope} .sidebar.open {
        transform: translateX(0);
    }
}
${scope} .code-line {
    white-space: pre-wrap;
    word-break: break-all;
}
${scope} .mermaid-wrap > [role="img"] {
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    width: 100%;
}
`;

    fs.writeFileSync(`${dir}/page.css`, cssAst.toString() + additionalCss);

    // 6. page.tsx
    const pageComponent = `import type { Metadata } from 'next';
import ScsDomain3Guide from './ScsDomain3Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'SCS-C03 Domain 3: Infrastructure Security 学習ガイド | Cloud Infrastructure Studies',
    description: 'AWS Certified Security - Specialty (SCS-C03) Content Domain 3: Infrastructure Security 初学者向けステップバイステップガイド。エッジ、コンピュート、ネットワークのセキュリティ制御を体系的に解説。',
};

export default function Page() {
    return <ScsDomain3Guide />;
}
`;
    fs.writeFileSync(`${dir}/page.tsx`, pageComponent);

    // 7. ScsDomain3Guide.tsx
    const guideComponent = `'use client';

import NavBar from './NavBar';
import HeroIntro from './sections/HeroIntro';
import Task31 from './sections/Task31';
import Task32 from './sections/Task32';
import Task33 from './sections/Task33';
import Summary from './sections/Summary';
import Troubleshooting from './sections/Troubleshooting';
import ExamPrep from './sections/ExamPrep';
import Appendix from './sections/Appendix';

export default function ScsDomain3Guide() {
    return (
        <div className="scs-domain3-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                    <HeroIntro />
                    <Task31 />
                    <Task32 />
                    <Task33 />
                    <Summary />
                    <Troubleshooting />
                    <ExamPrep />
                    <Appendix />
                </main>
            </div>
        </div>
    );
}
`;
    fs.writeFileSync(`${dir}/ScsDomain3Guide.tsx`, guideComponent);

    console.log('Scaffolded core files successfully!');
}

// ----------------------------------------------------
// Section migration
// ----------------------------------------------------
const componentNames = {
    herointro: 'HeroIntro',
    task31: 'Task31',
    task32: 'Task32',
    task33: 'Task33',
    summary: 'Summary',
    troubleshooting: 'Troubleshooting',
    examprep: 'ExamPrep',
    appendix: 'Appendix',
};

export function migrateSection(phase) {
    const main = doc.querySelector('main');
    const chunks = Object.fromEntries(Object.keys(boundaries).map((k) => [k, []]));
    let current = 'herointro';

    for (const n of main.childNodes) {
        if (n.nodeType === 1) {
            const found = Object.entries(boundaries).find(([, id]) => id && n.id === id)?.[0];
            if (found) current = found;
        }
        chunks[current].push(n);
    }

    const body = chunks[phase].map(jsx).join('\n');
    const componentName = componentNames[phase];
    const hasDiagram = body.includes('<Diagram ');

    let output = '';
    if (hasDiagram) output += `import { Diagram } from '../Diagram';\n`;
    output += `\n/** 原本の ${phase} セクション本文。 */\nexport default function ${componentName}() {\n    return (\n        <section className="guide-part" data-part="${phase}">\n${body}\n        </section>\n    );\n}\n`;

    const sourceFile = ts.createSourceFile(
        `${componentName}.tsx`,
        output,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX,
    );
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    const formatted = printer.printFile(sourceFile);

    fs.writeFileSync(`${dir}/sections/${componentName}.tsx`, formatted);
    console.log(`Generated sections/${componentName}.tsx!`);
}

// CLI handler
const target = process.argv[2] || 'core';
if (target === 'core') {
    scaffoldCore();
} else if (target === 'all') {
    scaffoldCore();
    for (const p of Object.keys(boundaries)) {
        migrateSection(p);
    }
} else if (Object.hasOwn(boundaries, target)) {
    migrateSection(target);
} else {
    console.error('Unknown target. Use: core, all, or ' + Object.keys(boundaries).join(', '));
    process.exit(1);
}
