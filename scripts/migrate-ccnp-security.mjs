import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { JSDOM } from 'jsdom';
import archive from '../docs/migration-inventory/cisco-ccnp-security.archive.json' with { type: 'json' };

// 原本は直下またはGit管理外のローカルarchiveにのみ存在する。クリーンなcloneでは実行前に archive へ原本を配置すること。
const htmlPath = fs.existsSync('Ccnp-security-guide.html')
    ? 'Ccnp-security-guide.html'
    : 'archive/Cisco/html/ccnp-security/Ccnp-security-guide.html';
// 記録済みダイジェストと同じ基準にするため、デコード前の原本バイト列でハッシュを取る
const htmlBytes = fs.readFileSync(htmlPath);
const actualSha256 = createHash('sha256').update(htmlBytes).digest('hex');
if (actualSha256 !== archive.html.sha256) {
    console.error(`原本の SHA-256 が記録値と一致しません。生成を中止します。\n  file: ${htmlPath}\n  expected: ${archive.html.sha256}\n  actual:   ${actualSha256}`);
    process.exit(1);
}
const html = htmlBytes.toString('utf8');
const doc = new JSDOM(html).window.document;
const main = doc.querySelector('main');
const children = [...main.children];

const boundaries = [
    { name: 'hero-intro', start: 0, end: 5, file: 'HeroIntro.tsx', component: 'HeroIntro' },
    { name: 'partA', start: 5, end: 16, file: 'PartA.tsx', component: 'PartA' },
    { name: 'partB', start: 16, end: 25, file: 'PartB.tsx', component: 'PartB' },
    { name: 'partC', start: 25, end: 37, file: 'PartC.tsx', component: 'PartC' },
    { name: 'partD', start: 37, end: 47, file: 'PartD.tsx', component: 'PartD' },
    { name: 'partE', start: 47, end: 56, file: 'PartE.tsx', component: 'PartE' },
    { name: 'appendix', start: 56, end: children.length, file: 'Appendix.tsx', component: 'Appendix' },
];

const targetPhase = process.argv[2];
if (targetPhase && targetPhase !== 'all' && targetPhase !== 'navbar' && !boundaries.some(b => b.name === targetPhase)) {
    console.error('Specify one of: all, navbar, ' + boundaries.map(b => b.name).join(', '));
    process.exit(1);
}

/**
 * 円グラフの原本 DSL から title 行を取り出し、末尾の「(%)」を除いた短い図名を返す。
 * 円グラフ以外、または title が無い場合は undefined。
 */
function pieChartTitle(id) {
    const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = html.match(new RegExp(`\\b${escapedId}: \`pie[^\`\\n]*\\n\\s*title\\s+([^\\n\`]+)`));
    return match?.[1]?.replace(/\s*\(%\)\s*$/, '').trim() || undefined;
}

function renderStringWithSubst(str) {
    if (!str.startsWith('f"') && !str.startsWith("f'")) {
        return `<span className="hljs-string">{${JSON.stringify(str)}}</span>`;
    }
    const parts = [];
    let end = 0;
    for (const m of str.matchAll(/\{[^}]+\}/g)) {
        if (m.index > end) {
            parts.push('{' + JSON.stringify(str.slice(end, m.index)) + '}');
        }
        parts.push(`<span className="hljs-subst">{${JSON.stringify(m[0])}}</span>`);
        end = m.index + m[0].length;
    }
    if (end < str.length) {
        parts.push('{' + JSON.stringify(str.slice(end)) + '}');
    }
    return `<span className="hljs-string">${parts.join('')}</span>`;
}

function tokensPython(line) {
    const regex = /#.*$|f?"(?:\\.|[^"\\])*"|f?'(?:\\.|[^'\\])*'|\b(?:import|from|def|class|return|if|else|elif|try|except|with|as|for|in|while|pass|raise|True|False|None)\b|\b(?:print)\b|\b(?:\d+)\b/g;
    let out = '';
    let end = 0;
    for (const m of line.matchAll(regex)) {
        if (m.index > end) {
            out += '{' + JSON.stringify(line.slice(end, m.index)) + '}';
        }
        const text = m[0];
        if (text.startsWith('#')) {
            out += `<span className="hljs-comment">{${JSON.stringify(text)}}</span>`;
        } else if (text.startsWith('"') || text.startsWith("'") || text.startsWith('f"') || text.startsWith("f'")) {
            out += renderStringWithSubst(text);
        } else if (/^\d+$/.test(text)) {
            out += `<span className="hljs-number">{${JSON.stringify(text)}}</span>`;
        } else if (text === 'print') {
            out += `<span className="hljs-built_in">{${JSON.stringify(text)}}</span>`;
        } else {
            out += `<span className="hljs-keyword">{${JSON.stringify(text)}}</span>`;
        }
        end = m.index + text.length;
    }
    if (end < line.length) {
        out += '{' + JSON.stringify(line.slice(end)) + '}';
    }
    return out;
}

function plainCodeLineToJsx(lineHtml) {
    const frag = JSDOM.fragment(`<div>${lineHtml}</div>`).firstChild;
    return [...frag.childNodes].map(nodeToJsx).join('');
}

function nodeToJsx(node) {
    if (node.nodeType === 3) {
        // テキストノード
        if (['TABLE', 'THEAD', 'TBODY', 'TR'].includes(node.parentElement?.tagName) && !node.textContent.trim()) {
            return '';
        }
        return '{' + JSON.stringify(node.textContent) + '}';
    }
    if (node.nodeType !== 1) return '';

    // Mermaid Diagram
    if (node.classList?.contains('diagram')) {
        const mm = node.querySelector('.mm[data-k]');
        const id = mm ? mm.getAttribute('data-k') : '';
        let prev = node.previousElementSibling;
        while (prev && !prev.matches('h1, h2, h3, h4, header, .part-lead')) {
            prev = prev.previousElementSibling;
        }
        // 円グラフは直前の part-lead（長い導入文）ではなく、図自身の title を読み上げ名にする
        const labelText = pieChartTitle(id)
            ?? (prev ? (prev.textContent || '').replace(/\s+/g, ' ').trim() : `図解 ${id}`);
        return `<Diagram id="${id}" label={${JSON.stringify(labelText)}} />`;
    }

    // Code Block (pre)
    if (node.tagName === 'PRE') {
        const code = node.querySelector('code');
        const lang = code?.className || 'plain';
        if (lang === 'language-python') {
            const rawText = code ? code.textContent : node.textContent;
            const lines = (rawText || '').replace(/^\n|\n$/g, '').split('\n');
            return (
                `<div className="code-sample">` +
                `<div className="code-block" tabIndex={0} role="region" aria-label="${lang} コード例">` +
                lines.map(line => `<div className="code-line">${tokensPython(line)}</div>`).join('') +
                `</div></div>`
            );
        }
        const rawHtml = code ? code.innerHTML : node.innerHTML;
        const htmlLines = (rawHtml || '').replace(/^\r?\n|\r?\n$/g, '').split(/\r?\n/);
        return (
            `<div className="code-sample">` +
            `<div className="code-block" tabIndex={0} role="region" aria-label="${lang} コード例">` +
            htmlLines.map(lineHtml => `<div className="code-line">${plainCodeLineToJsx(lineHtml)}</div>`).join('') +
            `</div></div>`
        );
    }

    // Table 構造の正規化: thead の保証
    if (node.tagName === 'TABLE') {
        let thead = node.querySelector('thead');
        let tbody = node.querySelector('tbody');
        const rows = [...node.querySelectorAll('tr')];

        let headContent = '';
        let bodyContent = '';

        if (thead) {
            headContent = [...thead.childNodes].map(nodeToJsx).join('');
        } else if (rows.length > 0 && rows[0].querySelector('th')) {
            // 先頭行に th があればそれを thead にする
            const firstRow = rows[0];
            const ths = [...firstRow.querySelectorAll('th')];
            headContent = `<tr>${ths.map(th => {
                const attrs = [];
                attrs.push('scope="col"');
                if (th.getAttribute('colspan')) attrs.push(`colSpan={${th.getAttribute('colspan')}}`);
                if (th.getAttribute('rowspan')) attrs.push(`rowSpan={${th.getAttribute('rowspan')}}`);
                return `<th ${attrs.join(' ')}>${[...th.childNodes].map(nodeToJsx).join('')}</th>`;
            }).join('')}</tr>`;
        }

        const bodyRows = rows.filter(r => !r.parentElement?.matches('thead') && (thead || r !== rows[0] || !r.querySelector('th')));
        bodyContent = bodyRows.map(r => {
            const cells = [...r.children].map(c => {
                const tag = c.tagName.toLowerCase();
                const attrs = [];
                if (tag === 'th') attrs.push('scope="col"');
                if (c.getAttribute('colspan')) attrs.push(`colSpan={${c.getAttribute('colspan')}}`);
                if (c.getAttribute('rowspan')) attrs.push(`rowSpan={${c.getAttribute('rowspan')}}`);
                return `<${tag}${attrs.length ? ' ' + attrs.join(' ') : ''}>${[...c.childNodes].map(nodeToJsx).join('')}</${tag}>`;
            }).join('');
            return `<tr>${cells}</tr>`;
        }).join('');

        return `<table><thead>${headContent}</thead><tbody>${bodyContent}</tbody></table>`;
    }

    // 通常要素
    const tag = node.tagName.toLowerCase();
    const attrs = [];

    // th には常に scope="col" を付与
    if (tag === 'th') {
        attrs.push('scope="col"');
    }

    // colspan, rowspan
    if (node.getAttribute('colspan')) {
        attrs.push(`colSpan={${node.getAttribute('colspan')}}`);
    }
    if (node.getAttribute('rowspan')) {
        attrs.push(`rowSpan={${node.getAttribute('rowspan')}}`);
    }

    // class -> className
    if (node.getAttribute('class')) {
        attrs.push(`className="${node.getAttribute('class')}"`);
    }

    // id
    if (node.getAttribute('id')) {
        attrs.push(`id="${node.getAttribute('id')}"`);
    }

    // href, target, rel
    if (node.getAttribute('href')) {
        const href = node.getAttribute('href');
        attrs.push(`href="${href}"`);
        if (href.startsWith('#') && node.closest('aside.sidebar')) {
            attrs.push(`onClick={() => handleLinkClick(${JSON.stringify(href)})}`);
        }
    }
    if (node.getAttribute('target')) {
        attrs.push(`target="${node.getAttribute('target')}"`);
    }
    if (node.getAttribute('rel')) {
        attrs.push(`rel="${node.getAttribute('rel')}"`);
    }

    // aria-*
    for (const attr of node.attributes) {
        if (attr.name.startsWith('aria-')) {
            attrs.push(`${attr.name}="${attr.value}"`);
        }
    }

    // SVG 属性
    if (['svg', 'path'].includes(tag)) {
        for (const attr of node.attributes) {
            if (['width', 'height', 'viewBox', 'd', 'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin'].includes(attr.name)) {
                let name = attr.name;
                if (name === 'stroke-width') name = 'strokeWidth';
                if (name === 'stroke-linecap') name = 'strokeLinecap';
                if (name === 'stroke-linejoin') name = 'strokeLinejoin';
                attrs.push(`${name}="${attr.value}"`);
            }
        }
    }

    const attrStr = attrs.length > 0 ? ' ' + attrs.join(' ') : '';
    const inner = [...node.childNodes].map(nodeToJsx).join('');
    return `<${tag}${attrStr}>${inner}</${tag}>`;
}

function generateSection(b) {
    const slice = children.slice(b.start, b.end);
    const jsxContent = slice.map(nodeToJsx).join('\n');

    const fileContent = `import { Diagram } from '../Diagram';

/**
 * ${b.name} セクションコンポーネント
 */
export default function ${b.component}() {
    return (
        <>
${jsxContent}
        </>
    );
}
`;

    const outPath = `app/cisco/ccnp-security/sections/${b.file}`;
    fs.mkdirSync('app/cisco/ccnp-security/sections', { recursive: true });
    fs.writeFileSync(outPath, fileContent, 'utf8');
    console.log(`Generated ${outPath} (${b.name}: ${b.start}..${b.end})`);
}

function generateNavBar() {
    const content = `'use client';

import { Fragment, useEffect, useCallback } from 'react';
import { NAV_GROUPS } from './constants';

interface NavBarProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * CCNP Security ガイド用のサイドバー目次コンポーネント。
 * 目次は constants.ts の NAV_GROUPS から描画し、ScrollSpy・キーボードフォーカス連動・モバイル開閉制御を提供します。
 */
export function NavBar({ isOpen: _isOpen, onClose }: NavBarProps) {
    const handleLinkClick = useCallback((href: string) => {
        onClose();
        if (href.startsWith('#')) {
            const targetId = href.slice(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.tabIndex = -1;
                targetEl.focus();
            }
        }
    }, [onClose]);

    useEffect(() => {
        if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        const itemOf = new Map<string, HTMLElement>();
        sidebar.querySelectorAll('a[href^="#"]').forEach((a) => {
            const li = a.closest('li');
            const href = a.getAttribute('href');
            if (li && href) {
                itemOf.set(href.slice(1), li as HTMLElement);
            }
        });

        const visible = new Set<Element>();
        const update = () => {
            if (!visible.size) return;
            const arr = Array.from(visible).sort((a, b) => {
                return (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1;
            });
            const last = arr[arr.length - 1];
            sidebar.querySelectorAll('li.active').forEach((l) => { l.classList.remove('active'); });
            const li = last ? itemOf.get(last.id) : undefined;
            if (!li) return;
            li.classList.add('active');
            const parent = li.parentElement && li.parentElement.closest('li');
            if (parent) parent.classList.add('active');
            const a = li.querySelector('a');
            if (a && typeof a.scrollIntoView === 'function') {
                a.scrollIntoView({ block: 'nearest' });
            }
        };

        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) visible.add(e.target);
                else visible.delete(e.target);
            });
            update();
        }, { rootMargin: '-20% 0px -70% 0px' });

        document.querySelectorAll('section[id]').forEach((s) => { io.observe(s); });

        return () => {
            io.disconnect();
        };
    }, []);

    // 原本の目次は項目間に空白テキストを持つため、{" "} で区切りを保持する（本文 fixture の annotation と一致させる）
    return (
        <aside className="sidebar" id="sidebar">
            <div className="brand">
                <svg aria-hidden="true" width="40" height="40" viewBox="0 0 40 40"><path d="M20 3 L35 9 V20 C35 28 28.500 34 20 37 C11.500 34 5 28 5 20 V9 Z" fill="#EEF1F8" stroke="#2E3F72" strokeWidth="2"></path><path d="M13 20 L18 25 L27 15" fill="none" stroke="#B8802A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                <b>{"CCNP Security"}<br />{"学習ガイド"}</b>
            </div>{" "}
            <nav aria-label="CCNP Security 学習ガイド 目次">
                {NAV_GROUPS.map((group) => {
                    const groupHref = group.href;
                    return (
                        <Fragment key={groupHref ?? group.title}>
                            {groupHref ? (
                                <><div className="nav-group"><a href={groupHref} onClick={() => handleLinkClick(groupHref)}>{group.title}</a></div>{" "}</>
                            ) : (
                                <><div className="nav-group nav-plain">{group.title}</div>{" "}</>
                            )}
                            <ul>
                                {group.items.map((item) => (
                                    <li key={item.href}>
                                        <a href={item.href} onClick={() => handleLinkClick(item.href)}>{item.title}</a>{" "}
                                        {item.subItems ? (
                                            <ul className="sub">
                                                {item.subItems.map((sub) => (
                                                    <li key={sub.href}><a href={sub.href} onClick={() => handleLinkClick(sub.href)}>{sub.title}</a>{" "}</li>
                                                ))}
                                            </ul>
                                        ) : null}
                                    </li>
                                ))}
                            </ul>
                        </Fragment>
                    );
                })}
            </nav>
        </aside>
    );
}
`;

    fs.writeFileSync('app/cisco/ccnp-security/NavBar.tsx', content, 'utf8');
    console.log('Generated app/cisco/ccnp-security/NavBar.tsx');
}

const targets = targetPhase && targetPhase !== 'all'
    ? boundaries.filter(b => b.name === targetPhase)
    : boundaries;

for (const b of targets) {
    generateSection(b);
}

if (!targetPhase || targetPhase === 'all' || targetPhase === 'navbar') {
    generateNavBar();
}
