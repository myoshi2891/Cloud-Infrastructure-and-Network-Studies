import postcss from 'postcss';
import { normalizeMermaid } from './archive-fidelity-extraction.mjs';
import { snapshotGuideStructure } from './secure-cicd-fidelity.mjs';

/** 原本と移行先の目次・リスト・参照・チェック項目を同じ抽出処理で比較する。 */
export function snapshotTanenbaumStructure(root) {
    return {
        ...snapshotGuideStructure(root),
        anchors: [...root.querySelectorAll('main h2[id], main h3[id]')].map(el => el.id),
        references: [...root.querySelectorAll('main .ref-card')].map(el => ({
            id: el.id,
            number: el.querySelector('.num')?.textContent?.trim(),
            text: el.textContent?.replace(/\s+/g, ''),
        })),
        footnotes: [...root.querySelectorAll('main .footnote-ref')].map(el => ({
            href: el.getAttribute('href'), text: el.textContent?.trim(),
        })),
        checklist: [...root.querySelectorAll('.checklist-card li')].map(el => ({
            id: el.querySelector('input')?.id,
            labelFor: el.querySelector('label')?.getAttribute('for'),
            text: el.querySelector('label')?.textContent?.replace(/\s+/g, ''),
        })),
    };
}

/**
 * CSS宣言をメディア条件・順序・important指定を含めて原本から固定する。
 * @param {string} source
 * @returns {Array<{selector: string, media: string|null, declarations: Array<{prop: string, value: string, important: boolean}>}>}
 */
export function snapshotCssRules(source) {
    const rules = [];
    postcss.parse(source).walkRules(rule => {
        rules.push({
            selector: rule.selector,
            media: rule.parent?.type === 'atrule' ? rule.parent.params : null,
            declarations: rule.nodes.filter(n => n.type === 'decl').map(d => ({
                prop: d.prop, value: d.value, important: Boolean(d.important),
            })),
        });
    });
    return rules;
}

/** 原本のpre.mermaidを出現順で抽出し、構文を保ったまま行頭空白を除去する。 */
export function snapshotTanenbaumDiagrams(root) {
    return [...root.querySelectorAll('pre.mermaid')].map(el => normalizeMermaid(el.textContent ?? ''));
}
