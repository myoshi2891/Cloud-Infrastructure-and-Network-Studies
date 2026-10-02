import { describe, expect, it } from 'vitest';
import { diagramSelector } from '@/scripts/inventory-extraction.mjs';

describe('script-rendered Mermaid inventory', () => {
    it('counts each empty diagram target once, including its nested container', () => {
        const root = document.createElement('div');
        root.innerHTML = '<div class="mermaid-container"><div id="diagram-architecture" class="mermaid-target"></div></div><div class="mermaid-target" id="diagram-sequence"></div>';
        const diagrams = [...root.querySelectorAll(diagramSelector)].filter(
            element => !element.querySelector(diagramSelector),
        );
        expect(diagrams.map(element => element.id)).toEqual(['diagram-architecture', 'diagram-sequence']);
    });
});
