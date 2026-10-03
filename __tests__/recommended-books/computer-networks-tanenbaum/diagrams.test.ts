// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import mermaid from 'mermaid';
import { DIAGRAMS } from '@/app/recommended-books/computer-networks-tanenbaum/constants';

describe('Tanenbaumの実Mermaidパーサー', () => {
    it('全21図が構文解析を通る', async () => {
        mermaid.initialize({ startOnLoad: false });
        expect(Object.values(DIAGRAMS)).toHaveLength(21);
        for (const chart of Object.values(DIAGRAMS)) {
            expect(await mermaid.parse(chart)).toBeTruthy();
        }
    });
});
