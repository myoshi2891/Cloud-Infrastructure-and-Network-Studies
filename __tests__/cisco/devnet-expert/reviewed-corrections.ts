import originalBlocks from './__fixtures__/reviewed-code-blocks.json';
import { expect } from 'vitest';
import { corrections, addedParagraphs, textCorrections } from '@/scripts/devnet-expert-corrections.mjs';

// Reviewed corrections are asserted exactly before restoring archived markup for
// the existing full fidelity checks. The fixture preserves original highlight markup
// from cf3d30636c7136f722a1422587ceae87aa165aa5:Devnet-expert-guide.html.

export function restoreReviewedCorrections(container: HTMLElement) {
    const originals = originalBlocks.map(({ index, html }) => {
        const code = document.createElement('code');
        code.innerHTML = html;
        return { index, code };
    });
    const blocks = [...container.querySelectorAll('.code-block')];
    for (const [before, after] of corrections) {
        const index = originals.findIndex(({ code }) => code.textContent?.replace(/^\n|\n$/g, '') === before);
        expect(index, before.slice(0, 80)).toBeGreaterThanOrEqual(0);
        const block = blocks[originals[index]!.index]!;
        expect(block.textContent).toBe(after);
        expect(block.children.length).toBeGreaterThan(0);
        expect([...block.children].every(child => child.matches('.code-line'))).toBe(true);
        expect([...block.children].map(line => line.textContent)).toEqual(after.split('\n'));
        block.innerHTML = '';
        originals[index]!.code.innerHTML.replace(/^\n|\n$/g, '').split('\n').forEach((html, i) => {
            if (i) block.append('\n');
            const line = document.createElement('div');
            line.className = 'code-line';
            line.innerHTML = html;
            block.append(line);
        });
    }
    for (const text of addedParagraphs) {
        const paragraph = [...container.querySelectorAll('p')].find(p => p.textContent === text);
        expect(paragraph).toBeDefined();
        paragraph!.remove();
    }
    for (const [before, after] of textCorrections) {
        const cell = [...container.querySelectorAll('td')].find(td => td.textContent === after);
        expect(cell).toBeDefined();
        cell!.textContent = before;
    }
    const row = [...container.querySelectorAll('tr')].find(tr => tr.cells[0]?.textContent === '不合格後の待機')!;
    expect(row.cells[1]!.textContent).toBe('不合格の翌日から5暦日');
    expect(row.cells[2]!.textContent).toBe('エキスパートのラボは30暦日');
    row.cells[1]!.textContent = 'CCIE 筆記試験は15暦日';
}
