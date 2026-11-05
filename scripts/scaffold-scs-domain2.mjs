import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import { JSDOM } from 'jsdom';
import postcss from 'postcss';
import fixture from '../docs/migration-inventory/aws-scs-c03-domain2-guide.fidelity.json' with { type: 'json' };
import { FIDELITY_PAGES } from './archive-fidelity-config.mjs';

const dir = 'app/aws/security-specialty/domain2';
fs.mkdirSync(dir + '/sections', { recursive: true });

// 原本は fidelity 設定を単一の正本とし、作業ツリーではなく固定Gitリビジョンから読む（migrate-scs-domain2.mjs と同じ方式）
const config = FIDELITY_PAGES['aws-scs-c03-domain2-guide'];
const html = execFileSync('git', ['show', `${config.sourceCommit}:${config.source}`], {
    encoding: 'utf8',
    maxBuffer: 8 * 1024 * 1024,
});
const doc = new JSDOM(html).window.document;

// 1. constants.ts
const diagrams = [...doc.querySelectorAll('pre.mermaid')];
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

const navItems = fixture.guideDesign.nav;

const constantsContent = `export type DiagramId = keyof typeof DIAGRAMS;

export const DIAGRAMS = ${JSON.stringify(diagramCharts, null, 4)} as const satisfies Record<string, string>;

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
import { DIAGRAMS, type DiagramId } from './constants';

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

const descriptions: Record<DiagramId, string> = {
    'diag-0': 'Task 2.1 備える と Task 2.2 対応する の各スキル構成と、自動修復と封じ込め、事前構成とログ保全の連動関係を表すサービス地図。',
    'diag-1': '準備から検出、分析、封じ込め・根絶・復旧、そして事後対応に至るインシデントレスポンスのライフサイクルフロー。',
    'diag-2': 'ワークロードアカウント群がログアーカイブアカウントへログを配信し、検出結果をセキュリティツールアカウントへ集約する。セキュリティツールアカウントは EventBridge で自動修復（Lambda と Step Functions）を起動し、自動修復がワークロードを封じ込めて証拠をフォレンジックアカウントへコピーし、セキュリティツールアカウントからフォレンジックアカウントで調査する IR 向けマルチアカウント構成。',
    'diag-3': 'GuardDuty の Finding や CloudWatch アラームから EventBridge ルールで OpsCenter に OpsItem を作成し、関連リソースと類似 OpsItem を確認して Automation ランブックを選択する。承認が必要なら担当者が承認してから、不要ならそのままランブックを実行し、結果を OpsItem に記録して解決するフロー。',
    'diag-4': '2.1.2 の備えとして、アクセスを事前に用意（調査用ロールと封じ込め用ロール）、セキュリティツールを有効化（GuardDuty、Security Hub、Detective、CloudTrail）、被害範囲を小さく設計（アカウント分離、SCP、最小権限）、DDoS 保護を設定（Shield Advanced と WAF）の 4 つ。',
    'diag-5': 'Shield Advanced の購読、保護対象リソースの追加、WAF の Web ACL の関連付け、アプリケーション層の自動緩和の有効化、Route 53 ヘルスチェックによるヘルスベース検出、SRT のアクセス許可ロールの設定、プロアクティブエンゲージメントの連絡先登録、CloudWatch による DDoS 検出の通知へと順に進む設定フロー。',
    'diag-6': '定常状態の定義から仮説の立案、FIS実験の実行、CloudWatchアラームによる停止条件の監視と実験結果の分析フロー。',
    'diag-7': '耐障害性ポリシーの定義からアプリケーション評価、復旧ギャップの特定と修正、テスト実施のResilience Hubサイクル。',
    'diag-8': 'GuardDuty・Config・Inspector の検出結果を Security Hub に集約し、EventBridge ルールから Lambda、Step Functions、Systems Manager Automation を起動して封じ込めなどのアクションを実行し、通知・OpsCenter・記録で締めくくる自動修復の流れ。',
    'diag-9': 'Config と GuardDuty が検出した不審な挙動を Security Hub に集約し、EventBridge がワークフローを起動して DynamoDB にトリアージ情報を保存する。続いて Step Functions のメモリ取得フローがメモリを S3 に保存してから SG で隔離し、ディスク取得フローが EBS スナップショットをフォレンジックアカウントに共有する。両フローの完了後にフォレンジック AMI で分析用 EC2 を起動し、SSM ドキュメントでディスクとメモリを分析して、SNS で通知し AppSync でタイムラインを照会するフォレンジック自動化フロー。',
    'diag-10': '2.2.1 ログ保全から 2.2.2 ログ検索、2.2.3 検出結果検証、2.2.4 封じ込め・復旧、2.2.5 根本原因分析に至る対応フェーズの流れ。',
    'diag-11': '不審な EC2 を特定してメタデータを記録し、終了保護とタグを設定する。次に EBS スナップショットとメモリイメージを順に取得してからセキュリティグループで隔離する。その後スナップショットを暗号化してフォレンジックアカウントへ共有し、ハッシュを記録して証拠を保管し、分析用インスタンスにボリュームをアタッチして調査する証拠保全の手順。',
    'diag-12': 'GuardDuty の検出結果を起点に主体（アクセスキーかロールか）を特定し、CloudTrail で主体の全操作を時系列に確認して送信元 IP を洗い出す。同じ IP の他の操作と他リソースへのアクセスを確認し、VPC Flow Logs と DNS ログで通信先、OS ログや SSM ログで実行コマンド、Config で設定変更の履歴を確認して、時系列のタイムラインにまとめる分析の流れ。',
    'diag-13': '検出結果を受領して重大度と対象リソースを確認し、想定内の活動かを判定する。想定内（例: IP が自社の拠点）なら誤検知として記録し抑制ルールを検討する。想定外または不明なら関連ログで裏付けを取り、裏付けがなければ同じく誤検知として記録する。裏付けがあればインシデントとして宣言し、影響範囲を評価して第 4.4 節の封じ込めへ進む検証手順。',
    'diag-14': 'インシデントと判断した後、対象リソースの種類で封じ込めを分岐する。EC2 はメモリとディスクの証拠を取得してから隔離 SG を付与し既存接続と DNS にも注意、IAM アクセスキーはキーを無効化して一時認証情報をトークン発行時刻で拒否、IAM ロールは Revoke active sessions、S3 バケットはパブリックアクセスをブロック、Web への攻撃は WAF で送信元 IP をブロックし、いずれも封じ込めの効果を分析で確認する。',
    'diag-15': '封じ込め完了から根絶（足場と脆弱性の除去）、安全なバックアップと AMI の選択、隔離環境で検証、本番へ復旧、強化した監視の継続へと進み、再発の兆候があれば根絶へ戻る復旧フロー。',
    'diag-16': '高重大度の GuardDuty 検出結果を起点に、Detective の検出結果グループを開いて関与するエンティティ（IAM・IP・EC2）とプロファイル上の平時との差を手動で調べ、最初の不審な活動、侵入経路、管理プロセスの欠陥まで掘り下げて再発防止策を決める根本原因分析の流れ。',
    'diag-17': 'GuardDuty の Finding を検出し、CloudTrail でロールの操作と送信元 IP を検証する。想定外の IP でなければ誤検知として記録し、想定外なら EBS スナップショットとメモリで証拠を保全、ロールのセッション失効と EC2 隔離で封じ込め、触れたリソースとデータの範囲評価、IMDSv2 強制・脆弱性修正・EC2 再作成による根絶、クリーンな AMI と IaC からの復旧、Detective による根本原因分析へ進むシナリオ A の対応フロー。',
};

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
                {descriptions[id]}
            </span>
        </div>
    );
});
`;
fs.writeFileSync(`${dir}/Diagram.tsx`, diagramComponent);

// 4. Checklist.tsx
const checklistComponent = `'use client';
import { useState, type ReactNode } from 'react';

export interface ChecklistItem {
    id: string;
    label: ReactNode;
}

/**
 * チェック項目の完了状態をカード単位で管理し、完了数を表示するチェックリスト。
 * 状態はコンポーネント内のみで保持し、永続化しない。
 */
export function ChecklistCard({
    items,
    title = 'チェックリスト',
}: {
    items: ChecklistItem[];
    title?: string;
}) {
    const [checked, setChecked] = useState<Record<string, boolean>>({});

    const checkedCount = items.filter((item) => checked[item.id]).length;

    const toggle = (id: string) => {
        setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="checklist-card">
            <div className="checklist-header">
                <span className="title">{title}</span>
                <span className="count">{\`\${checkedCount} / \${items.length} 完了\`}</span>
            </div>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <input
                            id={item.id}
                            type="checkbox"
                            checked={Boolean(checked[item.id])}
                            onChange={() => toggle(item.id)}
                        />
                        <label htmlFor={item.id}>{item.label}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
}
`;
fs.writeFileSync(`${dir}/Checklist.tsx`, checklistComponent);

// 5. NavBar.tsx
const navBarComponent = `'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { NAV_ITEMS } from './constants';

const DEFAULT_ID = NAV_ITEMS[0]?.id ?? '0-この資料の使い方と試験情報';

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
                    <h2>Domain 2: Incident Response</h2>
                </div>
                <nav id="sidebarNav" aria-label="SCS-C03 Domain 2 目次">
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

// 6. page.css
const rawCss = doc.querySelector('style').textContent;
const cssAst = postcss.parse(rawCss);

// :root の処理
const rootNode = cssAst.nodes.find((n) => n.type === 'rule' && n.selector === ':root');
if (rootNode) rootNode.remove();

cssAst.walkRules((r) => {
    r.selector = r.selector
        .split(',')
        .map((s) => {
            const trimmed = s.trim();
            if (['html', 'body'].includes(trimmed)) return '.scs-domain2-page';
            return (
                '.scs-domain2-page ' +
                trimmed
                    .replaceAll('pre.mermaid', '.mermaid-wrap')
                    .replaceAll('.code-block', '.code-sample')
                    .replaceAll('pre', '.code-block')
                    .replaceAll('.main > h2:first-of-type', '.main > .guide-part:first-child > h2:first-of-type')
            );
        })
        .join(', ');
});

// 原本の生 hex（構文ハイライト以外）は @theme の --color-scs-d2-* へ置換する（解決値は不変）
const hexTokens = {
    '#fbfcfe': 'sidebar-bg',
    '#1b2740': 'text',
    '#3557d6': 'accent',
    '#0e1830': 'strong',
    '#a24a00': 'code-inline',
    '#9fd9b8': 'success-border',
    '#ffffff': 'on-accent',
    '#f0cf94': 'warn-border',
    '#f3f6fc': 'code-bg',
};
// 原本の success (#14804a) は success-bg 上で AA 未満のため、既存の濃い success 文字色へ補正する
const successLabelSelectors = ['.scs-domain2-page .callout-practice .label', '.scs-domain2-page .practice-label'];

cssAst.walkDecls((d) => {
    if (!d.parent?.selector?.includes('.hljs')) {
        d.value = d.value.replace(/#[0-9a-fA-F]{6}\b/g, (hex) => {
            const token = hexTokens[hex.toLowerCase()];
            if (!token) throw new Error(`未登録の hex 色: ${hex} (${d.parent?.selector})`);
            // 直後の var(--*) 変換で --color-scs-d2- 接頭辞が付く
            return `var(--${token})`;
        });
    }
    if (d.prop === 'color' && d.value === 'var(--success)' && successLabelSelectors.includes(d.parent?.selector)) {
        d.value = 'var(--color-aip-d1-success-text)';
        return;
    }
    d.value = d.value.replace(/var\(--([\w-]+)\)/g, (_, k) => {
        if (k === 'sidebar-w') return '280px';
        if (k === 'font-jp') return 'var(--font-body)';
        return `var(--color-scs-d2-${k})`;
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
});

// NavBar は aria-current="location" で現在地を示すため、.active と同じ宣言を付与する
cssAst.walkRules('.scs-domain2-page .sidebar nav a.active', (r) => {
    r.cloneAfter({ selector: ".scs-domain2-page .sidebar nav a[aria-current='location']" });
});

// サイドバーのレイアウト調整
cssAst.walkRules('.scs-domain2-page .main', (r) => {
    if (r.parent.type === 'atrule') {
        r.append({ prop: 'width', value: '100%' }, { prop: 'max-width', value: 'none' });
    } else {
        r.append(
            { prop: 'width', value: 'calc(100% - 280px)' },
            { prop: 'max-width', value: 'none' },
            { prop: 'box-sizing', value: 'border-box' },
        );
    }
});

const pageCss =
    cssAst.toString() +
    `
.scs-domain2-page {
    overflow-x: clip;
    color-scheme: light;
}

.scs-domain2-page .main ul {
    list-style-type: disc;
}

.scs-domain2-page .main ol {
    list-style-type: decimal;
}

.scs-domain2-page .main ul ul {
    list-style-type: circle;
}

.scs-domain2-page .main ul ul ul {
    list-style-type: square;
}

.scs-domain2-page .main .checklist-card ul {
    list-style: none;
    padding: 0;
}

.scs-domain2-page nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.scs-domain2-page .sidebar {
    position: fixed;
    top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px));
    left: 0;
    bottom: 0;
    width: 280px;
    z-index: 38;
}

.scs-domain2-page .sidebar-toggle {
    top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 14px);
    z-index: 39;
}

@media (max-width: 980px) {
    .scs-domain2-page .sidebar:not(.open) {
        visibility: hidden;
        transition: transform 0.25s, visibility 0s linear 0.25s;
    }
}

.scs-domain2-page .main h2,
.scs-domain2-page .main h3 {
    scroll-margin-top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 24px);
}

.scs-domain2-page .main {
    min-width: 0;
}

.scs-domain2-page .mermaid-wrap > [role="img"] {
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    width: 100%;
}

.scs-domain2-page .mermaid-wrap svg {
    flex-shrink: 0;
    max-width: none;
    height: auto;
}

.scs-domain2-page .code-line {
    white-space: pre;
    min-height: 1.7em;
}

.scs-domain2-page .main .callout-practice p {
    margin: 0;
}

.scs-domain2-page .sidebar-header h2 {
    font-weight: 700;
}

.scs-domain2-page .checklist-card input[type='checkbox']:not(:checked) {
    border-color: var(--color-scs-d2-border);
}

.scs-domain2-page .checklist-card li:has(input:checked) label {
    color: var(--color-scs-d2-text-dim);
}
`;

fs.writeFileSync(`${dir}/page.css`, pageCss);

// 7. ScsDomain2Guide.tsx
const guideComponent = `import NavBar from './NavBar';
import Hero from './sections/Hero';
import Task21 from './sections/Task21';
import Task22 from './sections/Task22';
import Scenarios from './sections/Scenarios';
import ExamPrep from './sections/ExamPrep';
import ChecklistSection from './sections/ChecklistSection';
import Appendix from './sections/Appendix';

/** SCS-C03 Domain 2 (Incident Response) 学習ガイドの全セクション構成 */
export default function ScsDomain2Guide() {
    return (
        <div className="scs-domain2-page layout">
            <NavBar />
            <main className="main">
                <Hero />
                <Task21 />
                <Task22 />
                <Scenarios />
                <ExamPrep />
                <ChecklistSection />
                <Appendix />
            </main>
        </div>
    );
}
`;
fs.writeFileSync(`${dir}/ScsDomain2Guide.tsx`, guideComponent);

// 8. page.tsx
const pageComponent = `import type { Metadata } from 'next';
import ScsDomain2Guide from './ScsDomain2Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'AWS Certified Security - Specialty (SCS-C03) Content Domain 2: Incident Response 初学者向けステップバイステップガイド',
    description:
        'AWS Certified Security - Specialty (SCS-C03) Content Domain 2: Incident Response の完全ガイド。インシデント対応計画・テスト、セキュリティイベント対応、実践シナリオ3本、Mermaid図18点、表68点、練習問題10問を体系的に解説。',
};

export default function Page() {
    return <ScsDomain2Guide />;
}
`;
fs.writeFileSync(`${dir}/page.tsx`, pageComponent);

// 9. 空の sections ファイル群
const sections = ['Hero', 'Task21', 'Task22', 'Scenarios', 'ExamPrep', 'ChecklistSection', 'Appendix'];
for (const sec of sections) {
    const file = `${dir}/sections/${sec}.tsx`;
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, `export default function ${sec}() { return <section className="guide-part" data-part="${sec.toLowerCase()}"></section>; }\n`);
    }
}
console.log('Scaffold complete!');
