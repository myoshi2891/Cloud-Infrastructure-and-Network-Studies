import fs from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import postcss from 'postcss';
import { SOURCE, PARTS } from './iso-iec-22123-profile.mjs';

const phase = process.argv[2];
if (!phase || !['assets', ...Object.keys(PARTS)].includes(phase)) {
    console.error('Usage: bun scripts/migrate-iso-iec-22123.mjs assets|' + Object.keys(PARTS).join('|'));
    process.exit(1);
}
const root = fileURLToPath(new URL('../', import.meta.url));
const primary = resolve(root, SOURCE);
const html = fs.readFileSync(fs.existsSync(primary) ? primary : resolve(root, 'archive/Standards/html/iso-iec-22123-1-2023', SOURCE), 'utf8');
const doc = new JSDOM(html).window.document;
const main = doc.querySelector('main');
if (!main || main.children.length !== 165 || doc.querySelectorAll('.mermaid-diagram svg').length !== 15) throw new Error('原本の165要素・15 SVGが一致しません。生成を中止します。');
const output = resolve(root, 'app/standards/iso-iec-22123-1-2023');

/** 出力先ディレクトリを作り、リポジトリ基準で生成物を書き出す。 */
function write(name, value) { const path = resolve(output, name); fs.mkdirSync(dirname(path), { recursive: true }); fs.writeFileSync(path, value); }
/** HTML/SVGのハイフン属性・styleプロパティをReactの名称へ写す。 */
function camel(name) { return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase()); }
/** 原本DOMを、テキスト・SVG属性・style・表セルを保持したJSXに変換する。 */
function jsx(node) {
    if (node.nodeType === 3) {
        if (['TABLE', 'THEAD', 'TBODY', 'TR'].includes(node.parentElement?.tagName) && !node.textContent.trim()) return '';
        return '{' + JSON.stringify(node.textContent) + '}';
    }
    if (node.nodeType !== 1) return '';
    if (node.classList.contains('checklist-card')) {
        const labels = [...node.querySelectorAll('label')].map(label => '<>' + [...label.childNodes].filter(n => n.nodeName !== 'INPUT').map(jsx).join('') + '</>');
        return `<Checklist labels={[${labels.join(',')}]} />`;
    }
    const tag = node.localName;
    const attributes = [];
    for (const { name, value } of node.attributes) {
        if (name === 'style') {
            const style = Object.fromEntries(Array.from({ length: node.style.length }, (_, i) => node.style.item(i)).map(key => [camel(key), node.style.getPropertyValue(key)]));
            attributes.push('style={' + JSON.stringify(style) + '}');
        } else if (name === 'xmlns' && tag === 'div') {
            attributes.push('{...'+JSON.stringify({ xmlns: value })+'}');
        } else {
            const key = { class: 'className', for: 'htmlFor', tabindex: 'tabIndex', colspan: 'colSpan', rowspan: 'rowSpan', 'xlink:href': 'xlinkHref', 'xmlns:xlink': 'xmlnsXlink' }[name] ?? (name.startsWith('data-') || name.startsWith('aria-') ? name : camel(name));
            attributes.push(key + '={' + JSON.stringify(value) + '}');
        }
    }
    if (tag === 'th' && !node.hasAttribute('scope')) attributes.push('scope="col"');
    if (tag === 'table') attributes.push(`aria-label={${JSON.stringify('用語・比較表 ' + ([...main.querySelectorAll('table')].indexOf(node) + 1))}}`);
    const attrs = attributes.length ? ' ' + attributes.join(' ') : '';
    if (['br', 'hr', 'img', 'input', 'wbr'].includes(tag)) return `<${tag}${attrs} />`;
    const content = [...node.childNodes].map(jsx).join('') + (['th', 'td'].includes(tag) ? '{" "}' : '');
    return `<${tag}${attrs}>${content}</${tag}>`;
}

if (phase === 'assets') {
    const css = postcss.parse(doc.querySelector('head style').textContent);
    const tokens = {};
    css.walkRules(rule => {
        if (rule.selector !== ':root') return;
        rule.walkDecls(decl => { if (decl.prop !== '--sidebar') tokens['--color-iso-22123-' + decl.prop.slice(2)] = decl.value; });
        rule.remove();
    });
    css.walkDecls(decl => {
        decl.value = decl.value.replace(/var\(--sidebar\)/g, '280px').replace(/var\(--([\w-]+)\)/g, (_all, key) => `var(--color-iso-22123-${key})`)
            .replace(/#[0-9a-fA-F]{3,8}\b/g, color => { const key = '--color-iso-22123-hex-' + color.slice(1).toLowerCase(); tokens[key] = color; return `var(${key})`; })
            .replace(/"Noto Sans JP"/g, 'var(--font-body)').replace(/"JetBrains Mono"/g, 'var(--font-mono)');
    });
    css.walkRules(rule => { rule.selectors = rule.selectors.map(s => ['html', 'body'].includes(s) ? '.iso-22123-page' : '.iso-22123-page ' + s); });
    write('page.css', css.toString() + `\n/* サイト共通Headerと免責事項、280px目次、Tailwindのリセットへ対応 */
.iso-22123-page .main { width: calc(100% - 280px); max-width: none; }
.iso-22123-page .sidebar { top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px)); }
.iso-22123-page .toggle { top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 12px); }
.iso-22123-page .main h2, .iso-22123-page .main h3 { scroll-margin-top: calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 20px); }
.iso-22123-page .main ul:not(.checklist) { list-style-type: disc; }
.iso-22123-page .main ol { list-style-type: decimal; }
@media (max-width:960px) {
 .iso-22123-page .main { width: 100%; }
 .iso-22123-page .sidebar { visibility: hidden; transition: transform .25s, visibility 0s .25s; }
 .iso-22123-page .sidebar.open { visibility: visible; transition-delay: 0s; }
}
`);
    write('theme-tokens.json', JSON.stringify(tokens, null, 2) + '\n');
    write('constants.ts', '/** 原本の18項目の目次。監視対象もこの配列から導出する。 */\nexport const NAV_ITEMS = ' + JSON.stringify([...doc.querySelectorAll('.sidebar a')].map(a => ({ id: a.hash.slice(1), text: a.textContent.replace(/\s+/g, ' ').trim() })), null, 2) + ' as const;\n');
} else {
    const groups = Object.fromEntries(Object.keys(PARTS).map(name => [name, []]));
    let name = Object.keys(PARTS)[0];
    for (const node of main.childNodes) {
        const next = Object.entries(PARTS).find(([, id]) => id && node.nodeType === 1 && node.id === id);
        if (next) name = next[0];
        groups[name].push(node);
    }
    const body = groups[phase].map(jsx).join('\n');
    write(`sections/${phase}.tsx`, `${phase === 'Appendix' ? "import Checklist from '../Checklist';\n" : ''}/** 原本の${phase}ブロック。本文と描画済みSVGをサーバーで描画する。 */\nexport default function ${phase}() { return <>\n${body}\n</>; }\n`);
}
console.log('Generated ISO 22123 phase: ' + phase);
