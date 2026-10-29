import { expect, it } from 'vitest';
import inventory from '@/docs/migration-inventory/aws-dva-domain4.json';
import fixture from '@/docs/migration-inventory/aws-dva-domain4.fidelity.json';
import appendix from '@/docs/migration-inventory/aws-dva-domain4-appendix-a.text.json';
import {
    DVA_DOMAIN4_CORRECTIONS,
    DVA_DOMAIN4_SQUASHED_CORRECTIONS,
    withDvaDomain4Corrections,
    withDvaDomain4SquashedCorrections,
} from '@/__tests__/helpers/dva-domain4-source-corrections';

it.each([
    ['inventory', inventory, DVA_DOMAIN4_CORRECTIONS, withDvaDomain4Corrections],
    ['fidelity structure', fixture.structure, DVA_DOMAIN4_SQUASHED_CORRECTIONS, withDvaDomain4SquashedCorrections],
] as const)('%s: 全訂正の対象が原本に存在し、置換後は旧記述が残らない', (_, source, corrections, apply) => {
    const before = JSON.stringify(source);
    const after = JSON.stringify(apply(source));
    for (const [from, to] of corrections) {
        expect(before).toContain(from);
        expect(after).toContain(to);
    }
    for (const stale of ['正常なターゲット', '転送量・消費容量', 'タイムアウトより長く(目安6倍以上)']) expect(after.replace(/\s+/g, '')).not.toContain(stale);
    expect(JSON.stringify(source)).toBe(before);
});

it('付録Aの問9は登録済みターゲットと unused 状態、フェイルオープンを説明する', () => {
    const corrected = withDvaDomain4Corrections(appendix);
    expect(corrected.text).not.toContain('正常なターゲット');
    expect(corrected.cells.join('')).toContain('フェイルオープン');
});
