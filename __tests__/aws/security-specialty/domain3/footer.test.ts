import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';

it('registers SCS-C03 Domain 3 light page for the shared footer', () => {
    expect(readFileSync('components/Footer.module.css', 'utf8')).toContain('.scs-domain3-page');
});
