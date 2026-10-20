import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import postcss from 'postcss';
import { describe, expect, it } from 'vitest';

describe('共通フッターの重なり順', () => {
    it('全ページ共通のフッターが前面のスタッキングコンテキストを作らない', () => {
        const css = postcss.parse(readFileSync(resolve('components/Footer.module.css'), 'utf8'));
        const layers: string[] = [];
        css.walkDecls('z-index', declaration => { layers.push(declaration.value); });
        // テーマ別・メディアクエリ内にも正のレイヤーを追加しない。
        expect(layers.every(value => value === 'auto' || Number(value) === 0)).toBe(true);
    });
});
