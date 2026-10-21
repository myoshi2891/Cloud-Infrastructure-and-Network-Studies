import { JSDOM } from 'jsdom';
import { expect, it } from 'vitest';
import { snapshotGuideChecks } from '@/scripts/guide-interaction-extraction.mjs';
it('extracts each implicit quiz checkbox label without confusing empty ids', () => {
    const doc = new JSDOM('<label><input type="checkbox" name="q" value="A">First</label><label><input type="checkbox" name="q" value="B" checked>Second</label>').window.document;
    expect(snapshotGuideChecks(doc)).toEqual([
        { id: '', label: 'First', checked: false },
        { id: '', label: 'Second', checked: true },
    ]);
});
