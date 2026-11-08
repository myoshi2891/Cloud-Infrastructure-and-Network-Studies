import { readFileSync } from 'node:fs';
import postcss from 'postcss';
import { expect, it } from 'vitest';

it('registers CCNP Enterprise light page for the shared footer', () => {
    const selectors: string[] = [];
    postcss.parse(readFileSync('components/Footer.module.css', 'utf8')).walkDecls('color-scheme', (declaration) => {
        const rule = declaration.parent;
        if (declaration.value === 'light' && rule?.type === 'rule') selectors.push((rule as postcss.Rule).selector);
    });

    expect(selectors).toHaveLength(1);
    expect(selectors[0]).toMatch(/~ \.footer$/);
    const roots = selectors[0]?.match(/:is\(([^)]*)\)/)?.[1]?.split(',').map((root) => root.trim());
    expect(roots).toContain('.ccnp-enterprise-page');
});

