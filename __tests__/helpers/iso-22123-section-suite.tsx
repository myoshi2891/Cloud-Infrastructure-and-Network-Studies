import type { ComponentType } from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import fixture from '@/docs/migration-inventory/iso-iec-22123-1-2023.fidelity.json';
import { snapshotGuidePart } from '@/scripts/guide-fidelity-extraction.mjs';

/** 原本固定fixtureに対し、各ブロックの全文・順序・表結合・リスト階層・リンクを比較する。 */
export function defineIsoSectionSuite(name: keyof typeof fixture.parts, Section: ComponentType) {
    describe(`ISO 22123 ${name} 全量移行`, () => {
        it('原本の本文・構造・並びを省略せず保持する', () => {
            const { container } = render(<Section />);
            expect(snapshotGuidePart(container)).toEqual(fixture.parts[name]);
        });
    });
}
