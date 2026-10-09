// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { nodeToJsx } from '@/scripts/convert-html-section-to-jsx.mjs';

const convert = (html: string): string => {
    // Arrange
    const template = document.createElement('template');
    template.innerHTML = html;
    const node = template.content.firstChild;
    if (!node) throw new Error('入力 HTML から要素を取得できません');
    // Act
    return nodeToJsx(node);
};

describe('convert-html-section-to-jsx — エスケープ', () => {
    it('テキストの & を最初にエスケープし、実体参照風の原文を保持する', () => {
        expect(convert('<p>x &amp;lt; y &amp; {z} &lt;w&gt;</p>'))
            .toBe('<p>x &amp;lt; y &amp; {"{"}z{"}"} &lt;w&gt;</p>');
    });

    it('属性値の & と " をエスケープする', () => {
        expect(convert('<a title="a &amp;lt; &quot;b">t</a>'))
            .toBe('<a title="a &amp;lt; &quot;b">t</a>');
    });
});

describe('convert-html-section-to-jsx — 真偽属性', () => {
    it('真偽属性を空文字ではなく真偽 prop として出力する', () => {
        expect(convert('<details open=""><summary>s</summary></details>'))
            .toBe('<details open><summary>s</summary></details>');
        expect(convert('<input type="text" readonly disabled="disabled">'))
            .toBe('<input type="text" readOnly disabled />');
    });

    it('初期チェック済みの input は defaultChecked で非制御のまま保持する', () => {
        expect(convert('<input type="checkbox" checked>'))
            .toBe('<input type="checkbox" defaultChecked />');
    });

    it('真偽属性でない空値の属性は従来どおり文字列で出力する', () => {
        expect(convert('<td data-note="">x</td>')).toBe('<td data-note="">x</td>');
    });
});
