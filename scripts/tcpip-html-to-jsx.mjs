// scripts/tcpip-html-to-jsx.mjs
import fs from 'node:fs';
import { JSDOM } from 'jsdom';

const html = fs.readFileSync('Tcpip-illustrated-vol1-guide.html', 'utf-8');
const doc = new JSDOM(html).window.document;
const main = doc.querySelector('main.main');
const children = [...main.children];

let diagramCounter = 0;
let tableCounter = 0;

// JSX テキストで特別な意味を持つ文字の置換表
const JSX_TEXT_ESCAPES = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '{': '{"{"}',
    '}': '{"}"}',
};

function escapeJsxText(text) {
    if (!text) return '';
    // 1 パスで置換し、挿入した {"{"} / {"}"} の波括弧を再処理しない
    return text.replace(/[&<>{}]/g, (ch) => JSX_TEXT_ESCAPES[ch] ?? ch);
}

function domToJsx(node) {
    if (node.nodeType === 3) {
        // Text node
        return escapeJsxText(node.textContent ?? '');
    }
    if (node.nodeType === 8) {
        // Comment
        return `{/* ${node.textContent} */}`;
    }
    if (node.nodeType !== 1) {
        return '';
    }

    const el = node;
    const tagName = el.tagName.toLowerCase();

    // pre.mermaid
    if (tagName === 'pre' && el.classList.contains('mermaid')) {
        const diagId = `diag-${diagramCounter++}`;
        const prev = el.previousElementSibling;
        const label = prev?.textContent?.replace(/\s+/g, ' ').trim() || `${diagId} ダイアグラム`;
        const escapedLabel = label.replace(/"/g, '&quot;');
        return `<Diagram id="${diagId}" label="${escapedLabel}" />`;
    }

    // div.table-scroll
    if (tagName === 'div' && el.classList.contains('table-scroll')) {
        const tableNum = ++tableCounter;
        const prev = el.previousElementSibling;
        const label = prev?.textContent?.replace(/\s+/g, ' ').trim() || `表 ${tableNum}`;
        const escapedLabel = label.replace(/"/g, '&quot;');
        el.setAttribute('tabIndex', '0');
        el.setAttribute('role', 'region');
        el.setAttribute('aria-label', escapedLabel);
    }

    // thead th に scope="col" を付与
    if (tagName === 'th' && el.closest('thead')) {
        el.setAttribute('scope', 'col');
    }

    // 属性の変換
    const attrs = [];
    for (const attr of el.attributes) {
        let name = attr.name;
        let value = attr.value;

        if (name === 'class') name = 'className';
        if (name === 'for') name = 'htmlFor';
        if (name === 'tabindex') name = 'tabIndex';

        if (name === 'tabIndex') {
            attrs.push(`tabIndex={${parseInt(value, 10)}}`);
            continue;
        }

        if (name === 'style') {
            // style 文字列を React オブジェクトへ
            attrs.push(`style={{ ${styleStringToReact(value)} }}`);
            continue;
        }

        // 属性値のエスケープ
        attrs.push(`${name}="${value.replace(/"/g, '&quot;')}"`);
    }

    const selfClosing = ['br', 'hr', 'img', 'input'].includes(tagName);
    const attrString = attrs.length > 0 ? ' ' + attrs.join(' ') : '';

    if (selfClosing) {
        return `<${tagName}${attrString} />`;
    }

    const childJsx = [...el.childNodes].map(domToJsx).join('');
    return `<${tagName}${attrString}>${childJsx}</${tagName}>`;
}

function styleStringToReact(styleStr) {
    return styleStr
        .split(';')
        .map(s => s.trim())
        .filter(Boolean)
        .map(s => {
            const [prop, ...valParts] = s.split(':');
            const val = valParts.join(':').trim();
            const camelProp = prop.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
            return `${camelProp}: '${val}'`;
        })
        .join(', ');
}

export function generateSection(startIndex, endIndex, componentName, startDiagramIndex, startTableIndex, extraImports = '') {
    if (typeof startDiagramIndex === 'number') diagramCounter = startDiagramIndex;
    if (typeof startTableIndex === 'number') tableCounter = startTableIndex;

    const sectionNodes = children.slice(startIndex, endIndex);
    const bodyJsx = sectionNodes.map(domToJsx).join('\n            ');
    return `'use client';

import React from 'react';
import { Diagram } from '../Diagram';
${extraImports}

export function ${componentName}() {
    return (
        <>
            ${bodyJsx}
        </>
    );
}
`;
}
