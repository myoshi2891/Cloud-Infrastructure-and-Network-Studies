import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import { JSDOM } from 'jsdom';
import { isValid, toHex } from 'khroma';
import mermaid from 'mermaid';
import postcss from 'postcss';
import ts from 'typescript';
import fixture from '../docs/migration-inventory/aws-scs-c03-domain5-guide.fidelity.json' with { type: 'json' };
import { FIDELITY_PAGES } from './archive-fidelity-config.mjs';

const dir = 'app/aws/security-specialty/domain5';
fs.mkdirSync(`${dir}/sections`, { recursive: true });

const config = FIDELITY_PAGES['aws-scs-c03-domain5-guide'];
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
    sql: new RegExp(String.raw`--.*$|${DOUBLE_QUOTED}|${SINGLE_QUOTED}|\b(?<keyword>SELECT|FROM|WHERE|AND|OR|JOIN|LEFT|RIGHT|INNER|ON|GROUP|BY|ORDER|LIMIT|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|ALTER|DROP|NULL|NOT|IN|EXISTS|DESC|ASC)\b|${COMMON}`, 'gi'),
    rust: new RegExp(String.raw`//.*$|${DOUBLE_QUOTED}|${SINGLE_QUOTED}|\b(?<keyword>permit|forbid|when|unless|principal|action|resource|is|in|like|has|true|false)\b|${COMMON}`, 'g'),
    default: new RegExp(String.raw`#.*$|${DOUBLE_QUOTED}|${COMMON}`, 'g'),
};

/** コード1行を言語別の構文トークン付き JSX へ変換する。 */
function tokens(line, language) {
    if (['bash', 'shell'].includes(language)) {
        let output = '', end = 0;
        const bashRegex = new RegExp(
            String.raw`#.*$|${DOUBLE_QUOTED}|${SINGLE_QUOTED}|(?<![\w:-])(?<built_in>aws|echo|printf|exit|break|sleep|seq|base64)(?![\w:-])|--[\w-]+|\$[\w_]+|\b(?<keyword>for|in|do|done|case|esac|if|then|fi|else|elif|while|until|export|pass|drop)\b|\b\d+\b`,
            'g',
        );
        for (const m of line.matchAll(bashRegex)) {
            output += '{' + JSON.stringify(line.slice(end, m.index)) + '}';
            const t = m[0];
            const cls = t.startsWith('#')
                ? 'comment'
                : /^["']/.test(t)
                ? 'string'
                : t.startsWith('--')
                ? 'attr'
                : t.startsWith('$')
                ? 'variable'
                : m.groups?.built_in
                ? 'built_in'
                : m.groups?.keyword
                ? 'keyword'
                : 'number';
            output += `<span className="hljs-${cls}">${'{' + JSON.stringify(t) + '}'}</span>`;
            end = m.index + t.length;
        }
        return output + '{' + JSON.stringify(line.slice(end)) + '}';
    }

    const pattern = TOKEN_PATTERNS[language] ?? TOKEN_PATTERNS.default;
    pattern.lastIndex = 0;
    let output = '', end = 0;
    for (const m of line.matchAll(pattern)) {
        output += '{' + JSON.stringify(line.slice(end, m.index)) + '}';
        const t = m[0];
        const cls = t.startsWith('#') || t.startsWith('--') || t.startsWith('//')
            ? 'comment'
            : m.groups?.key
            ? 'attr'
            : /^["']/.test(t)
            ? 'string'
            : m.groups?.keyword
            ? 'keyword'
            : m.groups?.built_in
            ? 'built_in'
            : ['true', 'false', 'null'].includes(t)
            ? 'literal'
            : 'number';
        output += `<span className="hljs-${cls}">${'{' + JSON.stringify(t) + '}'}</span>`;
        end = m.index + t.length;
    }
    return output + '{' + JSON.stringify(line.slice(end)) + '}';
}

/** 単一の HTML/DOM ノードを JSX 文字列へ変換する。 */
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

    if (n.matches('.checklist-card')) {
        return `<ChecklistCard>${[...n.childNodes].map(jsx).join('')}</ChecklistCard>`;
    }
    if (n.matches('.checklist-header .count')) {
        const card = n.closest('.checklist-card');
        const count = card ? card.querySelectorAll('input[type="checkbox"]').length : 8;
        return `<ChecklistCount total={${count}} />`;
    }

    const attrs = [...n.attributes]
        .filter((a) => !['style'].includes(a.name))
        .map((a) => `${{ class: 'className', for: 'htmlFor', crossorigin: 'crossOrigin', readonly: 'readOnly', autocomplete: 'autoComplete' }[a.name] || a.name}={${JSON.stringify(a.value)}}`);

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
        'diag-0': 'アプリがKMSのGenerateDataKeyを呼び出し、平文データキーで大きなデータを暗号化し平文キーをメモリから破棄するエンベロープ暗号化の基本フロー。',
        'diag-1': 'クライアントからALB・CloudFront等の入口でのTLS強制、PrivateLink等の閉域アクセスを経てAWSリソースへ安全に通信するTask 5.1の全体像。',
        'diag-2': 'VPCエンドポイント、PrivateLink、Client VPN、Verified Accessの通信要件に応じた全体マップ。',
        'diag-3': '既存VPCでMonitorモードを有効化し、Flow Logsで平文通信を特定してTLS化やNitro対応へ移行するVPC Encryption Controlsの導入ステップ。',
        'diag-4': '専有HSMの要件やAWSサービス暗号化利用の有無に応じてKMS、CloudHSM、カスタムキーストア、XKSを選択する判断フロー。',
        'diag-5': 'ポリシー仮適用（InProgress 24時間）を経て確定・変更不可にするS3 Glacier Vault Lockの確定ステップ。',
        'diag-6': 'S3 Object Lock保持期間中はLifecycleのExpirationによる削除が保留され、保持期間満了後に安全に削除される連携フロー。',
        'diag-7': '自動バックアップ、KMS暗号化、Vault Lock不変性、別アカウント分離（論理的エアギャップ）を組み合わせたランサムウェア対策の多層防御。',
        'diag-8': 'createSecret、setSecret、testSecret、finishSecretの4ステップで認証情報を切り替えるSecrets Managerのローテーション仕組み。',
        'diag-9': 'EXTERNALキー作成、ラッピング公開鍵取得、素材生成、ラッピング、ImportKeyMaterialでインポートするキーマテリアル導入手順。',
        'diag-10': '自社生成・即時削除権限の要件に応じてインポート鍵（EXTERNAL）かAWS生成鍵（AWS_KMS）を選択する判断フロー。',
        'diag-11': '出さない設計、Macieによる検出、CloudWatch LogsやSNSでのマスキング（De-identify）による機密データ保護の多層防御。',
        'diag-12': '異なるリージョンに同じキーID・キーマテリアルを複製しつつキーポリシーを個別管理するマルチリージョンキー（MRK）の構成図。',
        'diag-13': 'ルートCAを最小限に厳重保護し、下位CA（Subordinate CA）からACM経由でエンドエンティティ証明書を自動更新するプライベートCA構成図。',
        'diag-14': '転送中・保存中・鍵/シークレットの各データ状態と要件から適切なAWSセキュリティサービスを選択する総合判断フロー。',
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
                        Object.entries(vars).map(([k, v]) => [k, typeof v === 'string' && isValid(v) ? toHex(v) : v]),
                    ),
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
                deferUntilVisible={true}
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

const DEFAULT_ID = NAV_ITEMS[0]?.id ?? '';

/** URL の fragment から目次のアクティブ ID を導出する。 */
const idFromHash = (): string => {
    if (typeof window === 'undefined') return DEFAULT_ID;
    const hash = window.location.hash.replace(/^#/, '');
    if (!hash) return DEFAULT_ID;
    let decoded: string;
    try {
        decoded = decodeURIComponent(hash);
    } catch (error) {
        // 外部リンクや手入力の不正な fragment で目次の同期を止めないよう先頭項目へ戻す
        if (!(error instanceof URIError)) throw error;
        return DEFAULT_ID;
    }
    return NAV_ITEMS.some((item) => item.id === decoded) ? decoded : DEFAULT_ID;
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

        if (observer) {
            for (const item of NAV_ITEMS) {
                const element = document.getElementById(item.id);
                if (element) observer.observe(element);
            }
        }

        return () => observer?.disconnect();
    }, []);

    useEffect(() => {
        const sidebar = document.getElementById('sidebar');
        const link = sidebar?.querySelector<HTMLAnchorElement>(\`a[href="#\${activeId}"]\`);
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
                    <div className="kicker">AWS Security Specialty</div>
                    <h2>Domain 5: Data Protection</h2>
                </div>
                <nav id="sidebarNav" aria-label="SCS-C03 Domain 5 目次">
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

    // 5. Checklist.tsx
    const checklistComponent = `'use client';

import { createContext, useContext, useCallback, useState, type ReactNode } from 'react';

const CheckedCount = createContext(0);

/** チェックリストカード。カード内の選択済み項目数だけをClient状態として持つ。 */
export function ChecklistCard({ children }: { children: ReactNode }) {
    const [count, setCount] = useState(0);

    /** カードのマウント時に、復元済みのチェック状態を完了数へ反映する。 */
    const card = useCallback((node: HTMLDivElement | null) => {
        if (node) setCount(node.querySelectorAll('input:checked').length);
    }, []);

    return (
        <CheckedCount.Provider value={count}>
            <div
                ref={card}
                className="checklist-card"
                onChange={(event) => setCount(event.currentTarget.querySelectorAll('input:checked').length)}
            >
                {children}
            </div>
        </CheckedCount.Provider>
    );
}

/** 所属するカードの完了数を表示する。 */
export function ChecklistCount({ total }: { total: number }) {
    const count = useContext(CheckedCount);
    return <span className="count">{\`\${count} / \${total} 完了\`}</span>;
}
`;
    fs.writeFileSync(`${dir}/Checklist.tsx`, checklistComponent);

    // 6. page.css
    const scope = '.scs-domain5-page';
    const rawCss = doc.querySelector('style')?.textContent ?? '';
    const cssAst = postcss.parse(rawCss);

    const rootNode = cssAst.nodes.find((n) => n.type === 'rule' && n.selector === ':root');
    if (rootNode) rootNode.remove();

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
        '#1b2740': 'text',
        '#2f5bd9': 'accent',
        '#0e1a31': 'strong',
        '#a54a00': 'code-inline',
        '#b4dec6': 'practice-border',
        '#f3f6fc': 'code-bg',
        '#24292f': 'code-line',
    };

    cssAst.walkDecls((d) => {
        d.value = d.value.replace(/var\(--([\w-]+)\)/g, (_, k) => {
            if (k === 'sidebar-w') return '280px';
            if (k === 'font-jp') return 'var(--font-body)';
            return `var(--color-scs-d5-${k})`;
        });
        if (!d.parent?.selector?.includes('.hljs')) {
            d.value = d.value.replace(/#[0-9a-fA-F]{6}\b/g, (hex) => {
                const token = hexTokens[hex.toLowerCase()];
                if (token) return `var(--color-scs-d5-${token})`;
                return hex;
            });
        }
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
${scope} .main .checklist-card ul {
    list-style: none;
    margin: 0;
    padding: 0;
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
/* Practice questions: keep the original text and native disclosure behavior. */
${scope} .main [data-part="examprep"] > p {
    position: relative;
    margin: 24px 0 0;
    padding: 26px 28px 24px 92px;
    border: 1px solid var(--color-scs-d5-border);
    border-bottom: 0;
    border-radius: 16px 16px 0 0;
    background: var(--color-scs-d5-bg-card);
    font-weight: 500;
    line-height: 1.9;
}
${scope} .main [data-part="examprep"] > p > strong {
    position: absolute;
    top: 26px;
    left: 24px;
    display: grid;
    place-items: center;
    min-width: 46px;
    height: 38px;
    border: 1px solid var(--color-scs-d5-accent-soft);
    border-radius: 10px;
    background: var(--color-scs-d5-accent-bg);
    color: var(--color-scs-d5-accent);
    font-family: var(--font-mono);
    font-size: 14px;
    line-height: 1;
}
${scope} .main [data-part="examprep"] > details {
    margin: 0 0 24px;
    padding: 0;
    overflow: hidden;
    border: 1px solid var(--color-scs-d5-border);
    border-top-color: var(--color-scs-d5-border-soft);
    border-radius: 0 0 16px 16px;
    background: var(--color-scs-d5-bg-card);
}
${scope} .main [data-part="examprep"] > details > summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    min-height: 56px;
    margin: 0;
    padding: 14px 28px;
    border: 0;
    background: var(--color-scs-d5-bg-card-2);
    font-size: 14px;
    list-style: none;
    transition: background-color 160ms ease;
}
${scope} .main [data-part="examprep"] > details > summary::-webkit-details-marker {
    display: none;
}
${scope} .main [data-part="examprep"] > details > summary::after {
    content: '';
    width: 9px;
    height: 9px;
    flex-shrink: 0;
    margin-right: 4px;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    transform: rotate(45deg) translateY(-2px);
}
${scope} .main [data-part="examprep"] > details > summary:hover {
    background: var(--color-scs-d5-accent-bg);
}
${scope} .main [data-part="examprep"] > details > summary:focus-visible {
    outline: 2px solid var(--color-scs-d5-accent);
    outline-offset: -5px;
    border-radius: 8px;
}
${scope} .main [data-part="examprep"] > details[open] > summary {
    margin-bottom: 0;
    border-bottom: 1px solid var(--color-scs-d5-border-soft);
    background: var(--color-scs-d5-accent-bg);
}
${scope} .main [data-part="examprep"] > details[open] > summary::after {
    transform: rotate(225deg) translate(-2px, -2px);
}
${scope} .main [data-part="examprep"] > details > p {
    margin: 0;
    padding: 24px 28px 26px;
    color: var(--color-scs-d5-text-dim);
    line-height: 1.95;
}
@media (max-width: 640px) {
    ${scope} .main [data-part="examprep"] > p {
        padding: 20px;
    }
    ${scope} .main [data-part="examprep"] > p > strong {
        position: static;
        width: fit-content;
        margin-bottom: 14px;
    }
    ${scope} .main [data-part="examprep"] > details > summary {
        padding: 14px 20px;
    }
    ${scope} .main [data-part="examprep"] > details > p {
        padding: 20px;
    }
}
@media (prefers-reduced-motion: reduce) {
    ${scope} .main [data-part="examprep"] > details > summary {
        transition: none;
    }
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
${scope} .main .mermaid-wrap p {
    color: inherit;
    margin: 0;
}
${scope} .mermaid-wrap {
    box-shadow: 0 2px 8px rgba(28, 39, 64, 0.04);
}
${scope} .main pre.code.code-block {
    padding: 18px 20px;
}
${scope} .main pre:not(.mermaid) > .code-line {
    padding: 0;
    min-height: 1.65em;
    white-space: pre;
}
${scope} .hljs-doctag,
${scope} .hljs-keyword,
${scope} .hljs-meta .hljs-keyword,
${scope} .hljs-template-tag,
${scope} .hljs-template-variable,
${scope} .hljs-type,
${scope} .hljs-variable.language_ {
    color: #d73a49;
}
${scope} .hljs-title,
${scope} .hljs-title.class_,
${scope} .hljs-title.class_.inherited__,
${scope} .hljs-title.function_ {
    color: #6f42c1;
}
${scope} .hljs-attr,
${scope} .hljs-attribute,
${scope} .hljs-literal,
${scope} .hljs-meta,
${scope} .hljs-number,
${scope} .hljs-operator,
${scope} .hljs-selector-attr,
${scope} .hljs-selector-class,
${scope} .hljs-selector-id,
${scope} .hljs-variable {
    color: #005cc5;
}
${scope} .hljs-meta .hljs-string,
${scope} .hljs-regexp,
${scope} .hljs-string {
    color: #032f62;
}
${scope} .hljs-built_in,
${scope} .hljs-symbol {
    color: #e36209;
}
${scope} .hljs-code,
${scope} .hljs-comment,
${scope} .hljs-formula {
    color: #6a737d;
}
${scope} .hljs-name,
${scope} .hljs-quote,
${scope} .hljs-selector-tag,
${scope} .hljs-deletion {
    color: #22863a;
}
`;
    fs.writeFileSync(`${dir}/page.css`, cssAst.toString() + '\n' + additionalCss);

    // 7. ScsDomain5Guide.tsx
    const guideComponent = `import NavBar from './NavBar';
import HeroIntro from './sections/HeroIntro';
import Task51 from './sections/Task51';
import Task52 from './sections/Task52';
import Task53 from './sections/Task53';
import Summary from './sections/Summary';
import ExamPrep from './sections/ExamPrep';
import Appendix from './sections/Appendix';

/** SCS Domain 5 Guide コンポーネント。 */
export default function ScsDomain5Guide() {
    return (
        <div className="scs-domain5-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                    <HeroIntro />
                    <Task51 />
                    <Task52 />
                    <Task53 />
                    <Summary />
                    <ExamPrep />
                    <Appendix />
                </main>
            </div>
        </div>
    );
}
`;
    fs.writeFileSync(`${dir}/ScsDomain5Guide.tsx`, guideComponent);

    // 8. page.tsx
    const pageComponent = `import type { Metadata } from 'next';
import ScsDomain5Guide from './ScsDomain5Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'SCS-C03 Domain 5: Data Protection 完全ガイド | AWS Certified Security - Specialty',
    description: 'AWS Certified Security - Specialty (SCS-C03) Content Domain 5: Data Protection 完全ガイド。転送中・保存中データの暗号化、KMS、CloudHSM、Secrets Manager、証明書管理をステップバイステップで完全解説。',
};

export default function Page() {
    return <ScsDomain5Guide />;
}
`;
    fs.writeFileSync(`${dir}/page.tsx`, pageComponent);

    // 9. Initial empty sections
    for (const [key, name] of Object.entries(componentNames)) {
        const file = `${dir}/sections/${name}.tsx`;
        if (!fs.existsSync(file)) {
            fs.writeFileSync(
                file,
                `export default function ${name}() {\n    return <section className="guide-part" data-part="${key}" />;\n}\n`,
            );
        }
    }
}

// ----------------------------------------------------
// Section generator
// ----------------------------------------------------
const componentNames = {
    herointro: 'HeroIntro',
    task51: 'Task51',
    task52: 'Task52',
    task53: 'Task53',
    summary: 'Summary',
    examprep: 'ExamPrep',
    appendix: 'Appendix',
};

/** 指定フェーズのセクションを原本から生成する。 */
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

    let body = chunks[phase].map(jsx).join('\n');
    const componentName = componentNames[phase];
    const hasDiagram = body.includes('<Diagram ');
    const hasChecklist = body.includes('<ChecklistCard>');

    let output = '';
    if (hasDiagram) output += `import { Diagram } from '../Diagram';\n`;
    if (hasChecklist) output += `import { ChecklistCard, ChecklistCount } from '../Checklist';\n`;
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

// ----------------------------------------------------
// CLI entrypoint
// ----------------------------------------------------
const target = process.argv[2] ?? 'core';
if (target === 'core') {
    scaffoldCore();
    console.log('scaffolded core files');
} else if (target === 'all') {
    scaffoldCore();
    for (const k of Object.keys(boundaries)) {
        migrateSection(k);
    }
    console.log('generated all sections');
} else if (boundaries[target] !== undefined) {
    migrateSection(target);
    console.log(`generated section: ${target}`);
} else {
    console.error(`unknown target: ${target}`);
    process.exit(1);
}
