// scripts/convert-html-section-to-jsx.mjs
import { JSDOM } from 'jsdom';
import fs from 'fs';

/**
 * DOM ノードを JSX 文字列へシリアライズする。
 * @param {Node} node
 * @param {object} context
 * @returns {string}
 */
export function nodeToJsx(node, context = { codeBlockIndex: 0 }) {
    if (node.nodeType === 3) {
        // テキストノード
        const text = node.textContent ?? '';
        // JSX 中での波括弧および < > エスケープ
        return text
            .replace(/\{/g, '{"{"}')
            .replace(/\}/g, '{"}"}')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    if (node.nodeType !== 1) {
        return '';
    }

    const el = node;
    const tagName = el.tagName.toLowerCase();

    // 1. ダイアグラムの置換
    if (el.classList.contains('diagram-card')) {
        const wrap = el.querySelector('.diagram-wrap');
        const src = wrap?.getAttribute('data-src');
        if (src) {
            return `<Diagram id="${src}" />\n`;
        }
    }

    // 2. コードブロックの置換
    if (el.classList.contains('code-block')) {
        const idx = context.codeBlockIndex++;
        return `<CodeBlock index={${idx}} />\n`;
    }

    // 3. 通常要素の処理
    const attrs = [];
    for (const attr of el.attributes) {
        let name = attr.name;
        let value = attr.value;

        if (name === 'class') name = 'className';
        if (name === 'for') name = 'htmlFor';

        if (name === 'style') {
            // style 文字列を JSX オブジェクトに変換
            // 単純なケースのみ対応
            attrs.push(`style={{ ${styleStringToJsx(value)} }}`);
            continue;
        }

        attrs.push(`${name}="${escapeAttr(value)}"`);
    }

    // テーブルの thead th に scope="col" を付与
    if (tagName === 'th' && el.closest('thead') && !el.hasAttribute('scope')) {
        attrs.push('scope="col"');
    }

    const attrStr = attrs.length > 0 ? ' ' + attrs.join(' ') : '';

    if (['br', 'hr', 'img', 'input'].includes(tagName)) {
        return `<${tagName}${attrStr} />`;
    }

    const children = [];
    for (const child of el.childNodes) {
        children.push(nodeToJsx(child, context));
    }

    return `<${tagName}${attrStr}>${children.join('')}</${tagName}>`;
}

function escapeAttr(val) {
    return val.replace(/"/g, '&quot;');
}

function styleStringToJsx(styleStr) {
    return styleStr
        .split(';')
        .filter(Boolean)
        .map(rule => {
            const [k, v] = rule.split(':');
            if (!k || !v) return '';
            const camelK = k.trim().replace(/-([a-z])/g, (_, g) => g.toUpperCase());
            return `${camelK}: "${v.trim().replace(/"/g, '\\"')}"`;
        })
        .filter(Boolean)
        .join(', ');
}
