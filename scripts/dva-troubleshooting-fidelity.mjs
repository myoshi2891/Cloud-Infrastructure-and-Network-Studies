import ts from 'typescript';
import { normalizeCodeContainers, codeBlockSelector, codeLines } from './inventory-extraction.mjs';

/** 元HTMLのリテラルだけをASTで抽出する。JavaScriptは実行しない。 */
export function troubleshootingSource(document) {
    const ast = ts.createSourceFile('source.js', [...document.querySelectorAll('script:not([src])')].map(el => el.textContent).join('\n'), ts.ScriptTarget.Latest, true);
    const literal = node => {
        if (ts.isStringLiteralLike(node)) return node.text;
        if (ts.isNumericLiteral(node)) return Number(node.text);
        if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
        if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
        if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.map(p => [p.name.text, literal(p.initializer)]));
        if (ts.isArrayLiteralExpression(node)) return node.elements.map(literal);
        throw new Error('Nonliteral source');
    };
    let diagrams, theme, classes;
    const visit = node => {
        if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken && node.left.getText(ast) === 'window.DIAGRAMS') diagrams = literal(node.right);
        if (ts.isCallExpression(node) && node.expression.getText(ast) === 'window.mermaid.initialize') theme = literal(node.arguments[0]);
        if (ts.isVariableDeclaration(node) && node.name.getText(ast) === 'CLASSDEFS') classes = literal(node.initializer.expression.expression).join('\n');
        ts.forEachChild(node, visit);
    };
    visit(ast);
    if (!diagrams || Object.keys(diagrams).length !== document.querySelectorAll('[data-diagram-id]').length || !theme || !classes) throw new Error('Incomplete source diagrams/theme');
    normalizeCodeContainers(document);
    return { diagrams: Object.fromEntries(Object.entries(diagrams).map(([id, text]) => [id, text.split('\n').map(line => line.trim()).join('\n') + '\n' + classes])), theme };
}

const squash = text => text.replace(/\s/g, '');
/** 原本と移行先に共用する全文・配置・リスト階層・表結合・コード・リンク検証。 */
export function snapshotTroubleshooting(root) {
    const main = root.querySelector('main');
    const canonical = element => {
        const clone = element.cloneNode(true);
        clone.querySelectorAll(codeBlockSelector).forEach(block => { block.textContent = codeLines(block).join('\n'); });
        return squash(clone.textContent);
    };
    return {
        sections: [...main.querySelectorAll('section[id]')].map(el => ({ id: el.id, text: canonical(el) })),
        lists: [...main.querySelectorAll('ul,ol')].map(el => ({ tag: el.tagName, start: el.getAttribute('start'), depth: [...el.parentElement.closest('section').querySelectorAll('ul,ol')].filter(parent => parent !== el && parent.contains(el)).length, items: [...el.children].map(li => squash(li.textContent)) })),
        tables: [...main.querySelectorAll('table')].map(el => [...el.querySelectorAll('tr')].map(row => [...row.children].map(cell => ({ text: squash(cell.textContent), tag: cell.tagName, colspan: cell.getAttribute('colspan'), rowspan: cell.getAttribute('rowspan') })))),
        codes: [...main.querySelectorAll(codeBlockSelector)].map(el => codeLines(el)),
        links: [...main.querySelectorAll('a')].map(el => ({ text: squash(el.textContent), href: el.getAttribute('href'), target: el.getAttribute('target'), rel: el.getAttribute('rel') })),
        diagrams: [...main.querySelectorAll('[data-diagram-id]')].map(el => ({ id: el.getAttribute('data-diagram-id'), section: el.closest('section')?.id })),
        icons: [...main.querySelectorAll('i')].map(el => el.className),
        placement: [...main.querySelectorAll('h1,h2,h3,h4,table,ul,ol,details,.diagram-card,.cb-head')].map(el => ({ tag: el.tagName, className: el.className, text: el.matches('.diagram-card') ? '' : squash(el.textContent) })),
        hero: canonical(main.querySelector('.hero')),
        footer: canonical(main.querySelector('.footer')),
    };
}
