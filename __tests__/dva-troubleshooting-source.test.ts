import { describe, expect, it } from 'vitest';
import { normalizeCodeContainers, codeLines } from '@/scripts/inventory-extraction.mjs';

describe('DVA Domain 4 動的コードの原本展開', () => {
    it('code-srcを実行せずコード全文と字下げを展開し、ラベルをコードから分離する', () => {
        const root = document.createElement('div');
        root.innerHTML = '<div class="code-block"><div class="cb-head">Python</div><pre><code></code></pre><script type="text/plain" class="code-src">\n  def f():\n    return 1\n</script></div>';
        normalizeCodeContainers(root);
        expect(root.querySelector('.code-sample .cb-head')?.textContent).toBe('Python');
        expect(root.querySelector('script')).toBeNull();
        expect(codeLines(root.querySelector('pre')!)).toEqual(['def f():', '  return 1']);
    });
});
