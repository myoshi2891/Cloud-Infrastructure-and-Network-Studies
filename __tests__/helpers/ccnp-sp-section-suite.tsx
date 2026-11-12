import type { ComponentType } from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HeroIntro from '@/app/cisco/ccnp-service-provider/sections/HeroIntro';
import Chapter2 from '@/app/cisco/ccnp-service-provider/sections/Chapter2';
import Chapter3 from '@/app/cisco/ccnp-service-provider/sections/Chapter3';
import Chapter4 from '@/app/cisco/ccnp-service-provider/sections/Chapter4';
import Chapter5 from '@/app/cisco/ccnp-service-provider/sections/Chapter5';
import { ccnpServiceProviderInventory } from './ccnp-service-provider-inventory';
import { squash } from './migration-test-utils';

/** page.tsx と同じ描画順のセクション。目次（NavBar）は見出し・表セル・外部リンクを持たないため、本文はこの順で全量を構成する。 */
const SECTIONS = [
    HeroIntro,
    Chapter2,
    Chapter3,
    Chapter4,
    Chapter5,
] as const satisfies readonly ComponentType[];

type SectionComponent = (typeof SECTIONS)[number];

/** 本文のみで構成される種別。li は目次分を含むためページ全体テストで検証する。 */
const TEXT_KINDS = ['h1', 'h2', 'h3', 'h4', 'th', 'td'] as const;
type TextKind = (typeof TEXT_KINDS)[number];

const renderedCache = new Map<ComponentType, Record<TextKind | 'links', string[]>>();

/** セクションを単独描画し、種別ごとの描画値（テキストは空白除去、リンクは href）を出現順に返す。 */
function renderedValues(Section: ComponentType): Record<TextKind | 'links', string[]> {
    const cached = renderedCache.get(Section);
    if (cached) return cached;
    const { container, unmount } = render(<Section />);
    const texts = Object.fromEntries(
        TEXT_KINDS.map((kind) => [
            kind,
            [...container.querySelectorAll(kind)].map((element) => squash(element.textContent ?? '')),
        ]),
    ) as Record<TextKind, string[]>;
    const links = [...container.querySelectorAll('a[href^="http"]')].map(
        (anchor) => anchor.getAttribute('href') ?? '',
    );
    unmount();
    const result = { ...texts, links };
    renderedCache.set(Section, result);
    return result;
}

/**
 * 固定原本 25722201^:Ccnp-service-provider-guide.html の main.children を
 * [0,6), [6,11), [11,15), [15,20), [20,29) に分けて抽出した件数。
 * 描画件数から境界を推定しない。原本更新時だけ再抽出する。
 */
const SOURCE_COUNTS = [
    { h1: 1, h2: 1, h3: 3, h4: 0, th: 2, td: 10, links: 0, tableColumnHeaders: 1, codeLines: 0 },
    { h1: 0, h2: 1, h3: 4, h4: 0, th: 10, td: 37, links: 0, tableColumnHeaders: 3, codeLines: 0 },
    { h1: 0, h2: 1, h3: 3, h4: 0, th: 6, td: 48, links: 0, tableColumnHeaders: 2, codeLines: 0 },
    { h1: 0, h2: 1, h3: 4, h4: 0, th: 9, td: 38, links: 0, tableColumnHeaders: 3, codeLines: 0 },
    { h1: 0, h2: 1, h3: 1, h4: 7, th: 55, td: 209, links: 43, tableColumnHeaders: 19, codeLines: 8 },
] as const;

type InventoryKind = keyof (typeof SOURCE_COUNTS)[number];

function sourceRange(Section: SectionComponent, kind: InventoryKind): [number, number] {
    const index = SECTIONS.indexOf(Section);
    const offset = SOURCE_COUNTS.slice(0, index).reduce((sum, counts) => sum + counts[kind], 0);
    return [offset, offset + SOURCE_COUNTS[index]![kind]];
}

/** 指定セクションの全表と全コードブロックの期待値を原本の固定境界で取得する。 */
export function expectedStructures(Section: SectionComponent): { tableColumnHeaders: number[]; codeLines: number[] } {
    const { tableColumnHeaders, codeLines } = ccnpServiceProviderInventory.structures;
    return {
        tableColumnHeaders: tableColumnHeaders.slice(...sourceRange(Section, 'tableColumnHeaders')),
        codeLines: codeLines.slice(...sourceRange(Section, 'codeLines')),
    };
}

const EXPECTED: Record<TextKind | 'links', readonly string[]> = {
    ...(Object.fromEntries(TEXT_KINDS.map((kind) => [kind, ccnpServiceProviderInventory[kind].map(squash)])) as Record<
        TextKind,
        string[]
    >),
    links: ccnpServiceProviderInventory.links.map((link) => link.href ?? ''),
};

/**
 * CCNP Service Provider ガイドの個別セクションを単独で検証する。
 * 原本で固定したセクション境界から全期待値を取り出し、末尾を含めて比較する。
 */
export function defineCcnpServiceProviderSectionSuite(Section: SectionComponent): void {
    describe(`${Section.name || 'Section'} — インベントリ全量との整合`, () => {
        const kinds: readonly (TextKind | 'links')[] = [...TEXT_KINDS, 'links'];

        it.each(kinds)('%s が全体インベントリの連続する部分配列と一致する', (kind) => {
            const own = renderedValues(Section);
            const expectedSlice = EXPECTED[kind].slice(...sourceRange(Section, kind));

            expect(own[kind]).toEqual(expectedSlice);
        });

        it('全表の列見出し数と全コードブロックの行数が原本と一致する', () => {
            const { container } = render(<Section />);
            expect({
                tableColumnHeaders: [...container.querySelectorAll('table')].map(
                    table => table.querySelectorAll('th[scope="col"]').length,
                ),
                codeLines: [...container.querySelectorAll('.code-block')].map(
                    block => block.querySelectorAll(':scope > .code-line').length,
                ),
            }).toEqual(expectedStructures(Section));
        });
    });
}

