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
        // JSX 中での & → 波括弧 → < > の順にエスケープ（& を先に処理し、後段で生成する実体参照の二重置換を防ぐ）
        return text
            .replace(/&/g, '&amp;')
            .replace(/[{}]/g, (char) => (char === '{' ? '{"{"}' : '{"}"}'))
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

        // HTML の真偽属性は値に関係なく「存在 = true」なので、空文字ではなく真偽 prop として出力する
        const booleanProp = BOOLEAN_ATTRS.get(name);
        if (booleanProp) {
            // 初期チェック状態の input は非制御のまま保持するため defaultChecked にする
            attrs.push(tagName === 'input' && name === 'checked' ? 'defaultChecked' : booleanProp);
            continue;
        }

        attrs.push(`${name}="${escapeAttr(value)}"`);
    }

    // テーブルの thead th に scope="col" を付与
    if (tagName === 'th' && el.closest('thead') && !el.hasAttribute('scope')) {
        attrs.push('scope="col"');
    }

    const attrStr = attrs.length > 0 ? ' ' + attrs.join(' ') : '';

    if (tagName === 'br') {
        return '<br />';
    }

    if (['hr', 'img', 'input'].includes(tagName)) {
        return `<${tagName}${attrStr} />`;
    }

    const children = [];
    for (const child of el.childNodes) {
        children.push(nodeToJsx(child, context));
    }

    return `<${tagName}${attrStr}>${children.join('')}</${tagName}>`;
}

/** HTML 真偽属性名 → JSX prop 名 */
const BOOLEAN_ATTRS = new Map([
    ['allowfullscreen', 'allowFullScreen'],
    ['async', 'async'],
    ['autofocus', 'autoFocus'],
    ['autoplay', 'autoPlay'],
    ['checked', 'checked'],
    ['controls', 'controls'],
    ['default', 'default'],
    ['defer', 'defer'],
    ['disabled', 'disabled'],
    ['formnovalidate', 'formNoValidate'],
    ['hidden', 'hidden'],
    ['loop', 'loop'],
    ['multiple', 'multiple'],
    ['muted', 'muted'],
    ['novalidate', 'noValidate'],
    ['open', 'open'],
    ['playsinline', 'playsInline'],
    ['readonly', 'readOnly'],
    ['required', 'required'],
    ['reversed', 'reversed'],
    ['selected', 'selected'],
]);

function escapeAttr(val) {
    // & を先にエスケープし、実体参照風の原文（例: &amp;lt;）を JSX で再解釈させない
    return val.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function styleStringToJsx(styleStr) {
    return styleStr
        .split(';')
        .filter(Boolean)
        .map(rule => {
            // 最初のコロンでのみ分割し、値内のコロン（URL スキーム等）を保持する
            const sep = rule.indexOf(':');
            if (sep === -1) return '';
            const k = rule.slice(0, sep);
            const v = rule.slice(sep + 1);
            if (!k || !v) return '';
            const camelK = k.trim().replace(/-([a-z])/g, (_, g) => g.toUpperCase());
            return `${camelK}: "${v.trim().replace(/"/g, '\\"')}"`;
        })
        .filter(Boolean)
        .join(', ');
}
