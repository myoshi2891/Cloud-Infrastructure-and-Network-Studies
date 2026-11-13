import { execFileSync, spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { render } from '@testing-library/react';
import { JsxEmit, ModuleKind, transpileModule } from 'typescript';
import { expect, it, vi } from 'vitest';
import { FIDELITY_PAGES } from '@/scripts/archive-fidelity-config.mjs';
import Part2 from '@/app/cisco/devnet-expert/sections/Part2';
import Part4 from '@/app/cisco/devnet-expert/sections/Part4';
import Part5 from '@/app/cisco/devnet-expert/sections/Part5';
import Part6 from '@/app/cisco/devnet-expert/sections/Part6';
import Part7 from '@/app/cisco/devnet-expert/sections/Part7';
import Part8 from '@/app/cisco/devnet-expert/sections/Part8';

vi.mock('@/components/MermaidDiagram', () => ({ MermaidDiagram: () => null }));

it('regenerates reviewed examples and TLS instructions from the fixed source revision', (context) => {
    const { sourceCommit, source } = FIDELITY_PAGES['devnet-expert']!;
    if (spawnSync('git', ['cat-file', '-e', `${sourceCommit}:${source}`]).status !== 0) {
        context.skip('Requires the fixed source revision in Git history (full-history checkout)');
    }
    const workspace = mkdtempSync(join(tmpdir(), 'devnet-generation-'));
    try {
        mkdirSync(join(workspace, 'app'));
        mkdirSync(join(workspace, 'scripts'));
        cpSync('app/globals.css', join(workspace, 'app/globals.css'));
        cpSync('scripts/devnet-expert-additions.css', join(workspace, 'scripts/devnet-expert-additions.css'));
        execFileSync(process.execPath, [resolve('scripts/migrate-devnet-expert.mjs')], {
            cwd: workspace,
            env: { ...process.env, GIT_DIR: resolve('.git') },
        });
        const require = createRequire(import.meta.url);
        const snapshot = (container: HTMLElement) => ({
            code: [...container.querySelectorAll('.code-block')].map(block =>
                [...block.children].map(line => line.textContent)),
            paragraphs: [...container.querySelectorAll('p')].map(p => p.textContent),
            cells: [...container.querySelectorAll('td')].map(td => td.textContent),
            tokens: [...container.querySelectorAll('.code-line span')].map(span => [span.className, span.textContent]),
            links: [...container.querySelectorAll('p a')].map(link => link.getAttribute('href')),
        });
        for (const [part, Current] of [[2, Part2], [4, Part4], [5, Part5], [6, Part6], [7, Part7], [8, Part8]] as const) {
            const source = readFileSync(join(workspace, `app/cisco/devnet-expert/sections/Part${part}.tsx`), 'utf8');
            const { outputText } = transpileModule(source, { compilerOptions: { module: ModuleKind.CommonJS, jsx: JsxEmit.ReactJSX } });
            const generated = { exports: { default: Current } };
            // Evaluate only the JSX produced by the repository's generator; diagrams are irrelevant here.
            new Function('require', 'exports', outputText)(
                (id: string) => id === '../Diagram' ? { Diagram: () => null } : require(id), generated.exports);
            const container = document.createElement('div');
            container.innerHTML = renderToStaticMarkup(createElement(generated.exports.default));
            const current = render(createElement(Current));
            expect(snapshot(container), `Part${part}`).toEqual(snapshot(current.container));
            current.unmount();
        }
    } finally {
        rmSync(workspace, { recursive: true, force: true });
    }
});
