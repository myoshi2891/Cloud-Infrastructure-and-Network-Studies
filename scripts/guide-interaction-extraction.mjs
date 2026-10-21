import ts from 'typescript';
import { JSDOM } from 'jsdom';
import { normalizeText } from './archive-fidelity-extraction.mjs';

/** 原本とReact DOMで同じ規則を使い、チェック項目の識別子・全文・初期状態を抽出する。 */
export function snapshotGuideChecks(root) {
    return [...root.querySelectorAll('input[type="checkbox"]')].map(input => {
        const label = input.closest('label') ?? (input.id
            ? [...root.querySelectorAll('label')].find(element => element.htmlFor === input.id)
            : undefined);
        if (!label) throw new Error(`Missing checkbox label: ${input.id}`);
        return { id: input.id, label: normalizeText(label.textContent), checked: input.checked };
    });
}

/** 動的コードを評価せず、Mermaid初期化の配色・配置に必要なリテラルだけを読む。 */
export function extractMermaidConfig(html) {
    const doc = new JSDOM(html).window.document;
    let config;
    function literal(node) {
        if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
        if (ts.isNumericLiteral(node)) return Number(node.text);
        if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
        if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
        if (ts.isObjectLiteralExpression(node)) {
            return Object.fromEntries(node.properties.map(property => {
                if (!ts.isPropertyAssignment(property)) throw new Error('Nonliteral Mermaid property');
                return [property.name.getText().replace(/^['"]|['"]$/g, ''), literal(property.initializer)];
            }));
        }
        throw new Error('Nonliteral Mermaid configuration');
    }
    for (const script of doc.querySelectorAll('script:not([src])')) {
        const ast = ts.createSourceFile('source.js', script.textContent ?? '', ts.ScriptTarget.Latest, true);
        function visit(node) {
            if (ts.isCallExpression(node) && node.expression.getText(ast) === 'mermaid.initialize') {
                const arg = node.arguments[0];
                if (!arg || !ts.isObjectLiteralExpression(arg)) throw new Error('Expected literal initialize configuration');
                config = Object.fromEntries(['theme', 'themeVariables', 'flowchart'].map(key => {
                    const property = arg.properties.find(prop => ts.isPropertyAssignment(prop) && prop.name.getText(ast).replace(/^['"]|['"]$/g, '') === key);
                    if (!property || !ts.isPropertyAssignment(property)) throw new Error(`Missing initialize ${key}`);
                    return [key, literal(property.initializer)];
                }));
            }
            ts.forEachChild(node, visit);
        }
        visit(ast);
    }
    if (!config) throw new Error('Missing mermaid.initialize');
    return config;
}
