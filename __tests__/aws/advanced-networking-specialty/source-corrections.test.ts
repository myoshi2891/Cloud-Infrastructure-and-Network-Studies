import { expect, it } from 'vitest';
import fixture from '@/docs/migration-inventory/aws-ans-c01-guide.fidelity.json';
import { withSourceCorrections } from '@/__tests__/helpers/aip-source-corrections';
import { ANS_GUIDE_CORRECTIONS } from '@/__tests__/helpers/aws-guide-source-corrections';

// 訂正が原本に一致せず黙って無効化されることを防ぐ
const joined = (parts: Record<string, { text: string; diagrams: string[] }>) => Object.values(parts).map(part => [part.text, ...part.diagrams].join('\n')).join('\n');
const sourceText = joined(fixture.guideParts);
const correctedText = joined(withSourceCorrections(fixture.guideParts, ANS_GUIDE_CORRECTIONS));

it.each(ANS_GUIDE_CORRECTIONS.map(([from, to, after]) => [from, to, after]))('訂正対象「%s」が原本に存在し、訂正後の期待値に反映される', (from, to, after) => {
    expect(sourceText).toContain(after === undefined ? from : `${after} ${from}`);
    expect(correctedText).toContain(after === undefined ? to : `${after} ${to}`);
});
