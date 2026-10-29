import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import postcss, { type Rule } from 'postcss';
import { describe, expect, it } from 'vitest';

// 共通フッターを明色へ切り替えるページルート（登録順を保持する）
const LIGHT_PAGE_ROOTS = [
    'aib-guide-page', 'aib-domain1-page', 'aib-domain2-page', 'aib-domain3-page', 'aib-domain4-page',
    'aip-guide-page', 'aip-domain1-page', 'aip-domain2-page', 'aip-domain3-page',
    'aip-domain4-page', 'aip-domain5-page', 'ans-domain1-page', 'ans-domain2-page', 'ans-domain3-page', 'ans-domain4-page',
    'dva-development-page', 'dva-security-page', 'dva-deployment-page', 'dva-troubleshooting-page',
    'sap-domain1-page', 'scs-guide-page', 'scs-domain1-page', 'ans-guide-page', 'sap-guide-page',
    'tcpip-page', 'agentic-guide-page', 'agentic-section1-page',
    'agentic-section2-page', 'agentic-section3-page', 'agentic-section4-page',
    'agentic-section5-page',
];

const squashSelector = (selector: string): string => selector.replace(/\s+/g, ' ').replace(/\(\s+/g, '(').replace(/\s+\)/g, ')').trim();

const parseFooterCss = () => postcss.parse(readFileSync(resolve('components/Footer.module.css'), 'utf8'));

const findLightRules = (): Rule[] => {
    const rules: Rule[] = [];
    parseFooterCss().walkRules(rule => {
        const isLight = rule.nodes.some(node => node.type === 'decl' && node.prop === 'color-scheme' && node.value === 'light');
        if (isLight) rules.push(rule);
    });
    return rules;
};

describe('共通フッターの明色切り替え', () => {
    it('body 等の祖先へ :has() を使わない（Mermaid 採寸時の全体スタイル再計算で描画とスクロールが停止するため）', () => {
        const selectors: string[] = [];
        parseFooterCss().walkRules(rule => { selectors.push(rule.selector); });
        expect(selectors.filter(selector => selector.includes(':has('))).toEqual([]);
    });

    it('明色ルールは body 直下のページルートに続く兄弟フッターだけを対象にする', () => {
        const rules = findLightRules();
        expect(rules).toHaveLength(1);
        const expected = `:global(:is(${LIGHT_PAGE_ROOTS.map(name => `.${name}`).join(', ')})) ~ .footer`;
        expect(squashSelector(rules[0]?.selector ?? '')).toBe(expected);
    });

    it('明色ルールの配色宣言を保持する', () => {
        const declarations = findLightRules()[0]?.nodes.flatMap(node => node.type === 'decl' ? [`${node.prop}: ${node.value}`] : []);
        expect(declarations).toEqual([
            'color-scheme: light',
            'background: var(--color-footer-light-bg)',
            'color: var(--color-footer-light-text)',
            'border-top-color: var(--color-footer-light-border)',
        ]);
    });
});
