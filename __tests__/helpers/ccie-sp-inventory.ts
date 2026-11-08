import inventory from '@/docs/migration-inventory/cisco-ccie-service-provider.json';
import { CCIE_SP_SOURCE_CORRECTIONS } from '@/scripts/ccie-sp-source-corrections.mjs';
import { withSourceCorrections } from './aip-source-corrections';

type BodyContent = (typeof inventory)['bodyContent'];

/** コードブロックの本文だけを出現順に返す。 */
const codeTexts = (bodyContent: BodyContent): string[] =>
    bodyContent.filter((block) => block.kind === 'code').map((block) => block.text);

const corrected = withSourceCorrections(inventory, CCIE_SP_SOURCE_CORRECTIONS);
const sourceCode = codeTexts(inventory.bodyContent);
const correctedCode = codeTexts(corrected.bodyContent);

/** 訂正で増減した行数を返す。 */
const lineDelta = (index: number): number =>
    (correctedCode[index] ?? '').split('\n').length - (sourceCode[index] ?? '').split('\n').length;

/** 原本インベントリへ本文訂正を適用した表示の期待値。行数は訂正による増減を反映する。 */
export const ccieSpInventory = {
    ...corrected,
    structures: {
        ...corrected.structures,
        codeLines: corrected.structures.codeLines.map((lines, index) => lines + lineDelta(index)),
    },
};
