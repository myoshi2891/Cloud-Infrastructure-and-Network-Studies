import { normalizeText } from './archive-fidelity-extraction.mjs';
import { codeLines } from './inventory-extraction.mjs';

/** 原本とReact DOMで共用する全本文構造・コード・リスト・図の配置抽出。 */
export function snapshotDvaSecurity(root) {
    const main = root.querySelector('main');
    return {
        texts: [...main.querySelectorAll('h1,h2,h3,h4,p,li,th,td,summary,blockquote,.eyebrow,.chip')]
            .map(el => ({ tag: el.tagName.toLowerCase(), text: normalizeText(el.textContent) })),
        lists: [...main.querySelectorAll('ul,ol')].map(el => ({
            tag: el.tagName.toLowerCase(), start: el.getAttribute('start'),
            items: [...el.children].map(item => ({ className: item.className.replace(/\s*done\b/g, ''), text: normalizeText(item.textContent) })),
        })),
        tables: [...main.querySelectorAll('table')].map(el => [...el.querySelectorAll('tr')].map(row =>
            [...row.children].map(cell => ({ tag: cell.tagName.toLowerCase(), text: normalizeText(cell.textContent), colspan: cell.getAttribute('colspan'), rowspan: cell.getAttribute('rowspan') })))),
        codes: [...main.querySelectorAll('.code-block')].map(el => codeLines(el)),
        anchors: [...main.querySelectorAll('h2[id]')].map(el => el.id),
        navigation: [...root.querySelectorAll('.sidebar a')].map(el => ({ href: el.getAttribute('href'), text: normalizeText(el.textContent) })),
        groups: [...root.querySelectorAll('.nav-group')].map(el => normalizeText(el.textContent)),
        checks: [...main.querySelectorAll('li.chk label')].map(el => normalizeText(el.textContent)),
        diagrams: [...main.querySelectorAll('[data-diagram]')].map(el => ({ index: el.getAttribute('data-diagram'), heading: el.closest('section')?.querySelector('h2')?.id })),
        details: [...main.querySelectorAll('details')].map(el => ({ summary: normalizeText(el.querySelector('summary')?.textContent), text: normalizeText(el.textContent) })),
    };
}

/** 作者管理のJSON配列のみ解析し、JavaScriptは実行しない。 */
export function extractDvaDiagrams(html) {
    const match = html.match(/const DIAGRAMS = (\[[^\n]+\]);/);
    if (!match) throw new Error('DVA DIAGRAMS not found');
    return JSON.parse(match[1]);
}
