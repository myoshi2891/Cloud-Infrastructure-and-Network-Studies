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

/** セクションを単独描画し、種別ごとの描画値（テキストは空白除去、リンクは href）を出現順に返す。 */
const renderedCache = new Map<ComponentType, Record<TextKind | 'links', string[]>>();

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

/** セクション単独描画での表（列見出し数）とコードブロック（行数）を出現順に返す。 */
const structureCache = new Map<ComponentType, { tableColumnHeaders: number[]; codeLines: number[] }>();

function renderedStructures(Section: ComponentType): { tableColumnHeaders: number[]; codeLines: number[] } {
    const cached = structureCache.get(Section);
    if (cached) return cached;
    const { container, unmount } = render(<Section />);
    const result = {
        tableColumnHeaders: [...container.querySelectorAll('table')].map(
            (table) => table.querySelectorAll('th[scope="col"]').length,
        ),
        codeLines: [...container.querySelectorAll('.code-block')].map(
            (block) => block.querySelectorAll('.code-line').length,
        ),
    };
    unmount();
    structureCache.set(Section, result);
    return result;
}

/** インベントリ structures のうち、指定セクションが担う表の列見出し数とコード行数の期待値。 */
export function expectedStructures(Section: SectionComponent): { tableColumnHeaders: number[]; codeLines: number[] } {
    const index = SECTIONS.indexOf(Section);
    const before = SECTIONS.slice(0, index).map(renderedStructures);
    const own = renderedStructures(Section);
    const offset = (key: 'tableColumnHeaders' | 'codeLines'): number =>
        before.reduce((sum, item) => sum + item[key].length, 0);
    const { tableColumnHeaders, codeLines } = ccnpServiceProviderInventory.structures;
    return {
        tableColumnHeaders: tableColumnHeaders.slice(
            offset('tableColumnHeaders'),
            offset('tableColumnHeaders') + own.tableColumnHeaders.length,
        ),
        codeLines: codeLines.slice(offset('codeLines'), offset('codeLines') + own.codeLines.length),
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
 * 全セクションの描画結果を連結したとき原本インベントリと一致する前提のもと、
 * 本セクションが担う範囲をインデックスで特定して部分一致を検証する。
 */
export function defineCcnpServiceProviderSectionSuite(Section: SectionComponent): void {
    describe(`${Section.name || 'Section'} — インベントリ全量との整合`, () => {
        const kinds: readonly (TextKind | 'links')[] = [...TEXT_KINDS, 'links'];

        it.each(kinds)('%s が全体インベントリの連続する部分配列と一致する', (kind) => {
            const index = SECTIONS.indexOf(Section);
            const before = SECTIONS.slice(0, index).map(renderedValues);
            const own = renderedValues(Section);
            const offset = before.reduce((sum, item) => sum + item[kind].length, 0);
            const expectedSlice = EXPECTED[kind].slice(offset, offset + own[kind].length);

            expect(own[kind]).toEqual(expectedSlice);
        });
    });
}

