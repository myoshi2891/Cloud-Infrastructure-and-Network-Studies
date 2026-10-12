import { normalizeText } from './archive-fidelity-extraction.mjs';
import { codeBlockSelector, codeLines } from './inventory-extraction.mjs';

/** 原本の平坦な本文を、h1/h2のアンカー間で分割する。DOMは変更しない。 */
export function deploymentSegments(root) {
    const content = root.querySelector('main .content');
    if (!content) throw new Error('Deployment content missing');
    const segments = [];
    for (const node of content.childNodes) {
        if (node.nodeType === 1 && node.matches('h1[id],h2[id]')) segments.push({ id: node.id, nodes: [] });
        const segment = segments.at(-1);
        if (segment) segment.nodes.push(node);
        else if (node.textContent.trim()) throw new Error('Content before first heading');
    }
    return segments;
}

/** コード行を元の改行へ戻して本文を比較する。 */
function canonicalText(root) {
    if (!root) return '';
    const clone = root.cloneNode(true);
    for (const code of clone.querySelectorAll(codeBlockSelector)) code.textContent = codeLines(code).join('\n');
    return normalizeText(clone.textContent);
}

/** 原本とReact DOMに共用する全文・配置・表・リスト・図・コードの抽出器。 */
export function snapshotDvaDeployment(root) {
    const main = root.querySelector('main');
    if (!main) throw new Error('Deployment main missing');
    const segments = deploymentSegments(root);
    const headingOf = element => segments.find(segment => segment.nodes.some(node => node === element || node.contains(element)))?.id ?? 'hero';
    return {
        anchors: segments.map(segment => segment.id),
        segments: segments.map(segment => {
            const fragment = main.ownerDocument.createElement('div');
            segment.nodes.forEach(node => fragment.append(node.cloneNode(true)));
            return { id: segment.id, text: canonicalText(fragment) };
        }),
        texts: [...main.querySelectorAll('h1,h2,h3,h4,p,li,th,td,summary,blockquote,.eyebrow,.chip')].map(el => ({ tag: el.tagName.toLowerCase(), text: normalizeText(el.textContent) })),
        lists: [...main.querySelectorAll('ul,ol')].map(el => ({
            tag: el.tagName.toLowerCase(), start: el.getAttribute('start'), type: el.getAttribute('type'), reversed: el.hasAttribute('reversed'),
            items: [...el.children].map(item => ({ className: item.className.replace(/\s*done\b/g, ''), value: item.getAttribute('value'), text: normalizeText(item.textContent) })),
        })),
        tables: [...main.querySelectorAll('table')].map(el => [...el.querySelectorAll('tr')].map(row => [...row.children].map(cell => ({ tag: cell.tagName.toLowerCase(), text: normalizeText(cell.textContent), colspan: cell.getAttribute('colspan'), rowspan: cell.getAttribute('rowspan') })))),
        codes: [...main.querySelectorAll(codeBlockSelector)].map(el => ({ language: el.getAttribute('data-language') ?? el.querySelector('code')?.className.replace('language-', ''), lines: codeLines(el) })),
        inlineCode: [...main.querySelectorAll('code')].filter(el => !el.closest(codeBlockSelector)).map(el => el.textContent),
        diagrams: [...main.querySelectorAll('.diagram-canvas[data-id], [data-diagram-id]')].map(el => ({ id: el.getAttribute('data-id') ?? el.getAttribute('data-diagram-id'), heading: headingOf(el) })),
        navigation: [...root.querySelectorAll('.sidebar a')].map(el => ({ href: el.getAttribute('href'), text: normalizeText(el.textContent) })),
        references: [...main.querySelectorAll('a[href^="http"]')].map(el => ({ href: el.getAttribute('href'), text: normalizeText(el.textContent), target: el.getAttribute('target'), rel: el.getAttribute('rel') })),
        checks: [...main.querySelectorAll('li.chk label')].map(el => normalizeText(el.textContent)),
        details: [...main.querySelectorAll('details')].map(el => ({ summary: normalizeText(el.querySelector('summary')?.textContent), text: canonicalText(el) })),
        placements: [...main.querySelectorAll('table, pre, .code-block, .diagram-wrap, blockquote, details, .refs, .checklist')].map(el => ({ heading: headingOf(el), kind: el.matches('pre,.code-block') ? 'code' : el.matches('table,blockquote,details') ? el.tagName.toLowerCase() : el.className })),
        hero: canonicalText(main.querySelector('.hero')),
        footer: normalizeText(main.querySelector('.footer')?.textContent),
    };
}
