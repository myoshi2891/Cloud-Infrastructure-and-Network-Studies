import { expect, it } from 'vitest';
import fixture from '@/docs/migration-inventory/aws-ans-c01-guide.fidelity.json';
import { withSourceCorrections } from '@/__tests__/helpers/aip-source-corrections';
import { ANS_GUIDE_CORRECTIONS, ANS_GUIDE_SYNTAX_CORRECTIONS, withSyntaxCorrections } from '@/__tests__/helpers/aws-guide-source-corrections';

// 訂正が原本に一致せず黙って無効化されることを防ぐ
// text はコードを含まないため、コード行の訂正も検証できるよう codes を結合する
const joined = (parts: Record<string, { text: string; diagrams: string[]; codes: string[][] }>) => Object.values(parts).map(part => [part.text, ...part.diagrams, ...part.codes.flat()].join('\n')).join('\n');
const sourceText = joined(fixture.guideParts);
const correctedText = joined(withSourceCorrections(fixture.guideParts, ANS_GUIDE_CORRECTIONS));

it.each(ANS_GUIDE_CORRECTIONS.map(([from, to, after]) => [from, to, after]))('訂正対象「%s」が原本に存在し、訂正後の期待値に反映される', (from, to, after) => {
    expect(sourceText).toContain(after === undefined ? from : `${after} ${from}`);
    expect(correctedText).toContain(after === undefined ? to : `${after} ${to}`);
});

it('構文トークンの訂正が原本の削除対象と一致し、訂正後に反映される', () => {
    const corrected = withSyntaxCorrections(fixture.syntaxTokens, ANS_GUIDE_SYNTAX_CORRECTIONS);
    ANS_GUIDE_SYNTAX_CORRECTIONS.forEach(([key, index, , insert]) => {
        expect(corrected[key]!.slice(index, index + insert.length)).toEqual(insert);
    });
    expect(() => withSyntaxCorrections(fixture.syntaxTokens, [['nv', 0, ['$packets'], []]])).toThrow();
});
