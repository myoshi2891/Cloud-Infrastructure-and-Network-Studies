import { describe, expect, it } from 'vitest';
import { JSDOM } from 'jsdom';
import { extractMermaidConfig, snapshotGuideChecks } from '@/scripts/guide-interaction-extraction.mjs';

describe('source guide interaction extraction', () => {
    it('records all checkbox identities, labels, defaults and order', () => {
        const doc = new JSDOM('<main><input type="checkbox" id="c1"><label for="c1">Keep <code>API</code></label><input type="checkbox" id="c2" checked><label for="c2">Second</label></main>').window.document;
        expect(snapshotGuideChecks(doc)).toEqual([{ id: 'c1', label: 'Keep API', checked: false }, { id: 'c2', label: 'Second', checked: true }]);
        doc.querySelector('label')?.remove();
        expect(() => snapshotGuideChecks(doc)).toThrow('label');
    });
    it('reads source Mermaid colors and layout from syntax without executing scripts', () => {
        const source = '<script>throw new Error("must not run"); mermaid.initialize({fontFamily: getFont(), theme: "base", themeVariables: {fontSize: "16px", primaryTextColor: "#1c2a3f"}, flowchart: {useMaxWidth: false, nodeSpacing: 70, subGraphTitleMargin: {top: 12, bottom: 18}}});</script>';
        expect(extractMermaidConfig(source)).toEqual({ theme: 'base', themeVariables: { fontSize: '16px', primaryTextColor: '#1c2a3f' }, flowchart: { useMaxWidth: false, nodeSpacing: 70, subGraphTitleMargin: { top: 12, bottom: 18 } } });
        expect(() => extractMermaidConfig(source.replace('70', 'runCode()'))).toThrow('literal');
        expect(() => extractMermaidConfig('<script>other()</script>')).toThrow('initialize');
    });
});
