import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import postcss from 'postcss';
const SOURCE = 'Iso-iec-22123-3-2023-guide.html';
const fixture = JSON.parse(fs.readFileSync(new URL('../docs/migration-inventory/iso-iec-22123-3-2023.fidelity.json', import.meta.url), 'utf8'));
const PARTS = Object.fromEntries(Object.entries(fixture.parts).map(([key, part]) => [key, part.headings[0]?.id ?? '']));

const phase = process.argv[2];
if (!phase || !['assets', ...Object.keys(PARTS)].includes(phase)) {
    console.error('Usage: bun scripts/migrate-iso-iec-22123-3.mjs assets|' + Object.keys(PARTS).join('|'));
    process.exit(1);
}
const root = fileURLToPath(new URL('../', import.meta.url));
const candidates = [resolve(root, SOURCE), resolve(root, 'archive/Standards/html/iso-iec-22123-3-2023', SOURCE)];
const sourcePath = candidates.find(path => fs.existsSync(path));
if (!sourcePath) throw new Error('原本HTMLが見つかりません。確認した場所: ' + candidates.join(', '));
const html = fs.readFileSync(sourcePath, 'utf8');
if (createHash('sha256').update(html).digest('hex') !== fixture.sourceSha256) throw new Error('原本のSHA-256が固定fixtureと一致しません。');
const doc = new JSDOM(html).window.document;
const main = doc.querySelector('main');
if (!main || doc.querySelectorAll('.mermaid-diagram svg').length !== 20) throw new Error('原本のmain要素・20 SVGが一致しません。生成を中止します。');
// 原本でリンクの外へ分離している2件のPDF末尾を、URLとリンク文字列へ戻す。
for (const url of [
    'https://www.vde-verlag.de/iec-normen/preview-pdf/info_isoiec22123-3',
    'https://vde-verlag.de/iec-normen/preview-pdf/info_isoiec17789',
]) {
    const anchor = main.querySelector(`a[href="${url}"]`);
    const suffix = '{ed1.0}en.pdf';
    const trailing = anchor?.nextSibling;
    if (!anchor || trailing?.nodeType !== 3 || !trailing.textContent.startsWith(suffix)) throw new Error('PDFリンク末尾が原本と一致しません: ' + url);
    anchor.setAttribute('href', url + suffix);
    anchor.textContent += suffix;
    trailing.textContent = trailing.textContent.slice(suffix.length);
}
const output = resolve(root, 'app/standards/iso-iec-22123-3-2023');

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
    if (node.localName === 'svg') {
        // Reactのstyleオブジェクトは!importantを保持できないため、固定SVGをそのまま埋め込む。
        // url(#id) 以外の url(...) と @import は外部リソースの読み込みとして扱う。
        const external = text => [...text.matchAll(/url\(\s*['"]?\s*([^)]*)\)/gi)].some(([, target]) => !target.startsWith('#')) || /@import/i.test(text);
        const unsafeAttr = attr => /^on/i.test(attr.name) || /^(?:src|action|formaction)$/i.test(attr.name) || (/^(?:xlink:)?href$/i.test(attr.name) && !attr.value.startsWith('#')) || external(attr.value);
        if (node.querySelector('script,iframe,object,embed') || [node, ...node.querySelectorAll('*')].some(element => [...element.attributes].some(unsafeAttr)) || [...node.querySelectorAll('style')].some(style => external(style.textContent))) {
            throw new Error('実行可能な内容または外部参照を含むSVGは生成できません。');
        }
        return `<OriginalSvg markup={${JSON.stringify(node.outerHTML)}} />`;
    }
    const diagram = node.classList.contains('mermaid-diagram');
    let tag = diagram ? 'section' : node.localName;
    const attributes = [];
    for (const { name, value } of node.attributes) {
        // aria-label付きsectionは暗黙のregionになるため、冗長なroleを出力しない。
        if (diagram && name === 'role') continue;
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
    if (diagram) { attributes.push('tabIndex={0}'); if (!node.hasAttribute('aria-label')) { let heading = node.previousElementSibling; while (heading && !heading.matches('h2,h3,h4')) heading = heading.previousElementSibling; attributes.push('aria-label={' + JSON.stringify((heading?.textContent.replace(/\s+/g, ' ').trim() ?? '概念図') + 'の図解') + '}'); } }
    if (node.matches('h2[id], h3[id], h4[id]')) attributes.push('tabIndex={-1}');
    if (tag === 'th' && !node.hasAttribute('scope')) attributes.push('scope="col"');
    if (tag === 'table') attributes.push(`aria-label={${JSON.stringify('用語・比較表 ' + ([...main.querySelectorAll('table')].indexOf(node) + 1))}}`);
    const attrs = attributes.length ? ' ' + attributes.join(' ') : '';
    if (['br', 'hr', 'img', 'input', 'wbr'].includes(tag)) return `<${tag}${attrs} />`;
    const content = [...node.childNodes].map(jsx).join('') + (['th', 'td'].includes(tag) ? '{" "}' : '');
    const scrollComment = diagram ? '{/* biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard users need focus to scroll the diagram horizontally. */}\n' : '';
    return `${scrollComment}<${tag}${attrs}>${content}</${tag}>`;
}

if (phase === 'assets') {
    const css = postcss.parse(doc.querySelector('head style').textContent);
    const tokens = {};
    css.walkRules(rule => {
        if (rule.selector !== ':root') return;
        rule.walkDecls(d => { if (d.prop !== '--sidebar-w') tokens['--color-iso-22123-3-' + d.prop.slice(2)] = d.value; });
        rule.remove();
    });
    css.walkDecls(d => {
        d.value = d.value.replace(/var\(--sidebar-w\)/g, '280px').replace(/var\(--([\w-]+)\)/g, (_, key) => `var(--color-iso-22123-3-${key})`)
            .replace(/#[0-9a-fA-F]{3,8}\b/g, color => { const key = '--color-iso-22123-3-hex-' + color.slice(1).toLowerCase(); tokens[key] = color; return `var(${key})`; })
            .replace(/rgba\([^)]*\)/g, color => { const key = '--color-iso-22123-3-rgba-' + color.replace(/[^0-9.]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').replace(/\./g, '_'); tokens[key] = color; return `var(${key})`; })
            .replace(/'Noto Sans JP'/g, 'var(--font-body)').replace(/'JetBrains Mono'/g, 'var(--font-mono)');
        if (d.prop === 'word-break' && d.value === 'break-word') { d.prop = 'overflow-wrap'; d.value = 'anywhere'; }
        if (d.prop === 'top' && ['.sidebar', '.nav-toggle'].includes(d.parent.selector)) d.value = `calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + ${d.value === '0' ? '0px' : d.value})`;
        if (d.prop === 'z-index' && ['.sidebar', '.nav-toggle'].includes(d.parent.selector)) d.value = d.parent.selector === '.nav-toggle' ? '41' : '40';
        if (d.prop === 'left' && d.parent.selector === '.nav-toggle') d.prop = 'right';
        if (d.prop === 'max-width' && d.parent.selector === '.mermaid-diagram svg') d.value = 'none';
        if (d.prop === 'scroll-margin-top') d.value = 'calc(var(--header-h, 60px) + var(--disclaimer-height, 0px) + 72px)';
    });
    css.walkRules(rule => { rule.selectors = rule.selectors.map(s => ['html', 'body'].includes(s) ? '.iso-22123-3-page' : '.iso-22123-3-page ' + s); });
    write('page.css', css.toString() + `
/* Tailwind reset後も原本の点・番号・開閉マーカーを保持する。 */
.iso-22123-3-page .main { width: calc(100% - 280px); max-width: none; min-width: 0; }
.iso-22123-3-page .main ul { list-style-type: disc; }
.iso-22123-3-page .main ul ul { list-style-type: circle; }
.iso-22123-3-page .main ul ul ul { list-style-type: square; }
.iso-22123-3-page .main ol { list-style-type: decimal; }
.iso-22123-3-page .mermaid-diagram svg { flex-shrink: 0; height: auto; }
.iso-22123-3-page .sidebar a:focus-visible, .iso-22123-3-page button:focus-visible { outline: 2px solid var(--color-iso-22123-3-accent); outline-offset: 2px; }
@media (max-width: 960px) {
.iso-22123-3-page .main { width: 100%; }
.iso-22123-3-page .sidebar { visibility: hidden; transition: transform .2s, visibility 0s .2s; }
.iso-22123-3-page .sidebar.open { visibility: visible; transition-delay: 0s; }
}
`);
    write('theme-tokens.json', JSON.stringify(tokens, null, 2) + '\n');
    write('constants.ts', '/** 原本の階層別目次。監視対象はこの配列から導出する。 */\nexport const NAV_ITEMS = ' + JSON.stringify([...doc.querySelectorAll('.sidebar a')].map(a => ({ id: a.getAttribute('href').slice(1), text: a.textContent.replace(/\s+/g, ' ').trim(), sub: a.parentElement.parentElement.classList.contains('sub') })), null, 2) + ' as const;\n');
} else {
    const index = Object.keys(PARTS).indexOf(phase);
    const node = main.children[index];
    if (!node) throw new Error('Missing source chapter: ' + phase);
    const body = jsx(node);
    write(`sections/${phase}.tsx`, `${node.querySelector('svg') ? "import OriginalSvg from '../OriginalSvg';\n" : ''}/** 原本の${phase}。章の構造・本文・装飾・SVGをサーバー描画する。 */\nexport default function ${phase}() { return <>\n${body}\n</>; }\n`);
}
console.log('Generated ISO 22123 Part 3: ' + phase);
