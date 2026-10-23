import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const pageCss = readFileSync('app/page.module.css', 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const globalsCss = readFileSync('app/globals.css', 'utf8');

// ホームのカタログ（検索ツールバー・プロバイダ見出し・カード・ドメイン一覧・空状態）のセレクタ
const CATALOG_SELECTOR =
    /^\.(catalog\w*|provider(?:Section|Header|Index|Title|Description|Count)|cards?\w*|domain\w*|ctaBtn|resultCount|emptyState)\b/;
const LITERAL_COLOR = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\(/;

const catalogRules = [...pageCss.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
    .map(([, selector = '', body = '']) => ({ selector: selector.trim(), body }))
    .filter(({ selector }) => CATALOG_SELECTOR.test(selector));

describe('ホームのカタログ CSS はテーマトークンだけで配色する', () => {
    it('カタログのルールを抽出できる', () => {
        expect(catalogRules.map(({ selector }) => selector)).toEqual(
            expect.arrayContaining(['.cardLevel', '.ctaBtn', '.catalogToolbar', '.cardDomains[open] summary']),
        );
    });

    it('カタログのルールに生の色指定が残っていない', () => {
        const offenders = catalogRules
            .flatMap(({ selector, body }) =>
                body.split(';').filter((declaration) => LITERAL_COLOR.test(declaration))
                    .map((declaration) => `${selector} { ${declaration.trim()} }`),
            );
        expect(offenders).toEqual([]);
    });

    it('カタログが参照する --color-* トークンはすべて globals.css に定義されている', () => {
        const referenced = new Set(
            catalogRules.flatMap(({ body }) => [...body.matchAll(/var\((--color-[\w-]+)\)/g)].map(([, name]) => name)),
        );
        const missing = [...referenced].filter((name) => !globalsCss.includes(`${name}:`));
        expect(missing).toEqual([]);
    });
});
