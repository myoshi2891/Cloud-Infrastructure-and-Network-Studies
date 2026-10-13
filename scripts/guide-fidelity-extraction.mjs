import postcss from 'postcss';
import { codeBlockSelector, codeLines, extractBodyContent } from './inventory-extraction.mjs';
import { normalizeText, normalizeMermaid, snapshotTables } from './archive-fidelity-extraction.mjs';

/** Source and migrated guide blocks share this extraction; no archive is needed at test time. */
export function snapshotGuidePart(root) {
    const content = root.querySelector('main') ?? root;
    const diagrams = [...content.querySelectorAll('pre.mermaid, [data-testid="mermaid-diagram"]')];
    const codes = [...content.querySelectorAll(codeBlockSelector)];
    const clone = content.cloneNode(true);
    clone.querySelectorAll('pre.mermaid, .mermaid-wrap, .code-block, pre').forEach(element => element.remove());
    return {
        text: normalizeText(clone.textContent),
        headings: [...content.querySelectorAll('h1,h2,h3,h4')].map(element => ({ tag: element.tagName.toLowerCase(), id: element.id, text: normalizeText(element.textContent) })),
        tables: snapshotTables(content),
        lists: [...content.querySelectorAll('ul,ol')].map(list => {
            let depth = 0;
            for (let parent = list.parentElement; parent && parent !== content; parent = parent.parentElement) {
                if (parent.matches('ul,ol')) depth++;
            }
            return { tag: list.tagName.toLowerCase(), start: list.getAttribute('start'), reversed: list.hasAttribute('reversed'), depth,
                items: [...list.children].filter(child => child.matches('li')).map(item => ({ text: normalizeText(item.textContent), value: item.getAttribute('value') })) };
        }),
        links: [...content.querySelectorAll('a')].map(anchor => ({ href: anchor.getAttribute('href'), text: normalizeText(anchor.textContent), target: anchor.getAttribute('target'), rel: anchor.getAttribute('rel') })),
        inline: [...content.querySelectorAll('strong,em,code:not(pre code)')].filter(element => !element.closest('.code-block')).map(element => ({ tag: element.tagName.toLowerCase(), text: normalizeText(element.textContent) })),
        body: extractBodyContent(content),
        diagrams: diagrams.map(element => normalizeMermaid(element.getAttribute('data-chart') ?? element.textContent ?? '')),
        codes: codes.map(codeLines),
        placement: [...content.querySelectorAll('h1,h2,h3,h4,table,pre,.mermaid-wrap,.code-block,.callout-practice,ul,ol')].map(element =>
            element.matches('pre.mermaid,.mermaid-wrap') ? 'diagram' : element.matches('pre,.code-block') ? 'code' : element.tagName.toLowerCase()),
    };
}

/** Capture original navigation and every CSS declaration, including responsive rules. */
export function snapshotGuideDesign(doc) {
    const rules = [];
    postcss.parse([...doc.querySelectorAll('style')].map(style => style.textContent ?? '').join('\n')).walkRules(rule => {
        const declarations = {};
        rule.walkDecls(decl => { declarations[decl.prop] = decl.value; });
        rules.push({ selector: rule.selector, media: rule.parent.type === 'atrule' ? rule.parent.params : '', declarations });
    });
    return {
        nav: [...doc.querySelectorAll('#sidebarNav a')].map(anchor => ({ id: decodeURIComponent(anchor.getAttribute('href').slice(1)), label: normalizeText(anchor.textContent), level: anchor.classList.contains('lvl3') ? 3 : 2 })),
        rules,
    };
}

/** Split flat main content at configured headings, preserving every source node exactly once. */
export function snapshotGuideParts(doc, boundaries) {
    const parts = {};
    let key = Object.keys(boundaries)[0];
    let container = doc.createElement('div');
    for (const node of doc.querySelector('main').childNodes) {
        const next = Object.entries(boundaries).find(([, id]) => node.nodeType === 1 && node.id === id)?.[0];
        if (next && next !== key) {
            parts[key] = snapshotGuidePart(container);
            key = next;
            container = doc.createElement('div');
        }
        container.appendChild(node.cloneNode(true));
    }
    parts[key] = snapshotGuidePart(container);
    return parts;
}
