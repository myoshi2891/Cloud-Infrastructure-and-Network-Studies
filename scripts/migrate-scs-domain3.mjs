import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import { JSDOM } from 'jsdom';
import { isValid, toHex } from 'khroma';
import mermaid from 'mermaid';
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

/** 表の読み上げ名を直前の見出しから導出する。 */
function tableLabel(n) {
    let heading = n.previousElementSibling;
    while (heading && !heading.matches('h2,h3,h4')) heading = heading.previousElementSibling;
    return `比較表 ${tableScrolls.indexOf(n) + 1}：` + (heading?.textContent ?? '学習資料').replace(/\s+/g, ' ').trim();
}

const DOUBLE_QUOTED = String.raw`"(?:\\.|[^"\\])*"`;
const SINGLE_QUOTED = String.raw`'(?:\\.|[^'\\])*'`;
const COMMON = String.raw`\b(?:true|false)\b|\b\d+(?:\.\d+)?\b`;

const TOKEN_PATTERNS = {
    json: new RegExp(String.raw`(?<key>${DOUBLE_QUOTED}(?=\s*:))|${DOUBLE_QUOTED}|\b(?:true|false|null)\b|\b\d+\b`, 'g'),
    yaml: new RegExp(String.raw`#.*$|${DOUBLE_QUOTED}|${SINGLE_QUOTED}|(?<key>(?<=^\s*(?:-\s+)?)[\w-]+(?=:(?:\s|$)))|${COMMON}|!Ref\b`, 'g'),
    python: new RegExp(String.raw`#.*$|${DOUBLE_QUOTED}|${SINGLE_QUOTED}|\b(?<keyword>import|from|def|class|return|if|else|elif|try|except|with|as|for|in|while|pass|raise|True|False|None)\b|\b(?<built_in>print)\b|${COMMON}`, 'g'),
    dockerfile: new RegExp(String.raw`#.*$|(?<keyword>^(?:FROM|RUN|WORKDIR|COPY|USER|CMD|ENTRYPOINT|ENV|EXPOSE|ARG|ADD|LABEL|VOLUME|HEALTHCHECK))\b|--[\w-]+=[^\s]+|--[\w-]+|${DOUBLE_QUOTED}|${SINGLE_QUOTED}|${COMMON}`, 'g'),
    sql: new RegExp(`${DOUBLE_QUOTED}|${SINGLE_QUOTED}|${COMMON}`, 'g'),
    default: new RegExp(String.raw`#.*$|${DOUBLE_QUOTED}|${COMMON}`, 'g'),
};

/** コード1行を言語別の構文トークン付き JSX へ変換する。 */
function tokens(line, language) {
    if (['bash', 'shell'].includes(language)) {
        let output = '', end = 0;
        const bashRegex = new RegExp(
            String.raw`#.*$|${DOUBLE_QUOTED}|${SINGLE_QUOTED}|(?<![\w:-])(?:aws|pass|drop)(?![\w:-])|--[\w-]+|\$[\w_]+|\b(?:export|echo)\b|\b\d+\b`,
            'g',
        );
        for (const m of line.matchAll(bashRegex)) {
            output += '{' + JSON.stringify(line.slice(end, m.index)) + '}';
            const t = m[0];
            const cls = t.startsWith('#')
                ? 'comment'
                : /^["']/.test(t)
                ? 'string'
                : t === 'aws'
                ? 'built_in'
                : t.startsWith('$')
                ? 'variable'
                : /^\d/.test(t)
                ? 'number'
                : 'keyword';
            output += '<span className="hljs-' + cls + '">{' + JSON.stringify(t) + '}</span>';
            end = m.index + t.length;
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
            : m.groups?.keyword !== undefined
            ? 'keyword'
            : m.groups?.built_in !== undefined
            ? 'built_in'
            : text.startsWith('#')
            ? 'comment'
            : text.startsWith('--')
            ? 'attr'
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

/** 原本の DOM ノードを JSX 文字列へ変換する。 */
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

    if (n.matches('pre.code') || n.matches('pre:not(.mermaid)')) {
        const code = n.querySelector('code');
        const lang = code?.className.replace('language-', '').trim().toLowerCase() || 'text';
        const codeText = code ? code.textContent : n.textContent;
        const lines = (codeText ?? '').replace(/^\r?\n|\r?\n$/g, '').split(/\r?\n/);
        return (
            `<pre className="code code-block" tabIndex={0} role="group" aria-label="${lang} コード例">` +
            lines.map((line) => '<div className="code-line">' + tokens(line, lang) + '</div>').join('') +
            '</pre>'
        );
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
/** 定数・テーマ・共通コンポーネントなどセクション以外の土台を生成する。 */
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
        'diag-1': 'ユーザーや攻撃者からの通信が、層1エッジ（Shield, WAF, CloudFront）、層2ネットワーク境界（NACL, Network Firewall）、層3ワークロード境界（セキュリティグループ）、層4ホスト（堅牢化AMI, パッチ, Inspector）、層5アプリ・データ（実行ロール, 暗号化）を順に通過する多層防御の概念図。',
        'diag-2': 'Route 53、CloudFront、Shield/WAF、ALB、EC2、S3オリジンと連携するエッジ防御全体のアーキテクチャ図。',
        'diag-3': '脅威を特定し、攻撃の層（L3/L4かL7か）や要件に応じてShield Standard、Shield Advanced、WAF、レート制限、マネージドルールを選定するフロー。',
        'diag-4': 'カスタムヘッダー検証によるALBオリジン保護と、OACによるS3オリジン保護でCloudFrontの直接迂回を遮断する設計フロー。',
        'diag-5': 'リクエスト到着から優先度順のルール評価、カウント・ブロック・許可のアクション判定、およびデフォルトアクションへのフォールバックを示すWAF評価フロー。',
        'diag-6': 'CloudTrailやVPC Flow LogsなどのログをOCSF標準スキーマに変換してSecurity Lakeに集約し、サードパーティSIEMで分析する統合フロー。',
        'diag-7': 'ビルド時の堅牢化AMIとコンテナイメージ、デプロイ時のロールによる権限付与、ランタイムのInspectorとGuardDuty、運用のPatch Manager、Session Managerによる管理アクセスへと進み、脆弱性を発見したらビルドに戻るコンピュートセキュリティの全体フロー。',
        'diag-8': 'ベースイメージからビルドコンポーネントによる堅牢化、テストコンポーネントによる検証、AMI配布・共有をパイプラインで自動化するEC2 Image Builderのワークフロー。',
        'diag-9': 'EC2はインスタンスプロファイル、Lambdaは実行ロール、ECSはタスクロール（アプリ用）とタスク実行ロール（ECS基盤用）、EKSはIRSAまたはPod Identityを使うという、コンピュート環境ごとの権限付与の選択図。',
        'diag-10': '承認ルールを定めたパッチベースライン、パッチグループ、メンテナンスウィンドウによる自動適用とSystems Manager Patch Managerの実行フロー。',
        'diag-11': '管理者がIAM認証を経てSSMサービスとセッションを開始し、アウトバウンドHTTPS（443）経由のSSM Agentと通信してポート開放不要で接続するSession Managerの仕組み。',
        'diag-12': '開発者のIDE内スキャンからコミット・PRレビュー、CIパイプラインスキャン、レジストリスキャンを経て本番へ進むDevSecOpsシフトレフトの流れ。',
        'diag-13': 'ユーザー入力とモデル出力をBedrock Guardrailsがフィルタリングし、トピック拒否・有害語ブロック・機密情報マスキング・幻覚抑制を適用する保護フロー。',
        'diag-14': 'インターネットからIGW、サブネットのNACL、ENIのセキュリティグループを経てEC2へ至るインバウンドパケットの通過順序とステートフル/ステートレスの比較。',
        'diag-15': 'スポークVPC群からTransit Gatewayを経由し、集中インスペクションVPC内のAWS Network Firewallでドメイン・シグネチャ検査を行う中央集約型インスペクション構成。',
        'diag-16': '接続要件に応じて、迅速・低コストならSite-to-Site VPN、大容量・安定・閉域ならDirect Connect、高可用性ならDXとVPNのバックアップや複数ロケーションDXを選び、Direct Connectでは暗号化要件に応じてMACsec、DX上のSite-to-Site VPN、DXのみに分岐する接続方式決定木。',
        'diag-17': '社員がIdPで認証し、Verified Accessエンドポイントとセキュリティポリシー（Cedar）で評価されて社内プライベートアプリへセキュアにアクセスするゼロトラストフロー。',
        'diag-18': 'パブリックサブネット（ALB・NAT GW）、アプリケーションサブネット（EC2・SG）、データベース分離サブネット（RDS・SG）による3層ネットワークセグメンテーション構成。',
        'diag-19': '目的に応じて、あってはならない経路が存在しないかの確認にNetwork Access Analyzer、特定の2点間が通信できない原因の調査にReachability Analyzer、EC2の公開ポートの洗い出しにInspectorの到達性の検出結果、実際の通信の確認にVPC Flow Logsを選ぶ使い分け決定木。',
        'diag-20': 'ルートテーブルの経路確認からIGW/NAT GW、セキュリティグループ、NACL、OS内ファイアウォール・サービス起動確認へと段階的に進むトラブルシューティング決定フロー。',
    };

    const navItems = fixture.guideDesign.nav;

    const constantsContent = `export type DiagramId = keyof typeof DIAGRAMS;

export const DIAGRAMS = ${JSON.stringify(diagramCharts, null, 4)} as const satisfies Record<string, string>;

export const DIAGRAM_DESCRIPTIONS: Record<DiagramId, string> = ${JSON.stringify(descriptions, null, 4)} as const;

export const NAV_ITEMS = ${JSON.stringify(navItems, null, 4)} as const;
`;
    fs.writeFileSync(`${dir}/constants.ts`, constantsContent);

    // 2. mermaid-theme.json & render-theme.json
    const theme = fixture.guideInteractions.mermaidConfig;
    fs.writeFileSync(`${dir}/mermaid-theme.json`, JSON.stringify(theme, null, 4) + '\n');

    mermaid.initialize({ ...theme, startOnLoad: false });
    const vars = mermaid.mermaidAPI.getConfig().themeVariables;
    fs.writeFileSync(
        `${dir}/render-theme.json`,
        JSON.stringify(
            {
                ...theme,
                themeVariables: {
                    ...Object.fromEntries(
                        Object.entries(vars).map(([k, v]) => [
                            k,
                            typeof v === 'string' && /^(?:hsl|rgb)a?\(/.test(v) && isValid(v) ? toHex(v) : v,
                        ]),
                    ),
                    quadrantPointFill: vars.lineColor,
                    fontFamily: '"Noto Sans JP Variable",sans-serif',
                },
            },
            null,
            4,
        ) + '\n',
    );

    // 3. Diagram.tsx
    const diagramComponent = `'use client';

import { memo, useId } from 'react';
import theme from './render-theme.json';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, DIAGRAM_DESCRIPTIONS, type DiagramId } from './constants';

const themeFrontmatter = \`---\\nconfig: \${JSON.stringify(theme)}\\n---\\n\`;

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
        /** Escape キーで開いている目次を閉じる。 */
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
        /** URL の fragment を現在位置へ反映する。 */
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

        /** ページ末尾まで到達したら最後の目次項目を現在位置にする。 */
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

    /** 目次リンク選択時に目次を閉じ、選択先を現在位置へ反映する。 */
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

    const scope = '.scs-domain3-page';
    cssAst.walkRules((r) => {
        if (r.parent && r.parent.type === 'atrule' && r.parent.name === 'keyframes') return;
        r.selector = r.selector
            .split(',')
            .map((s) => {
                const trimmed = s.trim();
                if (['html', 'body'].includes(trimmed)) return scope;
                return (
                    `${scope} ` +
                    trimmed
                        .replaceAll('pre.mermaid', '.mermaid-wrap')
                        .replaceAll('pre.code code', 'pre.code .code-line')
                        .replaceAll('pre:not(.mermaid) code', 'pre:not(.mermaid) .code-line')
                        .replaceAll('.main > h2:first-of-type', '.main > .guide-part:first-child > h2:first-of-type')
                );
            })
            .join(', ');
    });

    const hexTokens = {
        '#ffffff': 'sidebar-bg',
        '#1b2640': 'text',
        '#2a4fd0': 'accent',
        '#0c1630': 'strong',
        '#9a4208': 'code-inline',
        '#f3f6fc': 'code-bg',
    };

    cssAst.walkDecls((d) => {
        if (!d.parent?.selector?.includes('.hljs')) {
            d.value = d.value.replace(/#[0-9a-fA-F]{6}\b/g, (hex) => {
                const token = hexTokens[hex.toLowerCase()];
                if (!token) throw new Error(`未登録の hex 色: ${hex} (${d.parent?.selector})`);
                return `var(--${token})`;
            });
        }
        d.value = d.value.replace(/var\(--([\w-]+)\)/g, (_, k) => {
            if (k === 'sidebar-w') return '280px';
            if (k === 'font-jp') return 'var(--font-body)';
            return `var(--color-scs-d3-${k})`;
        });
        if (d.prop === 'word-break') {
            d.prop = 'overflow-wrap';
            d.value = 'anywhere';
        }
        if (d.prop === 'overflow-x' && d.value === 'hidden') {
            d.value = 'clip';
        }
        if (d.prop === 'scroll-margin-top') {
            d.value = 'calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 24px)';
        }
        if (d.prop === 'top' && d.parent?.selector?.includes('.sidebar')) {
            d.value = 'calc(var(--header-h, 60px) + var(--disclaimer-height, 0px))';
        }
        if (d.prop === 'z-index' && d.parent?.selector?.includes('.sidebar-toggle')) {
            d.value = '39';
        } else if (d.prop === 'z-index' && d.parent?.selector?.includes('.sidebar')) {
            d.value = '38';
        }
    });

    cssAst.walkRules(`${scope} .sidebar nav a.active`, (r) => {
        r.cloneAfter({ selector: `${scope} .sidebar nav a[aria-current='location']` });
    });

    cssAst.walkRules(`${scope} .main`, (r) => {
        if (r.parent?.type === 'atrule') {
            r.append({ prop: 'width', value: '100%' }, { prop: 'max-width', value: 'none' });
        } else {
            r.append(
                { prop: 'width', value: 'calc(100% - 280px)' },
                { prop: 'max-width', value: 'none' },
                { prop: 'box-sizing', value: 'border-box' },
            );
        }
    });

    const additionalCss = `
${scope} {
    overflow-x: clip;
    color-scheme: light;
}
${scope} .main ul {
    list-style-type: disc;
}
${scope} .main ol {
    list-style-type: decimal;
}
${scope} .main ul ul {
    list-style-type: circle;
}
${scope} .main ul ul ul {
    list-style-type: square;
}
${scope} nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
${scope} .sidebar {
    position: fixed;
    top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px));
    left: 0;
    bottom: 0;
    width: 280px;
    z-index: 38;
}
${scope} .sidebar-toggle {
    top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 14px);
    z-index: 39;
}
@media (max-width: 980px) {
    ${scope} .sidebar:not(.open) {
        visibility: hidden;
        transition: transform 0.25s, visibility 0s linear 0.25s;
    }
}
${scope} .main h2,
${scope} .main h3,
${scope} .main h4 {
    scroll-margin-top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 24px);
}
${scope} .main {
    min-width: 0;
}
${scope} .mermaid-wrap > [role="img"] {
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    width: 100%;
}
${scope} .mermaid-wrap svg {
    flex-shrink: 0;
    max-width: none;
    height: auto;
}
${scope} pre.code .code-line {
    white-space: pre;
    min-height: 1.7em;
}

/* Section 9: question cards keep the original wording and native disclosure. */
.scs-domain3-page [data-part='examprep'] .practice-card {
    margin: 0 0 24px;
    padding: clamp(20px, 3vw, 32px);
    background: var(--color-scs-d3-bg-card);
    border: 1px solid var(--color-scs-d3-border);
    border-radius: 18px;
    box-shadow: 0 4px 18px color-mix(in srgb, var(--color-scs-d3-text) 4%, transparent);
    overflow-wrap: anywhere;
}
.scs-domain3-page .practice-card .practice-prompt {
    margin: 0 0 22px;
    color: var(--color-scs-d3-text);
    font-size: 16px;
    font-weight: 600;
    line-height: 1.9;
}
.scs-domain3-page .practice-prompt > strong:first-child {
    display: block;
    width: fit-content;
    margin-bottom: 14px;
    padding: 3px 12px;
    border: 1px solid var(--color-scs-d3-accent-soft);
    border-radius: 8px;
    background: var(--color-scs-d3-accent-bg);
    color: var(--color-scs-d3-accent);
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 700;
    line-height: 1.8;
}
.scs-domain3-page .practice-options {
    display: grid;
    gap: 10px;
    margin-bottom: 24px;
}
.scs-domain3-page .practice-option {
    display: block;
    width: 100%;
    text-align: left;
    font-family: inherit;
    cursor: pointer;
    padding: 13px 18px 13px 2.75em;
    text-indent: -1.45em;
    border: 1px solid var(--color-scs-d3-border-soft);
    border-radius: 10px;
    background: var(--color-scs-d3-bg);
    color: var(--color-scs-d3-text-dim);
    font-size: 14px;
    line-height: 1.85;
}
.scs-domain3-page .practice-option:hover {
    border-color: var(--color-scs-d3-accent-soft);
    background: var(--color-scs-d3-accent-bg);
}
.scs-domain3-page .practice-option:focus-visible {
    outline: 2px solid var(--color-scs-d3-accent);
    outline-offset: 3px;
}
.scs-domain3-page .practice-option[aria-pressed='true'] {
    box-shadow: inset 3px 0 0 currentColor;
}
.scs-domain3-page .practice-option[data-result='correct'],
.scs-domain3-page .practice-feedback[data-result='correct'] {
    color: var(--color-scs-d3-success);
    background: var(--color-scs-d3-success-bg);
    border-color: var(--color-scs-d3-success);
}
.scs-domain3-page .practice-option[data-result='incorrect'],
.scs-domain3-page .practice-feedback[data-result='incorrect'] {
    color: var(--color-scs-d3-danger);
    background: var(--color-scs-d3-danger-bg);
    border-color: var(--color-scs-d3-danger);
}
.scs-domain3-page .practice-feedback {
    padding: 12px 16px;
    border: 1px solid;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 700;
    text-indent: 0;
}
.scs-domain3-page .practice-feedback:empty {
    display: none;
}
.scs-domain3-page .practice-card details.answer {
    margin: 0;
    padding: 0;
    border-color: var(--color-scs-d3-border-soft);
    border-radius: 10px;
    background: var(--color-scs-d3-bg-card);
}
.scs-domain3-page .practice-card details.answer summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    min-height: 52px;
    padding: 12px 18px;
    border-radius: 9px;
    font-size: 14px;
    list-style: none;
}
.scs-domain3-page .practice-card details.answer summary::-webkit-details-marker {
    display: none;
}
.scs-domain3-page .practice-card details.answer summary::after {
    content: '';
    width: 8px;
    height: 8px;
    margin-right: 3px;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    transform: translateY(-2px) rotate(45deg);
    flex-shrink: 0;
}
.scs-domain3-page .practice-card details.answer summary:hover {
    background: var(--color-scs-d3-accent-bg);
}
.scs-domain3-page .practice-card details.answer summary:focus-visible {
    outline: 2px solid var(--color-scs-d3-accent);
    outline-offset: 4px;
}
.scs-domain3-page .practice-card details.answer[open] {
    border-color: var(--color-scs-d3-accent-soft);
    background: var(--color-scs-d3-accent-bg);
}
.scs-domain3-page .practice-card details.answer[open] summary {
    margin: 0;
    border-bottom: 1px solid var(--color-scs-d3-accent-soft);
    border-radius: 9px 9px 0 0;
}
.scs-domain3-page .practice-card details.answer[open] summary::after {
    transform: translateY(2px) rotate(225deg);
}
.scs-domain3-page .practice-card details.answer p {
    margin: 0;
    padding: 18px;
    font-size: 14px;
    line-height: 1.95;
}
@media (max-width: 540px) {
    .scs-domain3-page [data-part='examprep'] .practice-card {
        padding: 18px 14px;
        border-radius: 14px;
    }
    .scs-domain3-page .practice-option {
        padding-right: 12px;
    }
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

/** SCS-C03 Domain 3 ガイドのルートページ。 */
export default function Page() {
    return <ScsDomain3Guide />;
}
`;
    fs.writeFileSync(`${dir}/page.tsx`, pageComponent);

    // 7. ScsDomain3Guide.tsx
    const guideComponent = `import NavBar from './NavBar';
import HeroIntro from './sections/HeroIntro';
import Task31 from './sections/Task31';
import Task32 from './sections/Task32';
import Task33 from './sections/Task33';
import Summary from './sections/Summary';
import Troubleshooting from './sections/Troubleshooting';
import ExamPrep from './sections/ExamPrep';
import Appendix from './sections/Appendix';

/** Domain 3 本文の全セクションを原本の順序で構成する。 */
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

// 採点 UI を持つため手動保守するセクション。再生成すると操作部品が失われる
const HAND_MAINTAINED_PHASES = new Set(['examprep']);
const generatedPhases = Object.keys(boundaries).filter((phase) => !HAND_MAINTAINED_PHASES.has(phase));

/** 指定フェーズのセクションを原本から生成する。 */
export function migrateSection(phase) {
    if (HAND_MAINTAINED_PHASES.has(phase)) {
        throw new Error(`${phase} は手動保守のため再生成できません: ${dir}/sections/${componentNames[phase]}.tsx を直接編集してください`);
    }

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
    for (const p of generatedPhases) {
        migrateSection(p);
    }
} else if (Object.hasOwn(boundaries, target)) {
    migrateSection(target);
} else {
    console.error('Unknown target. Use: core, all, or ' + generatedPhases.join(', '));
    process.exit(1);
}
