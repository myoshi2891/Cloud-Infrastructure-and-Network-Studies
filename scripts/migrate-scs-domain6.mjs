import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import { JSDOM } from 'jsdom';
import { isValid, toHex } from 'khroma';
import mermaid from 'mermaid';
import postcss from 'postcss';
import ts from 'typescript';
import fixture from '../docs/migration-inventory/aws-scs-c03-domain6-guide.fidelity.json' with { type: 'json' };
import { FIDELITY_PAGES } from './archive-fidelity-config.mjs';
import { collectSectionNodes } from './collect-section-nodes.mjs';
import { normalizeCodeContainers } from './inventory-extraction.mjs';

const dir = 'app/aws/security-specialty/domain6';
fs.mkdirSync(`${dir}/sections`, { recursive: true });

const config = FIDELITY_PAGES['aws-scs-c03-domain6-guide'];
const html = execFileSync('git', ['show', `${config.sourceCommit}:${config.source}`], {
    encoding: 'utf8',
    maxBuffer: 8 * 1024 * 1024,
});
const doc = new JSDOM(html).window.document;
normalizeCodeContainers(doc);
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
    ruby: new RegExp(String.raw`#.*$|${DOUBLE_QUOTED}|${SINGLE_QUOTED}|\b(?<keyword>let|rule|when|empty|not|or|and|some|in)\b|${COMMON}`, 'g'),
    default: new RegExp(String.raw`#.*$|${DOUBLE_QUOTED}|${COMMON}`, 'g'),
};

/** コード1行を言語別の構文トークン付き JSX へ変換する。 */
function tokens(line, language) {
    if (['bash', 'shell'].includes(language)) {
        let output = '', end = 0;
        const bashRegex = new RegExp(
            String.raw`#.*$|${DOUBLE_QUOTED}|${SINGLE_QUOTED}|(?<![\w:-])(?<built_in>aws|echo|printf|exit|break|sleep|seq|base64|cfn-lint|cfn-guard)(?![\w:-])|--[\w-]+|\$[\w_]+|(?<![\w:-])(?<keyword>for|in|do|done|case|esac|if|then|fi|else|elif|while|until|export|pass|drop|validate)(?![\w:-])|(?<![\w:-])\d+(?![\w:-])`,
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
    // 確認問題の対話UIも再生成時に保持する。
    const quizComponent = `"use client";

import { Children, isValidElement, useState, type ReactNode } from "react";

type ContentElement = { children?: ReactNode };

/**
 * 原本の設問（先頭要素）と選択肢リスト（2番目の要素）を受け取り、選択肢をボタンとして即時採点する確認問題。
 * 正解が1つなら単一選択、複数なら選択を切り替えて正解集合との完全一致で判定し、結果を読み上げ可能なステータスへ表示する。
 */
export default function QuizQuestion({ number, correctAnswers, children }: {
    number: number;
    correctAnswers: number[];
    children: ReactNode;
}) {
    const [selected, setSelected] = useState<number[]>([]);
    const elements = Children.toArray(children).filter(isValidElement<ContentElement>);
    const prompt = elements[0];
    const options = Children.toArray(elements[1]?.props.children)
        .filter(isValidElement<ContentElement>);
    const multiple = correctAnswers.length > 1;
    const wrong = selected.some((index) => !correctAnswers.includes(index));
    const correct = !wrong && selected.length === correctAnswers.length;
    const status = selected.length === 0 ? "" : wrong ? "不正解" : correct ? "正解" : "あと1つ選択してください";

    function choose(index: number) {
        setSelected((previous) => multiple
            ? previous.includes(index) ? previous.filter((value) => value !== index) : [...previous, index]
            : [index]);
    }

    return (
        <div className="d6-quiz-card" role="group" aria-labelledby={\`d6-question-\${number}\`}>
            <div className="d6-quiz-prompt" id={\`d6-question-\${number}\`}>{prompt}</div>
            <ul className="d6-quiz-options">
                {options.map((option, index) => {
                    const active = selected.includes(index);
                    const state = active ? correctAnswers.includes(index) ? "correct" : "incorrect" : "idle";
                    return (
                        <li key={index}>
                            <button type="button" className="d6-quiz-option" data-state={state}
                                aria-pressed={active} onClick={() => choose(index)}>
                                <span className="d6-quiz-indicator" aria-hidden="true">{active ? state === "correct" ? "✓" : "×" : ""}</span>
                                <span>{option.props.children}</span>
                                {active && <span className="d6-quiz-option-result">{state === "correct" ? "正解" : "不正解"}</span>}
                            </button>
                        </li>
                    );
                })}
            </ul>
            <div className="d6-quiz-feedback" role="status" aria-live="polite"
                data-state={selected.length === 0 ? "idle" : wrong ? "incorrect" : correct ? "correct" : "pending"}>
                {status && <><span aria-hidden="true">{wrong ? "×" : correct ? "✓" : "○"}</span> {status}</>}
            </div>
        </div>
    );
}
`;
    fs.writeFileSync(`${dir}/QuizQuestion.tsx`, quizComponent);

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
        'diag-0': '「予防」「検出」「是正」の3層と各Task/Skillの関連を体系的に進める学習フロー。',
        'diag-1': '予防層（Organizations/SCP/Control Tower）、検出層（Config/Security Hub）、是正層（Systems Manager/自動修復）の3層連携フロー。',
        'diag-2': 'AWS Organizationsの管理アカウント、OU、メンバーアカウント、SCPの階層ツリー構造。',
        'diag-3': '予防コントロール（SCP）、検出コントロール（Config）、プロアクティブコントロール（CloudFormation Hooks）の適用ライフサイクルフロー。',
        'diag-4': 'ルート・OU・アカウントにアタッチされたSCPの継承と、明示的Denyが最優先される認可判定フロー。',
        'diag-5': 'RCPが組織外プリンシパルからのアクセスを境界として拒否する認可フロー。',
        'diag-6': '管理アカウントで信頼されたアクセスと委任管理者を指定し、メンバーアカウントへ一括展開するフロー。',
        'diag-7': '緊急時のルート特権アクセスとAssumeRootタスクポリシー、監査ログ監視のフロー。',
        'diag-8': '管理アカウントまたは委任管理者から組織・OU全体へテンプレートを自動配布・展開するCloudFormation StackSetsのフロー。',
        'diag-9': 'cfn-lint、cfn-guard、Proactive Controlによる静的検査を経て本番へデプロイするパイプライン全体像。',
        'diag-10': 'Firewall Manager管理者から各アカウント・リージョンのALB/CloudFront/VPCへセキュリティポリシーを一括配信するフロー。',
        'diag-11': '共有アカウントからリソース共有を作成し、組織・OU内のプリンシパルへ安全に共有するAWS RAMのフロー。',
        'diag-12': '製品ポートフォリオを作成し、起動制約ロールを介して最小権限でエンドユーザーに配布するAWS Service Catalogのフロー。',
        'diag-13': 'リソース変更を検知し、Configルールで評価してタイムラインと準拠状態を記録するAWS Configの基本フロー。',
        'diag-14': 'Configルールの非準拠検知からEventBridge、SSM Automationを起動して自動修正する自動修復フロー。',
        'diag-15': 'Config、GuardDuty、Inspector等の検出結果をASFF形式で集約し、セキュリティ標準に照らしてスコアリングするSecurity Hubのフロー。',
        'diag-16': '評価フレームワークに基づき、Config、CloudTrail、Security Hub等から証拠を自動収集・集約するAudit Managerのフロー。',
        'diag-17': 'ワークロード定義から質問回答、リスク特定、改善計画策定・マイルストーン記録を行うWell-Architected Toolの評価サイクル。',
        'diag-18': '管理・セキュリティ・ログ・ワークロードのマルチアカウント統合アーキテクチャ（リファレンス構成）。',
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
                        Object.entries(vars)
                            // 算出不能な派生色（NaN を含む hsl）は不正な CSS になるため出力しない
                            .filter(([, v]) => !(typeof v === 'string' && v.includes('NaN')))
                            .map(([k, v]) => [k, typeof v === 'string' && isValid(v) ? toHex(v) : v]),
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

    useEffect(() => {
        if (!open) return;
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
                toggleRef.current?.focus();
            }
        };
        document.addEventListener('keydown', closeOnEscape);
        return () => document.removeEventListener('keydown', closeOnEscape);
    }, [open]);

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
                          const firstVisible = NAV_ITEMS.find((item) => visibleIds.has(item.id));
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
        if (top < sidebar.scrollTop + 80 || top > sidebar.scrollTop + sidebar.clientHeight - 80) {
            sidebar.scrollTop = top - sidebar.clientHeight / 3;
        }
    }, [activeId]);

    const handleLinkClick = (id: string) => {
        setOpen(false);
        setActiveId(id);
        const heading = document.getElementById(id);
        if (heading) {
            heading.tabIndex = -1;
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
                    <h2>Domain 6: Security Foundations and Governance</h2>
                </div>
                <nav id="sidebarNav" aria-label="SCS-C03 Domain 6 目次">
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
    const scope = '.scs-domain6-page';
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
        '#ffffff': 'bg-card',
        '#1b2740': 'text',
        '#2c52d0': 'accent',
        '#0c1630': 'strong',
        '#fff3e2': 'code-bg',
        '#f1d6ad': 'code-border',
        '#8a4208': 'code-inline',
        '#24292e': 'code-line',
    };

    cssAst.walkDecls((d) => {
        d.value = d.value.replace(/var\(--([\w-]+)\)/g, (_, k) => {
            if (k === 'sidebar-w') return '280px';
            if (k === 'font-jp') return 'var(--font-body)';
            if (k === 'font-mono') return 'var(--font-mono)';
            return `var(--color-scs-d6-${k})`;
        });
        if (!d.parent?.selector?.includes('.hljs')) {
            d.value = d.value.replace(/#[0-9a-fA-F]{6}\b/g, (hex) => {
                const token = hexTokens[hex.toLowerCase()];
                if (token) return `var(--color-scs-d6-${token})`;
                return hex;
            });
        }
        if (d.prop === 'word-break') {
            d.parent?.walkDecls('overflow-wrap', (duplicate) => duplicate.remove());
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
${scope} .main .mermaid-wrap p {
    color: inherit;
    margin: 0;
}
${scope} .mermaid-wrap {
    overflow-x: auto;
    box-shadow: 0 2px 8px rgba(28, 39, 64, 0.04);
}
${scope} .main pre.code.code-block {
    padding: 18px 20px;
}
${scope} .code-sample {
    margin: 0 0 26px;
    border: 1px solid var(--color-scs-d6-border);
    border-radius: 12px;
    background: var(--color-scs-d6-bg-card);
    overflow: hidden;
}
${scope} .code-sample .code-lang {
    padding: 7px 16px;
    background: var(--color-scs-d6-bg-card-2);
    border-bottom: 1px solid var(--color-scs-d6-border);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-scs-d6-text-dim);
}
${scope} .code-sample pre {
    margin: 0;
    overflow-x: auto;
}
${scope} .main pre:not(.mermaid) > .code-line {
    padding: 0;
    min-height: 1.65em;
    white-space: pre;
    font-family: var(--font-mono);
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
`;

    const quizCss = `.scs-domain6-page .main .d6-quiz-card {
    margin: 24px 0;
    padding: clamp(20px, 3vw, 32px);
    background: var(--color-scs-d6-bg-card);
    border: 1px solid var(--color-scs-d6-border);
    border-radius: 18px;
    box-shadow: 0 4px 20px rgba(28, 39, 64, 0.04);
}
.scs-domain6-page .main .d6-quiz-prompt p {
    margin: 0 0 22px;
    color: var(--color-scs-d6-text);
    font-weight: 600;
    line-height: 1.9;
}
.scs-domain6-page .main .d6-quiz-prompt strong {
    display: block;
    margin-bottom: 12px;
    color: var(--color-scs-d6-accent);
    font-family: var(--font-mono);
    font-size: 14px;
    letter-spacing: 0.06em;
}
.scs-domain6-page .main ul.d6-quiz-options {
    display: grid;
    gap: 10px;
    padding: 0;
    margin: 0;
    list-style: none;
}
.scs-domain6-page .main .d6-quiz-options li {
    margin: 0;
    padding: 0;
}
.scs-domain6-page .main .d6-quiz-option {
    display: flex;
    align-items: baseline;
    gap: 12px;
    width: 100%;
    min-height: 56px;
    padding: 14px 16px;
    border: 1px solid var(--color-scs-d6-border);
    border-radius: 10px;
    background: var(--color-scs-d6-bg);
    color: var(--color-scs-d6-text);
    font: inherit;
    font-size: 14px;
    line-height: 1.8;
    text-align: left;
    cursor: pointer;
    transition: border-color 0.15s, background-color 0.15s, box-shadow 0.15s;
}
.scs-domain6-page .main .d6-quiz-option > span:nth-child(2) {
    flex: 1;
    min-width: 0;
    overflow-wrap: anywhere;
}
.scs-domain6-page .main .d6-quiz-option:hover {
    border-color: var(--color-scs-d6-accent);
    box-shadow: 0 2px 8px rgba(28, 39, 64, 0.06);
}
.scs-domain6-page .main .d6-quiz-option:focus-visible {
    outline: 3px solid var(--color-scs-d6-accent);
    outline-offset: 3px;
}
.scs-domain6-page .main .d6-quiz-indicator {
    display: inline-flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    border: 1px solid var(--color-scs-d6-border);
    border-radius: 6px;
    background: var(--color-scs-d6-bg-card);
    font-weight: 800;
    line-height: 1;
}
.scs-domain6-page .main .d6-quiz-option[data-state="correct"] {
    border-color: var(--color-scs-d6-success);
    background: var(--color-scs-d6-success-bg);
    color: var(--color-scs-d6-success);
}
.scs-domain6-page .main .d6-quiz-option[data-state="incorrect"] {
    border-color: var(--color-scs-d6-danger);
    background: var(--color-scs-d6-danger-bg);
    color: var(--color-scs-d6-danger);
}
.scs-domain6-page .main .d6-quiz-option[data-state="correct"] .d6-quiz-indicator {
    border-color: var(--color-scs-d6-success);
    background: var(--color-scs-d6-success);
    color: white;
}
.scs-domain6-page .main .d6-quiz-option[data-state="incorrect"] .d6-quiz-indicator {
    border-color: var(--color-scs-d6-danger);
    background: var(--color-scs-d6-danger);
    color: white;
}
.scs-domain6-page .main .d6-quiz-option-result {
    align-self: center;
    flex-shrink: 0;
    font-size: 12px;
    font-weight: 800;
}
.scs-domain6-page .main .d6-quiz-feedback {
    min-height: 28px;
    margin-top: 12px;
    font-size: 13px;
    font-weight: 700;
    color: var(--color-scs-d6-text-dim);
}
.scs-domain6-page .main .d6-quiz-feedback[data-state="correct"] { color: var(--color-scs-d6-success); }
.scs-domain6-page .main .d6-quiz-feedback[data-state="incorrect"] { color: var(--color-scs-d6-danger); }
@media (max-width: 480px) {
    .scs-domain6-page .main .d6-quiz-option {
        flex-wrap: wrap;
        gap: 8px;
        padding: 12px;
    }
    .scs-domain6-page .main .d6-quiz-option-result { margin-left: 30px; }
}
`;
    fs.writeFileSync(`${dir}/page.css`, quizCss + cssAst.toString() + additionalCss);

    // 6. ScsDomain6Guide.tsx
    const guideComponent = `import NavBar from './NavBar';
import HeroIntro from './sections/HeroIntro';
import Task61 from './sections/Task61';
import Task62 from './sections/Task62';
import Task63 from './sections/Task63';
import Summary from './sections/Summary';
import ExamPrep from './sections/ExamPrep';
import Appendix from './sections/Appendix';

/** SCS Domain 6 Guide コンポーネント。 */
export default function ScsDomain6Guide() {
    return (
        <div className="scs-domain6-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                    <HeroIntro />
                    <Task61 />
                    <Task62 />
                    <Task63 />
                    <Summary />
                    <ExamPrep />
                    <Appendix />
                </main>
            </div>
        </div>
    );
}
`;
    fs.writeFileSync(`${dir}/ScsDomain6Guide.tsx`, guideComponent);

    // 7. page.tsx
    const pageComponent = `import type { Metadata } from 'next';
import ScsDomain6Guide from './ScsDomain6Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'SCS-C03 Domain 6: Security Foundations and Governance 完全ガイド | AWS Certified Security - Specialty',
    description: 'AWS Certified Security - Specialty (SCS-C03) Content Domain 6: Security Foundations and Governance 完全ガイド。AWS Organizations、Control Tower、組織ポリシー（SCP/RCP）、Firewall Manager、Audit Manager、Artifact、Well-Architected Toolを体系的に完全解説。',
};

export default function Page() {
    return <ScsDomain6Guide />;
}
`;
    fs.writeFileSync(`${dir}/page.tsx`, pageComponent);
}

// ----------------------------------------------------
// Section extraction & generation
// ----------------------------------------------------
const boundaryEntries = Object.entries(boundaries);

/** 見出し ID の境界に基づいて、指定セクションに属するノードの JSX を生成する。 */
export function generateSection(partKey, componentName) {
    const idx = boundaryEntries.findIndex(([k]) => k === partKey);
    if (idx === -1) throw new Error(`Unknown partKey: ${partKey}`);
    const startId = boundaryEntries[idx][1];
    const nextId = boundaryEntries[idx + 1]?.[1];
    const nodes = collectSectionNodes(doc, startId, nextId);

    let innerJsx = nodes.map(jsx).join('\n');
    innerJsx = innerJsx.replace(/<div className="table-scroll"[^>]*>(\s*)<div className="table-scroll"/g, '<div className="table-scroll"$1<div');

    if (partKey === 'examprep') {
        const answers = [[1], [1], [2], [1], [1], [0, 1], [1], [0], [1], [1]];
        let question = 0;
        innerJsx = innerJsx.replace(/<p >[\s\S]*?<\/ul>/g, (body) => {
            const correct = JSON.stringify(answers[question++]);
            return `<QuizQuestion number={${question}} correctAnswers={${correct}}>\n${body}\n</QuizQuestion>`;
        });
    }
    const sectionImport = partKey === 'examprep'
        ? 'import QuizQuestion from "../QuizQuestion";'
        : 'import { Diagram } from "../Diagram";';
    const code = `${sectionImport}

/** 原本の ${partKey} セクション本文。 */
export default function ${componentName}() {
    return (
        <section className="guide-part" data-part="${partKey}">
            ${innerJsx}
        </section>
    );
}
`;

    // TypeScript 構文チェック
    const { diagnostics = [] } = ts.transpileModule(code, {
        reportDiagnostics: true,
        compilerOptions: { jsx: ts.JsxEmit.ReactJSX },
    });
    if (diagnostics.length > 0) {
        const messages = diagnostics.map((d) => ts.flattenDiagnosticMessageText(d.messageText, '\n')).join('\n');
        throw new Error(`${componentName} の生成 JSX に構文エラーがあります:\n${messages}`);
    }

    fs.writeFileSync(`${dir}/sections/${componentName}.tsx`, code);
    console.log(`generated ${dir}/sections/${componentName}.tsx (${nodes.length} root elements)`);
}

/** 指定セクションの空雛形を生成する（TDD Red 用）。 */
export function scaffoldEmptySection(partKey, componentName) {
    const filePath = `${dir}/sections/${componentName}.tsx`;
    if (fs.existsSync(filePath)) return;
    const code = `/** 原本の ${partKey} セクション本文雛形。 */
export default function ${componentName}() {
    return (
        <section className="guide-part" data-part="${partKey}">
            {/* TODO: implement ${partKey} */}
        </section>
    );
}
`;
    fs.writeFileSync(filePath, code);
}

// ----------------------------------------------------
// CLI entrypoint
// ----------------------------------------------------
const arg = process.argv[2] ?? 'core';

const SECTIONS = [
    ['herointro', 'HeroIntro'],
    ['task61', 'Task61'],
    ['task62', 'Task62'],
    ['task63', 'Task63'],
    ['summary', 'Summary'],
    ['examprep', 'ExamPrep'],
    ['appendix', 'Appendix'],
];

if (arg === 'core') {
    scaffoldCore();
    for (const [k, name] of SECTIONS) {
        scaffoldEmptySection(k, name);
    }
    console.log('scaffolded core files');
} else if (arg === 'all') {
    scaffoldCore();
    for (const [k, name] of SECTIONS) {
        generateSection(k, name);
    }
    console.log('generated all files');
} else {
    const sec = SECTIONS.find(([k]) => k === arg.toLowerCase());
    if (sec) {
        generateSection(sec[0], sec[1]);
    } else {
        console.error(`Usage: bun scripts/migrate-scs-domain6.mjs <core|all|${SECTIONS.map(([k]) => k).join('|')}>`);
        process.exit(1);
    }
}
