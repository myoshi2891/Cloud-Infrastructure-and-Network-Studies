import { describe, expect, test } from 'vitest';
import {
    applyPipeline,
    ensureInitFlags,
    injectRenderLoop,
} from '../../../.agents/skills/fix-mermaid/scripts/apply_render_pipeline.mjs';
import { extractDiagramsDefinition } from '../../../.agents/skills/fix-mermaid/scripts/restore_diagrams.mjs';

const FIXTURE = `<!doctype html>
<html>
  <head><style>.mermaid { display: block; }</style></head>
  <body>
    <div class="mermaid">flowchart TD
A --> B</div>
    <script>
      const DIAGRAMS = { 'diag-1': \`flowchart TD
A --> B\` };
      mermaid.initialize({ startOnLoad: true, theme: 'dark' });
    </script>
  </body>
</html>`;

describe('ensureInitFlags', () => {
    test('initialize 外の securityLevel は設定済みと誤認しない', () => {
        const input = `
            const unrelated = { securityLevel: 'strict' };
            const label = "securityLevel: loose";
            // securityLevel: strict
            mermaid.initialize({ theme: 'dark' });
        `;
        const out = ensureInitFlags(input);

        expect(out).toContain("mermaid.initialize({ securityLevel: 'loose', theme: 'dark' })");
        expect(out.match(/securityLevel/g)?.length).toBe(4);
    });
});

describe('applyPipeline', () => {
    test('DIAGRAMS 未定義なら即座に失敗する', () => {
        const input = FIXTURE.replace(/\s*const DIAGRAMS = \{[\s\S]*?\};/, '');

        expect(() => applyPipeline(input)).toThrow(/DIAGRAMS/);
    });
});

describe('injectRenderLoop の applySvgFixups', () => {
    const FRONTMATTER = '---\ntitle: 図\n---\n';
    const INIT = "%%{init: {'theme': 'base'}}%%\n";

    /** 注入された関数を取り出し、viewBox 拡張後の高さを返す */
    const fixedHeight = (src: string): string | undefined => {
        const output = injectRenderLoop('<html><body><script>mermaid.initialize({});</script></body></html>');
        const definition = output.match(/function applySvgFixups[\s\S]*?\n {12}}\n/)?.[0];
        if (!definition) throw new Error('applySvgFixups が注入されていません');
        const applySvgFixups = new Function(`${definition}; return applySvgFixups;`)() as (
            svgEl: unknown,
            chart: string,
        ) => void;
        let viewBox = '0 0 100 100';
        applySvgFixups(
            {
                style: {},
                removeAttribute: () => undefined,
                getAttribute: () => viewBox,
                setAttribute: (_name: string, value: string) => {
                    viewBox = value;
                },
            },
            src,
        );
        return viewBox.split(' ')[3];
    };

    test.each([
        ['frontmatter', `${FRONTMATTER}sequenceDiagram\nA->>B: x`],
        ['init ディレクティブ', `${INIT}stateDiagram-v2\n[*] --> A`],
        ['複数の init', `${INIT}${INIT}sequenceDiagram\nA->>B: x`],
        ['frontmatter と init の併用', `\n${FRONTMATTER}${INIT}sequenceDiagram\nA->>B: x`],
    ])('%s の後ろにある sequence/state 図を判定して 110 拡張する', (_label, src) => {
        expect(fixedHeight(src)).toBe('210');
    });

    test.each([
        ['flowchart', 'flowchart TD\nA --> B'],
        ['init 付き flowchart', `${INIT}flowchart TD\nA --> B`],
        ['本文に sequenceDiagram を含む flowchart', `${FRONTMATTER}flowchart TD\nA["sequenceDiagram"] --> B`],
    ])('%s は 15 だけ拡張する', (_label, src) => {
        expect(fixedHeight(src)).toBe('115');
    });
});

describe('JavaScript source scanning', () => {
    test('制御文の閉じ括弧後にある正規表現を飛ばして実宣言を抽出する', () => {
        const html = `<script>
if (ready) /const DIAGRAMS = \\{[^}]*\\}/.test(source);
const DIAGRAMS = { "diag-1": "flowchart TD\\nA --> B" };
</script>`;

        expect(extractDiagramsDefinition(html).diagrams).toEqual({
            'diag-1': 'flowchart TD\nA --> B',
        });
    });

    test('メンバー名 return を正規表現開始キーワードとして扱わない', () => {
        const html = `<script>
obj.return / 2;
const DIAGRAMS = { "diag-1": "flowchart TD\\nA --> B" };
</script>`;

        expect(extractDiagramsDefinition(html).diagrams).toEqual({
            'diag-1': 'flowchart TD\nA --> B',
        });
    });

    test("要素間のカンマがない DIAGRAMS 定義を拒否する", () => {
        const html = `<script>
const DIAGRAMS = {
  "diag-1": \`flowchart TD\nA --> B\`
  "diag-2": \`flowchart LR\nB --> C\`
};
</script>`;

        expect(() => extractDiagramsDefinition(html)).toThrow(
            "DIAGRAMS の値の後には ',' または '}' が必要です。",
        );
    });
});

describe('injectRenderLoop', () => {
    test.each(['</script >', '</SCRIPT>'])(
        '閉じタグの表記ゆれ %s の直前へ注入する',
        (closingTag) => {
            const input = `<script>mermaid.initialize({ startOnLoad: false });${closingTag}`;
            const out = injectRenderLoop(input);

            expect(out.indexOf('function applySvgFixups')).toBeGreaterThan(
                out.indexOf('mermaid.initialize({ startOnLoad: false })'),
            );
            expect(out.indexOf('function applySvgFixups')).toBeLessThan(
                out.toLowerCase().indexOf('</script'),
            );
        },
    );
});
