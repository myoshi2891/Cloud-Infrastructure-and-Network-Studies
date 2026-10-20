import { describe, expect, it } from 'vitest';
import { JSDOM } from 'jsdom';
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { snapshotGuidePart, snapshotGuideDesign } from '@/scripts/guide-fidelity-extraction.mjs';

const AIP_FIXTURE_PATH = 'docs/migration-inventory/aws-aip-c01-guide.fidelity.json';
const aipFixture: { guideParts: Record<string, unknown>; guideDesign: { nav: unknown[]; rules: { selector: string; declarations: Record<string, string> }[] }; sourceCommit: string } = JSON.parse(readFileSync(AIP_FIXTURE_PATH, 'utf8'));

/** sourceCommit がローカルの Git オブジェクトに存在するか（shallow checkout では存在しない） */
const commitExists = (sha: string): boolean => {
    try {
        execFileSync('git', ['cat-file', '-e', `${sha}^{commit}`], { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
};
const hasSourceCommit = commitExists(aipFixture.sourceCommit);

describe('guide fidelity: lists, diagrams, inline semantics and CSS', () => {
    it('compares highlighted code containers once while retaining language labels and blank lines', () => {
        const source = new JSDOM('<main><div class="code-block"><div class="code-lang">bash</div><pre class="highlight"><code><span class="k">echo</span> x\n\n  tail\n</code></pre></div></main>').window.document;
        const target = new JSDOM('<main><div class="code-sample"><div class="code-lang">bash</div><div class="code-block highlight"><div class="code-line"><span class="k">echo</span> x</div><div class="code-line"></div><div class="code-line">  tail</div></div></div></main>').window.document;
        expect(snapshotGuidePart(source).codes).toEqual([['echo x', '', '  tail']]);
        expect(snapshotGuidePart(target)).toEqual(snapshotGuidePart(source));
    });
    it('compares formatted source and JSX block boundaries without losing spaces within words', () => {
        const source = new JSDOM('<main><h2>Title</h2>\n<p>Keep <strong>two words</strong></p>\n<table><tbody><tr><td> First </td>\n<td>Second</td></tr></tbody></table></main>').window.document;
        const target = new JSDOM('<main><h2>Title</h2><p>Keep <strong>two words</strong></p><table><tbody><tr><td>First</td><td>Second</td></tr></tbody></table></main>').window.document;
        expect(snapshotGuidePart(target).text).toBe(snapshotGuidePart(source).text);
        expect(snapshotGuidePart(target).text).toContain('two words');
        target.querySelector('strong')!.textContent = 'twowords';
        expect(snapshotGuidePart(target).text).not.toBe(snapshotGuidePart(source).text);
    });
    it('keeps all six AIP parts, 34 charts and source CSS in the committed fixture', () => {
        expect(Object.keys(aipFixture.guideParts)).toEqual(['foundation', 'domain1', 'domain2', 'domain3', 'operations', 'revision']);
        expect(Object.values(aipFixture.guideParts).flatMap((part: unknown) => (part as { diagrams: string[] }).diagrams)).toHaveLength(34);
        expect(aipFixture.guideDesign.nav).toHaveLength(48);
        expect(aipFixture.guideDesign.rules.find((rule: { selector: string }) => rule.selector === '.main ul,\n            .main ol')?.declarations['padding-left']).toBe('1.4em');
        expect(aipFixture.sourceCommit).toMatch(/^[a-f0-9]{40}$/);
    });
    // 固定リビジョンからの再生成は完全な履歴が必要。shallow checkout では sourceCommit が存在しないため明示的にスキップする
    it.skipIf(!hasSourceCommit)('regenerates the AIP fixture byte-for-byte from its fixed Git revision (full history only)', () => {
        const sandbox = mkdtempSync(join(tmpdir(), 'aip-fidelity-'));
        try {
            mkdirSync(join(sandbox, 'docs/migration-inventory'), { recursive: true });
            // worktree では .git がファイルになるため、実際の Git ディレクトリを解決して渡す
            const gitDir = execFileSync('git', ['rev-parse', '--absolute-git-dir'], { encoding: 'utf8' }).trim();
            execFileSync('bun', [resolve('scripts/gen-fidelity-fixture.mjs'), 'aws-aip-c01-guide'], {
                cwd: sandbox, env: { ...process.env, GIT_DIR: gitDir },
            });
            const generated = readFileSync(join(sandbox, 'docs/migration-inventory/aws-aip-c01-guide.fidelity.json'), 'utf8');
            expect(generated).toBe(readFileSync(AIP_FIXTURE_PATH, 'utf8'));
        } finally { rmSync(sandbox, { recursive: true, force: true }); }
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
