import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';

it('registers CCIE Service Provider light page for the shared footer', () => {
    expect(readFileSync('components/Footer.module.css', 'utf8')).toContain('.ccie-sp-page');
});
