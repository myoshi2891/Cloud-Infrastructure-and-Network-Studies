import ts from 'typescript';
import { snapshotDvaSecurity } from './dva-security-fidelity.mjs';
import { normalizeText } from './archive-fidelity-extraction.mjs';
import { codeLines } from './inventory-extraction.mjs';

/** 原本とReact DOMで同じ抽出器を使い、配置・全文・アイコンまで記録する。 */
export function snapshotDvaDevelopment(root) {
    const shared = snapshotDvaSecurity(root);
    const main = root.querySelector('main');
    delete shared.checks;
    return {
        ...shared,
        anchors: [...main.querySelectorAll('section[id]')].map(el => el.id),
        groups: [...root.querySelectorAll('.nav-list li')].map(el => el.className),
        diagrams: [...main.querySelectorAll('[data-diagram-id]')].map(el => ({ id: el.getAttribute('data-diagram-id'), section: el.closest('section')?.id })),
        codeHeaders: [...main.querySelectorAll('.cb-head')].map(el => normalizeText(el.textContent)),
        icons: [...root.querySelectorAll('i.ti')].map(el => el.className),
        sections: [...main.querySelectorAll('section')].map(el => {
            const clone = el.cloneNode(true);
            for (const block of clone.querySelectorAll('.code-block')) block.textContent = codeLines(block).join('\n');
            return {id: el.id, className: el.className, text: normalizeText(clone.textContent)};
        }),
    };
}

/** テンプレートリテラルのみをASTで抽出し、移行元JavaScriptは実行しない。 */
export function extractDevelopmentDiagrams(html) {
    const script = html.match(/const DIAGRAMS = ([\s\S]*?);\s*\n/)?.[0];
    if (!script) throw new Error('DIAGRAMS missing');
    const ast = ts.createSourceFile('source.js', script, ts.ScriptTarget.Latest, true);
    const expression = ast.statements[0]?.declarationList?.declarations[0]?.initializer;
    if (!expression || !ts.isObjectLiteralExpression(expression)) throw new Error('Expected literal DIAGRAMS');
    return Object.fromEntries(expression.properties.map(property => {
        if (!ts.isPropertyAssignment(property) || !ts.isStringLiteral(property.name) || !ts.isNoSubstitutionTemplateLiteral(property.initializer)) throw new Error('Nonliteral diagram rejected');
        return [property.name.text, property.initializer.text];
    }));
}
