import { describe, expect, it } from 'vitest';
import { JSDOM } from 'jsdom';
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { snapshotGuidePart, snapshotGuideDesign } from '@/scripts/guide-fidelity-extraction.mjs';

describe('guide fidelity: lists, diagrams, inline semantics and CSS', () => {
    it('generates all six AIP parts, 34 charts and source CSS from a fixed Git revision', () => {
        const sandbox = mkdtempSync(join(tmpdir(), 'aip-fidelity-'));
        let fixture;
        try {
            mkdirSync(join(sandbox, 'docs/migration-inventory'), { recursive: true });
            execFileSync('bun', [resolve('scripts/gen-fidelity-fixture.mjs'), 'aws-aip-c01-guide'], {
                cwd: sandbox, env: { ...process.env, GIT_DIR: resolve('.git') },
            });
            const generated = readFileSync(join(sandbox, 'docs/migration-inventory/aws-aip-c01-guide.fidelity.json'), 'utf8');
            expect(generated).toBe(readFileSync('docs/migration-inventory/aws-aip-c01-guide.fidelity.json', 'utf8'));
            fixture = JSON.parse(generated);
        } finally { rmSync(sandbox, { recursive: true, force: true }); }
        expect(Object.keys(fixture.guideParts)).toEqual(['foundation', 'domain1', 'domain2', 'domain3', 'operations', 'revision']);
        expect(Object.values(fixture.guideParts).flatMap((part: unknown) => (part as { diagrams: string[] }).diagrams)).toHaveLength(34);
        expect(fixture.guideDesign.nav).toHaveLength(48);
        expect(fixture.guideDesign.rules.find((rule: { selector: string }) => rule.selector === '.main ul,\n            .main ol')?.declarations['padding-left']).toBe('1.4em');
        expect(fixture.sourceCommit).toMatch(/^[a-f0-9]{40}$/);
    });
    it('distinguishes ordered and unordered lists, nesting, numbering and repeated items', () => {
        const doc = new JSDOM('<main><ul><li>A<ol start="3"><li value="5">B</li></ol></li><li>A</li></ul></main>').window.document;
        expect(snapshotGuidePart(doc).lists).toEqual([
            { tag: 'ul', start: null, reversed: false, depth: 0, items: [{ text: 'AB', value: null }, { text: 'A', value: null }] },
            { tag: 'ol', start: '3', reversed: false, depth: 1, items: [{ text: 'B', value: '5' }] },
        ]);
    });
    it('compares source and migrated diagrams and code while preserving inline emphasis', () => {
        const source = new JSDOM('<main><h2 id="one">Heading</h2><p><strong>Keep</strong> this</p><pre class="mermaid">flowchart LR\n A--&gt;B</pre><pre><code>  first\n\nlast</code></pre></main>').window.document;
        const target = new JSDOM('<main><h2 id="one" tabindex="-1">Heading</h2><p><strong>Keep</strong> this</p><div class="mermaid-wrap"><div data-testid="mermaid-diagram" data-chart="flowchart LR&#10; A--&gt;B"></div></div><div class="code-block"><div class="code-line">  first</div><div class="code-line"></div><div class="code-line">last</div></div></main>').window.document;
        expect(snapshotGuidePart(target)).toEqual(snapshotGuidePart(source));
        target.querySelector('strong')?.replaceWith('Keep');
        expect(snapshotGuidePart(target)).not.toEqual(snapshotGuidePart(source));
    });
    it('records stylesheet selectors, declarations, media queries and navigation levels', () => {
        const doc = new JSDOM('<style>.main ul { padding-left: 1.4em; } @media (max-width: 980px) { .main { margin-left: 0; } }</style><nav id="sidebarNav"><a href="#one" class="lvl3">One</a></nav>').window.document;
        expect(snapshotGuideDesign(doc)).toEqual({
            nav: [{ id: 'one', label: 'One', level: 3 }],
            rules: [
                { selector: '.main ul', media: '', declarations: { 'padding-left': '1.4em' } },
                { selector: '.main', media: '(max-width: 980px)', declarations: { 'margin-left': '0' } },
            ],
        });
    });
});
