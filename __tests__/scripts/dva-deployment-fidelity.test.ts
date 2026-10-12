import { describe, expect, it } from 'vitest';
import { JSDOM } from 'jsdom';
import { snapshotDvaDeployment, deploymentSegments, extractDeploymentTheme, snapshotDeploymentSegment } from '@/scripts/dva-deployment-fidelity.mjs';

const source = `<nav class="sidebar"><a class="nav l1" href="#s1">Task 1</a><a class="nav l2" href="#s2">Step 1</a></nav><main><div class="content"><h1 id="s1">Task 1</h1><p>準備 <strong>必須</strong></p><h2 id="s2">Step 1</h2><ol start="4"><li>四番</li></ol><div class="diagram-wrap"><div class="diagram-canvas" data-id="d0"></div></div><pre><code class="language-yaml">a: 1\n\n  b: 2</code></pre><details><summary>回答</summary><p>説明</p></details><section class="refs"><a class="ref" href="https://example.org">参照</a></section></div></main>`;
const document = (html: string) => new JSDOM(html).window.document;

describe('DVA Deployment fixture抽出契約', () => {
    it('単一節の抽出でも全量抽出と同じ本文・コードを返す', () => {
        const root = document(source);
        for (const segment of snapshotDvaDeployment(root).segments) expect(snapshotDeploymentSegment(root, segment.id)).toEqual(segment);
    });
    it('存在しない節を別の本文で代用しない', () => {
        expect(snapshotDeploymentSegment(document(source), 'missing')).toBeUndefined();
    });
    it('初期化設定をJavaScript実行なしで抽出する', () => {
        expect(extractDeploymentTheme(`<script>mermaid.initialize({theme:'base',startOnLoad:false,flowchart:{htmlLabels:true},themeVariables:{fontSize:'16px'}});</script>`)).toEqual({ theme: 'base', startOnLoad: false, flowchart: { htmlLabels: true }, themeVariables: { fontSize: '16px' } });
    });
    it('実行可能な式を含む設定を拒否する', () => {
        expect(() => extractDeploymentTheme('<script>mermaid.initialize({theme:run()});</script>')).toThrow('Nonliteral');
    });
    it('h1とh2の区切りを同じ順序で保持する', () => {
        const root = document(source);
        expect(deploymentSegments(root).map(segment => segment.id)).toEqual(['s1', 's2']);
        expect(snapshotDvaDeployment(root).anchors).toEqual(['s1', 's2']);
        expect(snapshotDvaDeployment(root).segments[0]?.text).toBe('Task 1準備 必須');
    });
    it('番号再開・コード空行・図ID・参照・detailsを保持する', () => {
        const snapshot = snapshotDvaDeployment(document(source));
        expect(snapshot.lists[0]).toMatchObject({ tag: 'ol', start: '4', items: [{ text: '四番' }] });
        expect(snapshot.codes).toEqual([{ language: 'yaml', lines: ['a: 1', '', '  b: 2'] }]);
        expect(snapshot.diagrams).toEqual([{ id: 'd0', heading: 's2' }]);
        expect(snapshot.references).toEqual([{ href: 'https://example.org', text: '参照', target: null, rel: null }]);
        expect(snapshot.details).toEqual([{ summary: '回答', text: '回答説明' }]);
    });
    it('Reactコード行・図コンポーネントへの変換前後で構造が一致する', () => {
        const migrated = source.replace('<pre><code class="language-yaml">a: 1\n\n  b: 2</code></pre>', '<div class="code-block" data-language="yaml"><div class="code-line"><code>a: 1</code></div><div class="code-line"><code></code></div><div class="code-line"><code>  b: 2</code></div></div>')
            .replace('<div class="diagram-canvas" data-id="d0"></div>', '<div data-diagram-id="d0" role="img"></div>');
        expect(snapshotDvaDeployment(document(migrated))).toEqual(snapshotDvaDeployment(document(source)));
    });
    it.each([
        ['本文', source.replace('準備 ', '')],
        ['番号', source.replace(' start="4"', '')],
        ['図', source.replace('data-id="d0"', 'data-id="d1"')],
        ['コード空行', source.replace('1\n\n', '1\n')],
    ])('%sの欠落・改変を検出する', (_label, changed) => {
        expect(snapshotDvaDeployment(document(changed))).not.toEqual(snapshotDvaDeployment(document(source)));
    });
});
